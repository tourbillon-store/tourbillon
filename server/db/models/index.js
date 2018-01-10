const User = require('./user')
const Lesson = require('./lesson');
const Review = require('./review');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Review);
Review.belongsTo(User);

//CG: some kind of order that maybe allows users to get lessons.
//how do orders relate to users? -> each order belongs to a single user.
//how do orders relate to products? -> many to many relationship.
//How the heck do we fix prices when someone places an order?
//look into how to add fields to a join table.

//whats the difference ebtween an order and a cart?
//an order is simply a purchased cart.

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Lesson,
  Review
}
