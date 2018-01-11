const Sequelize = require('sequelize')
const db = require('../db')

const Watch = db.define('watch', {
  make: {
    type: Sequelize.STRING,
    allowNull: false
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false
  },
  complications: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://goo.gl/images/usiGqr'
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 9999
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Watch
