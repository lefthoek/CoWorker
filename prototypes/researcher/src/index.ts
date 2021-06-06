require("dotenv").config();
import db from "./stores/messageArchive";
import { getAllChannelMessages } from "./adapters/slack";
import generateStats from "./stats";

type Records = Record<string, any>[];

const init = async (channelId: string) => {
  db.hydrate();
  const oldest = db.getLatestTimestamp();
  if (oldest) {
    await getAllChannelMessages({ channelId, oldest });
  } else {
    await getAllChannelMessages({ channelId });
  }
  db.dump();
};

const addTextData = (record: Record<string, any>) => {
  const text = record.text;
  const absoluteTextLength = text.length;
  // TODO: use proper bucketing algoritm
  const relativeTextLength = Math.floor(absoluteTextLength / 200);
  const results = [...text.matchAll(/(https?|chrome):\/\/[^\s$.?#].[^\>]*/g)];
  const linkCount = results.length;
  const links = linkCount ? results.map((r) => r[0]) : [];

  return {
    ...record,
    linkCount,
    links,
    text,
    absoluteTextLength,
    relativeTextLength,
  };
};

const augmentMessages = (records: Records) => {
  return records.map((r) => addTextData(r));
};

const getAllLinks = (records: Records) => records.flatMap((r) => r.links);

const main = async () => {
  const channelId = "C01JRFG3CUR";
  init(channelId);
  const messages = db.getAll();
  const augmentedMessages = augmentMessages(messages);
  const stats = generateStats(augmentedMessages);
  console.log(getAllLinks(augmentedMessages));
};

main();
