export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface ContributionYear {
  year: number
  total: number
  days: ContributionDay[]
}

export interface ContributionData {
  availableYears: number[]
  selectedYear: number
  years: Record<number, ContributionYear>
}

export interface GitHubContributionDay {
  date: string
  contributionCount: number
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[]
}

export interface GitHubContributionCalendar {
  totalContributions: number
  weeks: GitHubContributionWeek[]
}

export interface GitHubContributionResponse {
  data: {
    user: {
      contributionCalendar: GitHubContributionCalendar
    }
  }
}

export interface GithubProfile {
  username: string
  name: string
  avatar: string
  followers: number
  following: number
  repositories: number
  createdAt: string
}

export interface ActivityEvent {
  id: string
  type: 'push' | 'pull_request' | 'issue' | 'release' | 'commit' | 'star' | 'fork'
  repo: string
  message: string
  timestamp: string
}

export interface Language {
  name: string
  percentage: number
  color: string
  repoCount: number
}

export interface Framework {
  name: string
  icon: string
  repoCount: number
}

export interface Organization {
  name: string
  displayName: string
  avatar: string
  role: string
  url: string
}

export interface Achievement {
  name: string
  icon: string
  description: string
  tier: 'bronze' | 'silver' | 'gold'
}

export interface Repository {
  name: string
  description: string
  language: string
  languageColor: string
  frameworks: string[]
  stars: number
  forks: number
  updatedAt: string
  url: string
  isPinned: boolean
}
