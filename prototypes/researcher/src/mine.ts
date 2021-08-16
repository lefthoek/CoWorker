import { getAllChannelMessages, showChannels } from "./adapters/slack";
import Datalake from "./stores/data_lake";
import { StatusCodes } from "./types";

export const mine = async () => {
  const res = await showChannels();
  const ids = res!.channels!.map((l) => l.id) as string[];
  return ids;
};

export const mineChannel = async ({ channel_id }: { channel_id: string }) => {
  const data_lake = new Datalake({ channel_id });
  const [status, timestamp] = await data_lake.init();
  console.log(status, timestamp);
  const messageIterator = getAllChannelMessages({
    channelId: channel_id,
    oldest: timestamp,
  });
  return data_lake.store(messageIterator);
};
