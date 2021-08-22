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

export type SlackChannelData = {
  id: string;
  is_archived: boolean;
};

export interface Event {
  detailType: string;
  detail: any;
}

export interface EventBus<E extends Event> {
  put: (event: E) => Promise<E["detail"]>;
}
export enum LefthoekEventType {
  TEAM_ADDED = "TEAM_ADDED",
  TEAM_RAW_DATA_UPDATED = "TEAM_RAW_DATA_UPDATED",
  TEAM_REPO_INITIATED = "TEAM_REPO_INITIATED",
  CHANNEL_REPO_INITIATED = "CHANNEL_REPO_INITIATED",
  CHANNEL_REPOS_INITIATED = "CHANNEL_REPOS_INITIATED",
}

export type TeamRepoMetaData = {
  latest_update: string;
  team_id: string;
  access_token: string;
};
export type ChannelRepoMetaData = {
  team_id: string;
  channel_id: string;
};

export type LefthoekEventPayload =
  | SlackOAuthData
  | TeamRepoMetaData
  | ChannelRepoMetaData
  | {};

export interface LHEvent extends Event {
  detailType: LefthoekEventType;
  detail: LefthoekEventPayload;
}

export interface TeamAddedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_ADDED;
  detail: SlackOAuthData;
}

export interface TeamRawDataUpdatedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_RAW_DATA_UPDATED;
  detail: TeamRepoMetaData;
}

export interface TeamRepoInitiatedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_REPO_INITIATED;
  detail: TeamRepoMetaData;
}

export interface ChannelReposInitiatedEvent extends LHEvent {
  detailType: LefthoekEventType.CHANNEL_REPOS_INITIATED;
  detail: {};
}

export interface ChannelRepoInitiatedEvent extends LHEvent {
  detailType: LefthoekEventType.CHANNEL_REPO_INITIATED;
  detail: ChannelRepoMetaData;
}

export type LefthoekEvent =
  | TeamAddedEvent
  | TeamRepoInitiatedEvent
  | ChannelRepoInitiatedEvent
  | ChannelReposInitiatedEvent
  | TeamRawDataUpdatedEvent;

export enum StatusCodes {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export interface FSAdapter {
  touch: ({ path }: { path: string }) => Promise<string>;
  writeFile: ({ path, data }: { path: string; data?: any }) => Promise<string>;
  writeJSON: ({ path, data }: { path: string; data: any }) => Promise<string>;
}

export type LefthoekEventBus = EventBus<LefthoekEvent>;
