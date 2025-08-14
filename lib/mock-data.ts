export interface MockIssue {
  id: string
  title: string
  description: string
  category: string
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'
  latitude: number
  longitude: number
  address: string
  imageUrl?: string
  createdAt: string
  author: {
    id: string
    name: string
    image: string
  }
  hasUserVoted: boolean
  voteCount: number
}

export const mockIssues: MockIssue[] = [
  {
    id: '1',
    title: 'Pothole on MG Road near Forum Mall',
    description: 'Large pothole causing traffic issues and vehicle damage. Located right before the Forum Mall entrance, affecting daily commuters.',
    category: 'INFRASTRUCTURE',
    status: 'OPEN',
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'MG Road, Forum Mall, Bangalore, Karnataka',
    imageUrl: '/images/issues/pothole.jpg',
    createdAt: '2024-01-15T10:30:00Z',
    author: {
      id: '1',
      name: 'Rajesh Kumar',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D8ABC&color=fff'
    },
    hasUserVoted: false,
    voteCount: 23
  },
  {
    id: '2',
    title: 'Broken streetlight on Koramangala 4th Block',
    description: 'Streetlight has been non-functional for over a week, creating safety concerns for pedestrians, especially women walking alone at night.',
    category: 'SAFETY',
    status: 'IN_PROGRESS',
    latitude: 12.9279,
    longitude: 77.6271,
    address: '4th Block, Koramangala, Bangalore, Karnataka',
    imageUrl: '/images/issues/streetlight.jpg',
    createdAt: '2024-01-14T18:45:00Z',
    author: {
      id: '2',
      name: 'Priya Sharma',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8B5CF6&color=fff'
    },
    hasUserVoted: true,
    voteCount: 15
  },
  {
    id: '3',
    title: 'Garbage dumping near HSR Layout lake',
    description: 'People are illegally dumping household waste near the lake, causing environmental pollution and foul smell in the area.',
    category: 'ENVIRONMENT',
    status: 'OPEN',
    latitude: 12.9081,
    longitude: 77.6476,
    address: 'HSR Layout, Bangalore, Karnataka',
    imageUrl: '/images/issues/garbage.jpg',
    createdAt: '2024-01-13T14:20:00Z',
    author: {
      id: '3',
      name: 'Arjun Patel',
      image: 'https://ui-avatars.com/api/?name=Arjun+Patel&background=10B981&color=fff'
    },
    hasUserVoted: false,
    voteCount: 31
  },
  {
    id: '4',
    title: 'Traffic signal malfunction at Silk Board Junction',
    description: 'Traffic light is stuck on red for the Electronics City route, causing major traffic congestion during peak hours.',
    category: 'TRANSPORTATION',
    status: 'RESOLVED',
    latitude: 12.9698,
    longitude: 77.6230,
    address: 'Silk Board Junction, Bangalore, Karnataka',
    imageUrl: '/images/issues/traffic.jpg',
    createdAt: '2024-01-10T07:15:00Z',
    author: {
      id: '4',
      name: 'Meera Reddy',
      image: 'https://ui-avatars.com/api/?name=Meera+Reddy&background=F59E0B&color=fff'
    },
    hasUserVoted: false,
    voteCount: 45
  },
  {
    id: '5',
    title: 'Public toilet maintenance needed in Cubbon Park',
    description: 'The public restroom facilities near the bandstand are in poor condition with broken fixtures and poor hygiene.',
    category: 'PUBLIC_SERVICES',
    status: 'OPEN',
    latitude: 12.9698,
    longitude: 77.5930,
    address: 'Cubbon Park, Bangalore, Karnataka',
    imageUrl: '/images/issues/toilet.jpg',
    createdAt: '2024-01-12T16:00:00Z',
    author: {
      id: '5',
      name: 'Vikram Singh',
      image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=EF4444&color=fff'
    },
    hasUserVoted: true,
    voteCount: 18
  },
  {
    id: '6',
    title: 'Need pedestrian crossing near Brigade Road',
    description: 'Dangerous road crossing point where several accidents have occurred. Pedestrians have to risk their lives to cross this busy intersection.',
    category: 'SAFETY',
    status: 'OPEN',
    latitude: 12.9716,
    longitude: 77.6099,
    address: 'Brigade Road, Bangalore, Karnataka',
    imageUrl: '/images/issues/crossing.jpg',
    createdAt: '2024-01-11T12:30:00Z',
    author: {
      id: '6',
      name: 'Anita Joshi',
      image: 'https://ui-avatars.com/api/?name=Anita+Joshi&background=6366F1&color=fff'
    },
    hasUserVoted: false,
    voteCount: 28
  },
  {
    id: '7',
    title: 'Playground equipment broken in JP Nagar Park',
    description: 'Several swings and slides are damaged, making the playground unsafe for children. Community requests immediate repair.',
    category: 'COMMUNITY',
    status: 'IN_PROGRESS',
    latitude: 12.9081,
    longitude: 77.5955,
    address: 'JP Nagar Park, Bangalore, Karnataka',
    imageUrl: '/images/issues/playground.jpg',
    createdAt: '2024-01-09T09:45:00Z',
    author: {
      id: '7',
      name: 'Ravi Krishnan',
      image: 'https://ui-avatars.com/api/?name=Ravi+Krishnan&background=8B5CF6&color=fff'
    },
    hasUserVoted: true,
    voteCount: 12
  },
  {
    id: '8',
    title: 'Water logging during monsoon on Airport Road',
    description: 'Severe waterlogging makes the road impassable during heavy rains, affecting airport connectivity and causing vehicle breakdowns.',
    category: 'INFRASTRUCTURE',
    status: 'OPEN',
    latitude: 13.0067,
    longitude: 77.5667,
    address: 'Airport Road, Bangalore, Karnataka',
    imageUrl: '/images/issues/flooding.jpg',
    createdAt: '2024-01-08T20:10:00Z',
    author: {
      id: '8',
      name: 'Sunitha Rao',
      image: 'https://ui-avatars.com/api/?name=Sunitha+Rao&background=EC4899&color=fff'
    },
    hasUserVoted: false,
    voteCount: 37
  }
]

export const mockStats = {
  totalIssues: 8,
  openIssues: 5,
  inProgressIssues: 2,
  resolvedIssues: 1,
  totalUsers: 150
}

export const mockUser = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@civicconnect.com',
  image: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
  role: 'USER' as const
}
