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
  const { team_id } = event.detail;
  const adapter = new S3Adapter({ bucket_name: DATALAKE_BUCKET });
  const teamRepo = new TeamRepo({ team_id, adapter });
  const { access_token } = await teamRepo.init();
  const slack = new Slack({
    access_token,
    signing_secret: SLACK_SIGNING_SECRET,
  });

  const raw_channels = await slack.getChannels();
  const joined_channels = await slack.joinChannels({
    channels: raw_channels,
  });

  const saved_channels = await teamRepo.initChannelRepos({
    channels: joined_channels,
  });

  for (const detail of saved_channels) {
    await eventBus.put({
      detailType: LefthoekEventType.CHANNEL_REPO_INITIATED,
      detail,
    });
  }

  return await eventBus.put({
    detailType: LefthoekEventType.CHANNEL_REPOS_INITIATED,
    detail: { team_id, channels: saved_channels },
  });
};

export default initChannels;
