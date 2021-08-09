export type State = {
  channel_id?: string;
};

export enum StatusCodes {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export type Records = Record<string, any>[];
