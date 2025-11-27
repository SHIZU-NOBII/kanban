const { Sequelize } = require('sequelize')

// Load database configuration based on environment
const NODE_ENV = process.env.NODE_ENV || 'production'
const configFile = require('../../config/sequelize')
const config = configFile[NODE_ENV]

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set')
  process.exit(1)
}

// Initialize Sequelize with database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, { 
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

// Define and import Task model
const Task = require('./task')(sequelize)

// Export models and sequelize instance
module.exports = { sequelize, Task }
