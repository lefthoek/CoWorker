import { App } from "@slack/bolt";
import { State } from "../types";

const app = new App({
  token: process.env.SLACK_ACCESS_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});
async function showChannels() {
  try {
    return await app.client.conversations.list();
  } catch (error) {
    console.error(error);
  }
}

const getChannelMessages: (args: {
  channelId: string;
  cursor?: string;
  oldest?: string;
}) => any = async ({ channelId, cursor, oldest }) => {
  try {
    return await app.client.conversations.history({
      channel: channelId,
      oldest,
      inclusive: false,
      cursor,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllChannelMessages: (args: {
  channelId: string;
  cursor?: string;
  meta?: State;
}) => AsyncGenerator<any> = async function* ({ cursor, meta, channelId }) {
  const { messages, has_more, response_metadata, ...results } =
    await getChannelMessages({
      channelId,
      cursor,
    });
  yield* messages;
  if (has_more) {
    yield* getAllChannelMessages({
      channelId,
      cursor: response_metadata.next_cursor,
    });
  }
  return "HELLO";
};
