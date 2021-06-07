// @ts-ignore
import Mercury from "@postlight/mercury-parser";
import { v5 as uuid } from "uuid";
import fs from "fs";

const parse = async (url: string): Promise<{ url?: string }> => {
  try {
    return await Mercury.parse(url);
  } catch (error) {
    return {};
  }
};

const processAll = async (
  links: { url: string; timestamp: string }[]
): Promise<void> => {
  for (const { url } of links) {
    const result = await parse(url);
    if (result.url) {
      const hash = uuid(result.url, "0c39449c-c702-11eb-b8bc-0242ac130003");
      fs.writeFileSync(
        `./artifacts/${hash}.json`,
        JSON.stringify(result, null, 2)
      );
      console.log("FOUND", url);
    } else {
      console.log("NOT FOUND", url);
    }
  }
};

export { parse, processAll };
