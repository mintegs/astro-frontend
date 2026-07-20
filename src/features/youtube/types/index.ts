export interface YoutubeChannel {
  id: string
  title: string
  description: string
  subscribers: number
  totalViews: number
  totalVideos: number
  createdAt: string
  avatar: string
  bannerUrl?: string
}

export interface YoutubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
  views: number
  likes?: number
  comments?: number
  url: string
}

export interface YoutubeChannelResponse {
  items: Array<{
    id: string
    snippet: {
      title: string
      description: string
      thumbnails: { default: { url: string }; medium: { url: string }; high: { url: string } }
      publishedAt: string
    }
    statistics: {
      subscriberCount: string
      viewCount: string
      videoCount: string
    }
  }>
}

export interface YoutubeVideosResponse {
  items: Array<{
    id: string
    snippet: {
      title: string
      description: string
      thumbnails: { default: { url: string }; medium: { url: string }; high: { url: string } }
      publishedAt: string
    }
    statistics: {
      viewCount: string
      likeCount?: string
      commentCount?: string
    }
    contentDetails: {
      duration: string
    }
  }>
}
