const express = require('express')
const Profile = require('../models/Profile')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne()

    if (!profile) {
      return res.status(404).json({
        message: 'Không tìm thấy thông tin profile',
      })
    }

    res.json(profile)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Không thể lấy thông tin profile',
    })
  }
})

module.exports = router