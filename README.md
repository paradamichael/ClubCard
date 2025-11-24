# ClubCard

A monorepo containing a React + TypeScript PWA frontend and Spring Boot backend for tracking golf scores, club distances, and scorecards with Google SSO via Keycloak.

> **📖 New to the project?** See [SETUP.md](./SETUP.md) for complete development setup instructions including Java, Maven, PostgreSQL, and Keycloak configuration.

## Project Structure

```
.
├── src/                    # Frontend React app
├── backend/                # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
├── public/
├── package.json           # Frontend dependencies
└── README.md
```

## Quick Start

### Frontend

```bash
# from project root
npm install
npm run dev
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

PWA

The project includes `vite-plugin-pwa` configuration in `vite.config.ts`. Add more icons in `public/` for a better installable experience.

Keycloak + Google SSO (local dev)

1. Run Keycloak locally (Docker):

```bash
docker run -p 8081:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:20.0.0 start-dev
```

2. Open http://localhost:8081, create a realm `clubcard`, create a client `clubcard-frontend` (Public, Valid Redirect URI `http://localhost:5173/*`) and enable `Standard Flow` + `PKCE`.

3. Configure Google IdP in Keycloak (Identity Providers → Google):
	- Create Google OAuth client via Google Cloud Console (OAuth consent screen + credentials → OAuth client ID). Set Authorized redirect URI to: `http://localhost:5173/*` and the Keycloak callback URL.
	- Copy client ID/secret into Keycloak Google IdP settings.

4. Set Vite env vars (in `.env`):

```
VITE_API_URL=http://localhost:8080/api
VITE_KEYCLOAK_URL=http://localhost:8081
VITE_KEYCLOAK_REALM=clubcard
VITE_KEYCLOAK_CLIENT_ID=clubcard-frontend
```

5. Install frontend deps and run:

```bash
npm install
npm run dev
```

ElephantSQL (Postgres free)

1. Create an account at ElephantSQL and create a tiny instance.
2. Copy the provided `postgres://user:pass@host:5432/dbname` URL.
3. Set backend environment variables or export them before running:

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:5432/<dbname>
export SPRING_DATASOURCE_USERNAME=<user>
export SPRING_DATASOURCE_PASSWORD=<pass>
export SPRING_OIDC_ISSUER_URI=http://localhost:8081/realms/clubcard
```

Run backend:

```bash
cd backend
mvn spring-boot:run
```

Capacitor iOS (sideload to device)

1. Install Capacitor and add iOS platform:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init ClubCard com.paradamichael.clubcard
npm run build
npx cap add ios
npx cap open ios
```

2. In Xcode, select your team (Apple ID) in Signing & Capabilities, connect your device, and run the app to sideload.

Security notes

- For production, host Keycloak on a TLS-enabled host and do not use `start-dev`.
- Keep `SPRING_OIDC_ISSUER_URI` pointed to your production Keycloak realm.
- Restrict CORS to your production frontend domain.
