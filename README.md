# Job Application Tracker Frontend

A React + Vite frontend for managing job applications and interviews. The application communicates with a Spring Boot REST API and is deployed on Render.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Spring Boot REST API
- PostgreSQL (Supabase)
- Render

## Features

- View all job applications
- Create new job applications
- Update existing applications
- Delete applications
- View interview history
- Add interviews to applications
- Display application status, date applied, notes, job link, and interview information
- Communicate with a deployed Spring Boot backend

## Project Structure

```
src/
├── components/
│   ├── Header
│   ├── ApplicationForm
│   ├── ApplicationCard
│   └── InterviewForm
├── App.jsx
├── App.css
└── main.jsx
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Deployment

- Frontend deployed with **Render Static Sites**
- Backend deployed with **Render Web Services**
- Database hosted on **Supabase PostgreSQL**

## Project Purpose

This project was built to strengthen full-stack development skills by connecting a React frontend to a Spring Boot REST API. It demonstrates component-based UI development, state management, API communication, CRUD operations, and deployment using Render and Supabase.
