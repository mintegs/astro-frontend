export const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

export const YOUTUBE_ENDPOINTS = {
  CHANNEL: `${YOUTUBE_API_BASE}/channels`,
  SEARCH: `${YOUTUBE_API_BASE}/search`,
  VIDEOS: `${YOUTUBE_API_BASE}/videos`,
} as const

export const YOUTUBE_API_PARAMS = {
  CHANNEL_PART: 'snippet,statistics',
  VIDEO_PART: 'snippet,statistics,contentDetails',
  ORDER_DATE: 'date',
  TYPE_VIDEO: 'video',
  MAX_RESULTS: 12,
} as const
