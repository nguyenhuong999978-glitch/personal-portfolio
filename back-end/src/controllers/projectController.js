const Project = require('../models/Project')


const getProjects = async (req, res) => {
  try {

    const projects = await Project.find()
      .sort({ createdAt: -1 })

    res.status(200).json(projects)

  } catch (error) {

    console.error('Get projects error:', error)

    res.status(500).json({
      message: 'Không thể lấy danh sách dự án',
      error: error.message,
    })
  }
}


const getProjectById = async (req, res) => {
  try {

    const project = await Project.findById(
      req.params.id
    )

    if (!project) {
      return res.status(404).json({
        message: 'Không tìm thấy dự án',
      })
    }

    res.status(200).json(project)

  } catch (error) {

    res.status(500).json({
      message: 'Không thể lấy dự án',
      error: error.message,
    })
  }
}


const createProject = async (req, res) => {
  try {

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      technology: req.body.technology || [],
      image: req.body.image || '',
      demo: req.body.demo || '#',
      github: req.body.github || '#',
    })

    res.status(201).json(project)

  } catch (error) {

    console.error('Create project error:', error)

    res.status(500).json({
      message: 'Không thể tạo dự án',
      error: error.message,
    })
  }
}


const updateProject = async (req, res) => {
  try {

    const project =
      await Project.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          technology: req.body.technology || [],
          image: req.body.image || '',
          demo: req.body.demo || '#',
          github: req.body.github || '#',
        },
        {
          new: true,
          runValidators: true,
        }
      )

    if (!project) {
      return res.status(404).json({
        message: 'Không tìm thấy dự án',
      })
    }

    res.status(200).json(project)

  } catch (error) {

    console.error('Update project error:', error)

    res.status(500).json({
      message: 'Không thể cập nhật dự án',
      error: error.message,
    })
  }
}


const deleteProject = async (req, res) => {
  try {

    const project =
      await Project.findByIdAndDelete(
        req.params.id
      )

    if (!project) {
      return res.status(404).json({
        message: 'Không tìm thấy dự án',
      })
    }

    res.status(200).json({
      message: 'Xóa dự án thành công',
    })

  } catch (error) {

    console.error('Delete project error:', error)

    res.status(500).json({
      message: 'Không thể xóa dự án',
      error: error.message,
    })
  }
}


module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}