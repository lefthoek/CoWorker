import Miner from "./miner";
import DataLake from "./dataLake";
import S3Adapter from "./s3Adapter";
import {
  SlackTeamAddedEvent,
  LefthoekEventType,
  StatusCodes,
  FSAdapter,
} from "./types";
import eventBus from "./eventBus";

export const mine = async (event: SlackTeamAddedEvent) => {
  const { DATALAKE_BUCKET } = process.env;

  if (!DATALAKE_BUCKET) {
    throw new Error("The datalake bucket name must be set in your environment");
  }

  const { team } = event.detail;
  const adapter = new S3Adapter({ bucket_name: DATALAKE_BUCKET });
  const dataLake = new DataLake({ team_id: team.id, adapter });
  const [status, detail] = await dataLake.init({ metaData: event.detail });

  if (status === StatusCodes.ERROR) {
    console.log(detail);
  }

  const miner = new Miner();
  miner.mine(JSON.stringify(event, null, 2));

  const reply = await eventBus.put({
    detailType: LefthoekEventType.SLACK_TEAM_RAW_DATA_UPDATED,
    detail,
  });

  return reply;
};
