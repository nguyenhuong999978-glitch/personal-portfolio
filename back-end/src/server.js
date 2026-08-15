const express = require('express')
const cors = require('cors')
require('dotenv').config()

const dns = require('dns')
dns.setServers(['8.8.8.8'])
const connectDB = require('./config/db')

const projectRoutes = require('./routes/projectRoutes')
const profileRoutes = require('./routes/profileRoutes')
const skillRoutes = require('./routes/skillRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use(
  '/api/auth',
  authRoutes
)

app.use('/api/projects', projectRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/skills', skillRoutes)

connectDB()

app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend is running!',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})