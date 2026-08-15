const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    job: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },

    location: {
      type: String,
      default: '',
    },

    experience: {
      type: String,
      default: '',
    },

    about: {
      type: String,
      default: '',
    },

    social: {
      github: {
        type: String,
        default: '',
      },

      facebook: {
        type: String,
        default: '',
      },

      linkedin: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile