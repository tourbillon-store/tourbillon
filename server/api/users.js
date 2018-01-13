const router = require('express').Router()
const { User, Order, Watch } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.use('/:userId/cart', (req, res, next) => {
  console.log('req.user', req.user)
  User.findById(req.params.userId)
    .then(user => user.getOrders({
      attributes: ['id', 'updatedAt'],
      include: [{ model: Watch }],
      where: [{ status: 'cart'}]
    }))
    .then(orders => res.json(orders))
    .catch(next)
})
