require("dotenv").config();
import db from "./stores/messageArchive";
import { getAllChannelMessages } from "./adapters/slack";

const main = async () => {
  const channelId = "C01JRFG3CUR";
  db.hydrate();
  const oldest = db.getLatestTimestamp();
  if (oldest) {
    await getAllChannelMessages({ channelId, oldest });
  } else {
    await getAllChannelMessages({ channelId });
  }
  db.dump();
};

main();
