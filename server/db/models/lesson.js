const Sequelize = require('sequelize')
const db = require('../db')

const Lesson = db.define('lesson', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //CG: maybe text?
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //CG: maybe some kind of default image.
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //CG: how low can we go?
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
