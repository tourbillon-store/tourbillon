const User = require('./user')
const Watch = require('./watch');
const Review = require('./review');
const Order = require('./order')
const OrderWatch = require('./orderWatch')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Review.belongsTo(Watch)
Watch.hasMany(Review)
Review.belongsTo(User)
User.hasMany(Review) //

Order.belongsTo(User)
User.hasMany(Order) //

Watch.belongsToMany(Order, {through: OrderWatch}) // 
Order.belongsToMany(Watch, {through: OrderWatch}) //

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Watch,
  Review,
  Order,
  OrderWatch
}
