import Slack from "./slack";
import ChannelRepo from "./channelRepo";
import AuthLookup from "./authLookup";
import S3Adapter from "./s3Adapter";
import {
  ChannelRepoInitiatedEvent,
  StatusCodes,
  LefthoekEventType,
} from "./types";
import eventBus from "./eventBus";

const mineChannel = async (event: ChannelRepoInitiatedEvent) => {
  const {
    DATALAKE_BUCKET: bucket_name,
    SLACK_SIGNING_SECRET: signing_secret,
    AUTH_LOOKUP_TABLE: table_name,
  } = process.env;
  const { team_id, platform_type, channel_id } = event.detail;
  const authLookup = new AuthLookup({ table_name });
  const { access_token } = await authLookup.get({ team_id, platform_type });
  const slack = new Slack({ access_token, signing_secret });
  const adapter = new S3Adapter({ bucket_name });
  const channelRepo = new ChannelRepo({
    platform_type,
    team_id,
    channel_id,
    adapter,
  });
  const { latest_chunk } = await channelRepo.init();
  const messageIterator = await slack.update({ channel_id, latest_chunk });
  const detail = await channelRepo.update({ messageIterator });
  const reply = await eventBus.put({
    detailType: LefthoekEventType.CHANNEL_RAW_DATA_UPDATED,
    detail,
  });

  return reply;
};

export default mineChannel;
