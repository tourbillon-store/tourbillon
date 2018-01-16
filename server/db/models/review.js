const Sequelize = require('sequelize')
const db = require('../db')

/* eslint-disable new-cap */
const Review = db.define('review', {
  title: {
    type: Sequelize.STRING(100),
    validate: {
      notEmpty: false,
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review
