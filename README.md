# Task Management Tool

A **Task Management System** that allows users to create, organize, and track tasks efficiently.  
The system supports **user authentication**, **task operations with file attachments**, **collaboration through comments**, and **analytics to track task completion and user performance**.

---

## Features

- User Authentication (Register / Login)
- Create, Update, and Manage Tasks
- File Attachments for Tasks
- Comment System for Collaboration
- Task Analytics
- User Performance Tracking

---

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

### 2. Backend Setup

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
npm install axios react-router-dom
```

Run the frontend application:

```bash
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- Python

### Frontend
- React
- Axios
- React Router

---

## API Documentation

FastAPI provides interactive API documentation:

```
http://127.0.0.1:8000/docs
```

---

## Project Structure

```
project-root
│
├── backend
│   ├── routers
│   ├── models
│   ├── database
│   ├── auth
│   └── main.py
│
├── frontend
│   ├── src
│   ├── components
│   └── pages
│
└── README.md
```

---  
