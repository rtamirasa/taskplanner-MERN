# Task Planner Web App

Task Planner is a fully responsive full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). This project includes features such as task creation, completion tracking, visual reports, and category breakdowns, making it a strong example of full-stack web development.

## About the Project

### Key Features
- **Task Management**: Users can create, update, and delete tasks with fields like title, due date, category, and status.
- **Status Tracking**: Tasks can be marked as Completed, In Progress, or Pending with a checkbox.
- **Visual Reports**: Includes dynamic bar and pie charts to track task progress and category distribution, with filters for time ranges (all-time vs. past week).
- **Responsive Design**: The UI is built using Material-UI and styled for seamless experience on all devices.

### Technologies Used
- **MongoDB**: A NoSQL database used to store tasks and support aggregation for reports.
- **Express**: A flexible backend Node.js framework to handle API requests.
- **React**: A powerful JavaScript library for building the frontend UI and managing application state.
- **Node.js**: Handles the server-side logic and connects Express to MongoDB.
- **Material-UI (MUI)**: Used for modern, accessible, and responsive component styling.

### Project Structure
The project is organized as follows:

- **/frontend**: Contains the React code, including pages like `Home.js` and `Report.js`, and reusable components like `TaskForm` and `TaskDetails`.
- **/backend**: Includes Express server (`server.js`), routes, controllers, and Mongoose models for task handling and reporting logic.
- **/public**: Contains static assets used by the frontend.
- **/config**: Environment configuration files including database and deployment settings.

### Challenges and Learnings
Throughout this project, I learned how to:
- Structure a scalable MERN application
- Use MongoDB indexes and aggregation pipelines for performance
- Handle state management across components in React
- Deploy full-stack applications to GCP (backend) and Vercel (frontend)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/task-planner.git
cd task-planner
