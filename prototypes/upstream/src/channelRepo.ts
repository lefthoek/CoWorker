import { SlackChannelData, PlatformType, FSAdapter } from "./types";

class ChannelRepo {
  buffer: Record<string, any>[];
  team_id: string;
  channel_id: string;
  platform_type: PlatformType;
  adapter: FSAdapter;
  path: string;
  cluster_length: number;
  latest_chunk?: string;

  constructor({
    adapter,
    team_id,
    platform_type,
    channel_id,
    latest_chunk,
    cluster_length = 100,
  }: {
    adapter: FSAdapter;
    team_id: string;
    platform_type: PlatformType;
    cluster_length?: number;
    latest_chunk?: string;
    channel_id: string;
  }) {
    this.adapter = adapter;
    this.cluster_length = cluster_length;
    this.channel_id = channel_id;
    this.platform_type = platform_type;
    this.team_id = team_id;
    this.path = `${this.team_id}/${this.channel_id}`;
    this.buffer = [];
  }

  async init(data?: SlackChannelData) {
    try {
      if (data) {
        await this.adapter.writeJSON({
          path: `${this.path}/provider.json`,
          data,
        });
      }
      return await this.dehydrateState();
    } catch (e) {
      throw new Error(`could not initialize channel repo ${this.channel_id}`);
    }
  }

  async dehydrateState() {
    try {
      const state = await this.adapter.readJSON({
        path: `${this.path}/meta.json`,
      });
      this.latest_chunk = state.latest_chunk;
      return await this.getMetaData();
    } catch (e) {
      console.log(e);
      return await this.writeMetaData();
    }
  }

  async writeMetaData() {
    const { platform_type, team_id, channel_id, latest_chunk } = this;
    const data = {
      team_id,
      platform_type,
      channel_id,
      latest_chunk,
    };
    await this.adapter.writeJSON({ path: `${this.path}/meta.json`, data });
    return data;
  }

  async dump() {
    if (!this.buffer || this.buffer.length < 1) {
      console.log("no more messages to save");
      return this.getMetaData();
    }
    const chunk = this.buffer[0] && this.buffer[0].ts;
    const path = `${this.path}/${chunk}.json`;
    await this.adapter.writeJSON({ path, data: this.buffer });
    const number_of_records = this.buffer.length;
    this.buffer = [];
    this.latest_chunk =
      chunk > (this.latest_chunk || 0) ? chunk : this.latest_chunk;
    return await this.writeMetaData();
  }

  async update({
    messageIterator,
  }: {
    messageIterator: AsyncGenerator<Record<string, any>>;
  }) {
    for await (const message of messageIterator) {
      this.buffer.push(message);
      if (
        this.buffer.length === this.cluster_length ||
        message.type === "CLUSTER BREAK"
      ) {
        if (message.type === "CLUSTER BREAK") {
          this.buffer.pop();
        }
        await this.dump();
      }
    }
    return await this.dump();
  }

  async getMetaData() {
    const { platform_type, team_id, channel_id, latest_chunk } = this;
    return { platform_type, team_id, channel_id, latest_chunk };
  }
}

export default ChannelRepo;
