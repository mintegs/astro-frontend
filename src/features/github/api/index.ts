export const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'

export const GITHUB_GRAPHQL_QUERIES = {
  PROFILE: `
    query ($username: String!) {
      user(login: $username) {
        login
        name
        avatarUrl
        followers { totalCount }
        following { totalCount }
        repositories { totalCount }
        createdAt
      }
    }
  `,
  CONTRIBUTIONS: `
    query ($username: String!, $year: Int!) {
      user(login: $username) {
        contributionCalendar(year: $year) {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  `,
  REPOSITORIES: `
    query ($username: String!, $first: Int!) {
      user(login: $username) {
        repositories(first: $first, orderBy: { field: STARGAZERS, direction: DESC }) {
          nodes {
            name
            description
            primaryLanguage { name color }
            stargazerCount
            forkCount
            updatedAt
            url
          }
        }
      }
    }
  `,
  ORGANIZATIONS: `
    query ($username: String!) {
      user(login: $username) {
        organizations(first: 10) {
          nodes {
            login
            name
            avatarUrl
          }
        }
      }
    }
  `,
} as const
