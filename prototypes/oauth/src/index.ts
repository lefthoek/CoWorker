import fetch from "node-fetch";

module.exports.slack = async (event: any) => {
  const clientId = process.env.SLACK_CLIENT_ID;
  console.log(clientId);
  const clientSecret = process.env.SLACK_CLIENT_SECRET;
  const { code } = event.queryStringParameters;

  const oauthURL =
    "https://slack.com/api/oauth.v2.access?" +
    "client_id=" +
    clientId +
    "&" +
    "client_secret=" +
    clientSecret +
    "&" +
    "code=" +
    code;

  const response = await fetch(oauthURL);
  const data = await response.json();

  console.log(data);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: data,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
