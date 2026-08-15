const dns = require('dns')

dns.setServers(['8.8.8.8'])

require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = require('./config/db')
const Profile = require('./models/Profile')

const profile = {
  name: 'Nguyễn Văn B',

  job: 'Full Stack Developer',

  description:
    'Tôi là một lập trình viên yêu thích việc xây dựng các website hiện đại, đẹp mắt và dễ sử dụng.',

  email: 'example@gmail.com',

  phone: '0123 456 789',

  location: 'Việt Nam',

  experience: '3 năm',

  about:
    'Tôi luôn muốn học hỏi những công nghệ mới và cải thiện kỹ năng lập trình của mình mỗi ngày.',

  social: {
    github: '',
    facebook: '',
    linkedin: '',
  },
}

const seedProfile = async () => {
  try {
    await connectDB()

    await Profile.deleteMany()

    await Profile.create(profile)

    console.log('Profile seeded successfully')

    await mongoose.connection.close()

    process.exit(0)
  } catch (error) {
    console.error('Seed failed:')
    console.error(error.message)

    process.exit(1)
  }
}

seedProfile()