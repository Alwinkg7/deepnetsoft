import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import mongoose from 'mongoose';

import path from 'path';
dotenv.config();
// Database connection
connectDB();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menus', menuRoutes);
app.use('/api/menu-items', menuItemRoutes);

// Error handling
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));