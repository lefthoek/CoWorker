import { App } from "@slack/bolt";
import db from "../stores/messageArchive";

const app = new App({
  token: process.env.SLACK_ACCESS_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});
async function showChannels() {
  try {
    const result = await app.client.conversations.list();
    console.log(result);
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
    const result = await app.client.conversations.history({
      channel: channelId,
      oldest,
      inclusive: false,
      cursor,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getAllChannelMessages: (args: {
  channelId: string;
  oldest?: string;
  cursor?: string;
}) => void = async ({ cursor, oldest, channelId }) => {
  const result = await getChannelMessages({ channelId, cursor, oldest });
  const { messages, has_more, response_metadata, ...rest } = result;
  const { next_cursor } = response_metadata;

  console.log(response_metadata);

  if (messages[0].ts === oldest) {
    return;
  }
  if (messages.length > 0) {
    oldest ? db.add(messages) : db.prepend(messages);
  }
  if (has_more) {
    return await getAllChannelMessages({
      channelId,
      cursor: next_cursor,
    });
  }
};
