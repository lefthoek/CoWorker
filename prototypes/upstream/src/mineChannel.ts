import TeamRepo from "./teamRepo";
import Slack from "./slack";
import S3Adapter from "./s3Adapter";
import {
  ChannelRepoInitiatedEvent,
  StatusCodes,
  LefthoekEventType,
} from "./types";
import eventBus from "./eventBus";

const mineChannel = async (event: ChannelRepoInitiatedEvent) => {
  const { DATALAKE_BUCKET, SLACK_SIGNING_SECRET } = process.env;
  const { team_id, channel_id } = event.detail;
  const adapter = new S3Adapter({ bucket_name: DATALAKE_BUCKET });
  const teamRepo = new TeamRepo({ team_id, adapter });
  const { access_token } = await teamRepo.init();

  const { latest_chunk } = await teamRepo.initChannelRepo({
    channel_id,
  });

  const slack = new Slack({
    access_token,
    signing_secret: SLACK_SIGNING_SECRET,
  });

  const messageIterator = slack.getAllChannelMessages({
    channel_id,
    latest_chunk,
  });

  let x = 0;
  for await (const message of messageIterator) {
    x = x + 1;
  }
  console.log("NUMBER OF RECORDS", x);

  const detail = await teamRepo.updateChannelRepo({
    channel_id,
  });

  const reply = await eventBus.put({
    detailType: LefthoekEventType.CHANNEL_RAW_DATA_UPDATED,
    detail,
  });

  return reply;
};

export default mineChannel;
