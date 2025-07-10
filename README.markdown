# Project Name

A full-stack application with a React frontend and Node.js backend, containerized using Docker and orchestrated with Docker Compose.

## Table of Contents
- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview
This project consists of:
- **Frontend**: A React application located in the `frontend` directory, served on port 3000.
- **Backend**: A Node.js application located in the `backend` directory, served on port 5000.
- **Docker**: Both services are containerized and managed using Docker Compose for easy development and deployment.

## Directory Structure
```
.
├── backend
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── docker-compose.yml
└── frontend
    ├── Dockerfile
    ├── package.json
    ├── public
    │   └── index.html
    └── src
        ├── App.css
        └── index.js
```

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.
- Node.js (optional, for local development outside Docker).

## Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Ensure Required Files**:
   - Verify that `frontend/src/index.js` exists. If you renamed `App.js` to `index.js`, ensure it contains the correct React entry point:
     ```javascript
     import React from 'react';
     import ReactDOM from 'react-dom/client';
     import App from './App';
     import './App.css';

     const root = ReactDOM.createRoot(document.getElementById('root'));
     root.render(
       <React.StrictMode>
         <App />
       </React.StrictMode>
     );
     ```

3. **Check Dockerfiles**:
   - Ensure `frontend/Dockerfile` and `backend/Dockerfile` are correctly configured to copy files and run `npm install` and `npm run build` (for frontend) or `npm start` (for backend).

## Running the Project
1. **Build and Start Containers**:
   Run the following command from the project root (where `docker-compose.yml` is located):
   ```bash
   docker-compose up --build
   ```
   This builds the Docker images for the frontend and backend and starts the containers.

2. **Access the Application**:
   - Frontend: Open `http://localhost:3000` in your browser to view the React app.
   - Backend: Access the API at `http://localhost:5000` (adjust based on your backend's routes).

3. **Stop the Containers**:
   To stop the running containers:
   ```bash
   docker-compose down
   ```

## Troubleshooting
- **Missing `index.js` Error**:
  If you encounter an error like `Could not find a required file. Name: index.js`, ensure `frontend/src/index.js` exists. If you have `App.js` instead, rename it:
  ```bash
  cd frontend/src
  mv App.js index.js
  ```
  Then rebuild: `docker-compose build frontend`.

- **Port Conflicts**:
  If ports 3000 or 5000 are in use, update the `ports` section in `docker-compose.yml` or free the ports.

- **Build Failures**:
  Clear the Docker build cache and retry:
  ```bash
  docker-compose build --no-cache
  ```

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.