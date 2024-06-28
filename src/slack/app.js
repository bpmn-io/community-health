import slack from '@slack/bolt';

import { getReport } from '../core/app.js';

const { App } = slack;

run();

async function run() {
  const app = new App({
    logLevel: process.env.LOG_LEVEL || 'info',
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
  });

  app.command('/community-health', async ({ ack, body, client }) => {
    await ack();

    try {
      await client.chat.postEphemeral({
        channel: body.channel_id,
        user: body.user_id,
        text: 'Generating community health report...'
      });

      const report = await getReport({ format: 'slack' });
      const blocks = JSON.parse(report).blocks;

      await client.chat.postEphemeral({
        channel: body.channel_id,
        user: body.user_id,
        text: 'Community health report',
        blocks
      });
    } catch (error) {
      await client.chat.postEphemeral({
        channel: body.channel_id,
        user: body.user_id,
        text: `Failed to generate community health report: ${error.message}`
      });
    }
  });

  await app.start(process.env.PORT || 3000);
}
