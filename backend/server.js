import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure environment variables
dotenv.config();

// Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/menus', menuRoutes);
app.use('/api/menu-items', menuItemRoutes);

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend's dist directory
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  // Handle SPA routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Error handling
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));