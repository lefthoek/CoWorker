import fs from "fs";
import { StatusCodes } from "../types";

class DataLake {
  buffer: Record<string, any>[];
  root_dir_name: string;
  dir_name: string;

  constructor({ channel_id }: { channel_id: string }) {
    this.root_dir_name = "./datalake";
    this.dir_name = `${this.root_dir_name}/${channel_id}/`;
    if (!fs.existsSync(this.root_dir_name)) {
      console.log(`new datalake: ${this.root_dir_name}`);
      fs.mkdirSync(this.root_dir_name);
    }
    if (!fs.existsSync(this.dir_name)) {
      console.log(`new repo: ${this.dir_name}`);
      fs.mkdirSync(this.dir_name);
    }
    this.buffer = [];
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
      if (this.buffer.length === 100) {
        this.dump();
      }
    }
    return this.dump();
  }

  dump() {
    const timestamp = this.buffer[0] && this.buffer[0].ts;
    if (!timestamp) {
      return [StatusCodes.INFO, "no new messages"];
    }
    const path = `${this.dir_name}/${timestamp}.json`;
    fs.writeFileSync(path, JSON.stringify(this.buffer));
    this.buffer = [];
    return [StatusCodes.SUCCESS, this.getLatestTimestamp()];
  }

  getLatestTimestamp() {
    return this.getTimestamps()[0];
  }
}

export default DataLake;
