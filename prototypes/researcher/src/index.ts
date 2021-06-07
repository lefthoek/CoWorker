import data_lake from "./stores/data_lake";
import app_state from "./stores/app_state";
import { getAllChannelMessages } from "./adapters/slack";
import generateStats from "./stats";
import { v5 as uuid } from "uuid";
import fs from "fs";
import { parse, processAll } from "./services/web_parser";

type Records = Record<string, any>[];

const init = async (channelId: string) => {
  data_lake.hydrate();
  app_state.hydrate();
  const { latest_message } = app_state.get();
  const oldest = latest_message;
  console.log(oldest);
  const results = await getAllChannelMessages({ channelId, oldest });
  if (results) {
    app_state.set(results);
  }
  console.log(data_lake.getAll().length);
};

const addTextData = (record: Record<string, any>) => {
  const text = record.text;
  const absoluteTextLength = text.length;
  // TODO: use proper bucketing algoritm
  const relativeTextLength = Math.floor(absoluteTextLength / 200);
  const results = [...text.matchAll(/(https?|chrome):\/\/[^\s$.?#].[^\>]*/g)];
  const links = results.map((r) => r[0]);

  return {
    ...record,
    linkCount: results.length,
    links,
    text,
    absoluteTextLength,
    relativeTextLength,
  };
};

const augmentMessages = (records: Records) => {
  return records.map((r) => addTextData(r));
};

const getAllLinks = (records: Records) =>
  records.flatMap(({ links, ts }) => {
    return links.map((url: string) => {
      return { timestamp: ts, url };
    });
  });

const main = async () => {
  const channelId = "C01JRFG3CUR";
  init(channelId);
  /**
  const messages = data_lake.getAll();
  const augmentedMessages = augmentMessages(messages);
  const stats = generateStats(augmentedMessages);
  const links = links_store.getSample() as { url: string; timestamp: string }[];
  await processAll(links);
  **/
};

main();
