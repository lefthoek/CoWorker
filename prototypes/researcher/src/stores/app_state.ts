import fs from "fs";
import { State } from "../types";

class AppState {
  filename: string;
  state: State;

  constructor(filename: string) {
    this.filename = filename;
    this.state = {};
  }

  dump() {
    console.log(this.state);
    fs.writeFileSync(this.filename, JSON.stringify(this.state));
  }
  get() {
    return this.state;
  }

  set(state: State) {
    this.state = state;
    this.dump();
  }

  hydrate() {
    try {
      const state = fs.readFileSync(this.filename, "utf-8");
      this.state = JSON.parse(state);
    } catch {
      console.log(`new db: ${this.filename}`);
    }
  }

  getLatestTimestamp() {
    return this.state.latest_message;
  }
}

export default new AppState("app_state.json");
