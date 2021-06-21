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

const augmentMessages: (
  arg: AsyncGenerator<Record<string, any>>
) => AsyncGenerator<Record<string, any>> = async function* (messageIterator) {
  for await (const message of messageIterator) {
    yield addTextData(message);
  }
};

export { augmentMessages, addTextData };
