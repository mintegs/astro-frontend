import type {
  GithubProfile,
  ActivityEvent,
  Language,
  Framework,
  Organization,
  Achievement,
  Repository,
} from '../types'

import { githubProfile, activityData, languagesData, frameworksData, organizationsData, achievementsData, githubData } from '../data'

// TODO: Replace with real GitHub GraphQL API calls
// import { connectAPI } from '../../../utils/api/connectApi'
// import { API_BASE_URL } from '../../../config'

export async function getGithubProfile(): Promise<GithubProfile> {
  // TODO: const [error, data] = await connectAPI<GithubProfile>(
  //   `${API_BASE_URL}/v1/github/profile`
  // )
  // if (!error && data) return data
  return githubProfile
}

export async function getRecentActivity(): Promise<ActivityEvent[]> {
  // TODO: const [error, data] = await connectAPI<ActivityEvent[]>(
  //   `${API_BASE_URL}/v1/github/activity`
  // )
  // if (!error && data) return data
  return activityData
}

export async function getLanguages(): Promise<Language[]> {
  // TODO: const [error, data] = await connectAPI<Language[]>(
  //   `${API_BASE_URL}/v1/github/languages`
  // )
  // if (!error && data) return data
  return languagesData
}

export async function getFrameworks(): Promise<Framework[]> {
  // TODO: const [error, data] = await connectAPI<Framework[]>(
  //   `${API_BASE_URL}/v1/github/frameworks`
  // )
  // if (!error && data) return data
  return frameworksData
}

export async function getOrganizations(): Promise<Organization[]> {
  // TODO: const [error, data] = await connectAPI<Organization[]>(
  //   `${API_BASE_URL}/v1/github/organizations`
  // )
  // if (!error && data) return data
  return organizationsData
}

export async function getAchievements(): Promise<Achievement[]> {
  // TODO: const [error, data] = await connectAPI<Achievement[]>(
  //   `${API_BASE_URL}/v1/github/achievements`
  // )
  // if (!error && data) return data
  return achievementsData
}

export async function getFeaturedRepositories(): Promise<Repository[]> {
  // TODO: const [error, data] = await connectAPI<Repository[]>(
  //   `${API_BASE_URL}/v1/github/repositories?featured=true`
  // )
  // if (!error && data) return data
  return githubData.repos
}
