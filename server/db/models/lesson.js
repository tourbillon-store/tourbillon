const Sequelize = require('sequelize')
const db = require('../db')

const Lesson = db.define('lesson', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Lesson

/**
 * instanceMethods
 */

/**
 * classMethods
 */
