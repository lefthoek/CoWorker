import { App } from "@slack/bolt";
import { SlackChannelData } from "./types";

class Slack {
  app: InstanceType<typeof App>;

  constructor({
    access_token,
    signing_secret,
  }: {
    access_token: string;
    signing_secret?: string;
  }) {
    if (!signing_secret) {
      throw new Error(
        "The slack signing secret must be set in your environment"
      );
    }
    this.app = new App({ token: access_token, signingSecret: signing_secret });
  }

  async getChannelsMetaData() {
    const data = await this.app.client.conversations.list();
    if (!data || !data.channels) {
      throw new Error("no channels");
    }
    const channels = data.channels.filter(({ id, is_archived }) => {
      return !is_archived && id;
    });

    return channels as SlackChannelData[];
  }
}

export default Slack;
