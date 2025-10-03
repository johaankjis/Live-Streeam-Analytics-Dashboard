# Live Stream Analytics Dashboard

A comprehensive real-time analytics platform for monitoring live stream performance metrics including viewer counts, chat activity, and stream health.

## Features

- **Real-Time Metrics**: Live updates every 5 seconds for viewer counts, chat velocity, and stream health
- **Interactive Visualizations**: D3.js-powered area charts with gradients and smooth animations
- **Multi-Stream Support**: Monitor multiple streams simultaneously with easy switching
- **Comprehensive Analytics**: Track engagement metrics, peak viewers, chat activity, and technical performance
- **Dark Theme UI**: Professional Vercel-inspired dark interface optimized for monitoring
- **REST API**: Full-featured API for data access and integration
- **Docker Support**: Production-ready containerization with Docker Compose
- **Testing Suite**: Comprehensive tests with Jest and React Testing Library
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **D3.js** - Data visualizations
- **shadcn/ui** - UI components

### Backend
- **Next.js API Routes** - REST API endpoints
- **PostgreSQL** - Database (via Neon)
- **@neondatabase/serverless** - Database client

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancing
- **GitHub Actions** - CI/CD pipeline

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/livestream-analytics.git
cd livestream-analytics
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` with your database credentials:
\`\`\`
DATABASE_URL=postgresql://user:password@host:5432/database
\`\`\`

4. Run database migrations:
\`\`\`bash
npm run migrate
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses the following tables:

- **streams** - Stream metadata and status
- **viewers** - Viewer count timeseries data
- **metrics** - General analytics metrics
- **chat_activity** - Chat velocity and engagement
- **stream_health** - Technical performance metrics

See `scripts/001-create-tables.sql` for the complete schema.

## API Endpoints

### Streams
- `GET /api/streams` - List all active streams
- `GET /api/streams/[streamId]` - Get stream details with all metrics
- `POST /api/streams/[streamId]/update` - Update stream metrics

### Analytics
- `GET /api/analytics/summary?streamId={id}` - Get comprehensive analytics summary
- `GET /api/analytics/timeseries?streamId={id}&metric={type}` - Get timeseries data

### Real-Time
- `GET /api/metrics/realtime?streamId={id}` - Get latest real-time metrics

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

## Testing

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── page.tsx           # Main dashboard page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── analytics-grid.tsx
│   ├── metric-card.tsx
│   ├── viewer-chart.tsx
│   └── ...
├── lib/                   # Utilities and helpers
│   ├── db.ts             # Database client
│   ├── api-client.ts     # API client
│   └── types.ts          # TypeScript types
├── hooks/                 # Custom React hooks
│   └── use-realtime-metrics.ts
├── scripts/               # Database scripts
│   ├── 001-create-tables.sql
│   └── 002-seed-data.sql
├── __tests__/            # Test files
│   ├── api/
│   ├── components/
│   └── lib/
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose config
└── nginx.conf           # Nginx configuration
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub or contact the maintainers.
