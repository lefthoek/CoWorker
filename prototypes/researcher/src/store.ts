import fs from "fs";

class Store {
  archive: Record<string, any>[];
  filename: string;

  constructor(filename: string) {
    this.archive = [];
    this.filename = filename;
  }

  add(records: any[]) {
    this.archive = [...records, ...this.archive];
  }

  prepend(messages: any[]) {
    this.archive = [...this.archive, ...messages];
  }

  dump() {
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
const data_lake = new Store("data_lake.json");
const links_store = new Store("links_store.json");

export { data_lake, links_store };

export default Store;
