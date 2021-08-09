import fs from "fs";
import { State } from "../types";

class AppState {
  dirName: string;
  filename: string;
  state: State;

  constructor(channel_id: string) {
    this.dirName = "app_state";
    this.state = { channel_id };
    this.filename = `${this.dirName}/${channel_id}.json`;
    if (!fs.existsSync(this.dirName)) {
      console.log(`new appState: ${this.dirName}`);
      fs.mkdirSync(this.dirName);
    }
    this.hydrate();
  }

  dump() {
    console.log(this.state);
    fs.writeFileSync(this.filename, JSON.stringify(this.state));
  }

  get() {
    return this.state;
  }

  set(key: "channel_id", value: string) {
    this.state[key] = value;
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
}

export default AppState;
