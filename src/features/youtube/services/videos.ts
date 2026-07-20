import type { YoutubeVideo } from '../types'

import { videosData } from '../data'

// TODO: Replace with real YouTube Data API v3 calls
// import { connectAPI } from '../../../utils/api/connectApi'
// import { API_BASE_URL } from '../../../config'

export async function getLatestVideos(): Promise<YoutubeVideo[]> {
  // TODO: const [error, data] = await connectAPI<YoutubeVideosResponse>(
  //   `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&key=${YOUTUBE_API_KEY}`
  // )
  // if (!error && data) return adaptVideosResponse(data)
  return videosData
}

export async function getFeaturedVideo(): Promise<YoutubeVideo> {
  const videos = await getLatestVideos()
  return videos[0]
}
