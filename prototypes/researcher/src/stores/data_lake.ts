import fs from "fs";
import { StatusCodes } from "../types";

const CLUSTER_LENGTH = 100;

class DataLake {
  buffer: Record<string, any>[];
  root_dir_name: string;
  dir_name: string;

  constructor({ channel_id }: { channel_id: string }) {
    this.root_dir_name = "./datalake";
    this.dir_name = `${this.root_dir_name}/${channel_id}/`;
    this.buffer = [];
    this.init();
  }

  init() {
    if (!fs.existsSync(this.root_dir_name)) {
      console.log(`new datalake: ${this.root_dir_name}`);
      fs.mkdirSync(this.root_dir_name);
    }
    if (!fs.existsSync(this.dir_name)) {
      console.log(`new repo: ${this.dir_name}`);
      fs.mkdirSync(this.dir_name);
    }
    const latest_timestamp = this.getLatestTimestamp();
    const latest_file = `${this.dir_name}/${latest_timestamp}.json`;
    if (fs.existsSync(latest_file)) {
      const raw_file = fs.readFileSync(latest_file, "utf-8");
      const records = JSON.parse(raw_file);
      if (records.length < CLUSTER_LENGTH) {
        console.log("deleting last incomplete cluster", records.length);
        fs.unlinkSync(latest_file);
      }
    }
  }

  getTimestamps() {
    const timestamps = fs.readdirSync(this.dir_name).map((file) => {
      return file.replace(/.json$/, "");
    });
    return timestamps.sort().reverse();
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
        this.buffer.length && this.dump();
      }
    }
    this.buffer.length && this.dump();
    return [StatusCodes.SUCCESS, this.getLatestTimestamp()];
  }

  dump() {
    if (!this.buffer || this.buffer.length < 1) {
      return [StatusCodes.INFO, "no new messages"];
    }
    const timestamp = this.buffer[0] && this.buffer[0].ts;
    const path = `${this.dir_name}/${timestamp}.json`;
    fs.writeFileSync(path, JSON.stringify(this.buffer));
    const status = [StatusCodes.SUCCESS, this.buffer.length, timestamp];
    this.buffer = [];
    console.log(status);
    return status;
  }

  getLatestTimestamp() {
    return this.getTimestamps()[0];
  }
}

export default DataLake;
