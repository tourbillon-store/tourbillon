const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['cart', 'created', 'processing', 'cancelled', 'completed'],
  }
})

module.exports = Order

