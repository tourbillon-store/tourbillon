const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  //CG: so can be enumerated, can be an int with min and max validators 
  rating: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review

/**
 * instanceMethods
 */

/**
 * classMethods
 */
