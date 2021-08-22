import Miner from "./miner";
import TeamRepo from "./teamRepo";
import S3Adapter from "./s3Adapter";
import {
  TeamRepoInitiatedEvent,
  StatusCodes,
  LefthoekEventType,
} from "./types";
import eventBus from "./eventBus";

const mineChannel = async (event: TeamRepoInitiatedEvent) => {
  const { DATALAKE_BUCKET } = process.env;

  if (!DATALAKE_BUCKET) {
    throw new Error("The datalake bucket name must be set in your environment");
  }

  const { team_id, access_token } = event.detail;
  const adapter = new S3Adapter({ bucket_name: DATALAKE_BUCKET });
  const teamRepo = new TeamRepo({ team_id, adapter, access_token });
  /**
  const [status, detail] = await teamRepo.init({ metaData: event.detail });

  if (status === StatusCodes.ERROR) {
    console.log(detail);
  }
  */

  const miner = new Miner();
  miner.mine(JSON.stringify(event, null, 2));

  const reply = await eventBus.put({
    detailType: LefthoekEventType.TEAM_RAW_DATA_UPDATED,
    detail: event.detail,
  });

  return reply;
};

export default mineChannel;
