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
  const { DATALAKE_BUCKET } = process.env;

  if (!DATALAKE_BUCKET) {
    throw new Error("The datalake bucket name must be set in your environment");
  }

  const { team, access_token } = event.detail;
  const adapter = new S3Adapter({ bucket_name: DATALAKE_BUCKET });
  const teamRepo = new TeamRepo({ team_id: team.id, adapter, access_token });
  const [status, detail] = await teamRepo.init({ metaData: event.detail });

  if (status === StatusCodes.ERROR) {
    console.log(detail);
  }

  const reply = await eventBus.put({
    detailType: LefthoekEventType.TEAM_REPO_INITIATED,
    detail,
  });

  return reply;
};

export default initTeam;
