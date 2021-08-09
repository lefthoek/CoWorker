import { getAllChannelMessages } from "./adapters/slack";
import Datalake from "./stores/data_lake";
import { StatusCodes } from "./types";

const mine = async ({ channel_id }: { channel_id: string }) => {
  const data_lake = new Datalake({ channel_id });
  const timestamp = data_lake.getLatestTimestamp();
  const messageIterator = await getAllChannelMessages({
    channelId: channel_id,
    oldest: timestamp,
  });
  return await data_lake.store(messageIterator);
};

export default mine;
