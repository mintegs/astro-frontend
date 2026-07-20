import JSZip from 'jszip';

export interface InstagramData {
  followers: string[];
  following: string[];
  noFollowBack: string[];
  hideStory: string[];
  pendingRequests: string[];
  blocked: string[];
}

async function parseJsonFile(
  file: JSZip.JSZipObject | null,
  property?: string,
  fixUrl?: boolean
): Promise<string[]> {
  if (!file) return [];
  const content = await file.async('string');
  const json = JSON.parse(content);

  const dataArray =
    property && Array.isArray(json[property]) ? json[property] : json;
  return Array.isArray(dataArray)
    ? dataArray.map((item: { string_list_data: { href: string }[] }) =>
        fixUrl
          ? item['string_list_data'][0].href.replace('_u/', '')
          : item['string_list_data'][0].href
      )
    : [];
}

async function parseLabelValueFile(
  file: JSZip.JSZipObject | null,
  property?: string
): Promise<string[]> {
  if (!file) return [];
  const content = await file.async('string');
  const json = JSON.parse(content);

  const dataArray =
    property && Array.isArray(json[property]) ? json[property] : json;

  return dataArray.map(
    (item: { label_values: { value: string }[] }) => item.label_values[2].value
  );
}

export function validateInstagramData(data: InstagramData | null | undefined): string | null {
  if (!data || typeof data !== 'object') {
    return 'No valid Instagram data was found.';
  }

  const keys: (keyof InstagramData)[] = [
    'followers', 'following', 'noFollowBack',
    'hideStory', 'pendingRequests', 'blocked',
  ];

  const hasAtLeastOneEntry = keys.some(
    (key) => Array.isArray(data[key]) && data[key].length > 0,
  );

  if (!hasAtLeastOneEntry) {
    return 'No valid Instagram data was found in the uploaded archive.';
  }

  return null;
}

export async function parseInstagramZip(file: File): Promise<InstagramData> {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(file);

  const followers = await parseJsonFile(
    loadedZip.file('connections/followers_and_following/followers_1.json')
  );

  const following = await parseJsonFile(
    loadedZip.file('connections/followers_and_following/following.json'),
    'relationships_following',
    true
  );

  const hideStory = await parseLabelValueFile(
    loadedZip.file(
      'connections/followers_and_following/hide_story_from.json'
    ),
    'relationships_hide_stories_from'
  );

  const pendingRequests = await parseLabelValueFile(
    loadedZip.file(
      'connections/followers_and_following/pending_follow_requests.json'
    ),
    'relationships_follow_requests_sent'
  );

  const blocked = await parseLabelValueFile(
    loadedZip.file(
      'connections/followers_and_following/blocked_profiles.json'
    ),
    'relationships_blocked_users'
  );

  const noFollowBack = following.filter(
    (followingItem) => !followers.includes(followingItem)
  );

  return {
    followers,
    following,
    noFollowBack,
    hideStory,
    pendingRequests,
    blocked,
  };
}
