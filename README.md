<div align="center">

# ZenDo 🧘

**Stay calm. Stay productive.**

A full-stack MERN task manager with JWT authentication and a clean, distraction-free interface.

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Deployment](#-deployment) · [Roadmap](#-roadmap)

</div>

---

## 📖 Overview

ZenDo lets users register, log in, and manage a personal to-do list. The React single-page app talks to an Express REST API backed by MongoDB. Passwords are hashed with bcrypt, and every task endpoint requires a valid JWT.

<!--
Add screenshots and a live demo link once available:

**Live demo:** https://your-zendo-url.vercel.app

| Login | Dashboard |
|---|---|
| ![Login](docs/screenshots/login.png) | ![Dashboard](docs/screenshots/dashboard.png) |
-->

---

## ✨ Features

- **Account system**: register and log in with email and password
- **Secure auth**: bcrypt password hashing (10 salt rounds) and JWTs that expire after 1 day
- **Protected API**: all `/api/tasks` routes go through authentication middleware
- **Protected UI**: the dashboard is guarded by a `PrivateRoute` component that redirects unauthenticated visitors to the login page
- **Task management**: add tasks, mark them done or undo, and delete them
- **Per-user task lists**: tasks are stored with their owner and listed only for the logged-in user
- **Polished UI**: gradient background, glassmorphism cards, loading spinner, empty state, and toast notifications for every action

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, React Router 7, Axios, Tailwind CSS 3, React Hot Toast, Create React App |
| **Backend** | Node.js, Express 5, Mongoose 9, jsonwebtoken, bcryptjs, cors, dotenv, nodemon (dev) |
| **Database** | MongoDB (local instance or MongoDB Atlas) |

---

## 🏗️ Architecture

```text
┌───────────────┐   Axios (JSON + Bearer token)   ┌────────────────────┐   Mongoose   ┌─────────────┐
│  React SPA    │ ──────────────────────────────▶ │  Express REST API  │ ───────────▶ │   MongoDB   │
│  (port 3000)  │ ◀────────────────────────────── │    (port 5000)     │ ◀─────────── │ Users/Tasks │
└───────────────┘                                 └────────────────────┘              └─────────────┘
```

**How authentication works**

1. `POST /api/auth/login` verifies the credentials and returns a signed JWT.
2. The frontend stores the token in `localStorage`.
3. An Axios request interceptor attaches `Authorization: Bearer <token>` to every API call.
4. `authMiddleware` verifies the token, sets `req.user` to the user's id, and rejects missing or invalid tokens with `401`.

---

## 📂 Project Structure

```text
ZenDo/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # register, login
│   │   └── taskController.js      # create, list, update, delete tasks
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # app entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.js    # route guard
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── utils/
│   │   │   └── api.js             # Axios instance + auth interceptor
│   │   ├── App.js                 # routes
│   │   ├── index.css              # Tailwind directives
│   │   └── index.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS) and npm
- A MongoDB database: a local install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- [Git](https://git-scm.com/)

### 1. Clone

```bash
git clone https://github.com/blazePrakhar/zendo.git
cd zendo
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env` from the template:

```bash
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the API:

```bash
npm run dev     # auto-reload with nodemon
# or
npm start       # plain node
```

Visit `http://localhost:5000`. You should see `API is running...`.

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

The app opens at `http://localhost:3000`.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No (defaults to `5000`) | Port the Express server listens on |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret used to sign and verify tokens. Use a long, random string. |

> ⚠️ Never commit `backend/.env`. It is already listed in `.gitignore`; only `.env.example` (placeholders) is tracked.

### Available scripts

| Location | Command | Purpose |
|---|---|---|
| `backend` | `npm start` | Run the API with Node |
| `backend` | `npm run dev` | Run the API with nodemon |
| `frontend` | `npm start` | Start the React dev server |
| `frontend` | `npm run build` | Create a production build in `frontend/build` |
| `frontend` | `npm test` | Run the test runner |

---

## 🖥️ Application Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Login page |
| `/register` | Public | Registration page |
| `/dashboard` | Authenticated | Task list, add, complete, undo, delete, logout |

---

## 📡 API Reference

**Base URL:** `http://localhost:5000/api`

### Auth

| Method | Endpoint | Description | Success |
|---|---|---|---|
| `POST` | `/auth/register` | Create an account | `201` `{ "msg": "User registered" }` |
| `POST` | `/auth/login` | Log in | `200` `{ "token": "<jwt>" }` |

**Register request**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your_password"
}
```

**Login request**

```json
{
  "email": "john@example.com",
  "password": "your_password"
}
```

Error responses: `400` for an existing email (`User already exists`) or bad credentials (`Invalid credentials`), and `500` for server errors.

### Tasks

Every task request needs the header:

```http
Authorization: Bearer <JWT_TOKEN>
```

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/tasks` | `{ "title": "Buy milk" }` | Create a task (`201`, returns the task) |
| `GET` | `/tasks` | none | List the authenticated user's tasks |
| `PUT` | `/tasks/:id` | `{ "completed": true }` | Update a task and return the updated document |
| `DELETE` | `/tasks/:id` | none | Delete a task (`{ "msg": "Task deleted" }`) |

Missing or invalid tokens return `401` (`No token, access denied` / `Invalid token`).

**Quick test with cURL**

```bash
# Log in and copy the token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"your_password"}'

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete Java practice"}'
```

---

## 🗄️ Data Models

**User**

| Field | Type | Notes |
|---|---|---|
| `name` | String | required |
| `email` | String | required, unique |
| `password` | String | required, stored as a bcrypt hash |
| `createdAt`, `updatedAt` | Date | added automatically |

**Task**

| Field | Type | Notes |
|---|---|---|
| `user` | ObjectId → `User` | owner of the task |
| `title` | String | required |
| `completed` | Boolean | defaults to `false` |
| `createdAt`, `updatedAt` | Date | added automatically |

---

## ☁️ Deployment

A common setup is Vercel (frontend), Render (backend), and MongoDB Atlas (database).

**Backend on Render**

```text
Root Directory:  backend
Build Command:   npm install
Start Command:   npm start
```

Set `MONGO_URI` and `JWT_SECRET` as environment variables in the dashboard. In Atlas, allow your host's IP under Network Access.

**Frontend on Vercel**

The API URL is currently hardcoded to `http://localhost:5000`, so update it before deploying:

- `frontend/src/utils/api.js`: `baseURL`
- `frontend/src/pages/Login.js`: the login request URL

A cleaner approach is to read it from an environment variable such as `REACT_APP_API_URL` and use it in both places.

The backend currently calls `cors()` with defaults (all origins allowed). For production, restrict it to your frontend's domain.

---

## 🗺️ Roadmap

- [ ] Edit task titles from the UI
- [ ] Ownership checks on task update and delete
- [ ] Move the API base URL to an environment variable
- [ ] Input validation (email format, password length, title length)
- [ ] Priorities, due dates, and categories
- [ ] Search, filtering, sorting, and pagination
- [ ] Password reset and profile management
- [ ] Automated tests and CI
- [ ] Dark mode

---

## 🤝 Contributing

Issues and pull requests are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a pull request

---

## 👤 Author

**Prakhar**: [@blazePrakhar](https://github.com/blazePrakhar)

<div align="center">

If ZenDo helped you, consider giving it a ⭐

</div>
