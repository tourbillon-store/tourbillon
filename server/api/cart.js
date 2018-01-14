const router = require('express').Router()
const { User, Watch, Order, OrderWatch } = require('../db/models')
const { hasCart } = require('../utils/gateKeeperMiddleware')
module.exports = router

router.get('/', hasCart, (req, res, next) => {
  if (req.user) {
    User.findById(req.user.id)
    .then(user => user.getOrders({
      attributes: ['id', 'updatedAt'],
      include: [{ model: Watch }],
      where: [{ status: 'cart'}]
    }))
    .then(orders => res.json(orders))
    .catch(next)
  } else {
    res.json(req.session.cart)
  }
})

// not working
router.put('/', hasCart, (req, res, next) => {
  if (req.user) {
    Order.findOne({ where: { status: 'cart'} })
      .then(order => OrderWatch.update(req.body, {
        where: {
          orderId: order.id,
          watchId: req.body.watchId
        }
      }))
      .then(() => res.sendStatus(202))
      .catch(next)
  } else {
    // TODO - handle nonauthed cart updates
    res.sendStatus(202)
  }
})

