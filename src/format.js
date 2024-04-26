export const SUPPORTED_FORMATS = [ 'json', 'slack' ];

export function formatReport(report, format) {
  if (format === 'json') {
    return JSON.stringify(report);
  } else if (format === 'slack') {
    return getSlackMessage(report);
  }
}

function getSlackMessage(report) {
  const message = {
    text: 'Community health report',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Forum'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: getForumMessage(report.forum)
        }
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Taskboard'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: getTaskboardMessage(report.taskboard)
        }
      }
    ]
  };

  return JSON.stringify(message);
}

function getForumMessage(forum) {
  if (forum.topics.length === 0) {
    return 'Forum is clean 🤩';
  }

  return `
Found ${forum.topics.length} unanswered topic(s):
${forum.topics.map(topic => `- <${topic.url}|${topic.title}>`).join('\n')}
  `;
}

function getTaskboardMessage(taskboard) {
  if (!taskboard.inbox.length && !taskboard.needsReview.length) {
    return 'Taskboard is clean 🤩';
  }

  return `${getInboxMessage(taskboard.inbox)}
${getNeedsReviewMessage(taskboard.needsReview)}`;
}

function getInboxMessage(inbox) {
  if (inbox.length === 0) {
    return 'Inbox is clean 🤩';
  }

  return `Found ${inbox.length} issue(s) in the inbox:
${inbox.map(issue => `- <${issue.url}|${issue.title}>`).join('\n')}
`;
}

function getNeedsReviewMessage(needsReview) {
  if (needsReview.length === 0) {
    return 'Needs Review is clean 🤩';
  }

  return `Found ${needsReview.length} issue(s) in Needs Review:
${needsReview.map(issue => `- <${issue.url}|${issue.title}>`).join('\n')}
`;
}
