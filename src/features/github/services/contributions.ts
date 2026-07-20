import type {
  ContributionDay,
  ContributionYear,
  ContributionData,
  GitHubContributionCalendar,
} from '../types'

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

export function githubContributionAdapter(
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

function generateMockDays(year: number): ContributionDay[] {
  const days: ContributionDay[] = []
  const start = new Date(year, 0, 1)
  const end = new Date(year, 11, 31)

  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const baseChance = isWeekend ? 0.3 : 0.7
    const hasActivity = Math.random() < baseChance
    const count = hasActivity ? Math.floor(Math.random() * 12) + 1 : 0

    days.push({
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      count,
      level: getLevel(count),
    })
  }

  return days
}

function buildYear(year: number): ContributionYear {
  const days = generateMockDays(year)
  return {
    year,
    total: days.reduce((sum, d) => sum + d.count, 0),
    days,
  }
}

export async function getContributionData(
  selectedYear: number,
): Promise<ContributionData> {
  // TODO: Replace with real API calls
  //
  // import { connectAPI } from '../../../utils/api/connectApi'
  // import { API_BASE_URL } from '../../../config'
  //
  // const [error, data] = await connectAPI<GitHubContributionResponse>(
  //   `${API_BASE_URL}/v1/github/contributions?year=${selectedYear}`
  // )
  //
  // if (!error && data) {
  //   const adapted = githubContributionAdapter(
  //     data.data.user.contributionCalendar,
  //     selectedYear
  //   )
  //   return { availableYears, selectedYear, years: { [selectedYear]: adapted } }
  // }

  const availableYears = [2024, 2025, 2026]
  const years: Record<number, ContributionYear> = {}

  for (const y of availableYears) {
    years[y] = buildYear(y)
  }

  return { availableYears, selectedYear, years }
}
