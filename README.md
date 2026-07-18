<div align="center">

# 🏛️ SevaSetu

### 🌆 Smart Municipal Complaint Management System

**Bridging the gap between Citizens and Civic Authorities — one complaint at a time.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Made with Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/your-username/sevasetu?style=social)](https://github.com/your-username/sevasetu/stargazers)

[🚀 Live Demo](https://seva-setu-4nhmd8atl-subhrank-priyas-projects.vercel.app/) · [📦 Repository](https://github.com/subhrank09/Seva-Setu)

</div>

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [User Roles](#-user-roles)
- [Application Workflow](#-application-workflow)
- [Authentication Flow](#-authentication-flow)
- [Deployment Guide](#-deployment-guide)
- [Security Features](#-security-features)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)
- [Support](#-support)

---

## 🧭 About The Project

> **SevaSetu** (सेवा सेतु — "Bridge of Service") is a full-stack, production-ready **Municipal Corporation Complaint Management System** that digitizes the way citizens report civic issues and the way municipal bodies resolve them.

Citizens can report public issues like potholes, garbage, streetlight failures, or water leakage — complete with **GPS location** and **photographic evidence**. Municipal **Workers** get assigned complaints to resolve, and **Administrators** get a bird's-eye view of the entire civic ecosystem through analytics dashboards.

Built with a modern **React + Node + PostgreSQL** stack, SevaSetu focuses on real-world usability, clean architecture, and role-based access control — making it a great reference project for civic-tech, government-tech, or SaaS-style complaint systems.

> [!TIP]
> This project is perfect for learning full-stack development with **Prisma ORM**, **JWT authentication**, **Leaflet maps**, and **Cloudinary image uploads**.

---

## 🚀 Live Demo

| Environment | Link |
|-------------|------|
| 🌐 Frontend (Vercel) | [https://sevasetu.vercel.app](https://seva-setu-4nhmd8atl-subhrank-priyas-projects.vercel.app/) |
| ⚙️ Backend API (Render) | [https://sevasetu-api.onrender.com](https://seva-setu-backend-opzp.onrender.com/) |
| 📦 GitHub Repository | [https://github.com/subhrank09/sevasetu](https://github.com/subhrank09/Seva-Setu) |

---

## ✨ Features

<table>
<tr>
<td valign="top" width="33%">

### 🧑‍🤝‍🧑 Citizen

- 📝 User Registration & Login
- 🔐 JWT-based Authentication
- 📊 Personal Dashboard
- 📍 GPS Location Detection
- 🗺️ Interactive Leaflet Map
- 🔎 Location Search
- 📷 Image Upload
- 📌 Complaint Tracking
- 🔔 Notifications
- 🗑️ Delete Complaint

</td>
<td valign="top" width="33%">

### 👷 Worker

- 📋 Worker Dashboard
- 📥 View Assigned Complaints
- ✅ Mark Complaint as Resolved
- 🔄 Complaint Status Updates

</td>
<td valign="top" width="33%">

### 🛡️ Administrator

- 📈 Admin Dashboard
- 📊 Complaint Analytics
- 🗂️ Complaint Management
- 👷 Create Worker Accounts
- 🎯 Assign Worker to Complaint
- 🗑️ Delete Complaint
- 📉 Charts & Reports

</td>
</tr>
</table>

### ⚙️ General Highlights

| Feature | Description |
|---|---|
| 🔒 Secure Authentication | JWT + Bcrypt password hashing |
| 🧑‍⚖️ Role-Based Access Control | Citizen, Worker, Admin permission tiers |
| 📱 Responsive Design | Mobile-first Tailwind CSS UI |
| 🎨 Modern UI/UX | Framer Motion animations |
| 🔗 REST APIs | Clean, versioned Express endpoints |
| 🖼️ Image Upload | Multer + Cloudinary integration |
| 🐘 PostgreSQL Database | Managed via Prisma ORM |
| 🧩 Modular Architecture | Scalable MVC-style backend |

---

## 🖼️ Screenshots

<div align="center">

| Home Page | Citizen Dashboard |
|:---:|:---:|
| ![Home](/images/Dashboard.png) | ![Dashboard](/images/Citizen.jpeg) |

| Admin Panel | Worker Panel |
|:---:|:---:|
| ![Admin](/images/Admin.jpeg) | ![Worker](/images/Working.jpeg) |

| Report Complaint Page |
|:---:|
| ![Report](/images/Create.jpeg) |

</div>


---

## 🏗️ Architecture

```
                         ┌───────────────────────────┐
                         │        CITIZEN (Web)       │
                         │   React + Vite + Tailwind  │
                         └──────────────┬──────────────┘
                                        │ Axios (REST API)
                                        ▼
                         ┌───────────────────────────┐
                         │        EXPRESS.JS API      │
                         │  Auth │ Complaints │ Users │
                         └──────┬───────────────┬─────┘
                                │               │
                     ┌──────────▼───┐   ┌───────▼────────┐
                     │  PostgreSQL   │   │   Cloudinary   │
                     │  (via Prisma) │   │ (Image Storage)│
                     └───────────────┘   └────────────────┘
                                │
                     ┌──────────▼───────────┐
                     │  WORKER / ADMIN Panel │
                     │  React + Chart.js     │
                     └────────────────────────┘
```

### 🔀 High-Level Flow (Mermaid)

```mermaid
graph TD
    A[Citizen] -->|Register/Login| B(JWT Auth Service)
    B --> C[Create Complaint]
    C --> D[Upload Image - Cloudinary]
    C --> E[Select GPS Location - Leaflet]
    D --> F[(PostgreSQL DB via Prisma)]
    E --> F
    F --> G[Admin Dashboard]
    G -->|Assign| H[Worker]
    H -->|Resolve| F
    F -->|Status Update| A
```

---

## 📁 Folder Structure

<details>
<summary><strong>📂 Frontend Structure (Click to expand)</strong></summary>

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/             # Route-level pages (Citizen/Worker/Admin)
│   ├── services/          # Axios API service layer
│   ├── assets/             # Images, icons, static assets
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── package.json
└── vite.config.js
```

</details>

<details>
<summary><strong>📂 Backend Structure (Click to expand)</strong></summary>

```
backend/
├── controllers/           # Business logic
├── middleware/            # Auth guards, error handlers
├── routes/                 # Express route definitions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/
├── uploads/                # Temp storage before Cloudinary upload
├── server.js
├── .env
└── package.json
```

</details>

---

## 🧰 Tech Stack

<div align="center">

### Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React.js | UI Library |
| ⚡ Vite | Build Tool |
| 🧭 React Router DOM | Client-side Routing |
| 🎨 Tailwind CSS | Utility-first Styling |
| 🌐 Axios | HTTP Client |
| 🎬 Framer Motion | Animations |
| 📊 Chart.js / React-ChartJS-2 | Data Visualization |
| 🗺️ React Leaflet / Leaflet | Interactive Maps |

### Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | Runtime Environment |
| 🚂 Express.js | Web Framework |
| 🔷 Prisma ORM | Database ORM |
| 🐘 PostgreSQL | Relational Database |
| 🔑 JWT | Authentication |
| 🔐 Bcrypt | Password Hashing |
| 📦 Multer | File Upload Middleware |
| ☁️ Cloudinary | Image Hosting |

### Deployment

| Service | Purpose |
|---|---|
| ▲ Vercel | Frontend Hosting |
| 🎨 Render | Backend Hosting |
| 🐘 PostgreSQL (Render/Neon/Supabase) | Database Hosting |

</div>

---

## 🛠️ Getting Started

### Prerequisites

```bash
Node.js >= 18.x
PostgreSQL >= 14.x
npm or yarn
```

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/sevasetu.git
cd sevasetu
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on 👉 `http://localhost:5173`

### ⚙️ Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Backend will run on 👉 `http://localhost:5000`

> [!IMPORTANT]
> Ensure PostgreSQL is running locally (or your `DATABASE_URL` points to a remote instance) before running migrations.

---

## 🔑 Environment Variables

### Backend `.env`

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `ADMIN_SECRET` | Secret key to authorize admin/worker creation |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sevasetu"
JWT_SECRET="your_jwt_secret"
ADMIN_SECRET="your_admin_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### Frontend `.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

```env
VITE_API_URL="http://localhost:5000/api"
```

> [!WARNING]
> Never commit your `.env` files to version control. Add them to `.gitignore`.

---

## 📡 API Documentation

### 🔐 Authentication Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new citizen | Public |
| `POST` | `/api/auth/login` | Login user | Public |
| `POST` | `/api/auth/create-worker` | Create a worker account | Admin |

### 📝 Complaint Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/complaints` | Create a new complaint | Citizen |
| `GET` | `/api/complaints` | Get all complaints | Admin |
| `GET` | `/api/complaints/my` | Get complaints of logged-in user | Citizen/Worker |
| `POST` | `/api/complaints/assign` | Assign complaint to worker | Admin |
| `POST` | `/api/complaints/status` | Update complaint status | Worker |
| `DELETE` | `/api/complaints/:id` | Delete a complaint | Citizen/Admin |
| `GET` | `/api/complaints/notifications` | Get notifications | Citizen |

<details>
<summary><strong>📦 Sample Request/Response (Click to expand)</strong></summary>

**Create Complaint**

```http
POST /api/complaints
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

```json
{
  "title": "Broken Streetlight",
  "description": "Streetlight not working near Main Road",
  "category": "Electricity",
  "latitude": 22.8046,
  "longitude": 86.2029,
  "image": "<file>"
}
```

**Response**

```json
{
  "success": true,
  "complaint": {
    "id": "clx1234abcd",
    "title": "Broken Streetlight",
    "status": "PENDING",
    "createdAt": "2026-01-01T10:00:00Z"
  }
}
```

</details>

---

## 🗄️ Database Schema

### 👤 Users Table

| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | Primary Key |
| `name` | String | Full name of user |
| `email` | String | Unique email address |
| `password` | String | Hashed password |
| `role` | Enum | `CITIZEN`, `WORKER`, `ADMIN` |

### 📋 Complaints Table

| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | Primary Key |
| `title` | String | Complaint title |
| `description` | String | Detailed description |
| `imageUrl` | String | Cloudinary image URL |
| `latitude` | Float | GPS latitude |
| `longitude` | Float | GPS longitude |
| `status` | Enum | `PENDING`, `IN_PROGRESS`, `RESOLVED` |
| `category` | String | Issue category |
| `userId` | String (FK) | Reference to reporting citizen |
| `assignedToId` | String (FK) | Reference to assigned worker |

### 🔗 Entity Relationship

```mermaid
erDiagram
    USERS ||--o{ COMPLAINTS : reports
    USERS ||--o{ COMPLAINTS : "assigned to"
    USERS {
        string id PK
        string name
        string email
        string password
        string role
    }
    COMPLAINTS {
        string id PK
        string title
        string description
        string imageUrl
        float latitude
        float longitude
        string status
        string category
        string userId FK
        string assignedToId FK
    }
```

---

## 👥 User Roles

| Role | Description |
|---|---|
| 🧑 **Citizen** | Reports complaints, tracks status, receives notifications |
| 👷 **Worker** | Resolves complaints assigned by admin |
| 🛡️ **Admin** | Manages users, workers, complaints, and analytics |

---

## 🔄 Application Workflow

```mermaid
sequenceDiagram
    participant C as Citizen
    participant S as SevaSetu API
    participant DB as Database
    participant A as Admin
    participant W as Worker

    C->>S: Register / Login
    S->>DB: Validate & Store User
    C->>S: Create Complaint (with Image + GPS)
    S->>DB: Store Complaint (status: PENDING)
    A->>S: View All Complaints
    A->>S: Assign Complaint to Worker
    S->>DB: Update assignedToId
    W->>S: View Assigned Complaints
    W->>S: Mark as Resolved
    S->>DB: Update status: RESOLVED
    S->>C: Notify Citizen
```

---

## 🔐 Authentication Flow

```mermaid
flowchart LR
    A[User Submits Credentials] --> B{Valid Credentials?}
    B -- No --> C[Return 401 Unauthorized]
    B -- Yes --> D[Generate JWT Token]
    D --> E[Bcrypt Verifies Password Hash]
    E --> F[Token Sent to Client]
    F --> G[Token Stored in LocalStorage]
    G --> H[Attached as Bearer Token in Future Requests]
    H --> I{Role-Based Middleware Check}
    I -- Authorized --> J[Access Granted]
    I -- Unauthorized --> K[403 Forbidden]
```

---

## 🚢 Deployment Guide

### ▲ Vercel Deployment (Frontend)

1. Push your `frontend/` code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo.
3. Set **Root Directory** to `frontend`.
4. Add environment variable `VITE_API_URL` pointing to your Render backend.
5. Click **Deploy** 🎉

```bash
# Build Command
npm run build

# Output Directory
dist
```

### 🎨 Render Deployment (Backend)

1. Push your `backend/` code to GitHub.
2. Go to [render.com](https://render.com) → **New Web Service**.
3. Connect your repository, set **Root Directory** to `backend`.
4. Set build & start commands:

```bash
# Build Command
npm install && npx prisma generate

# Start Command
npm run start
```

5. Add all backend environment variables in the Render dashboard.
6. Deploy and copy the live backend URL into your frontend's `VITE_API_URL`.

### 🐘 Database Setup (PostgreSQL)

1. Create a PostgreSQL instance (Render, Supabase, Neon, or ElephantSQL).
2. Copy the connection string into `DATABASE_URL`.
3. Run migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

### ☁️ Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Navigate to **Dashboard** → copy `Cloud Name`, `API Key`, `API Secret`.
3. Add them to your backend `.env` file as shown in the [Environment Variables](#-environment-variables) section.

---

## 🛡️ Security Features

- 🔐 Password hashing using **Bcrypt**
- 🪪 Stateless authentication via **JWT**
- 🧑‍⚖️ Role-based route protection middleware
- 🚫 Input validation & sanitization
- 🌐 CORS configuration
- 🔒 Environment variable-based secret management
- 🖼️ Secure image uploads via Cloudinary (no local file exposure)

---

## 🔮 Future Enhancements

- [ ] 🔴 Real-Time Notifications
- [ ] 🔌 Socket.IO Integration
- [ ] 📧 Email Notifications
- [ ] 📱 SMS Alerts
- [ ] 🤖 AI-Based Complaint Categorization
- [ ] 📈 Complaint Priority Prediction (ML)
- [ ] 🌙 Dark Mode
- [ ] 📱 Mobile App (React Native)
- [ ] 🖥️ Progressive Web App (PWA) Support

---

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

> [!NOTE]
> Please read `CONTRIBUTING.md` (if available) for our code of conduct and PR process.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

```
MIT License © 2026 SevaSetu Contributors
```

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ by Subhrank Priya**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/subhrank09)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/subhrank-priya/)


</div>

---

## 🙏 Acknowledgements

- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Leaflet.js](https://leafletjs.com/)
- [Cloudinary](https://cloudinary.com/documentation)
- [Shields.io](https://shields.io/) for badges
- [Vercel](https://vercel.com/) & [Render](https://render.com/) for free hosting tiers

---

## ⭐ Star the Repository

If you found this project helpful, please consider giving it a ⭐ — it helps others discover the project and motivates continued development!

---

## 📬 Contact

| Platform | Link |
|---|---|
| 📧 Email | subhrank42official@gmail.com |
| 💼 LinkedIn | [linkedin.com/in/subhrank-priya](https://www.linkedin.com/in/subhrank-priya/) |
| 🐙 GitHub | [github.com/subhrank09](https://github.com/subhrank09/Seva-Setu) |

---

<div align="center">

**Made with 💙 for cleaner, smarter cities.**

⭐ **Don't forget to star this repo if you like it!** ⭐

</div>
