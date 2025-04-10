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

---

## Project Structure
DeepNetSoft/ 
            ├── backend/ │ 
                         ├── config/ # Database configuration │ 
                         ├── controllers/ # API controllers │ 
                         ├── middleware/ # Custom middleware │ 
                         ├── models/ # Mongoose models │ 
                         ├── routes/ # API routes │ 
                         ├── .env # Environment variables │ 
                         ├── server.js # Entry point for the backend │ 
                       └── package.json # Backend dependencies 
            ├── frontend/ │ 
                          ├── public/ # Static assets │ 
                          ├── src/ # React source code │ │ 
                          ├── components/ # Reusable components (e.g., Navbar) │ │ 
                          ├── pages/ # Page components (e.g., Home, Menu) │ │ 
                          ├── App.jsx # Main React component │ │ 
                          ├── main.jsx # React entry point │ │ 
                          └── index.css # Global styles │ 
                          ├── tailwind.config.js # TailwindCSS configuration │ 
                          ├── vite.config.js # Vite configuration │ 
                          └── package.json # Frontend dependencies


---

## Setup Instructions

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
Install dependencies:

npm install
Create a .env file in the backend directory and add the following:

Start the backend server:

The backend will run on http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:

Install dependencies:
```
npm install
```

Start the development server:
```
npm run dev
```

The frontend will run on http://localhost:5173.

API Endpoints
Menus
GET /api/menus: Fetch all menus.
POST /api/menus: Create a new menu.
DELETE /api/menus/:id: Delete a menu by ID.
Menu Items
GET /api/menu-items/:menuId: Fetch all items for a specific menu.
POST /api/menu-items: Create a new menu item.
DELETE /api/menu-items/:id: Delete a menu item by ID.
License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

