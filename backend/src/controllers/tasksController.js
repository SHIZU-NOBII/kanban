const { Task } = require('../models')
const { validationResult } = require('express-validator')
exports.list = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ order: [['createdAt', 'ASC']] })
    res.json(tasks)
  } catch (err) {
    next(err)
  }
}

// Create Task
exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { title, description, status } = req.body
    const task = await Task.create({ title, description, status })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

// Update Task
exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const id = req.params.id
    const { title, description, status } = req.body
    const task = await Task.findByPk(id)
    if (!task) return res.status(404).json({ error: 'Not found' })
    task.title = title !== undefined ? title : task.title
    task.description = description !== undefined ? description : task.description
    task.status = status !== undefined ? status : task.status
    await task.save()
    res.json(task)
  } catch (err) {
    next(err)
  }
}

// Delete Task
exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id
    const task = await Task.findByPk(id)
    if (!task) return res.status(404).json({ error: 'Not found' })
    await task.destroy()
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
