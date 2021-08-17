import fetch from "node-fetch";
import AWS from "aws-sdk";

module.exports.slack = async (event: any) => {
  const s3 = new AWS.S3();
  const { SLACK_CLIENT_SECRET, SLACK_CLIENT_ID, DATALAKE_BUCKET } = process.env;
  const { code } = event.queryStringParameters;
  if (!DATALAKE_BUCKET) {
    throw "ERROR";
  }
  const Bucket = DATALAKE_BUCKET;

  const oauthURL =
    "https://slack.com/api/oauth.v2.access?" +
    "client_id=" +
    SLACK_CLIENT_ID +
    "&" +
    "client_secret=" +
    SLACK_CLIENT_SECRET +
    "&" +
    "code=" +
    code;

  const response = await fetch(oauthURL);
  const data = await response.json();
  const id = "test";

  const Key = `${id}.json`;
  const reply = await s3
    .putObject({
      Bucket,
      Key,
      Body: JSON.stringify(data, null, 2),
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(reply, null, 2),
  };
};
