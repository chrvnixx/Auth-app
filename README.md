# Auth Pro

A full-stack authentication app built with React, Vite, Express, MongoDB, JWT, and Zustand. It supports account creation, login, email verification, password reset, protected routes, and cookie-based session handling.

## Features

- User signup with `name`, `email`, `username`, and password
- Login with either email or username
- Email verification with resend-code flow
- Forgot-password and reset-password flow
- Protected dashboard route for verified users
- JWT stored in an HTTP-only cookie
- MongoDB persistence with Mongoose
- Upstash rate limiting on API requests
- Mailtrap email delivery for verification and reset emails

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Zustand
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt
- cookie-parser
- Mailtrap
- Upstash Redis / Rate Limit

## Project Structure

```text
.
├── backend/
│   └── src/
│       ├── config/
│       ├── controller/
│       ├── mailtrap/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
├── package.json
└── .env
```

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm install
cd frontend && npm install
```

### 2. Create or update `.env`

Add these variables in the root `.env` file:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
MAILTRAP_TOKEN=your_mailtrap_token
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### 3. Run the app in development

Start the backend from the project root:

```bash
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Available Scripts

### Root

- `npm run dev` - starts the Express backend with Nodemon
- `npm start` - starts the backend in production mode
- `npm run build` - installs dependencies and builds the frontend

### Frontend

- `npm run dev` - starts the Vite dev server
- `npm run build` - builds the frontend
- `npm run preview` - previews the production build
- `npm run lint` - runs ESLint

## API Routes

Base route: `/api/auth`

- `POST /signup`
- `POST /login`
- `POST /logout`
- `POST /resend-code`
- `POST /verify-email`
- `POST /forgot-password`
- `POST /reset-password/:token`
- `GET /check-auth`

## Production Build

The backend is already set up to serve `frontend/dist` when `NODE_ENV=production`.

Typical production flow:

```bash
npm run build
npm start
```

## Important Notes

- The frontend auth store currently calls `http://localhost:4000/api/auth` directly.
- The backend CORS configuration currently allows `http://localhost:5173`.
- Password reset emails currently point to `http://localhost:5173/reset-password/:token`.
- If you deploy this project, update those hardcoded URLs so they match your production domains.
- API requests are rate-limited with Upstash at `20` requests per `30` seconds.

## Auth Flow Summary

1. A user signs up and receives a verification code by email.
2. After verification, the app treats the user as fully authenticated.
3. Login issues a JWT in an HTTP-only cookie.
4. Protected routes rely on `/check-auth` plus the verification state.
5. Forgot-password generates a reset token and sends a reset link by email.
