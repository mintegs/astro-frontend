import type { ActivityEvent } from '../types'

const activity: ActivityEvent[] = [
  {
    id: '1',
    type: 'push',
    repo: 'astro-frontend',
    message: 'Pushed 5 commits to astro-frontend',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'pull_request',
    repo: 'design-system',
    message: 'Opened pull request #42 in design-system',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    type: 'issue',
    repo: 'api-gateway',
    message: 'Opened issue  in api-gateway',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'release',
    repo: 'cli-tools',
    message: 'Published release v2.1.0 for cli-tools',
    timestamp: '2 days ago',
  },
  {
    id: '5',
    type: 'commit',
    repo: 'portfolio',
    message: 'Committed to portfolio — update project showcase',
    timestamp: '3 days ago',
  },
  {
    id: '6',
    type: 'star',
    repo: 'solid-start',
    message: 'Starred solid-start/solid-start',
    timestamp: '4 days ago',
  },
  {
    id: '7',
    type: 'push',
    repo: 'design-system',
    message: 'Pushed 3 commits to design-system',
    timestamp: '5 days ago',
  },
]

export default activity
