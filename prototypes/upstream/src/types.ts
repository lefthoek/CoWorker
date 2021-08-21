export type SlackOAuthQueryString = {
  queryStringParameters: {
    code: string;
  };
};

export type SlackOAuthData = {
  access_token: string;
  team: {
    id: string;
  };
};

export interface Event {
  detailType: string;
  detail: any;
}

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}
export enum LefthoekEventType {
  SLACK_TEAM_ADDED = "SLACK_TEAM_ADDED",
  SLACK_TEAM_RAW_DATA_UPDATED = "SLACK_TEAM_RAW_DATA_UPDATED",
}

export type DataLakeMetaData = { latest_update: string };
export type LefthoekEventPayload = SlackOAuthData | DataLakeMetaData;

export interface LHEvent extends Event {
  detailType: LefthoekEventType;
  detail: LefthoekEventPayload;
}

export interface SlackTeamAddedEvent extends LHEvent {
  detailType: LefthoekEventType.SLACK_TEAM_ADDED;
  detail: SlackOAuthData;
}

export interface SlackTeamUpdatedEvent extends LHEvent {
  detailType: LefthoekEventType.SLACK_TEAM_RAW_DATA_UPDATED;
  detail: DataLakeMetaData;
}

export type LefthoekEvent = SlackTeamAddedEvent | SlackTeamUpdatedEvent;

export enum StatusCodes {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export interface FSAdapter {
  touch: (path: string) => Promise<[StatusCodes, string]>;
}

export type LefthoekEventBus = EventBus<LefthoekEvent>;
