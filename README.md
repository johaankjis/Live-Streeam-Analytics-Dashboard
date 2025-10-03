# Live Stream Analytics Dashboard

A comprehensive real-time analytics platform for monitoring live stream performance metrics including viewer counts, chat activity, and stream health. Built with Next.js 14, React 19, TypeScript, and PostgreSQL.

![Live Stream Analytics Dashboard](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)

## ✨ Features

### Core Features

#### 📊 Real-Time Metrics Dashboard
- **Live Data Updates**: Automatic polling every 5 seconds using custom React hooks
- **Instant Feedback**: Real-time status indicators showing data freshness
- **Zero-Lag Updates**: Optimized rendering with React's concurrent features
- **WebSocket-Style Experience**: Efficient HTTP polling mimicking WebSocket behavior

#### 📈 Interactive Visualizations
- **D3.js Powered Charts**: Smooth, animated area charts with gradient fills
- **Responsive Design**: Charts adapt to container size and viewport changes
- **Interactive Tooltips**: Hover to see detailed metrics at any point in time
- **Time Range Selection**: Filter data by custom date ranges
- **Multiple Chart Types**: Area charts, line graphs, and metric cards

#### 🎮 Multi-Stream Monitoring
- **Stream Selector**: Dropdown component for easy stream switching
- **Parallel Tracking**: Monitor multiple streams without page reloads
- **Stream Status**: Live/offline status indicators with color coding
- **Quick Access**: Recently viewed streams remembered in session

#### 📉 Comprehensive Analytics

**Viewer Analytics**
- Current viewer count with trend indicators
- Peak viewer detection and historical peaks
- Average viewers over time periods
- Viewer retention and drop-off analysis

**Chat Engagement**
- Messages per minute (chat velocity)
- Unique active chatters count
- Chat activity trends and patterns
- Peak chat moments correlation with stream events

**Stream Health Monitoring**
- Bitrate tracking (upload speed)
- FPS (frames per second) monitoring
- Frame drop detection and alerts
- Resolution tracking
- Overall health score (0-100)

#### 🎨 Modern UI/UX
- **Dark Mode First**: Beautiful dark theme optimized for long monitoring sessions
- **Vercel-Inspired Design**: Professional, clean interface
- **Accessibility**: WCAG compliant with keyboard navigation and ARIA labels
- **Mobile Responsive**: Full functionality on tablets and phones
- **Component Library**: Built with shadcn/ui and Radix UI primitives
- **Smooth Animations**: Framer Motion and CSS transitions

#### 🔌 RESTful API
- **Complete REST API**: All dashboard features accessible via API
- **JSON Responses**: Standard JSON format for easy integration
- **Error Handling**: Consistent error responses with status codes
- **Query Parameters**: Flexible filtering and pagination
- **Rate Limiting Ready**: Prepared for production rate limiting

#### 🚢 Production-Ready Architecture
- **Docker Support**: Multi-stage Dockerfile for optimized images
- **Container Orchestration**: Docker Compose for full-stack deployment
- **Nginx Integration**: Reverse proxy and load balancing configuration
- **Serverless Optimized**: Works perfectly on Vercel, AWS Lambda, Google Cloud Run
- **Edge Compatible**: Neon serverless driver works at the edge
- **Environment Variables**: Secure configuration management

#### 🧪 Testing Infrastructure
- **API Tests**: Full coverage of REST endpoints
- **Component Tests**: React Testing Library for UI components
- **Hook Tests**: Custom hook testing with renderHook
- **Type Safety**: TypeScript strict mode with comprehensive types
- **CI/CD Ready**: Automated testing in pipelines

## 🏗️ Architecture

The application follows a modern full-stack architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  React 19 + Next.js 14 App Router + TypeScript              │
│  - Server Components for initial renders                     │
│  - Client Components for interactive UI                      │
│  - Custom hooks for state management                         │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                         API Layer                            │
│              Next.js API Routes (REST)                       │
│  - /api/streams - Stream management                         │
│  - /api/analytics - Historical data                         │
│  - /api/metrics - Real-time updates                         │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                          │
│         PostgreSQL (Neon Serverless)                        │
│  - streams - Stream metadata                                │
│  - viewers - Viewer metrics timeseries                      │
│  - chat_activity - Chat engagement data                     │
│  - stream_health - Technical performance                    │
│  - metrics - Aggregated analytics                           │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Real-Time Updates**: Custom React hook (`use-realtime-metrics.ts`) polls `/api/metrics/realtime` every 5 seconds
2. **Visualization**: D3.js processes data and renders interactive SVG charts with smooth animations
3. **State Management**: React hooks and context for global state (theme, selected stream)
4. **Database Access**: Neon serverless driver for edge-compatible PostgreSQL queries
5. **Caching**: Next.js automatic caching for static data with revalidation

