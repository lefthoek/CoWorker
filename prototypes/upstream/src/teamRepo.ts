import {
  StatusCodes,
  SlackChannelData,
  FSAdapter,
  SlackOAuthData,
  TeamRepoMetaData,
} from "./types";

class TeamRepo {
  team_id: string;
  adapter: FSAdapter;
  access_token: string;

  constructor({
    adapter,
    access_token,
    team_id,
  }: {
    team_id: string;
    access_token: string;
    adapter: FSAdapter;
  }) {
    this.adapter = adapter;
    this.team_id = team_id;
    this.access_token = access_token;
  }

  async init({ metaData }: { metaData: SlackOAuthData }) {
    try {
      await this.adapter.touch({ path: `${this.team_id}/` });
      await this.adapter.writeJSON({
        path: `${this.team_id}/meta.json`,
        data: metaData,
      });
      return await this.getMetaData();
    } catch (e) {
      throw new Error("could not initialize team repo");
    }
  }

  async initChannelRepos({ channels }: { channels: SlackChannelData[] }) {
    try {
      for (const channel of channels) {
        await this.adapter.writeJSON({
          path: `${this.team_id}/${channel.id}/meta.json`,
          data: channel,
        });
      }
      return channels;
    } catch (e) {
      throw new Error("could not initialize channel repos");
    }
  }

  async getMetaData() {
    return {
      team_id: this.team_id,
      access_token: this.access_token,
      latest_update: `${Date.now()}`,
    };
  }
}

export default TeamRepo;
