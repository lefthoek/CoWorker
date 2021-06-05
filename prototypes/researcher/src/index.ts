require("dotenv").config();
const { App } = require("@slack/bolt");
let db: any[] = [];

// Initializes your app with your bot token and signing secret
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

let channelId = "C24601";

async function getChannelMessages(channelId: string, cursor?: string) {
  try {
    const result = await app.client.conversations.history({
      channel: channelId,
      cursor,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

const addToDB = (messages: any[]) => {
  db = [...messages, ...db];
};

const getAllChannelMessages: (args: {
  channelId: string;
  cursor?: string;
}) => void = async ({ cursor, channelId }) => {
  const { messages, has_more, response_metadata, ...rest } =
    await getChannelMessages(channelId, cursor);
  const { next_cursor } = response_metadata;
  console.log(has_more, next_cursor);
  if (messages.length > 0) {
    addToDB(messages);
  }
  if (has_more) {
    return await getAllChannelMessages({
      channelId,
      cursor: next_cursor,
    });
  }
  console.log("done", db.slice(0, 5));
};

getAllChannelMessages({ channelId: "C01JRFG3CUR" });
