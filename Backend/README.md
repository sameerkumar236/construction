# AV Construction — Backend API

Express + MongoDB backend with JWT authentication (httpOnly cookies) and dynamic pricing management.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (access + refresh tokens via httpOnly cookies) |
| Password | bcrypt |
| Env | dotenv |

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js       # Login, logout, refresh, seed-admin, admin CRUD
│   │   └── pricing.controller.js    # GET & POST pricing
│   ├── models/
│   │   ├── user.model.js            # Admin user schema
│   │   └── pricing.model.js         # Pricing schema (MongoDB Map types)
│   ├── routes/
│   │   ├── auth.routes.js           # /api/auth/*
│   │   └── pricing.routes.js        # /api/pricing
│   ├── middlewares/
│   │   └── auth.middleware.js       # JWT verify middleware
│   └── Database/
│       └── connection.db.js         # MongoDB connection
├── .env                             # Environment variables (never commit)
├── .env.example                     # Template for env setup
├── server.js                        # Entry point
└── package.json
```

---

## Environment Variables

Create a `.env` file in the root of the backend folder:

```env
# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/av-construction

# JWT Secrets (use long random strings)
ACCESS_TOKEN_SECRET=your_random_access_secret_here
REFRESH_TOKEN_SECRET=your_random_refresh_secret_here

# Seed Admin (one-time use, can remove after first admin created)
SEED_SECRET=your_seed_secret_here

# Server
PORT=5000
NODE_ENV=development        # change to 'production' on server
CLIENT_URL=http://localhost:5173
```

> ⚠️ Never commit `.env` to git. Add it to `.gitignore`.

---

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

---

## Creating the First Admin

Since there is no public registration, the first admin must be created via the seed route.

**Step 1** — Make sure `SEED_SECRET` is set in `.env`

**Step 2** — Start the server, then run this curl command:

```bash
curl -X POST http://localhost:5000/api/auth/seed-admin \
  -H "Content-Type: application/json" \
  -d '{
    "seedSecret": "your_seed_secret_here",
    "name": "Admin",
    "email": "admin@avconstruction.com",
    "password": "YourPassword@123"
  }'
```

**Windows CMD:**
```cmd
curl -X POST http://localhost:5000/api/auth/seed-admin -H "Content-Type: application/json" -d "{\"seedSecret\":\"your_seed_secret_here\",\"name\":\"Admin\",\"email\":\"admin@avconstruction.com\",\"password\":\"YourPassword@123\"}"
```

**Response:**
```json
{ "message": "Admin created successfully" }
```

> After first admin is created, a second admin can be added from the Dashboard → Admins tab. Maximum 2 admins allowed.

---

## API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/seed-admin` | ❌ | One-time first admin creation |
| POST | `/login` | ❌ | Login with email & password |
| POST | `/refresh` | ❌ | Refresh access token using refresh cookie |
| POST | `/logout` | ❌ | Clear cookies and revoke refresh token |
| GET | `/me` | ✅ | Get current logged-in user |
| GET | `/admins` | ✅ | List all admins |
| POST | `/admins` | ✅ | Add second admin (max 2 total) |
| DELETE | `/admins/:id` | ✅ | Remove an admin (cannot remove yourself) |

---

### Pricing Routes — `/api/pricing`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ❌ Public | Fetch current pricing (used by calculator) |
| POST | `/` | ✅ Admin | Save updated pricing to database |

#### GET `/api/pricing` — Response shape

```json
{
  "pricing": {
    "buildTypes": {
      "Basic / Economy": 1850,
      "Standard RCC": 2350,
      "Semi-Premium": 2900,
      "Premium / Luxury": 3700,
      "Ultra-Luxury / Custom": 5000
    },
    "finishLevels": {
      "Basic":    { "mul": 0.90, "desc": "Plain plaster, basic tiles, no POP" },
      "Standard": { "mul": 1.00, "desc": "Good tiles, POP, modular switches" },
      "Premium":  { "mul": 1.20, "desc": "Italian marble, premium sanitary" },
      "Luxury":   { "mul": 1.45, "desc": "Imported stone, automation, high-end fixtures" }
    },
    "gstRate": 5,
    "archRate": 6,
    "contingency": 8,
    "addOns": [
      { "key": "parking", "label": "Car Parking", "fixed": 180000, "note": "Covered RCC slab" }
    ]
  }
}
```

#### POST `/api/pricing` — Request body

Same shape as the GET response `pricing` object. Requires valid `accessToken` cookie.

---

## Authentication Flow

```
User Login
  → POST /api/auth/login
  → Server sets httpOnly cookies:
      accessToken  (expires: 20 days)
      refreshToken (expires: 365 days)

Protected Request
  → Cookie sent automatically by browser
  → auth.middleware.js verifies accessToken
  → If expired → frontend calls POST /api/auth/refresh
  → New tokens issued, original request retried

Logout
  → POST /api/auth/logout
  → Cookies cleared
  → refreshToken revoked in DB
```

---

## Cookie Configuration

| Setting | Development | Production |
|---------|-------------|------------|
| `httpOnly` | `true` | `true` |
| `secure` | `false` | `true` |
| `sameSite` | `lax` | `none` |

Set `NODE_ENV=production` on your live server to enable secure cookies.

---

## Admin Rules

- Maximum **2 admins** at all times
- You **cannot remove yourself**
- You **cannot remove the last admin**
- Second admin can be added from Dashboard → Admins tab after logging in
- `seed-admin` route returns `409` if max admins already exist

---

## Models

### User Model (`user.model.js`)

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Unique, lowercase |
| `password` | String | bcrypt hashed automatically |
| `refreshTokens` | [String] | Max 5 stored per user |

### Pricing Model (`pricing.model.js`)

| Field | Type | Notes |
|-------|------|-------|
| `buildTypes` | Map\<String, Number\> | ₹/sqft rates |
| `finishLevels` | Map\<String, {mul, desc}\> | Multipliers |
| `gstRate` | Number | Stored as percentage (e.g. 5) |
| `archRate` | Number | Stored as percentage (e.g. 6) |
| `contingency` | Number | Stored as percentage (e.g. 8) |
| `addOns` | Array | `{key, label, fixed, note}` |
| `updatedBy` | ObjectId | Ref to User |

> Only **one** Pricing document exists in the DB (upsert pattern).

---

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module '../models/pricing.model'` | File named `Pricing.modle.js` | Rename to `pricing.model.js` |
| `403 Forbidden` on seed-admin | `SEED_SECRET` mismatch | Check `.env` and restart server |
| `401 No access token` | Cookie not sent | Ensure `credentials: 'include'` in frontend fetch |
| `Token expired` | accessToken expired | Frontend should auto-refresh via `/api/auth/refresh` |
| `Cannot find module '../models/user.model'` | File named `auth.modle.js` | Rename to `user.model.js` |

---

## Scripts

```bash
npm run dev      # nodemon server.js (hot reload)
npm start        # node server.js (production)
```

---

## Notes

- Pricing defaults are returned automatically if no data exists in DB yet
- MongoDB Map fields are converted to plain objects before sending to frontend
- The public calculator (`GET /api/pricing`) requires no authentication
- All admin routes require a valid `accessToken` httpOnly cookie