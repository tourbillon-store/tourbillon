const Sequelize = require('sequelize')
const db = require('../db')

const OrderWatch = db.define('order_watch', {
  fixedPrice: Sequelize.INTEGER
})

module.exports = OrderWatch
