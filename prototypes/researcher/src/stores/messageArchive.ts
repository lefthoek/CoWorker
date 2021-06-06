import fs from "fs";

class Store {
  archive: { type: string; user: string; text: string; ts: string }[];

  constructor() {
    this.archive = [];
  }

  add(messages: any[]) {
    this.archive = [...messages, ...this.archive];
  }

  prepend(messages: any[]) {
    this.archive = [...this.archive, ...messages];
  }

  dump() {
    fs.writeFileSync("dump.json", JSON.stringify(this.archive));
  }
  getSample() {
    return this.archive.slice(250, 300);
  }

  getAll() {
    return this.archive;
  }

  hydrate() {
    try {
      const archive = fs.readFileSync("dump.json", "utf-8");
      this.archive = JSON.parse(archive);
    } catch {
      console.log("new db");
    }
  }

  getLatestTimestamp() {
    console.log(this.archive.length);
    return this.archive[0] ? this.archive[0].ts : false;
  }
}

export default new Store();
