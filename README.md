
# Student Registration System

A full-stack web application for student registration built with React (JSX), Node.js, Express.js, MongoDB, Mongoose, JWT authentication, and Nodemailer.

---
  
## 1. Project Overview
The Student Registration System allows applicants to fill out their academic and personal details through a sleek, responsive, glassmorphic UI. Submitted applications are validated both on the client and server, stored in MongoDB with unique constraints (such as non-duplicate Roll Numbers), and trigger automated admin email notifications via Nodemailer. Protected administrative APIs allow authenticated admins to view and manage registered applicants using JWT tokens.

---

## 2. Technologies Used

### Frontend
- **React 19 (JSX)**
- **Vite** (Build tool & dev server)
- **Vanilla CSS** (Custom responsive design with modern glassmorphic aesthetics)
- **Lucide React** (Modern UI icons)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose** (Object Data Modeling)
- **JSON Web Tokens (JWT)** (Admin Authentication)
- **Nodemailer** (SMTP Email Notifications)
- **Cors** & **dotenv** (Security & Environment variable management)

---

## 3. Folder Structure

```
student-registration/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── RegistrationForm.jsx
│       ├── pages/
│       │   └── Registration.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   └── authRoutes.js
│   ├── services/
│   │   └── emailService.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## 4. Installation Steps

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas URL)

### Clone & Dependencies Setup
```bash
# Install root package dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## 5. Environment Variables Required

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/student_registration
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=30d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user@example.com
SMTP_PASSWORD=your_smtp_password
SMTP_FROM="Student Portal <no-reply@studentportal.com>"
CLIENT_URL=http://localhost:5173
```

---

## 6. How to Run Frontend

```bash
cd client
npm run dev
```
The React frontend application will be available at `http://localhost:5173`.

---

## 7. How to Run Backend

```bash
cd server
npm run dev
# or
npm start
```
The Express API server will start on `http://localhost:5000`.

---

## 8. API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/students/register` | Submit a new student registration |
| `POST` | `/api/auth/login` | Admin login & get JWT token |

### Protected Endpoints (Requires `Authorization: Bearer <JWT_TOKEN>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Get list of all registered applicants |
| `GET` | `/api/students/:id` | Get details of a single student by ID |

---

## 9. Testing Instructions

### Client Side Testing
1. Open `http://localhost:5173/`.
2. Test field validations (e.g. invalid phone number, marks > 100, empty fields).
3. Submit the form to test live API communication and visual success toasts.

### Server Side Testing (Postman / cURL)
1. **Admin Login:**
   - `POST http://localhost:5000/api/auth/login`
   - Body: `{ "email": "admin@example.com", "password": "your_admin_password" }`
   - Save the returned `token`.

2. **Fetch Applicants:**
   - `GET http://localhost:5000/api/students`
   - Header: `Authorization: Bearer <token>`

3. **Fetch Single Applicant:**
   - `GET http://localhost:5000/api/students/:id`
   - Header: `Authorization: Bearer <token>`

---

## 10. Security Notes
- **No Hardcoded Secrets:** All credentials (`JWT_SECRET`, `MONGO_URI`, `SMTP_PASSWORD`, `ADMIN_PASSWORD`) are loaded via environment variables.
- **Git Protection:** `.env` and `node_modules` are included in `.gitignore`.
- **Client Security:** Frontend code contains zero backend secrets or SMTP credentials.
- **Unique Constraints & Sanitization:** Roll numbers are indexed with unique constraints in MongoDB to prevent duplicate entries, and input fields are validated server-side.
- **Centralized Error Handling:** Sensitive database trace errors are hidden in production environment responses.
