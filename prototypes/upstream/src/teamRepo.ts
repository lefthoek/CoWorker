import {
  StatusCodes,
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

  async init({
    metaData,
  }: {
    metaData: SlackOAuthData;
  }): Promise<[StatusCodes, TeamRepoMetaData]> {
    try {
      await this.adapter.touch({ path: `${this.team_id}/` });
      await this.adapter.writeJSON({
        path: `${this.team_id}/meta.json`,
        data: metaData,
      });
      const metadata = await this.getMetaData();
      return [StatusCodes.SUCCESS, metadata];
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      const metadata = await this.getMetaData();
      return [StatusCodes.ERROR, metadata];
    }
  }

  async initChannelRepos({
    channels_meta_data,
  }: {
    channels_meta_data: { id: string; is_archived: boolean }[];
  }) {
    const channel_ids = channels_meta_data
      .map(({ id, is_archived }) => !is_archived && id)
      .filter((x) => x) as string[];
    return [StatusCodes.SUCCESS, channel_ids];
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
