# Deployment Guide

This guide walks you through deploying the Golf Score App to production using Render (backend) and Vercel (frontend).

## Prerequisites

- GitHub account with the ClubCard repository
- Render.com account (free tier)
- Vercel account (free tier)
- Supabase database (already configured)

---

## Backend Deployment (Render.com)

### Step 1: Push Latest Code to GitHub

```bash
cd /Users/mparada/Projects/GolfScoreApp
git add -A
git commit -m "chore: Add deployment configuration for Render and Vercel"
git push origin develop
```

### Step 2: Create New Web Service on Render

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account and select the **paradamichael/ClubCard** repository
4. Configure the service:
   - **Name**: `golf-score-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `develop`
   - **Root Directory**: `backend`
   - **Runtime**: `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/GolfScoreBackend-0.0.1-SNAPSHOT.jar`

### Step 3: Add Environment Variables

In the Render dashboard, add these environment variables:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://db.ujfxongaarpwmesddopn.supabase.co:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=T!uD8fP9Ss7m@D?
```

### Step 4: Deploy

Click **"Create Web Service"**. Render will:
- Clone your repository
- Build the JAR with Maven
- Run Flyway migrations automatically
- Start the backend server

Your backend URL will be: `https://golf-score-backend.onrender.com`

**Note**: Free tier services sleep after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

---

## Frontend Deployment (Vercel)

### Step 1: Create New Project on Vercel

1. Go to https://vercel.com/new
2. Import the **paradamichael/ClubCard** repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Add Environment Variables

In Vercel project settings → Environment Variables, add:

```
VITE_API_URL=https://golf-score-backend.onrender.com/api
VITE_GOOGLE_CLIENT_ID=907792347440-1itf5e9512tfnrhoce3rib2uajcvgt01.apps.googleusercontent.com
```

### Step 3: Deploy

Click **"Deploy"**. Vercel will:
- Install dependencies
- Build the Vite app
- Deploy to global CDN

Your frontend URL will be: `https://club-card-<random>.vercel.app`

You can customize this to: `https://your-custom-domain.vercel.app`

---

## Post-Deployment Configuration

### Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add Authorized JavaScript origins:
   ```
   https://your-app.vercel.app
   ```
4. Add Authorized redirect URIs:
   ```
   https://your-app.vercel.app
   ```

### Update CORS in Backend (if needed)

If you encounter CORS errors, update the backend `SecurityConfig.java`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("https://your-app.vercel.app");
    configuration.addAllowedMethod("*");
    configuration.addAllowedHeader("*");
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

## Continuous Deployment

Both Render and Vercel are configured for automatic deployments:

- **Push to `develop` branch** → Both services automatically deploy
- Render rebuilds backend
- Vercel rebuilds frontend

---

## Monitoring & Logs

### Render Logs
- Go to your service dashboard
- Click **"Logs"** tab
- View real-time backend logs

### Vercel Logs
- Go to your project dashboard
- Click **"Deployments"** → Select deployment
- View build and function logs

---

## Troubleshooting

### Backend not starting
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure database is accessible from Render's IP

### Frontend API calls failing
- Check `VITE_API_URL` environment variable
- Verify backend URL is accessible
- Check browser console for CORS errors
- Wait 30 seconds if backend is sleeping (free tier)

### Database connection issues
- Verify Supabase allows connections from Render's IPs
- Check connection string format
- Ensure password special characters are properly escaped

---

## Cost Estimate

- **Render Free Tier**: 750 hours/month, sleeps after inactivity
- **Vercel Free Tier**: 100 GB bandwidth, unlimited deployments
- **Supabase Free Tier**: 500MB database, 2GB bandwidth

**Total Monthly Cost**: $0 (with free tiers)

For production use with no sleep time:
- Render Standard: $7/month
- Vercel Pro: $20/month (optional)
- Supabase Pro: $25/month (optional)

---

## Next Steps

1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Test the production app
4. Set up custom domain (optional)
5. Configure monitoring/alerts (optional)
6. Set up CI/CD pipelines for testing (optional)
