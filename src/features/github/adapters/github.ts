import type {
  GithubProfile,
  ActivityEvent,
  Language,
  Framework,
  Organization,
  Achievement,
  Repository,
  GitHubContributionCalendar,
  ContributionYear,
  ContributionDay,
} from '../types'

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

export function adaptGithubProfile(raw: any): GithubProfile {
  return {
    username: raw.login ?? raw.username ?? '',
    name: raw.name ?? '',
    avatar: raw.avatar_url ?? raw.avatar ?? '',
    followers: raw.followers ?? 0,
    following: raw.following ?? 0,
    repositories: raw.public_repos ?? raw.repositories ?? 0,
    createdAt: raw.created_at ?? raw.createdAt ?? '',
  }
}

export function adaptActivityEvents(raw: any[]): ActivityEvent[] {
  return raw.map((event: any) => ({
    id: String(event.id ?? ''),
    type: mapEventType(event.type),
    repo: event.repo?.name ?? event.repo ?? '',
    message: event.payload?.commits?.[0]?.message ?? event.message ?? '',
    timestamp: event.created_at ?? event.timestamp ?? '',
  }))
}

function mapEventType(rawType: string): ActivityEvent['type'] {
  const typeMap: Record<string, ActivityEvent['type']> = {
    PushEvent: 'push',
    PullRequestEvent: 'pull_request',
    IssuesEvent: 'issue',
    ReleaseEvent: 'release',
    CreateEvent: 'commit',
    WatchEvent: 'star',
    ForkEvent: 'fork',
  }
  return typeMap[rawType] ?? 'commit'
}

export function adaptLanguages(raw: any[]): Language[] {
  return raw.map((lang: any) => ({
    name: lang.name ?? '',
    percentage: lang.percentage ?? 0,
    color: lang.color ?? '#8b949e',
    repoCount: lang.repoCount ?? 0,
  }))
}

export function adaptFrameworks(raw: any[]): Framework[] {
  return raw.map((fw: any) => ({
    name: fw.name ?? '',
    icon: fw.icon ?? '📦',
    repoCount: fw.repoCount ?? 0,
  }))
}

export function adaptOrganizations(raw: any[]): Organization[] {
  return raw.map((org: any) => ({
    name: org.login ?? org.name ?? '',
    displayName: org.name ?? org.displayName ?? '',
    avatar: org.avatar_url ?? org.avatar ?? '',
    role: org.role ?? '_member',
    url: org.html_url ?? org.url ?? '#',
  }))
}

export function adaptAchievements(raw: any[]): Achievement[] {
  return raw.map((ach: any) => ({
    name: ach.name ?? '',
    icon: ach.icon ?? '🏆',
    description: ach.description ?? '',
    tier: ach.tier ?? 'bronze',
  }))
}

export function adaptRepositories(raw: any[]): Repository[] {
  return raw.map((repo: any) => ({
    name: repo.name ?? '',
    description: repo.description ?? '',
    language: repo.language ?? '',
    languageColor: repo.languageColor ?? '#8b949e',
    frameworks: repo.topics ?? repo.frameworks ?? [],
    stars: repo.stargazers_count ?? repo.stars ?? 0,
    forks: repo.forks_count ?? repo.forks ?? 0,
    updatedAt: repo.updated_at ?? repo.updatedAt ?? '',
    url: repo.html_url ?? repo.url ?? '#',
    isPinned: repo.isPinned ?? false,
  }))
}

export function adaptContributionCalendar(
  calendar: GitHubContributionCalendar,
  year: number,
): ContributionYear {
  const days: ContributionDay[] = []

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      const date = new Date(day.date)
      if (date.getFullYear() === year) {
        days.push({
          date: day.date,
          count: day.contributionCount,
          level: getLevel(day.contributionCount),
        })
      }
    }
  }

  return {
    year,
    total: calendar.totalContributions,
    days,
  }
}
