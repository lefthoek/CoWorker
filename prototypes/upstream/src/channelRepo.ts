import { SlackChannelData, FSAdapter } from "./types";

class ChannelRepo {
  team_id: string;
  channel_id: string;
  adapter: FSAdapter;

  constructor({
    adapter,
    team_id,
    channel_id,
  }: {
    adapter: FSAdapter;
    team_id: string;
    channel_id: string;
  }) {
    this.adapter = adapter;
    this.channel_id = channel_id;
    this.team_id = team_id;
  }

  async init(data?: SlackChannelData) {
    try {
      return data ? await this.writeMetaData(data) : await this.getMetaData();
    } catch (e) {
      throw new Error(`could not initialize channel repo ${this.channel_id}`);
    }
  }

  async writeMetaData(data: SlackChannelData) {
    await this.adapter.writeJSON({
      path: `${this.team_id}/${this.channel_id}/meta.json`,
      data,
    });
    return await this.getMetaData();
  }

  async getMetaData() {
    const latest_chunk = undefined;
    return { team_id: this.team_id, channel_id: this.channel_id, latest_chunk };
  }
}

export default ChannelRepo;
