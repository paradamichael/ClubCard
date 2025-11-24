#!/bin/bash

# Backend Environment Setup Script
# Run this before starting the backend: source backend/setup-env.sh

echo "🗄️  Setting up backend environment variables..."

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  No backend/.env file found!"
    echo "📝 Creating template from .env.example..."
    cp backend/.env.example backend/.env
    echo ""
    echo "✅ Created backend/.env"
    echo "🔧 Please edit backend/.env with your actual ElephantSQL credentials"
    echo ""
    echo "Get your credentials from: https://customer.elephantsql.com/"
    echo ""
    exit 1
fi

# Load environment variables from .env file
echo "📥 Loading environment variables from backend/.env..."
export $(grep -v '^#' backend/.env | xargs)

# Verify required variables are set
if [[ -z "$SPRING_DATASOURCE_URL" || "$SPRING_DATASOURCE_URL" == *"YOUR_"* ]]; then
    echo "❌ SPRING_DATASOURCE_URL not configured!"
    echo "📝 Please edit backend/.env with your ElephantSQL credentials"
    exit 1
fi

echo "✅ Environment variables loaded successfully!"
echo ""
echo "Database: $SPRING_DATASOURCE_URL"
echo "Username: $SPRING_DATASOURCE_USERNAME"
echo ""
echo "🚀 You can now run: cd backend && mvn spring-boot:run"
