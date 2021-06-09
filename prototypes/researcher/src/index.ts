import data_lake from "./stores/data_lake";
import app_state from "./stores/app_state";
import { getAllChannelMessages } from "./adapters/slack";
import generateStats from "./stats";
import { v5 as uuid } from "uuid";
import fs from "fs";
import { parse, processAll } from "./services/web_parser";

/**
const init = async (channelId: string) => {
  data_lake.hydrate();
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
  const messageIterator = await getAllChannelMessages({ channelId });
  for await (const message of messageIterator) {
    data_lake.add(message);
  }
  data_lake.dump();
  /**
  init(channelId);
  const messages = data_lake.getAll();
  const augmentedMessages = augmentMessages(messages);
  const stats = generateStats(augmentedMessages);
  const links = links_store.getSample() as { url: string; timestamp: string }[];
  await processAll(links);
  **/
};

main();
