const Sequelize = require('sequelize')
const db = require('../db')

const OrderWatch = db.define('order_watch', {
  fixedPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = OrderWatch
