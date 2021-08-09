import { getAllChannelMessages } from "./adapters/slack";
import data_lake from "./stores/data_lake";
import { StatusCodes } from "./types";

const mine = async ({ channel_id }: { channel_id: string }) => {
  const timestamp = data_lake.getLatestTimestamp();
  const messageIterator = await getAllChannelMessages({
    channelId: channel_id,
    oldest: timestamp,
  });
  return await data_lake.store(messageIterator);
};

export default mine;
