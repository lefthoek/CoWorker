import * as fs from "../adapters/filesystem";
import { StatusCodes } from "../types";

const CLUSTER_LENGTH = 100;

class DataLake {
  buffer: Record<string, any>[];
  root_dir_name: string;
  dir_name: string;
  adapter: any;

  constructor({ channel_id, adapter }: { channel_id: string; adapter?: any }) {
    this.adapter = adapter || fs;
    this.root_dir_name = "./datalake";
    this.dir_name = `${this.root_dir_name}/${channel_id}/`;
    this.buffer = [];
  }

  async init() {
    await this.adapter.touch(this.root_dir_name);
    await this.adapter.touch(this.dir_name);
    const latest_timestamp = await this.getLatestTimestamp();
    const latest_file = `${this.dir_name}/${latest_timestamp}.json`;
    const [status, records] = await this.adapter.readJSON(latest_file);
    if (status === StatusCodes.SUCCESS && records.length < CLUSTER_LENGTH) {
      console.log("deleted last incomplete cluster", records.length);
      const [status] = await this.adapter.deleteFile(latest_file);
    }
    const ts = await this.getLatestTimestamp();
    return [StatusCodes.SUCCESS, await this.getLatestTimestamp()];
  }

  async store(messageIterator: AsyncGenerator<Record<string, any>>) {
    for await (const message of messageIterator) {
      this.buffer.push(message);
      if (
        this.buffer.length === CLUSTER_LENGTH ||
        message.type === "CLUSTER BREAK"
      ) {
        if (message.type === "CLUSTER BREAK") {
          this.buffer.pop();
        }
        await this.dump();
      }
    }
    await this.dump();
    const ts = await this.getLatestTimestamp();
    return [StatusCodes.SUCCESS, ts];
  }

  async dump() {
    if (!this.buffer || this.buffer.length < 1) {
      return [StatusCodes.INFO, "no more messages to save"];
    }
    const timestamp = this.buffer[0] && this.buffer[0].ts;
    const path = `${this.dir_name}/${timestamp}.json`;
    const [status] = await this.adapter.writeJSON(path, this.buffer);
    if (status === StatusCodes.SUCCESS) {
      const numberOfRecords = this.buffer.length;
      this.buffer = [];
      return [StatusCodes.SUCCESS, numberOfRecords, timestamp];
    } else {
      return [StatusCodes.ERROR, "Couldn't write chunk", path];
    }
  }

  async getLatestTimestamp() {
    const [_, ts] = await this.adapter.timestamps(this.dir_name);
    return ts ? ts[0] : ts;
  }
}

export default DataLake;
