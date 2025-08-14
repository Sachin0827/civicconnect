# CivicConnect Demo

This is a **demonstration version** of CivicConnect with hardcoded data to showcase the concept.

## 🚀 Quick Start

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ✨ Demo Features

### What Works:
- ✅ **Browse Issues**: View community issues in both feed and map formats
- ✅ **Interactive Map**: See issues plotted on an interactive map with custom markers
- ✅ **Voting System**: Click hearts to vote on issues (demo only)
- ✅ **Filtering**: Filter issues by category and status
- ✅ **Search**: Search through issue titles and descriptions
- ✅ **Report Flow**: Experience the complete issue reporting workflow
- ✅ **Mobile Responsive**: Works perfectly on mobile devices
- ✅ **Status Management**: See different issue states (Open, In Progress, Resolved)

### Demo Limitations:
- 🔧 **Hardcoded Data**: Uses 8 sample issues from Bangalore
- 🔧 **No Real Authentication**: Uses a mock user session
- 🔧 **No Database**: All data is in memory and resets on refresh
- 🔧 **Mock Location**: Uses Bangalore coordinates for demo

## 📱 How to Explore

1. **Feed View**: Start with the default feed view to see all issues
2. **Map View**: Click "Map" to see issues plotted geographically
3. **Vote on Issues**: Click the heart icons to simulate voting
4. **Filter Issues**: Use the filters to view specific categories or statuses
5. **Report an Issue**: Click "Report Issue" to experience the reporting flow
6. **Search**: Use the search bar to find specific issues

## 🌍 Demo Data

The demo includes realistic issues from Bangalore, India:
- Potholes on MG Road
- Broken streetlight in Koramangala
- Garbage dumping near HSR Layout
- Traffic signal issues at Silk Board
- Public toilet maintenance in Cubbon Park
- And more...

## 🚀 Deploy Demo to Vercel

1. **Push to GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "CivicConnect Demo"
   git push origin main
   \`\`\`

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - No environment variables needed for demo
   - Deploy!

## 🔄 Converting to Production

To convert this demo to a full production app:

1. **Add Authentication** (NextAuth.js with Google OAuth)
2. **Add Database** (PostgreSQL with Prisma)
3. **Add Image Upload** (UploadThing or Cloudinary)
4. **Add Real-time Updates** (Pusher or WebSockets)
5. **Add Admin Panel** (Role-based access control)

See the main README.md for complete production setup instructions.

## 🎯 Perfect For:

- **Stakeholder Demos**: Show the concept to investors or partners
- **User Testing**: Get feedback on the user experience
- **Development Planning**: Understand the full feature scope
- **Design Reviews**: Evaluate the UI/UX without backend complexity

---

*This demo showcases the complete CivicConnect user experience without requiring any database or authentication setup. Perfect for quick demonstrations and concept validation!*
