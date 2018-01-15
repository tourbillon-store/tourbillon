const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
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
    // validate length of reviews
  }
})

module.exports = Review

/**
 * instanceMethods
 */

/**
 * classMethods
 */
