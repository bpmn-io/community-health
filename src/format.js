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
    unfurl_links: false,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Community health report'
        }
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Forum'
        }
      },
      getForumMessage(report.forum),
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Taskboard'
        }
      },
      getTaskboardMessage(report.taskboard)
    ]
  };

  return JSON.stringify(message);
}

function getForumMessage(forum) {
  if (forum.topics.length === 0) {
    return {
      type: 'section',
      text: {
        type: 'plain-text',
        text: 'Forum is clean 🤩'
      }
    };
  }

  return {
    type: 'rich_text',
    elements: [
      {
        type: 'rich_text_section',
        elements: [
          {
            type: 'text',
            text: `Found ${forum.topics.length} unanswered topic(s):\n`
          }
        ]
      },
      {
        type: 'rich_text_list',
        style: 'bullet',
        elements: forum.topics.map(topic => ({
          type: 'rich_text_section',
          elements: [
            {
              type: 'link',
              text: topic.title,
              url: topic.url
            }
          ]
        }))
      }
    ]
  };
}

function getTaskboardMessage(taskboard) {
  if (!taskboard.inbox.length && !taskboard.needsReview.length) {
    return {
      type: 'section',
      text: {
        type: 'plain-text',
        text: 'Taskboard is clean 🤩'
      }
    };
  }

  return {
    type: 'rich_text',
    elements: [
      ...getInboxMessage(taskboard.inbox),
      ...getNeedsReviewMessage(taskboard.needsReview)
    ]
  };
}

function getInboxMessage(inbox) {
  if (inbox.length === 0) {
    return [
      {
        type: 'rich_text_section',
        elements: [
          {
            type: 'text',
            text: 'Inbox is clean 🤩'
          }
        ]
      }
    ];
  }

  return [
    {
      type: 'rich_text_section',
      elements: [
        {
          type: 'text',
          text: `Found ${inbox.length} issue(s) in the inbox:\n`
        }
      ]
    },
    {
      type: 'rich_text_list',
      style: 'bullet',
      elements: inbox.map(inbox => ({
        type: 'rich_text_section',
        elements: [
          {
            type: 'link',
            text: inbox.title,
            url: inbox.url
          }
        ]
      }))
    }
  ];
}

function getNeedsReviewMessage(needsReview) {
  if (needsReview.length === 0) {
    return [
      {
        type: 'rich_text_section',
        elements: [
          {
            type: 'text',
            text: 'Needs Review is clean 🤩'
          }
        ]
      }
    ];
  }

  return [
    {
      type: 'rich_text_section',
      elements: [
        {
          type: 'text',
          text: `Found ${needsReview.length} issue(s) that need review:\n`
        }
      ]
    },
    {
      type: 'rich_text_list',
      style: 'bullet',
      elements: needsReview.map(issue => ({
        type: 'rich_text_section',
        elements: [
          {
            type: 'link',
            text: issue.title,
            url: issue.url
          }
        ]
      }))
    }
  ];
}
