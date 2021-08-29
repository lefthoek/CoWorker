import {
  SlackOAuthQueryString,
  SlackOAuthData,
  LefthoekEventType,
} from "./types";
import eventBus from "./eventBus";
import fetch from "node-fetch";

export const slack = async (event: SlackOAuthQueryString) => {
  const { SLACK_CLIENT_SECRET, SLACK_CLIENT_ID } = process.env;

  const baseURL = "https://slack.com/api/oauth.v2.access";
  const { code } = event.queryStringParameters;
  const oauthURL = `${baseURL}?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}`;
  const response = await fetch(oauthURL);
  const detail: SlackOAuthData = await response.json();

  const reply = await eventBus.put({
    detailType: LefthoekEventType.TEAM_ADDED,
    detail,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(reply, null, 2),
  };
};

export default slack;
