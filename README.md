# 3W Leaderboard App

A full-stack web application for managing a points-based leaderboard, allowing users to claim random points and view claim history.

---

## 📦 Backend

**Tech Stack:** Node.js, Express, MongoDB, Mongoose

### Structure

```
backend/
  .env
  package.json
  server.js
  models/
    User.js
    History.js
  routes/
    userRoutes.js
    claimRoutes.js
```

### Features

- **User Management:** Add new users, fetch all users.
- **Leaderboard:** View users sorted by total points.
- **Claim Points:** Users can claim random points (1-10), which updates their total and logs the claim in history.
- **Claim History:** View the latest 50 claims.

### API Endpoints

- `GET /api/users` — List all users
- `POST /api/users` — Add a new user (`{ name }`)
- `GET /api/leaderboard` — Sorted users by points
- `POST /api/claim` — Claim random points (`{ userId }`)
- `GET /api/history` — Recent claim history

### Setup

1. Install dependencies:
   ```
   cd backend
   npm install
   ```
2. Configure `.env` with your MongoDB URI and desired port.
3. Start server:
   ```
   npm run dev
   ```
   (or `npm start` for production)

---

## 💻 Frontend

**Tech Stack:** React, Axios, Tailwind CSS (for styling)

### Structure

```
frontend/
  src/
    App.jsx
    ...
```

### Features

- **Claim Points:** Select a user and claim random points.
- **Add User:** Add new users to the leaderboard.
- **Leaderboard:** View top 3 users and full leaderboard.
- **Claim History:** See recent point claims with user, points, and timestamp.

### Main Logic (`App.jsx`)

- Fetches users, leaderboard, and history from backend.
- Handles claiming points and adding users.
- Displays UI for leaderboard, claim history, and user actions.

### Setup

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start React app:
   ```
   npm start
   ```
3. Ensure backend is running on `localhost:5000`.

---

## 🚀 Usage

1. Start backend (`npm run dev` in `backend/`)
2. Start frontend (`npm start` in `frontend/`)
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Notes

- Avatars are generated using DiceBear based on user names.
- Backend uses MongoDB Atlas (see `.env` for connection).
- Claim history shows the latest 50 claims.

---