import { SlackContext } from "bottender";

module.exports = async function App(context: SlackContext) {
  await context.sendText("HELLO ${context.platform}");
};
