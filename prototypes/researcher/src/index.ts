import data_lake from "./stores/data_lake";
import app_state from "./stores/app_state";
import { getAllChannelMessages } from "./adapters/slack";
import generateStats from "./stats";
import { v5 as uuid } from "uuid";
import fs from "fs";
import { parse, processAll } from "./services/web_parser";
import { addTextData, augmentMessages } from "./augment";

/**
const init = async (channelId: string) => {
  app_state.hydrate();
  const state = app_state.get();
  const oldest = state.latest_message;
  const results = oldest
    ? await getNewChannelMessages({ channelId, oldest })
    : await getAllChannelMessages({ channelId });
  if (results) {
    app_state.set({ ...state, latest_message: results.latest_message });
  }
  console.log(data_lake.getAll().length);
};
**/

const main = async () => {
  const channelId = "C01JRFG3CUR";
  data_lake.hydrate();
  const timestamp = data_lake.getLatestTimestamp();
  console.log(timestamp);
  const messageIterator = await getAllChannelMessages({
    channelId,
    oldest: timestamp || undefined,
  });

  const newMessageIterator = timestamp
    ? await data_lake.prepend(messageIterator)
    : await data_lake.add(messageIterator);
  for await (const message of newMessageIterator) {
    console.log(message);
  }
  /**
  const newMessageIterator = timestamp
    ? await data_lake.prepend(messageIterator)
    : await data_lake.add(messageIterator);
  const augmentedMessageIterator = await augmentMessages(newMessageIterator);
  init(channelId);
  const messages = data_lake.getAll();
  const augmentedMessages = augmentMessages(messages);
  const stats = generateStats(augmentedMessages);
  const links = links_store.getSample() as { url: string; timestamp: string }[];
  await processAll(links);
  **/
};

main();
