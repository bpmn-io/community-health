/**
 * @param {{ baseUrl: string }} config
 */
export async function getForumReport({ baseUrl }) {
  const url = getQueryUrl(baseUrl);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch forum data: ${res.statusText}`);
  }

  const parsed = await res.json();

  const report = {
    topics: (parsed.topics || []).map(topic => ({
      id: topic.id,
      title: topic.title,
      url: getTopicUrl(baseUrl, topic)
    }))
  };

  return report;
}

function getQueryUrl(baseUrl) {
  const url = new URL('search.json', baseUrl);
  url.searchParams.set('q', 'status:noreplies before:2 after:10');

  return url.toString();
}

function getTopicUrl(baseUrl, topic) {
  return `${baseUrl}/t/${topic.slug}/${topic.id}`;
}
