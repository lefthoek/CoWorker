import fs from "fs";

class DataLake {
  archive: Record<string, any>[];
  filename: string;

  constructor(filename: string) {
    this.archive = [];
    this.filename = filename;
  }

  prepend(message: any) {
    this.archive = [message, ...this.archive];
  }

  add(message: any) {
    this.archive = [...this.archive, message];
  }

  dump() {
    console.log(this.archive.length);
    fs.writeFileSync(this.filename, JSON.stringify(this.archive));
  }
  getSample() {
    return this.archive.slice(0, 5);
  }

  getAll() {
    return this.archive;
  }

  hydrate() {
    try {
      const archive = fs.readFileSync(this.filename, "utf-8");
      this.archive = JSON.parse(archive);
    } catch {
      console.log(`new db: ${this.filename}`);
    }
  }

  getLatestTimestamp() {
    console.log(this.archive.length);
    return this.archive[0] ? this.archive[0].ts : false;
  }
}

export default new DataLake("data_lake.json");
