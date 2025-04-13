# DeepNetSoft Restaurant Management System

This project is a full-stack restaurant management system built with **React**, **Node.js**, **Express**, and **MongoDB**. It allows users to view menus, add menu categories, and manage menu items. The project is divided into two main parts: the **frontend** and the **backend**.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Production Deployment](#production-deployment)
- [License](#license)

---

## Features

### Frontend
- Responsive design using **React** and **TailwindCSS**.
- Dynamic menu display with the ability to add menu categories and items.
- Navigation bar with links to different pages (Home, Menu, Reservations, Contact).
- Integration with backend APIs for menu and menu item management.

### Backend
- RESTful API built with **Express**.
- MongoDB database integration using **Mongoose**.
- CRUD operations for menus and menu items.
- Error handling middleware for better debugging.
- Serves the production-ready frontend files.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **TailwindCSS**: For styling.
- **Axios**: For making HTTP requests.
- **Vite**: For fast development and build.

### Backend
- **Node.js**: For server-side JavaScript runtime.
- **Express**: For building the RESTful API.
- **MongoDB**: For database management.
- **Mongoose**: For MongoDB object modeling.
- **dotenv**: For environment variable management.
- **cors**: For handling cross-origin requests.

---

## Project Structure
DeepNetSoft/ ├── backend/ │ ├── config/ # Database configuration │ ├── controllers/ # API controllers │ ├── middleware/ # Custom middleware │ ├── models/ # Mongoose models │ ├── routes/ # API routes │ ├── .env # Environment variables │ ├── server.js # Entry point for the backend │ └── package.json # Backend dependencies ├── frontend/ │ ├── public/ # Static assets │ ├── src/ # React source code │ │ ├── components/ # Reusable components (e.g., Navbar) │ │ ├── pages/ # Page components (e.g., Home, Menu) │ │ ├── App.jsx # Main React component │ │ ├── main.jsx # React entry point │ │ └── index.css # Global styles │ ├── tailwind.config.js # TailwindCSS configuration │ ├── vite.config.js # Vite configuration │ └── package.json # Frontend dependencies


---

## Setup Instructions

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a .env file in the backend directory and add the following:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   NODE_ENV=development
   ```
4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### API Endpoints
# Menus

GET /api/menus: Fetch all menus.
POST /api/menus: Create a new menu.
DELETE /api/menus/:id: Delete a menu by ID.
Menu Items
GET /api/menu-items/:menuId: Fetch all items for a specific menu.
POST /api/menu-items: Create a new menu item.
DELETE /api/menu-items/:id: Delete a menu item by ID.

### Production Deployment
# In production mode, the backend serves the static files from the frontend's dist directory. To build and serve the project in production:

1. Build the frontend:
   ```
   cd frontend
   npm run build
   ```
   This will generate a dist folder in the frontend directory.

2. Start the backend in production mode:
   ```
   cd backend
   NODE_ENV=production npm start
   ```
   The backend will serve the frontend files and handle API requests.

### License
# This project is licensed under the MIT License. Feel free to use and modify it as needed.


