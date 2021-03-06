import { App } from "@slack/bolt";
import { State } from "../types";

const app = new App({
  token: process.env.SLACK_ACCESS_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

export async function showChannels() {
  try {
    return await app.client.conversations.list();
  } catch (error) {
    console.error(error);
  }
}

export const joinChannel: (args: { channel_id: string }) => any = async ({
  channel_id,
}) => {
  try {
    const res = await app.client.conversations.join({ channel: channel_id });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const joinChannels: (args: { channel_ids: string[] }) => any = async ({
  channel_ids,
}) => {
  for (const channel_id of channel_ids) {
    const res = await joinChannel({ channel_id });
    console.log(res);
  }
};

const getChannelMessages: (args: {
  channelId: string;
  cursor?: string;
  limit?: number;
  oldest?: string;
}) => any = async ({ channelId, cursor, limit = 100, oldest }) => {
  try {
    return await app.client.conversations.history({
      channel: channelId,
      oldest,
      limit,
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
  first_page?: boolean;
  oldest?: string;
}) => AsyncGenerator<Record<string, any>> = async function* ({
  cursor,
  channelId,
  first_page = true,
  oldest,
}) {
  const { messages, has_more, response_metadata, ...rest } =
    await getChannelMessages({
      channelId,
      limit: first_page && oldest ? 101 : 100,
      oldest,
      cursor,
    });

  if (!oldest) {
    yield* messages;
  } else {
    let results = first_page ? messages.slice(0, -1) : messages;
    yield* [...results, { type: "CLUSTER BREAK" }];
  }

  if (has_more) {
    yield* await getAllChannelMessages({
      channelId,
      oldest,
      first_page: false,
      cursor: response_metadata.next_cursor,
    });
  } else {
    console.log("DONE");
    return;
  }
};
