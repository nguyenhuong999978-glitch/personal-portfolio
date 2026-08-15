const express = require('express')
const Project = require('../models/Project')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    })

    res.json(projects)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Không thể lấy danh sách dự án',
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body)

    res.status(201).json(project)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Không thể thêm dự án',
    })
  }
})

module.exports = router