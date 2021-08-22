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
  const {
    DATALAKE_BUCKET: bucket_name,
    AUTH_TABLE: db_name,
    SLACK_SIGNING_SECRET: signing_secret,
  } = process.env;
  const { team_id, access_token } = event.detail;
  const adapter = new S3Adapter({ bucket_name });
  const teamRepo = new TeamRepo({ team_id, adapter, access_token });
  const slack = new Slack({ access_token, signing_secret });

  const channels = await slack.getChannelsMetaData();

  const saved_channels = await teamRepo.initChannelRepos({
    channels,
  });

  for (const { id: channel_id } of saved_channels) {
    await eventBus.put({
      detailType: LefthoekEventType.CHANNEL_REPO_INITIATED,
      detail: { team_id, channel_id },
    });
  }

  return await eventBus.put({
    detailType: LefthoekEventType.CHANNEL_REPOS_INITIATED,
    detail: {},
  });
};

export default initChannels;
