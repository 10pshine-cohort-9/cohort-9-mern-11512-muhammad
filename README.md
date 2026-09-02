# Notes App — MERN Stack

A full-stack notes web application built as part of the 10Pearls Shine Cohort 9 program. Users can sign up, log in, create rich-text notes, search through their notes, edit, and delete them securely.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Lucide Icons, React Quill
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Neon Serverless)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Logging:** Pino & Pino-HTTP
- **Testing:** Mocha & Chai (Backend), Jest & React Testing Library (Frontend)
- **Code Quality:** SonarQube

---

## ✨ Features

- **User Authentication:** Secure user registration and login with password hashing and JWT authorization.
- **Rich Text Notes:** Create and format notes with bold, italics, headings, and lists using rich text editing.
- **Search & Filter:** Real-time search across note titles and contents.
- **Protected Endpoints:** All note operations (Create, Read, Update, Delete) are strictly scoped to the logged-in user.
- **Application Logging:** Structured JSON request and error logging with sensitive token redaction using Pino.
- **Clean UI:** Responsive Swiss dark theme with modal popups and confirmation dialogs.

---

## 📁 Project Structure

```
├── backend/
│   ├── controllers/      # Auth and note CRUD business logic
│   ├── routes/           # Express API route definitions
│   ├── src/
│   │   ├── config/       # Database connection and Pino logger setup
│   │   ├── app.js        # Express middleware and app configuration
│   │   └── index.js      # Server entry point
│   ├── test/             # Mocha + Chai integration tests
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios client with auth interceptor
│   │   ├── components/   # Navbar, NoteCard, NoteModal, ConfirmModal
│   │   ├── context/      # AuthContext for state management
│   │   ├── pages/        # Login, Register, Dashboard
│   │   └── tests/        # Jest component unit tests
│   └── package.json
│
├── sonar-project.properties
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database URL (e.g. Neon, local PG, or Supabase)

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend development server:

```bash
npm run dev
```
The server will start at `http://localhost:5000`.

---

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:5173`.

---

## 🧪 Running Tests

### Backend Tests (Mocha + Chai)
Runs 9 integration tests testing registration, login, auth middleware, and note CRUD endpoints:
```bash
cd backend
npm test
```

### Frontend Tests (Jest + React Testing Library)
Runs component unit tests for NoteCard and confirmation modals:
```bash
cd frontend
npm test
```

---

## 📊 Code Quality & SonarQube

To run code quality and vulnerability analysis:
```bash
npx sonar-scanner \
  -Dsonar.projectKey=Notes-App \
  -Dsonar.sources=backend,frontend/src \
  -Dsonar.tests=backend/test,frontend/src/tests \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=your_sonarqube_token
```

---

## 👤 Author
- **Muhammad Abubakkar**
- Cohort 9 MERN Track — 10Pearls Shine
