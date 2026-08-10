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

- View all job applications
- Create new job applications
- Update existing applications
- Delete applications with confirmation
- Filter applications by status
- View interview history
- Add interviews to applications
- Delete interviews
- Display application status, date applied, notes, job link, and interview information
- Loading and error handling
- Separate API request logic from React components
- Separate local and production API configurations

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


Environment Configuration

The frontend uses Vite environment variables to separate local development and production API configurations.

Local Development

Local development connects to the Spring Boot backend running on:

http://localhost:8080

Local development flow:

React localhost:5173
        ↓
Spring Boot localhost:8080
        ↓
Docker PostgreSQL
Production

The production build connects to the deployed Spring Boot backend on Render.

Render Frontend
      ↓
Render Spring Boot Backend
      ↓
Supabase PostgreSQL
Running Locally

Install dependencies:

npm install

Make sure the local Spring Boot backend and PostgreSQL Docker container are running.

Start the development server:

npm run dev

The development environment automatically uses the local Spring Boot API configuration.

To verify the production build:

npm run build
Deployment
Frontend deployed with Render Static Sites
Backend deployed with Render Web Services
Production database hosted on Supabase PostgreSQL
Local development database runs with Docker PostgreSQL
Project Purpose

This project was built to strengthen full-stack development skills by connecting a React frontend to a Spring Boot REST API. It demonstrates component-based UI development, state management, API communication, CRUD operations, environment configuration, error handling, and deployment using Render and Supabase.

Current Development

The next major feature being developed is authentication using Spring Security. Authentication will be developed and tested locally before being deployed to production.
