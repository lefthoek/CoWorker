import AppState from "./stores/app_state";
import mine from "./mine";
import generateStats from "./stats";
import { parse, processAll } from "./services/web_parser";
import { addTextData, augmentMessages } from "./augment";

const main = async () => {
  const channel_id = "C01JRFG3CUR";
  const app_state = new AppState(channel_id);
  const { latest_message } = app_state.get();
  const new_timestamp = await mine({ channel_id, timestamp: latest_message });
  app_state.set("latest_message", new_timestamp || latest_message);
  console.log(app_state.get());

  /**
  const augmentedMessageIterator = await augmentMessages(newMessageIterator);
  const augmentedMessages = augmentMessages(messages);
  const stats = generateStats(augmentedMessages);
  const links = links_store.getSample() as { url: string; timestamp: string }[];
  await processAll(links);
  **/
};

main();
