import TeamRepo from "./teamRepo";
import S3Adapter from "./s3Adapter";
import {
  TeamAddedEvent,
  LefthoekEventType,
  StatusCodes,
  FSAdapter,
} from "./types";
import eventBus from "./eventBus";

const initTeam = async (event: TeamAddedEvent) => {
  const { DATALAKE_BUCKET: bucket_name } = process.env;
  const { team, access_token } = event.detail;
  const adapter = new S3Adapter({ bucket_name });
  const teamRepo = new TeamRepo({ team_id: team.id, adapter });
  const detail = await teamRepo.init(event.detail);

  return await eventBus.put({
    detailType: LefthoekEventType.TEAM_REPO_INITIATED,
    detail,
  });
};

export default initTeam;
