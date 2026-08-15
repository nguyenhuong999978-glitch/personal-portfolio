const dns = require('dns')

dns.setServers(['8.8.8.8'])

require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = require('./config/db')
const Skill = require('./models/Skill')

const skills = [
  {
    name: 'HTML',
    percent: 90,
  },
  {
    name: 'CSS',
    percent: 85,
  },
  {
    name: 'JavaScript',
    percent: 80,
  },
  {
    name: 'ReactJS',
    percent: 75,
  },
  {
    name: 'NodeJS',
    percent: 65,
  },
  {
    name: 'MongoDB',
    percent: 60,
  },
]

const seedSkills = async () => {

  try {

    await connectDB()

    // Xóa dữ liệu skills cũ
    // await Skill.deleteMany({})
    await Skill.deleteMany({})

    await Skill.insertMany(skills)


    console.log('Skill seeded successfully')

    await mongoose.connection.close()

    process.exit(0)
  } catch (error) {

    console.error('Seed failed:')
    console.error(error.message)

    process.exit(1)

  }
}

seedSkills()