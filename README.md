# Queue Management Application

A full-stack Queue Management Application built using **Next.js, Node.js, Express.js, MongoDB, and JWT Authentication**.

The application allows users to create and manage queues, add people to queues, track waiting people, and view queue-related analysis.

---

## 🚀 Live Demo

### Frontend
https://queue-management-application.vercel.app

### Backend API
https://queue-management-application-fqkb.onrender.com

---

## ✨ Features

- 🔐 User Registration and Login
- 🔑 JWT-based Authentication
- 👤 User-specific Queue Management
- ➕ Create Queues
- 👥 Add People to Queues
- 📋 View Queue Details
- ⏳ Track Waiting People
- 📊 Queue Analysis
- 🚪 Logout functionality
- 📱 Responsive User Interface
- ☁️ Deployed Frontend and Backend

---

## 🖥️ Screenshots

### Add People

![Add People](Screenshort/Screenshot%202026-08-08%20212201.png)

---

### Queue Management Interface

![Queue Management Interface](Screenshort/Screenshot%202026-08-08%20211739.png)

---

### Queue Management Dashboard

![Queue Management Dashboard](Screenshort/Screenshot%202026-08-08%20212250.png)

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- CSS
- Next.js App Router

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication

### Database

- MongoDB
- Mongoose

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 📂 Project Structure

```text
Queue-Management-Application/
│
├── client/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── queues/
│   │   └── analysis/
│   │
│   └── ...
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── analysisController.js
│   │   ├── authController.js
│   │   ├── personController.js
│   │   └── queueController.js
│   │
│   ├── models/
│   │   ├── Person.js
│   │   ├── Queue.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── analysisRoutes.js
│   │   ├── authRoutes.js
│   │   ├── personRoutes.js
│   │   └── queueRoutes.js
│   │
│   └── server.js
│
├── Screenshot/
│
└── README.md
