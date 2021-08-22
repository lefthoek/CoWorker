import TeamRepo from "./teamRepo";
import Slack from "./slack";
import S3Adapter from "./s3Adapter";
import {
  TeamRepoInitiatedEvent,
  LefthoekEventType,
  StatusCodes,
  FSAdapter,
} from "./types";
import eventBus from "./eventBus";

const initChannels = async (event: TeamRepoInitiatedEvent) => {
  const { DATALAKE_BUCKET, SLACK_SIGNING_SECRET } = process.env;

  if (!SLACK_SIGNING_SECRET) {
    throw new Error("The slack signing secret must be set in your environment");
  }

  if (!DATALAKE_BUCKET) {
    throw new Error("The datalake bucket name must be set in your environment");
  }

  const { team_id, access_token } = event.detail;
  const adapter = new S3Adapter({ bucket_name: DATALAKE_BUCKET });
  const teamRepo = new TeamRepo({ team_id, adapter, access_token });

  const slack = new Slack({
    token: access_token,
    signingSecret: SLACK_SIGNING_SECRET,
  });

  const channels_meta_data = await slack.getChannelsMetaData();

  const [status, channel_ids] = await teamRepo.initChannelRepos({
    channels_meta_data,
  });

  for (const channel_id of channel_ids) {
    const r = await eventBus.put({
      detailType: LefthoekEventType.CHANNEL_REPO_INITIATED,
      detail: { team_id, channel_id },
    });
    console.log("X", r);
  }

  const reply = await eventBus.put({
    detailType: LefthoekEventType.CHANNEL_REPOS_INITIATED,
    detail: {},
  });

  return reply;
};

export default initChannels;
