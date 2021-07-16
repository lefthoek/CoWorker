import fs from "fs";

class DataLake {
  archive: Record<string, any>[];
  fileName: string;
  dirName: string;
  path: string;

  constructor({ fileName, dirName }: { fileName: string; dirName: string }) {
    this.archive = [];
    this.dirName = dirName;
    this.fileName = fileName;
    this.path = `${this.dirName}/${this.fileName}`;
  }

  async *add(messageIterator: AsyncGenerator<Record<string, any>>) {
    for await (const message of messageIterator) {
      this.archive = [...this.archive, message];
      yield message;
    }
    return this.dump();
  }

  async *prepend(messageIterator: AsyncGenerator<Record<string, any>>) {
    const newMessages = [];
    for await (const message of messageIterator) {
      newMessages.push(message);
      yield message;
    }
    this.archive = [...newMessages, ...this.archive];
    return this.dump();
  }

  dump() {
    console.log(this.archive.length);
    if (!fs.existsSync(this.dirName)) {
      fs.mkdirSync(this.dirName);
    }
    fs.writeFileSync(this.path, JSON.stringify(this.archive));
  }

  getSample() {
    return this.archive.slice(0, 5);
  }

  getAll() {
    return this.archive;
  }

  hydrate() {
    try {
      const archive = fs.readFileSync(this.path, "utf-8");
      this.archive = JSON.parse(archive);
    } catch {
      console.log(`new db: ${this.path}`);
    }
  }

  getLatestTimestamp() {
    console.log(this.archive.length);
    return this.archive[0] ? this.archive[0].ts : false;
  }
}

export default new DataLake({
  dirName: "./data_lake",
  fileName: "messages.json",
});
