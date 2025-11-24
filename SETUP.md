# Development Setup Guide

## Prerequisites

### 1. Install Java (JDK 17+)

```bash
# macOS - Install via Homebrew
brew install openjdk@17

# Add to your PATH (add to ~/.zshrc or ~/.bash_profile)
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
```

Or download from [Adoptium](https://adoptium.net/) or [Oracle](https://www.oracle.com/java/technologies/downloads/).

### 2. Install Maven

```bash
# macOS - Install via Homebrew
brew install maven

# Verify installation
mvn -version
```

### 3. Install Node.js (if not already installed)

```bash
# macOS - Install via Homebrew
brew install node

# Verify installation
node -v
npm -v
```

## Monorepo Structure

```
ClubCard/
├── src/                   # Frontend React app
├── backend/               # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │           ├── application.yml
│   │           └── db/migration/  # Flyway migrations
│   └── pom.xml
├── public/
├── package.json
└── README.md
```

## Development Workflow

### Frontend Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

### Backend Development

```bash
# Build backend
npm run backend:build
# or
cd backend && mvn clean package

# Run backend (http://localhost:8080)
npm run backend:dev
# or
cd backend && mvn spring-boot:run
```

### Full Stack Development

1. **Start Backend** (Terminal 1):
   ```bash
   npm run backend:dev
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```

3. **Access**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api

## Database Setup

### Option 1: ElephantSQL (Free Cloud PostgreSQL)

1. Create account at [ElephantSQL](https://www.elephantsql.com/)
2. Create a "Tiny Turtle" (free) instance
3. Copy the connection URL
4. Set environment variables:

```bash
export SPRING_DATASOURCE_URL="jdbc:postgresql://your-host.db.elephantsql.com:5432/your-db"
export SPRING_DATASOURCE_USERNAME="your-username"
export SPRING_DATASOURCE_PASSWORD="your-password"
```

### Option 2: Local PostgreSQL

```bash
# macOS - Install via Homebrew
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb clubcard

# Set environment variables
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/clubcard"
export SPRING_DATASOURCE_USERNAME="your-username"
export SPRING_DATASOURCE_PASSWORD="your-password"
```

### Flyway Migrations

The backend uses Flyway to manage database schema. On startup, it will:
1. Create all tables (users, clubs, courses, holes, scorecards)
2. Seed the **Pecan Hollow Golf Course** with 18 holes

Migration file: `backend/src/main/resources/db/migration/V1__init.sql`

## Keycloak Setup (for Google SSO)

### Run Keycloak Locally

```bash
docker run -p 8081:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:20.0.0 start-dev
```

### Configure Keycloak

1. Open http://localhost:8081
2. Login with `admin` / `admin`
3. Create realm: `clubcard`
4. Create client: `clubcard-frontend`
   - Client type: OpenID Connect
   - Client authentication: Off (public client)
   - Valid redirect URIs: `http://localhost:5173/*`
   - Web origins: `http://localhost:5173`
5. Configure Google Identity Provider:
   - Go to Identity Providers → Add provider → Google
   - Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
   - Add Redirect URI from Keycloak to Google OAuth client
   - Copy Client ID and Secret to Keycloak

### Environment Variables

Create `.env` in project root:

```env
# Frontend
VITE_API_URL=http://localhost:8080/api
VITE_KEYCLOAK_URL=http://localhost:8081
VITE_KEYCLOAK_REALM=clubcard
VITE_KEYCLOAK_CLIENT_ID=clubcard-frontend
```

Backend environment variables:

```bash
export SPRING_DATASOURCE_URL="jdbc:postgresql://..."
export SPRING_DATASOURCE_USERNAME="..."
export SPRING_DATASOURCE_PASSWORD="..."
export SPRING_OIDC_ISSUER_URI="http://localhost:8081/realms/clubcard"
```

## Mobile Development (iOS)

### Setup Capacitor

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios

# Initialize
npx cap init ClubCard com.paradamichael.clubcard

# Add iOS platform
npx cap add ios

# Build and sync
npm run cap:sync:ios

# Open in Xcode
npm run cap:open:ios
```

### Sideload to iPhone

1. Open project in Xcode
2. Select your team (Apple ID) in Signing & Capabilities
3. Connect your iPhone via USB
4. Select your device as the build target
5. Click Run ▶️

The app will install on your device without App Store publishing.

## Troubleshooting

### Backend won't start

- Check Java version: `java -version` (should be 17+)
- Check Maven: `mvn -version`
- Verify database connection (check environment variables)
- Check logs for port conflicts (default: 8080)

### Frontend can't reach backend

- Ensure backend is running on http://localhost:8080
- Check `.env` file has correct `VITE_API_URL`
- Check browser console for CORS errors
- Verify `SecurityConfig.java` has CORS configured

### Keycloak issues

- Ensure Keycloak is running on port 8081
- Check realm name matches in `.env` and `SPRING_OIDC_ISSUER_URI`
- Verify redirect URIs in Keycloak client config
- Check browser console for authentication errors

## Production Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard.

### Backend (Railway/Fly.io)

Railway:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

Set environment variables in Railway dashboard.

## Next Steps

1. Install Java, Maven, and Node.js
2. Set up a PostgreSQL database (ElephantSQL recommended)
3. Configure environment variables
4. Start backend: `npm run backend:dev`
5. Start frontend: `npm run dev`
6. Visit http://localhost:5173

For Google SSO, set up Keycloak following the guide above.
