#!/bin/bash

echo "🚀 Starting AI Learning Platform..."

# Step 1: Navigate to root directory
cd "$(dirname "$0")"

# Step 2: Bring down old containers (clean start)
echo "🧹 Stopping old containers..."
docker compose down

# Step 3: Build and start services
echo "🔧 Building and starting services..."
docker compose up -d --build

# Step 4: Wait a few seconds for containers to be ready
echo "⏳ Waiting for containers to start..."
sleep 8

# Step 5: Check running containers
echo "📦 Running containers:"
docker ps

# Step 6: Print final info
echo ""
echo "✅ System is up!"
echo "🌐 Frontend: http://localhost:3000"
echo "🧠 Backend API: http://localhost:5000"
