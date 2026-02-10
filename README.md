# Todo List Task

This is a simple full-stack Todo List task built using React (frontend) and Node.js with Express (backend).

## What the project does

- Add new tasks from the UI
- Mark tasks as completed or pending using a checkbox
- Filter tasks by status — All, Completed, Pending
- Frontend and backend stay in sync on every action

## Frontend

- Built using React
- Used useState and useEffect
- Connected to backend using Axios
- Checkbox updates task status instantly
- UI updates automatically when data changes

## Backend

- Built using Node.js and Express
- Created APIs to create, fetch, update, and filter tasks
- Implemented toggle logic to switch status between completed and pending
- Filter logic handled on backend using query params
- Sends structured JSON responses

## Tech Stack

- Frontend: React, Axios, MUI
- Backend: Node.js, Express
- Database: MongoDB, Mongoose

## How to Run

1. Clone the repository
2. Go to backend folder — npm install — npm run dev
3. Go to frontend folder — npm install — npm run dev
4. Open http://localhost:5173 in browser

## API Endpoints

- GET /tasks/all — fetch all tasks
- POST /tasks/create — create a new task
- PUT /tasks/update/:id — toggle task status
- GET /tasks/all/:status — filter tasks by completed or pending