# CivicConnect - Community Problem Solving Platform

CivicConnect is a modern web application that empowers citizens to report community issues, track their progress, and collaborate on solutions.

## Features

- **Issue Reporting**: Quick and easy issue reporting with photo upload, location detection, and categorization
- **Interactive Map**: View all reported issues on an interactive map with custom markers
- **Community Feed**: Browse issues in a filterable feed with real-time updates
- **Voting System**: Upvote issues to help prioritize community concerns
- **Status Tracking**: Track issue progress from Open → In Progress → Resolved
- **Admin Panel**: Administrative interface for managing issues and viewing statistics
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Authentication**: Secure Google OAuth authentication

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with Google OAuth
- **Maps**: React Leaflet with OpenStreetMap
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with Radix UI components

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd civicconnect
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp env.example .env.local
\`\`\`

Edit \`.env.local\` with your configuration:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/civicconnect"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
\`\`\`

4. Set up the database:
\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - For development: \`http://localhost:3000/api/auth/callback/google\`
   - For production: \`https://yourdomain.com/api/auth/callback/google\`

### Admin Access

To grant admin access to a user:

1. Sign in to the application
2. Connect to your database
3. Update the user's role:

\`\`\`sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
\`\`\`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Set up a PostgreSQL database (Vercel Postgres, Railway, or PlanetScale)
5. Update \`DATABASE_URL\` in Vercel environment variables
6. Deploy!

### Environment Variables for Production

\`\`\`env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
\`\`\`

## Project Structure

\`\`\`
civicconnect/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin panel
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── navbar.tsx        # Navigation bar
│   ├── issues-feed.tsx   # Issues feed component
│   ├── issues-map.tsx    # Map component
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth.ts          # NextAuth configuration
│   ├── db.ts            # Database connection
│   └── utils.ts         # Utility functions
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma schema
└── types/               # TypeScript type definitions
\`\`\`

## API Endpoints

- \`GET /api/issues\` - Fetch issues with filtering
- \`POST /api/issues\` - Create new issue
- \`POST /api/issues/[id]/vote\` - Toggle vote on issue
- \`PATCH /api/issues/[id]/status\` - Update issue status (admin only)
- \`GET /api/admin/stats\` - Get platform statistics (admin only)

## Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature-name\`
3. Commit your changes: \`git commit -am 'Add feature'\`
4. Push to the branch: \`git push origin feature-name\`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
