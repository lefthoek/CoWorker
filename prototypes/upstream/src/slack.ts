import { App } from "@slack/bolt";

class Slack {
  app: any;

  constructor({
    token,
    signingSecret,
  }: {
    token: string;
    signingSecret: string;
  }) {
    this.app = new App({ token, signingSecret });
  }

  async getChannelsMetaData() {
    const data = await this.app.client.conversations.list();
    return data.channels as { id: string; is_archived: boolean }[];
  }
}

export default Slack;
