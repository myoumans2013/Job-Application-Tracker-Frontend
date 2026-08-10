# Job Application Tracker Frontend

A React + Vite frontend for managing job applications and interviews. The application communicates with a Spring Boot REST API and is deployed on Render.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Spring Boot REST API
- Render

## Features

- View, create, update, and delete job applications
- Filter applications by status
- View interview history for each application
- Add and delete interviews
- Display application status, date applied, notes, and job links
- Loading and error handling
- Delete confirmation
- Separate API request logic from React components
- Separate local and production configurations

## Project Structure

```text
src/
├── api/
│   ├── applicationApi.js
│   └── interviewApi.js
├── components/
│   ├── Header
│   ├── ApplicationContainer
│   ├── ApplicationForm
│   ├── ApplicationList
│   └── InterviewForm
├── App.jsx
├── App.css
└── main.jsx
```

## Local Development

The frontend uses Vite environment variables to connect to the local Spring Boot backend during development.

```text
React
  ↓
Spring Boot REST API
  ↓
Docker PostgreSQL
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

The production application uses:

```text
Render Frontend
      ↓
Render Spring Boot Backend
      ↓
Supabase PostgreSQL
```

- Frontend hosted with Render Static Sites
- Backend hosted with Render Web Services
- Production PostgreSQL database hosted with Supabase
- Local PostgreSQL database managed with Docker

## Project Purpose

This project was built to strengthen my full-stack development skills by connecting a React frontend to a Spring Boot REST API.

The project demonstrates React component design, state management, REST API communication, CRUD operations, frontend/backend synchronization, environment configuration, error handling, and deployment.
