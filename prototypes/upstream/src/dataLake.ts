import { StatusCodes, FSAdapter, DataLakeMetaData } from "./types";

class DataLake {
  buffer: Record<string, any>[];
  cluster_length: number;
  root_dir_name: string;
  dir_name: string;
  adapter: any;

  constructor({
    channel_id,
    adapter,
    team_id,
  }: {
    team_id: string;
    channel_id?: string;
    adapter: FSAdapter;
  }) {
    this.cluster_length = 100;
    this.adapter = adapter;
    this.root_dir_name = `./${team_id}`;
    this.dir_name = `${this.root_dir_name}/${channel_id}/`;
    this.buffer = [];
  }

  async init(): Promise<[StatusCodes, DataLakeMetaData]> {
    const [status, detail] = await this.adapter.touch(this.root_dir_name);

    if (status === StatusCodes.ERROR) {
      console.log("TEST", detail);
    }

    /**
    await this.adapter.touch(this.dir_name);
    const latest_timestamp = await this.getLatestTimestamp();
    const latest_file = `${this.dir_name}/${latest_timestamp}.json`;
    const [status, records] = await this.adapter.readJSON(latest_file);
    if (
      status === StatusCodes.SUCCESS &&
      records.length < this.cluster_length
    ) {
      console.log("deleted last incomplete cluster", records.length);
      const [status] = await this.adapter.deleteFile(latest_file);
    }
    */

    const metadata = await this.getMetaData();
    return [StatusCodes.SUCCESS, metadata];
  }

  async getMetaData() {
    const ts = await this.getLatestTimestamp();
    return { latest_update: `${ts}` };
  }

  async getLatestTimestamp() {
    /**
    const [_, ts] = await this.adapter.timestamps(this.dir_name);
    return ts ? ts[0] : ts;
    */
    return Date.now();
  }
}

export default DataLake;
