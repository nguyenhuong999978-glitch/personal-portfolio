const dns = require('dns')

dns.setServers([
  '8.8.8.8',
])

require('dotenv').config()

const mongoose =
  require('mongoose')

const bcrypt =
  require('bcryptjs')

const connectDB =
  require('./config/db')

const Admin =
  require('./models/Admin')


const seedAdmin = async () => {

  try {

    await connectDB()


    const username = 'admin'

    const password = 'admin'


    const existingAdmin =
      await Admin.findOne({
        username,
      })


    if (existingAdmin) {

      console.log(
        'Admin already exists'
      )

      await mongoose.connection.close()

      process.exit(0)
    }


    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      )


    await Admin.create({

      username,

      password:
        hashedPassword,

      name:
        'Portfolio Admin',

    })


    console.log(
      'Admin created successfully'
    )

    console.log(
      'Username: admin'
    )

    console.log(
      'Password: admin'
    )


    await mongoose.connection.close()

    process.exit(0)

  } catch (error) {

    console.error(
      'Seed admin failed:'
    )

    console.error(
      error.message
    )

    process.exit(1)
  }
}


seedAdmin()