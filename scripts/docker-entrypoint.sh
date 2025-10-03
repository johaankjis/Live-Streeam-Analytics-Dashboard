#!/bin/bash
set -e

echo "Starting Live Stream Analytics Dashboard..."

# Wait for database to be ready
echo "Waiting for database..."
until pg_isready -h postgres -U livestream; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready!"

# Run database migrations
echo "Running database migrations..."
node scripts/run-migrations.js

# Start the application
echo "Starting application..."
exec "$@"
