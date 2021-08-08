import { getAllChannelMessages } from "./adapters/slack";
import data_lake from "./stores/data_lake";

const mine = async ({
  channel_id,
  timestamp,
}: {
  channel_id: string;
  timestamp?: string;
}) => {
  const messageIterator = await getAllChannelMessages({
    channelId: channel_id,
    oldest: timestamp || undefined,
  });
  const newMessageIterator = await data_lake.store(messageIterator);
  return data_lake.getLatestTimestamp();
};

export default mine;
