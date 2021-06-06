import { data_lake, links_store } from "./store";
import { getAllChannelMessages } from "./adapters/slack";
import generateStats from "./stats";
// @ts-ignore
import Mercury from "@postlight/mercury-parser";
import { v5 as uuid } from "uuid";
import fs from "fs";

type Records = Record<string, any>[];

const init = async (channelId: string) => {
  data_lake.hydrate();
  links_store.hydrate();
  const oldest = data_lake.getLatestTimestamp();
  if (oldest) {
    await getAllChannelMessages({ channelId, oldest });
  } else {
    await getAllChannelMessages({ channelId });
  }
  data_lake.dump();
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
  const messages = data_lake.getAll();
  const augmentedMessages = augmentMessages(messages);
  const stats = generateStats(augmentedMessages);
  const links = links_store.getAll();
  for (const { url } of links) {
    try {
      const result = await Mercury.parse(url);
      if (result.url) {
        const hash = uuid(result.url, "0c39449c-c702-11eb-b8bc-0242ac130003");
        fs.writeFileSync(`./artifacts/${hash}.json`, JSON.stringify(result));
        console.log("FOUND", url);
      } else {
        console.log("NOT FOUND", url);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

main();
