const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    technology: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: '',
    },

    demo: {
      type: String,
      default: '',
    },

    github: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const Project = mongoose.model('Project', projectSchema)

module.exports = Project