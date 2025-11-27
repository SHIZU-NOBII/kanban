require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./config/db')
const tasksRouter = require('./src/routes/tasks')
const app = express()
const ORIGIN = process.env.ORIGIN || '*'
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(express.json())
app.use(cors({ origin: ORIGIN }))

// API routes
app.use('/api/v1/tasks', tasksRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Server error' })
})

// Test database connection and start server
async function startServer() {
  try {
    const isConnected = await db.testConnection();
    if (isConnected) {
      console.log('Successfully connected to the database');
    } else {
      console.warn('Warning: Could not connect to the database. The app will still start but database operations will fail.');
    }
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
