# 🏏 IPL Dashboard

A modern, responsive web application built with Next.js and React that provides comprehensive information about the Indian Premier League (IPL). This dashboard offers real-time match updates, team statistics, player information, and much more in an intuitive and visually appealing interface.

## ✨ Features

### 🏠 **Home Dashboard**
- **Hero Section**: Dynamic image carousel with IPL highlights and news
- **Live Match Updates**: Real-time match scores and statistics
- **Quick Actions**: Easy navigation to key sections
- **Top Performers**: Leading players with their statistics
- **Latest News & Videos**: Recent IPL updates and highlights
- **Match Results**: Recent match outcomes and summaries

### 📊 **Match Management**
- **Live Matches**: Real-time match tracking with live scores
- **Upcoming Matches**: Schedule of future games
- **Match Schedule**: Complete fixture list with dates and venues
- **Match Results**: Historical match data and outcomes

### 🏆 **Statistics & Tables**
- **Points Table**: Current team standings and rankings
- **Team Statistics**: Comprehensive team performance metrics
- **Player Stats**: Individual player performance data
- **Overall Stats**: League-wide statistics and records

### 🗞️ **News & Media**
- **Latest News**: Breaking IPL news and updates
- **Video Highlights**: Match highlights and special moments
- **Photo Galleries**: Captivating images from matches
- **Press Releases**: Official announcements and reports

### 👥 **Team Information**
- **Team Profiles**: Detailed information about all IPL teams
- **Player Rosters**: Complete team player lists
- **Team Performance**: Historical and current team statistics
- **Team News**: Team-specific updates and announcements

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 13.5.6
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.5
- **Language**: TypeScript 5.2.2
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm

## 📁 Project Structure

```
ipl-dashboard/
├── components/                 # Reusable UI components
│   ├── common/                # Common components used across pages
│   │   └── Header.tsx        # Main navigation header
│   ├── matches/               # Match-related components
│   │   ├── LiveMatchCard.tsx # Live match display component
│   │   └── UpcomingMatches.tsx # Upcoming matches list
│   ├── schedule/              # Schedule components
│   │   └── MatchSchedule.tsx # Match scheduling component
│   ├── tables/                # Data table components
│   │   └── PointsTable.tsx   # Points table display
│   └── ui/                    # Basic UI components
│       ├── Badge.tsx         # Badge component
│       └── Card.tsx          # Card component
├── hooks/                     # Custom React hooks
│   └── useIPLData.ts         # Data fetching hook
├── lib/                       # Utility libraries and configurations
│   ├── api.ts                # API configuration and functions
│   ├── types.ts              # TypeScript type definitions
│   └── mocks/                # Mock data for development
│       ├── live.json         # Live match data
│       ├── matches.json      # Match data
│       ├── news.json         # News data
│       ├── points.json       # Points table data
│       ├── stats.json        # Statistics data
│       └── teams.json        # Team data
├── pages/                     # Next.js pages
│   ├── _app.tsx              # App wrapper component
│   ├── index.tsx             # Home page
│   ├── matches.tsx           # Matches page
│   ├── news.tsx              # News page
│   ├── points-table.tsx      # Points table page
│   ├── stats.tsx             # Statistics page
│   ├── teams.tsx             # Teams page
│   └── api/                  # API routes
│       └── ipl.ts            # IPL data API endpoint
├── styles/                    # Global styles
│   └── globals.css           # Global CSS styles
├── public/                    # Static assets
├── package.json               # Project dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnuragPant01/ipl-dashboard.git
   cd ipl-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🎨 Design Features

- **Responsive Design**: Optimized for all device sizes
- **Dark Theme**: Modern dark color scheme for better user experience
- **Interactive Elements**: Hover effects and smooth transitions
- **Card-based Layout**: Clean, organized information display
- **Modern Typography**: Readable and visually appealing text

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern web browsers

## 🔧 Customization

### Adding New Features
1. Create new components in the appropriate `components/` directory
2. Add new pages in the `pages/` directory
3. Update the navigation in `Header.tsx`
4. Add new data types in `lib/types.ts`

### Styling
- Use Tailwind CSS utility classes for styling
- Custom styles can be added in `styles/globals.css`
- Component-specific styles can be added using CSS modules or styled-components

## 📊 Data Management

The application uses mock data stored in JSON files for development. In production, you can:
- Replace mock data with real API calls
- Implement data caching strategies
- Add real-time data updates using WebSockets
- Integrate with external cricket APIs

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Anurag Pant**
- GitHub: [@AnuragPant01](https://github.com/AnuragPant01)
