import { App } from "@slack/bolt";
import { State } from "../types";
import data_lake from "../stores/data_lake";

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
  oldest?: string;
  cursor?: string;
  meta?: State;
}) => Promise<false | State> = async ({ cursor, meta, oldest, channelId }) => {
  const result = await getChannelMessages({
    channelId,
    cursor,
    oldest,
  });
  const { messages, has_more, response_metadata, ...rest } = result;
  const { next_cursor } = response_metadata;

  if (messages[0].ts === oldest) {
    return false;
  }
  if (messages.length <= 0) {
    return false;
  }

  if (oldest) {
    data_lake.add(messages.slice(0, -1));
  } else {
    data_lake.prepend(messages);
  }

  const latest_message = meta ? meta.latest_message : messages[0].ts;
  const oldest_message = messages[messages.length - 1].ts;

  if (has_more) {
    return await getAllChannelMessages({
      channelId,
      cursor: next_cursor,
      meta: { oldest_message, latest_message },
    });
  }

  return { latest_message, oldest_message };
};
