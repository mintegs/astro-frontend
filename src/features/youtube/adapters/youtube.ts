import type { YoutubeChannel, YoutubeVideo, YoutubeChannelResponse, YoutubeVideosResponse } from '../types'

export function adaptChannelResponse(response: YoutubeChannelResponse): YoutubeChannel {
  const item = response.items[0]
  if (!item) {
    throw new Error('No channel data found')
  }

  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    subscribers: parseInt(item.statistics.subscriberCount, 10) || 0,
    totalViews: parseInt(item.statistics.viewCount, 10) || 0,
    totalVideos: parseInt(item.statistics.videoCount, 10) || 0,
    createdAt: item.snippet.publishedAt,
    avatar: item.snippet.thumbnails.high.url,
  }
}

export function adaptVideosResponse(response: YoutubeVideosResponse): YoutubeVideo[] {
  return response.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
    duration: item.contentDetails.duration,
    views: parseInt(item.statistics.viewCount, 10) || 0,
    likes: item.statistics.likeCount ? parseInt(item.statistics.likeCount, 10) : undefined,
    comments: item.statistics.commentCount ? parseInt(item.statistics.commentCount, 10) : undefined,
    url: `https://www.youtube.com/watch?v=${item.id}`,
  }))
}

export function parseDuration(iso8661: string): string {
  const match = iso8661.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return iso8661

  const hours = match[1] ? parseInt(match[1], 10) : 0
  const minutes = match[2] ? parseInt(match[2], 10) : 0
  const seconds = match[3] ? parseInt(match[3], 10) : 0

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function formatViewCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`
  }
  return String(count)
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) return 'امروز'
  if (diffDays < 7) return `${diffDays} روز پیش`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`
  return `${Math.floor(diffDays / 365)} سال پیش`
}
