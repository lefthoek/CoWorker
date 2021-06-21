import { Records } from "./Types";

const getAllLinks = (records: Records) =>
  records.flatMap(({ links, ts }) => {
    return links.map((url: string) => {
      return { timestamp: ts, url };
    });
  });

export { getAllLinks };
