require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { sequelize } = require('./src/models')
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
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Server error' })
})

// server listening
sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (Database connection failed)`)
  })
})
