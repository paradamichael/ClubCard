# Google OAuth Setup Instructions

## Step 1: Get Your Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - If prompted, configure the OAuth consent screen first:
     - User Type: External
     - App name: ClubCard (or your app name)
     - User support email: your email
     - Developer contact: your email
     - Save and continue through the scopes (you can skip adding scopes)
     - Add test users if needed
   
5. Configure the OAuth Client:
   - Application type: **Web application**
   - Name: ClubCard Web Client
   - Authorized JavaScript origins:
     - `http://localhost:5173`
     - Add your production domain later (e.g., `https://clubcard.com`)
   - Authorized redirect URIs:
     - `http://localhost:5173`
     - Add your production domain later
   - Click "Create"

6. Copy the **Client ID** (looks like: `123456789-abcdefg.apps.googleusercontent.com`)

## Step 2: Add Client ID to Your App

Open the `.env.local` file in the root of your project and replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:

```
VITE_GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
```

## Step 3: Test It

1. Start your backend server
2. Start your frontend: `npm run dev`
3. Go to the login page
4. You should see a "Sign in with Google" button
5. Click it and sign in with your Google account

## Notes

- The backend endpoint `/api/auth/google` is already set up to handle Google OAuth tokens
- The frontend will send the Google ID token to your backend for verification
- Your backend will create or find the user and return the user object
- Make sure to add production URLs to Google Console before deploying!
