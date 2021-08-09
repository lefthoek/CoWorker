import fs from "fs";
import { StatusCodes } from "../types";

class DataLake {
  buffer: Record<string, any>[];
  dirName: string;

  constructor({ dirName }: { dirName: string }) {
    this.dirName = dirName;
    if (!fs.existsSync(this.dirName)) {
      console.log(`new datalake: ${this.dirName}`);
      fs.mkdirSync(this.dirName);
    }
    this.buffer = [];
  }

  getTimestamps() {
    const timestamps = fs.readdirSync(this.dirName).map((file) => {
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
    const path = `${this.dirName}/${timestamp}.json`;
    fs.writeFileSync(path, JSON.stringify(this.buffer));
    this.buffer = [];
    return [StatusCodes.SUCCESS, this.getLatestTimestamp()];
  }

  getLatestTimestamp() {
    return this.getTimestamps()[0];
  }
}

export default new DataLake({
  dirName: "./data_lake",
});
