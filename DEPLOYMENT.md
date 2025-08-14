# CivicConnect Deployment Guide

This guide will walk you through deploying CivicConnect to production using Vercel and a PostgreSQL database.

## Prerequisites

- GitHub account
- Vercel account
- Google Cloud Console account (for OAuth)

## Step 1: Prepare Your Repository

1. Push your code to GitHub:
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

## Step 2: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database"
3. Select "Postgres" → "Continue"
4. Choose a name and region
5. Click "Create"
6. Copy the connection string

### Option B: Railway

1. Go to [Railway](https://railway.app/)
2. Create a new project
3. Add PostgreSQL database
4. Copy the connection string

### Option C: PlanetScale

1. Go to [PlanetScale](https://planetscale.com/)
2. Create a new database
3. Get connection string

## Step 3: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Add authorized redirect URIs:
     - \`https://your-app-name.vercel.app/api/auth/callback/google\`
5. Copy Client ID and Client Secret

## Step 4: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: \`npm run build\`
   - Output Directory: \`.next\`
   - Install Command: \`npm install\`

5. Add environment variables:

\`\`\`env
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_random_secret_key_32_chars_long
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

6. Click "Deploy"

## Step 5: Initialize Database

After deployment, initialize your database:

1. Go to your deployed app
2. Open the browser console
3. Run database migration (you might need to do this locally first):

\`\`\`bash
# Locally, with production DATABASE_URL
npx prisma db push
\`\`\`

Or use Vercel CLI:

\`\`\`bash
npm i -g vercel
vercel env pull .env.local
npx prisma db push
\`\`\`

## Step 6: Create Admin User

1. Sign in to your deployed application with Google
2. Connect to your production database
3. Update your user role to ADMIN:

\`\`\`sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
\`\`\`

## Step 7: Configure Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Update Google OAuth redirect URIs to include your custom domain

## Environment Variables Reference

### Required Variables

\`\`\`env
# Database - PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth.js - Your app URL
NEXTAUTH_URL="https://your-app-name.vercel.app"

# NextAuth.js - Random secret (32+ characters)
NEXTAUTH_SECRET="your-very-long-random-secret-key-here"

# Google OAuth - From Google Cloud Console
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
\`\`\`

### Optional Variables (for additional features)

\`\`\`env
# UploadThing (for better image handling)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Pusher (for real-time features)
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_APP_ID="your-pusher-app-id"
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"
\`\`\`

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL is correct
   - Ensure database is accessible from Vercel
   - Check if database allows external connections

2. **OAuth Error**
   - Verify Google OAuth redirect URIs match your deployment URL
   - Check NEXTAUTH_URL matches your actual URL
   - Ensure NEXTAUTH_SECRET is set and sufficiently long

3. **Build Errors**
   - Check that all dependencies are in package.json
   - Verify TypeScript types are correct
   - Look at Vercel build logs for specific errors

4. **Runtime Errors**
   - Check Vercel function logs
   - Verify all environment variables are set
   - Ensure Prisma schema is synced with database

### Debugging Tips

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on function executions to see logs

2. **Local Testing with Production Environment**:
   \`\`\`bash
   vercel env pull .env.local
   npm run dev
   \`\`\`

3. **Database Issues**:
   \`\`\`bash
   npx prisma studio
   npx prisma db push --force-reset
   \`\`\`

## Performance Optimizations

1. **Enable Vercel Analytics**:
   - Go to Vercel Dashboard → Your Project → Analytics

2. **Add Vercel Speed Insights**:
   \`\`\`bash
   npm install @vercel/speed-insights
   \`\`\`

3. **Configure Image Optimization**:
   - Images are automatically optimized by Next.js on Vercel

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to git
2. **Database**: Use connection pooling in production
3. **CORS**: Configure properly for your domain
4. **Rate Limiting**: Consider implementing rate limiting for API routes

## Monitoring

1. **Vercel Analytics**: Monitor performance and usage
2. **Database Monitoring**: Set up alerts for your database provider
3. **Error Tracking**: Consider adding Sentry or similar service

## Backup Strategy

1. **Database Backups**: Set up automated backups with your database provider
2. **Code**: Ensure code is backed up on GitHub
3. **Environment Variables**: Keep secure backup of production environment variables

Your CivicConnect application should now be successfully deployed and accessible to users!
