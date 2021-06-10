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
  oldest?: string;
}) => AsyncGenerator<Record<string, any>> = async function* ({
  cursor,
  channelId,
  oldest,
}) {
  const { messages, has_more, response_metadata, ...results } =
    await getChannelMessages({
      channelId,
      oldest,
      cursor,
    });
  yield* oldest ? messages.slice(0, -1) : messages;
  if (has_more) {
    yield* await getAllChannelMessages({
      channelId,
      cursor: response_metadata.next_cursor,
    });
  } else {
    console.log("DONE");
    return;
  }
};
