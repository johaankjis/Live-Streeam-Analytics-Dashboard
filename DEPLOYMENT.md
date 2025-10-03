# Deployment Guide

This guide covers deploying the Live Stream Analytics Dashboard using Docker and various cloud platforms.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ installed
- PostgreSQL database (Neon, Supabase, or self-hosted)
- Environment variables configured

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database
POSTGRES_URL=postgresql://user:password@host:5432/database
POSTGRES_PRISMA_URL=postgresql://user:password@host:5432/database
DATABASE_URL_UNPOOLED=postgresql://user:password@host:5432/database
POSTGRES_URL_NON_POOLING=postgresql://user:password@host:5432/database

# Application
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
\`\`\`

## Local Development with Docker

### Build and run with Docker Compose:

\`\`\`bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
\`\`\`

### Access the application:

- Application: http://localhost:3000
- PostgreSQL: localhost:5432
- Nginx: http://localhost:80

## Production Deployment

### 1. Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

Configure environment variables in Vercel dashboard.

### 2. Docker Hub

\`\`\`bash
# Build image
docker build -t yourusername/livestream-analytics:latest .

# Push to Docker Hub
docker push yourusername/livestream-analytics:latest

# Run on server
docker run -d \\
  -p 3000:3000 \\
  -e DATABASE_URL=your_database_url \\
  yourusername/livestream-analytics:latest
\`\`\`

### 3. AWS ECS/Fargate

1. Push Docker image to ECR
2. Create ECS task definition
3. Configure service with load balancer
4. Set environment variables in task definition

### 4. Google Cloud Run

\`\`\`bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/livestream-analytics

# Deploy to Cloud Run
gcloud run deploy livestream-analytics \\
  --image gcr.io/PROJECT_ID/livestream-analytics \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated
\`\`\`

### 5. DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

## Database Setup

### Run migrations:

\`\`\`bash
# Using Node.js
npm run migrate

# Using Docker
docker-compose exec app npm run migrate
\`\`\`

### Seed data:

\`\`\`bash
npm run seed
\`\`\`

## Monitoring

### Health Check Endpoint

\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`

### Logs

\`\`\`bash
# Docker logs
docker-compose logs -f app

# Application logs
tail -f logs/app.log
\`\`\`

## Scaling

### Horizontal Scaling

- Use load balancer (Nginx, AWS ALB, etc.)
- Run multiple app containers
- Use connection pooling for database

### Database Scaling

- Use read replicas for analytics queries
- Implement caching (Redis)
- Optimize indexes

## Security

- Use HTTPS in production
- Set up firewall rules
- Rotate database credentials
- Enable rate limiting
- Use environment variables for secrets

## Troubleshooting

### Database Connection Issues

\`\`\`bash
# Test database connection
docker-compose exec app node -e "require('./lib/db').sql\`SELECT 1\`"
\`\`\`

### Container Issues

\`\`\`bash
# Check container status
docker-compose ps

# View container logs
docker-compose logs app

# Restart services
docker-compose restart
\`\`\`

## CI/CD

The project includes GitHub Actions workflow for:

- Running tests
- Building Docker images
- Deploying to production

Configure secrets in GitHub repository settings:

- \`DATABASE_URL\`
- \`DOCKER_USERNAME\`
- \`DOCKER_PASSWORD\`
