/**
 * @param {{ baseUrl: string }} config
 */
export async function getTaskboardReport({ baseUrl }) {
  const url = getQueryUrl(baseUrl);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch forum data: ${res.statusText}`);
  }

  const { items } = await res.json();

  const inbox = items['Inbox'];
  const needsReview = items['Needs Review'];

  const report = {
    inbox: inbox.map(getIssueReport),
    needsReview: needsReview.map(getIssueReport)
  };

  return report;
}

function getQueryUrl(baseUrl) {
  const url = new URL('wuffle/board/cards', baseUrl);
  return url.toString();
}

function getIssueReport(issue) {
  return {
    id: issue.id,
    title: issue.title,
    url: getIssueUrl(issue)
  };
}

function getIssueUrl(issue) {
  return issue.html_url;
}
