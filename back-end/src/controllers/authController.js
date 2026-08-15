const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')


const login = async (req, res) => {

  try {

    const {
      username,
      password,
    } = req.body


    if (!username || !password) {

      return res.status(400).json({
        message:
          'Vui lòng nhập username và password',
      })
    }


    const admin =
      await Admin.findOne({
        username,
      })


    if (!admin) {

      return res.status(401).json({
        message:
          'Username hoặc password không đúng',
      })
    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        admin.password
      )


    if (!passwordMatch) {

      return res.status(401).json({
        message:
          'Username hoặc password không đúng',
      })
    }


    const token =
      jwt.sign(
        {
          id: admin._id,
          username: admin.username,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: '1d',
        }
      )


    res.status(200).json({

      message:
        'Đăng nhập thành công',

      token,

      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
      },

    })

  } catch (error) {

    console.error(
      'Login error:',
      error
    )

    res.status(500).json({
      message:
        'Lỗi server',
    })
  }
}


module.exports = {
  login,
}