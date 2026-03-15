# NexusMind Backend (MVP)

API backend for the NexusMind problem-solving platform.

## Setup

```bash
cd backend
npm install
```

## Run

```bash
npm start          # production
npm run dev        # development (with --watch)
```

Server runs at `http://localhost:3001` by default.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | Yes (production) | Secret for JWT signing |
| `PORT` | No | Server port (default: 3001) |
| `NODE_ENV` | No | `development` or `production` |
| `DATABASE_PATH` | No | SQLite file path (default: `nexusmind.db`) |
| `CORS_ORIGIN` | No | Allowed origins, comma-separated. `*` = allow all |

Copy `.env.example` to `.env` and configure for production.

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register with `displayName`, `email` or `phone`, `password` |
| POST | `/auth/login` | No | Login with `email` or `phone`, `password` |
| GET | `/auth/me` | Yes | Get current user (Bearer token) |

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/:id` | No | Get public user profile |
| PATCH | `/users/me` | Yes | Update display name, profile image |

### Problems

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/problems` | Yes | Create problem: `title`, `description`, `category` |
| GET | `/problems` | No | Fetch problems (query: `limit`, `offset`) |
| GET | `/problems/:id` | No | Fetch single problem |
| GET | `/problems/user/:userId` | No | Fetch problems by user (query: `limit`, `offset`) |
| PATCH | `/problems/:id/status` | Yes | Update status to `open` or `solved` (author only) |

### Solutions

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/problems/:problemId/solutions` | Yes | Submit solution: `content` |
| GET | `/problems/:problemId/solutions` | No | Fetch solutions for a problem |

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Health check (returns DB status) |

## Request Headers

Protected endpoints require:
```
Authorization: Bearer <token>
```

## Error Format

All errors return `{ error: string, code?: string }`:
- `error`: Human-readable message
- `code`: Optional machine-readable code (e.g. `AUTH_REQUIRED`, `RATE_LIMIT_EXCEEDED`)