## 🛠️ Tech Stack

### Frontend Technologies
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router, Server Components, and API Routes
- **[React 19](https://react.dev/)** - Latest React with improved hooks and concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Static type checking for improved code quality
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework with custom configuration
- **[D3.js 7](https://d3js.org/)** - Data-driven visualizations for interactive charts
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library built on Radix UI
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon set

### Backend & Database
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless REST API endpoints
- **[PostgreSQL 16](https://www.postgresql.org/)** - Powerful, open-source relational database
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL with edge-compatible driver
- **[@neondatabase/serverless](https://neon.tech/docs/serverless/serverless-driver)** - HTTP-based PostgreSQL driver for serverless environments

### Development Tools
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[React Testing Library](https://testing-library.com/react)** - Component testing utilities
- **[TypeScript ESLint](https://typescript-eslint.io/)** - Linting for TypeScript code

### DevOps & Deployment
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration
- **[Nginx](https://www.nginx.com/)** - High-performance reverse proxy and load balancer
- **[Vercel](https://vercel.com/)** - Optimized hosting for Next.js applications

## 🚀 Quick Start

Get up and running in 5 minutes:

\`\`\`bash
# 1. Clone the repository
git clone https://github.com/johaankjis/Live-Streeam-Analytics-Dashboard.git
cd Live-Streeam-Analytics-Dashboard

# 2. Install dependencies
npm install

# 3. Set up your database (create a free account at neon.tech)
# Then create .env.local with your DATABASE_URL

# 4. Run migrations
npm run migrate

# 5. Start the dev server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) and start monitoring! 🎉

## Getting Started

### Prerequisites

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **PostgreSQL database** - [Neon](https://neon.tech) recommended (free tier available)
- **npm or pnpm** - Package manager (comes with Node.js)
- **Docker** (optional) - For containerized deployment

### Installation

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/johaankjis/Live-Streeam-Analytics-Dashboard.git
cd Live-Streeam-Analytics-Dashboard
\`\`\`

2. **Install dependencies:**
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. **Set up environment variables:**

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Database Configuration (Required)
DATABASE_URL=postgresql://user:password@host:5432/database

# Optional: For Neon/Vercel Postgres
POSTGRES_URL=postgresql://user:password@host:5432/database
POSTGRES_PRISMA_URL=postgresql://user:password@host:5432/database?pgbouncer=true
DATABASE_URL_UNPOOLED=postgresql://user:password@host:5432/database
POSTGRES_URL_NON_POOLING=postgresql://user:password@host:5432/database

# Application Settings
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
\`\`\`

**Database Setup Options:**
- **Neon (Recommended)**: Sign up at [neon.tech](https://neon.tech) for a free PostgreSQL database
- **Supabase**: Alternative hosted PostgreSQL option
- **Local Docker**: Use the provided docker-compose.yml

4. **Run database migrations:**
\`\`\`bash
npm run migrate
\`\`\`

This will execute the SQL scripts in the \`scripts/\` directory:
- \`001-create-tables.sql\` - Creates database schema
- \`002-seed-data.sql\` - Seeds initial data

5. **Start the development server:**
\`\`\`bash
npm run dev
\`\`\`

6. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 🗄️ Database Schema

The application uses PostgreSQL with the following table structure:

### Tables Overview

#### **streams**
Primary table storing stream metadata and current status.
\`\`\`sql
CREATE TABLE streams (
  id SERIAL PRIMARY KEY,
  stream_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  streamer_name VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'offline',
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

#### **viewers**
Timeseries data tracking viewer counts over time.
- Stores viewer count at each timestamp
- Tracks peak viewers during streams
- Used for generating viewer trend charts

#### **chat_activity**
Tracks chat engagement metrics.
- Messages per minute (velocity)
- Unique chatters count
- Timestamp for trend analysis

#### **stream_health**
Monitors technical stream quality.
- Bitrate (kbps)
- FPS (frames per second)
- Resolution (e.g., 1920x1080)
- Dropped frames count
- Health score (0-100)

#### **metrics**
Generic metrics table for extensibility.
- Flexible schema with JSONB metadata
- Supports custom metric types
- Aggregated analytics data

### Schema Visualization

\`\`\`
streams (1) ──────────── (N) viewers
   │
   ├─────────────────── (N) chat_activity
   │
   ├─────────────────── (N) stream_health
   │
   └─────────────────── (N) metrics
\`\`\`

See [`scripts/001-create-tables.sql`](scripts/001-create-tables.sql) for the complete schema definition.

## 📡 API Endpoints

### Streams API

**List All Streams**
\`\`\`
GET /api/streams
\`\`\`
Returns an array of all active streams with basic metadata.

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "stream_id": "stream_123",
    "title": "Gaming Stream",
    "streamer_name": "ProGamer",
    "platform": "twitch",
    "status": "live",
    "started_at": "2024-01-01T12:00:00Z",
    "created_at": "2024-01-01T10:00:00Z"
  }
]
\`\`\`

**Get Stream Details**
\`\`\`
GET /api/streams/[streamId]
\`\`\`
Returns comprehensive stream data including all related metrics.

**Update Stream**
\`\`\`
POST /api/streams/[streamId]/update
Content-Type: application/json

{
  "status": "live",
  "viewer_count": 1500,
  "chat_activity": {
    "messages_per_minute": 45,
    "unique_chatters": 320
  }
}
\`\`\`

### Analytics API

**Analytics Summary**
\`\`\`
GET /api/analytics/summary?streamId={id}
\`\`\`
Returns aggregated analytics including peak viewers, average engagement, and health metrics.

**Timeseries Data**
\`\`\`
GET /api/analytics/timeseries?streamId={id}&metric={type}&start={ISO8601}&end={ISO8601}
\`\`\`
Parameters:
- \`streamId\` - Stream identifier (required)
- \`metric\` - Type: viewers, chat, health (required)
- \`start\` - Start timestamp (optional)
- \`end\` - End timestamp (optional)

### Real-Time Metrics API

**Latest Metrics**
\`\`\`
GET /api/metrics/realtime?streamId={id}
\`\`\`
Returns the most recent metrics for real-time dashboard updates.

**Response:**
\`\`\`json
{
  "viewers": {
    "viewer_count": 1500,
    "timestamp": "2024-01-01T12:00:00Z"
  },
  "chat": {
    "messages_per_minute": 45,
    "unique_chatters": 320,
    "timestamp": "2024-01-01T12:00:00Z"
  },
  "health": {
    "health_score": 98,
    "bitrate": 6000,
    "fps": 60,
    "dropped_frames": 5,
    "timestamp": "2024-01-01T12:00:00Z"
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
\`\`\`

## Docker Deployment

### Development

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
\`\`\`

### Production

\`\`\`bash
# Build production image
docker build -t livestream-analytics:latest .

# Run container
docker run -d -p 3000:3000 \\
  -e DATABASE_URL=your_database_url \\
  livestream-analytics:latest
\`\`\`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## ⚙️ Environment Variables

Complete reference of environment variables used in the application:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| \`DATABASE_URL\` | PostgreSQL connection string | \`postgresql://user:pass@host:5432/db\` |

### Optional Variables (Neon/Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| \`POSTGRES_URL\` | Alias for DATABASE_URL | \`postgresql://user:pass@host:5432/db\` |
| \`POSTGRES_PRISMA_URL\` | Connection string with pgbouncer | \`postgresql://user:pass@host:5432/db?pgbouncer=true\` |
| \`DATABASE_URL_UNPOOLED\` | Direct connection (no pooling) | \`postgresql://user:pass@host:5432/db\` |
| \`POSTGRES_URL_NON_POOLING\` | Non-pooled connection | \`postgresql://user:pass@host:5432/db\` |

### Application Settings

| Variable | Description | Default |
|----------|-------------|---------|
| \`NODE_ENV\` | Environment mode | \`development\` |
| \`NEXT_TELEMETRY_DISABLED\` | Disable Next.js telemetry | \`1\` |
| \`PORT\` | Server port (Docker) | \`3000\` |
| \`HOSTNAME\` | Server hostname (Docker) | \`0.0.0.0\` |

### Creating .env.local

\`\`\`bash
# Create from template
cat > .env.local << 'EOF'
# Database (Required)
DATABASE_URL=postgresql://user:password@host:5432/database

# Application Settings
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
EOF
\`\`\`

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Database Connection Errors

**Problem**: \`Error: Connection refused\` or \`ECONNREFUSED\`

**Solutions**:
\`\`\`bash
# 1. Check if PostgreSQL is running
docker-compose ps postgres

# 2. Test database connection
psql $DATABASE_URL -c "SELECT 1"

# 3. Verify environment variables
echo $DATABASE_URL

# 4. Check firewall rules (if using remote database)
telnet your-db-host 5432
\`\`\`

#### Migration Failures

**Problem**: \`Migration failed: relation already exists\`

**Solutions**:
\`\`\`bash
# 1. Check current database state
psql $DATABASE_URL -c "\dt"

# 2. Drop and recreate tables (CAUTION: loses data)
psql $DATABASE_URL -c "DROP TABLE IF EXISTS streams CASCADE;"

# 3. Run migrations again
npm run migrate
\`\`\`

#### Build Errors

**Problem**: \`Module not found\` or TypeScript errors

**Solutions**:
\`\`\`bash
# 1. Clear Next.js cache
rm -rf .next

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Run type check
npm run type-check

# 4. Check Node.js version
node --version  # Should be 20+
\`\`\`

#### Docker Issues

**Problem**: Container fails to start

**Solutions**:
\`\`\`bash
# 1. Check container logs
docker-compose logs app

# 2. Rebuild without cache
docker-compose build --no-cache

# 3. Check port conflicts
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# 4. Reset Docker environment
docker-compose down -v
docker-compose up --build
\`\`\`

#### Real-Time Updates Not Working

**Problem**: Dashboard doesn't update with new data

**Solutions**:
\`\`\`bash
# 1. Check browser console for errors
# 2. Verify API endpoint is accessible
curl http://localhost:3000/api/metrics/realtime?streamId=stream_123

# 3. Check if stream exists
curl http://localhost:3000/api/streams

# 4. Verify database has recent data
psql $DATABASE_URL -c "SELECT * FROM viewers ORDER BY timestamp DESC LIMIT 5;"
\`\`\`

### Performance Issues

If the dashboard is slow:

1. **Enable database connection pooling** (Neon Prisma URL)
2. **Add database indexes** on frequently queried columns
3. **Reduce polling frequency** in \`use-realtime-metrics.ts\`
4. **Optimize queries** - add LIMIT clauses for large datasets
5. **Use CDN** for static assets in production

### Getting More Help

- Check [GitHub Issues](https://github.com/johaankjis/Live-Streeam-Analytics-Dashboard/issues)
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment-specific issues
- Review [__tests__/README.md](__tests__/README.md) for testing help

## 🧪 Testing

The project includes a comprehensive test suite covering API routes, React components, and custom hooks.

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- __tests__/api/streams.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="should fetch streams"
\`\`\`

### Test Structure

- **API Tests** - Test REST endpoints using fetch
- **Component Tests** - Test React components with React Testing Library
- **Hook Tests** - Test custom React hooks with renderHook utility
- **Unit Tests** - Test utility functions and helpers

See [__tests__/README.md](__tests__/README.md) for detailed testing documentation.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| \`npm run dev\` | Start development server at http://localhost:3000 |
| \`npm run build\` | Build production-ready application |
| \`npm run start\` | Start production server (after build) |
| \`npm run lint\` | Run ESLint to check code quality |
| \`npm run type-check\` | Run TypeScript compiler to check types |
| \`npm test\` | Run Jest test suite |
| \`npm run test:watch\` | Run tests in watch mode |
| \`npm run test:coverage\` | Run tests with coverage report |
| \`npm run migrate\` | Run database migrations |
| \`npm run docker:build\` | Build Docker image |
| \`npm run docker:run\` | Start Docker containers with compose |
| \`npm run docker:stop\` | Stop Docker containers |
| \`npm run docker:logs\` | View Docker container logs |

## 📁 Project Structure

\`\`\`
Live-Streeam-Analytics-Dashboard/
├── app/                              # Next.js 14 App Router
│   ├── api/                         # API Routes
│   │   ├── analytics/               # Analytics endpoints
│   │   │   ├── summary/route.ts    # GET summary stats
│   │   │   └── timeseries/route.ts # GET timeseries data
│   │   ├── metrics/                 # Real-time metrics
│   │   │   └── realtime/route.ts   # GET real-time updates
│   │   └── streams/                 # Stream management
│   │       ├── route.ts             # GET all streams
│   │       └── [streamId]/          # Dynamic routes
│   │           ├── route.ts         # GET single stream
│   │           └── update/route.ts  # POST updates
│   ├── page.tsx                     # Main dashboard page
│   ├── layout.tsx                   # Root layout with providers
│   ├── loading.tsx                  # Loading states
│   └── globals.css                  # Global styles
│
├── components/                       # React Components
│   ├── ui/                          # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── select.tsx
│   │   ├── calendar.tsx
│   │   └── ...                      # Other UI primitives
│   ├── analytics-grid.tsx           # Main analytics layout
│   ├── metric-card.tsx              # Metric display cards
│   ├── viewer-chart.tsx             # D3.js chart component
│   ├── stream-selector.tsx          # Stream selection dropdown
│   ├── realtime-indicator.tsx       # Live status indicator
│   ├── realtime-metrics-panel.tsx   # Real-time metrics display
│   └── theme-provider.tsx           # Theme context provider
│
├── lib/                              # Utilities & Helpers
│   ├── db.ts                        # Neon PostgreSQL client
│   ├── api-client.ts                # API fetch utilities
│   ├── types.ts                     # TypeScript type definitions
│   └── utils.ts                     # Utility functions
│
├── hooks/                            # Custom React Hooks
│   ├── use-realtime-metrics.ts      # Real-time data polling
│   ├── use-toast.ts                 # Toast notifications
│   └── use-mobile.ts                # Mobile detection
│
├── scripts/                          # Database & Utilities
│   ├── 001-create-tables.sql        # Database schema
│   ├── 002-seed-data.sql            # Seed data
│   ├── 003-simulate-realtime-data.ts # Data simulation
│   ├── run-migrations.ts            # Migration runner
│   └── docker-entrypoint.sh         # Docker startup script
│
├── __tests__/                        # Test Suite
│   ├── api/                         # API endpoint tests
│   ├── components/                  # Component tests
│   ├── lib/                         # Utility tests
│   ├── hooks/                       # Hook tests
│   └── README.md                    # Testing documentation
│
├── public/                           # Static assets
├── styles/                           # Additional styles
│
├── Dockerfile                        # Production Docker image
├── docker-compose.yml                # Multi-container setup
├── nginx.conf                        # Nginx configuration
├── next.config.mjs                   # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── jest.config.js                    # Jest test configuration
├── jest.setup.js                     # Jest setup file
├── postcss.config.mjs                # PostCSS configuration
├── components.json                   # shadcn/ui configuration
├── package.json                      # Dependencies & scripts
├── DEPLOYMENT.md                     # Deployment guide
└── README.md                         # This file
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   \`\`\`bash
   # Click the 'Fork' button on GitHub
   \`\`\`

2. **Clone your fork**
   \`\`\`bash
   git clone https://github.com/your-username/Live-Streeam-Analytics-Dashboard.git
   cd Live-Streeam-Analytics-Dashboard
   \`\`\`

3. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

4. **Make your changes**
   - Write clean, maintainable code
   - Follow existing code style and conventions
   - Add tests for new features
   - Update documentation as needed

5. **Test your changes**
   \`\`\`bash
   npm run lint
   npm run type-check
   npm test
   \`\`\`

6. **Commit your changes**
   \`\`\`bash
   git add .
   git commit -m 'Add amazing feature'
   \`\`\`
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
   - \`feat:\` - New features
   - \`fix:\` - Bug fixes
   - \`docs:\` - Documentation changes
   - \`style:\` - Code style changes
   - \`refactor:\` - Code refactoring
   - \`test:\` - Test additions/changes
   - \`chore:\` - Build process or auxiliary tool changes

7. **Push to your fork**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`

8. **Open a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with details about your changes

### Development Guidelines

- **Code Style**: Follow the existing TypeScript and React patterns
- **Testing**: Maintain or improve test coverage
- **Documentation**: Update README and inline comments for significant changes
- **Performance**: Consider performance implications of changes
- **Accessibility**: Ensure UI components are accessible (ARIA labels, keyboard navigation)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

### Getting Help

- **Issues**: For bugs and feature requests, [open an issue](https://github.com/johaankjis/Live-Streeam-Analytics-Dashboard/issues)
- **Discussions**: For questions and general discussion, use [GitHub Discussions](https://github.com/johaankjis/Live-Streeam-Analytics-Dashboard/discussions)
- **Documentation**: Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help

### Reporting Bugs

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, browser)
- Screenshots if applicable
- Relevant logs or error messages

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [Next.js](https://nextjs.org/) by Vercel
- [shadcn/ui](https://ui.shadcn.com/) by shadcn
- [Radix UI](https://www.radix-ui.com/) by WorkOS
- [Tailwind CSS](https://tailwindcss.com/) by Tailwind Labs
- [D3.js](https://d3js.org/) by Mike Bostock
- [Neon](https://neon.tech/) for serverless PostgreSQL

## 📊 Project Status

![GitHub issues](https://img.shields.io/github/issues/johaankjis/Live-Streeam-Analytics-Dashboard)
![GitHub pull requests](https://img.shields.io/github/issues-pr/johaankjis/Live-Streeam-Analytics-Dashboard)
![GitHub stars](https://img.shields.io/github/stars/johaankjis/Live-Streeam-Analytics-Dashboard)
![GitHub license](https://img.shields.io/github/license/johaankjis/Live-Streeam-Analytics-Dashboard)

---

Made with ❤️ for the streaming community
