import Skill from '../models/Skill.js'


// GET tất cả skills
export const getSkills = async (req, res) => {
  try {

    const skills = await Skill.find()

    res.status(200).json(skills)

  } catch (error) {

    console.error('Get skills error:', error)

    res.status(500).json({
      message: 'Không thể lấy danh sách kỹ năng',
      error: error.message,
    })

  }
}


// GET một skill
export const getSkillById = async (req, res) => {
  try {

    const skill = await Skill.findById(
      req.params.id
    )

    if (!skill) {
      return res.status(404).json({
        message: 'Không tìm thấy kỹ năng',
      })
    }

    res.status(200).json(skill)

  } catch (error) {

    console.error('Get skill error:', error)

    res.status(500).json({
      message: 'Không thể lấy kỹ năng',
      error: error.message,
    })

  }
}


// POST thêm skill
export const createSkill = async (req, res) => {
  try {

    const {
      name,
      percent,
    } = req.body

    const skill = await Skill.create({
      name,
      percent,
    })

    res.status(201).json(skill)

  } catch (error) {

    console.error('Create skill error:', error)

    res.status(500).json({
      message: 'Không thể tạo kỹ năng',
      error: error.message,
    })

  }
}


// PUT sửa skill
export const updateSkill = async (req, res) => {
  try {

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        percent: req.body.percent,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!skill) {
      return res.status(404).json({
        message: 'Không tìm thấy kỹ năng',
      })
    }

    res.status(200).json(skill)

  } catch (error) {

    console.error('Update skill error:', error)

    res.status(500).json({
      message: 'Không thể cập nhật kỹ năng',
      error: error.message,
    })

  }
}


// DELETE skill
export const deleteSkill = async (req, res) => {
  try {

    const skill = await Skill.findByIdAndDelete(
      req.params.id
    )

    if (!skill) {
      return res.status(404).json({
        message: 'Không tìm thấy kỹ năng',
      })
    }

    res.status(200).json({
      message: 'Xóa kỹ năng thành công',
    })

  } catch (error) {

    console.error('Delete skill error:', error)

    res.status(500).json({
      message: 'Không thể xóa kỹ năng',
      error: error.message,
    })

  }
}