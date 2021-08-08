import fs from "fs";

class DataLake {
  buffer: Record<string, any>[];
  latest_message: string | false;
  dirName: string;

  constructor({ dirName }: { dirName: string }) {
    this.dirName = dirName;
    this.latest_message = false;
    if (!fs.existsSync(this.dirName)) {
      console.log(`new datalake: ${this.dirName}`);
      fs.mkdirSync(this.dirName);
    }
    this.buffer = [];
  }

  async store(messageIterator: AsyncGenerator<Record<string, any>>) {
    this.buffer = [];
    for await (const message of messageIterator) {
      this.buffer.push(message);
      if (this.buffer.length === 100) {
        this.dump();
      }
    }
    return this.dump();
  }

  dump() {
    const timestamp = this.getLatestTimestamp();
    if (!timestamp) {
      return 0;
    }
    const path = `${this.dirName}/${timestamp}.json`;
    fs.writeFileSync(path, JSON.stringify(this.buffer));
    this.latest_message =
      timestamp > this.latest_message ? timestamp : this.latest_message;
    this.buffer = [];
  }

  getLatestTimestamp() {
    return this.buffer[0] ? this.buffer[0].ts : this.latest_message;
  }
}

export default new DataLake({
  dirName: "./data_lake",
});
