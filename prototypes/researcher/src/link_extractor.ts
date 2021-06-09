import { Records } from "./Types";
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

export { augmentMessages, addTextData, getAllLinks };
