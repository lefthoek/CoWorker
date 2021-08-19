import data_lake from "./stores/data_lake";
import { mine, mineChannel } from "./mine";
import generateStats from "./stats";
import { parse, processAll } from "./services/web_parser";
import { addTextData, augmentMessages } from "./augment";

const main = async () => {
  const channel_ids = await mine();

  /**
  const channel_ids = ["C01JRFG3CUR"];
  */

  for (const channel_id of channel_ids) {
    const result = await mineChannel({ channel_id });
    console.log(result);
  }

  /**
  const augmentedMessageIterator = await augmentMessages(newMessageIterator);
  const augmentedMessages = augmentMessages(messages);
  const stats = generateStats(augmentedMessages);
  const links = links_store.getSample() as { url: string; timestamp: string }[];
  await processAll(links);
  **/
};

main();
