import type { YoutubeChannel } from '../types'

import { channelData } from '../data'

// TODO: Replace with real YouTube Data API v3 calls
// import { connectAPI } from '../../../utils/api/connectApi'
// import { API_BASE_URL } from '../../../config'

export async function getChannelOverview(): Promise<YoutubeChannel> {
  // TODO: const [error, data] = await connectAPI<YoutubeChannelResponse>(
  //   `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
  // )
  // if (!error && data) return adaptChannelResponse(data)
  return channelData
}
