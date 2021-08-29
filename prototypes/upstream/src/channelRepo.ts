import { SlackChannelData, PlatformType, FSAdapter } from "./types";

class ChannelRepo {
  buffer: Record<string, any>[];
  team_id: string;
  channel_id: string;
  platform_type: PlatformType;
  adapter: FSAdapter;
  path: string;
  cluster_length: number;

  constructor({
    adapter,
    team_id,
    platform_type,
    channel_id,
    cluster_length = 100,
  }: {
    adapter: FSAdapter;
    team_id: string;
    platform_type: PlatformType;
    cluster_length?: number;
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

  async init(data: SlackChannelData) {
    try {
      return await this.writeMetaData(data);
    } catch (e) {
      throw new Error(`could not initialize channel repo ${this.channel_id}`);
    }
  }

  async writeMetaData(data: SlackChannelData) {
    await this.adapter.writeJSON({ path: `${this.path}/meta.json`, data });
    return await this.getMetaData();
  }

  async dump() {
    if (!this.buffer || this.buffer.length < 1) {
      console.log("no more messages to save");
      return;
    }
    const latest_chunk = this.buffer[0] && this.buffer[0].ts;
    const path = `${this.path}/${latest_chunk}.json`;
    await this.adapter.writeJSON({ path, data: this.buffer });
    const number_of_records = this.buffer.length;
    this.buffer = [];
    return { latest_chunk, number_of_records };
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
    await this.dump();
    return await this.getMetaData();
  }

  async getMetaData() {
    const latest_chunk = undefined;
    const { platform_type, team_id, channel_id } = this;
    return { platform_type, team_id, channel_id, latest_chunk };
  }
}

export default ChannelRepo;
