import {
  StatusCodes,
  SlackChannelData,
  FSAdapter,
  SlackOAuthData,
  TeamRepoMetaData,
} from "./types";

import ChannelRepo from "./channelRepo";

class TeamRepo {
  team_id: string;
  adapter: FSAdapter;
  team_meta_path: string;

  constructor({ adapter, team_id }: { team_id: string; adapter: FSAdapter }) {
    this.adapter = adapter;
    this.team_id = team_id;
    this.team_meta_path = `${this.team_id}/meta.json`;
  }

  async init(data?: SlackOAuthData) {
    try {
      return data ? await this.writeMetaData(data) : await this.getMetaData();
    } catch (e) {
      console.log(e);
      throw new Error("could not initialize team repo");
    }
  }

  async initChannelRepo({ channel_id }: { channel_id: string }) {
    const channelRepo = new ChannelRepo({
      team_id: this.team_id,
      channel_id,
      adapter: this.adapter,
    });

    return await channelRepo.init();
  }

  async updateChannelRepo({ channel_id }: { channel_id: string }) {
    const channelRepo = new ChannelRepo({
      team_id: this.team_id,
      channel_id,
      adapter: this.adapter,
    });

    return await channelRepo.init();
  }

  async initChannelRepos({ channels }: { channels: SlackChannelData[] }) {
    const initializedChannels = [];
    for (const channel of channels) {
      const initializedChannel = await this.initChannelRepo({
        channel_id: channel.id,
      });
      initializedChannels.push(initializedChannel);
    }

    return initializedChannels;
  }

  async writeMetaData(data: SlackOAuthData) {
    await this.adapter.touch({ path: `${this.team_id}/` });
    await this.adapter.writeJSON({
      path: this.team_meta_path,
      data,
    });

    return {
      team_id: this.team_id,
      access_token: data.access_token,
    };
  }

  async getMetaData() {
    const { team_id } = this;
    const { access_token } = (await this.adapter.readJSON({
      path: this.team_meta_path,
    })) as SlackOAuthData;

    return { team_id, access_token };
  }
}

export default TeamRepo;
