const dns = require('dns')

dns.setServers(['8.8.8.8'])

require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = require('./config/db')
const Project = require('./models/Project')

const projects = [
  {
    name: 'Website bán hàng',

    description:
      'Website bán hàng được xây dựng bằng ReactJS với giao diện hiện đại và responsive.',

    technology: ['ReactJS', 'CSS'],

    image: '/projects/project-1.png',

    demo: '#',

    github: '#',
  },

  {
    name: 'Website quản lý',

    description:
      'Ứng dụng quản lý dữ liệu với giao diện đơn giản, dễ sử dụng.',

    technology: ['ReactJS', 'NodeJS'],

    image: '/projects/project-2.png',

    demo: '#',

    github: '#',
  },

  {
    name: 'Portfolio cá nhân',

    description:
      'Website portfolio giới thiệu bản thân, kỹ năng và các dự án đã thực hiện.',

    technology: ['ReactJS', 'CSS'],

    image: '/projects/project-3.png',

    demo: '#',

    github: '#',
  },
]

const seedProjects = async () => {
  try {
    await connectDB()

    await Project.deleteMany()

    await Project.insertMany(projects)

    console.log('Projects seeded successfully')

    await mongoose.connection.close()

    process.exit(0)
  } catch (error) {
    console.error('Seed failed:')
    console.error(error.message)

    process.exit(1)
  }
}

seedProjects()