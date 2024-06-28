import { getForumReport } from './api/forum.js';
import { getTaskboardReport } from './api/taskboard.js';

import { formatReport, SUPPORTED_FORMATS } from './format.js';

const FORUM_BASE_URL = 'https://forum.bpmn.io';
const TASKBOARD_BASE_URL = 'https://tasks.bpmn.io';

export async function getReport({ baseUrls = {}, format = 'json' } = {}) {
  if (!SUPPORTED_FORMATS.includes(format)) {
    throw new Error(`Unsupported format: ${format}`);
  }

  const {
    forum = FORUM_BASE_URL,
    taskboard = TASKBOARD_BASE_URL
  } = baseUrls;

  const [
    forumReport,
    taskboardReport
  ] = await Promise.all([
    getForumReport({ baseUrl: forum }),
    getTaskboardReport({ baseUrl: taskboard })
  ]);

  const report = {
    forum: forumReport,
    taskboard: taskboardReport
  };

  return formatReport(report, format);
}
