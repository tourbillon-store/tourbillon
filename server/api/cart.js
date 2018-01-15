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
    console.log('get req.session.cart', req.session.cart)
    res.json(req.session.cart)
  }
})

router.post('/', hasCart, (req, res, next) => {
  if (req.user) {
    console.log('post to logged in user cart')
  } else {
    console.log('cart', req.session.cart)
    const watch = req.session.cart.find(cartWatch => cartWatch.id === req.body.watchId)
    if (watch) {
      console.log('watch found')
      watch.quantity++;
      req.session.cart = [...req.session.cart.filter(cartWatch => cartWatch.id !== req.body.watchId), watch]
      console.log('updated cart', req.session.cart)
      res.json(watch)
    } else {
      console.log('watch not found')
      Watch.findById(req.body.watchId)
        .then(watchData => {
          req.session.cart.push({
          id: watchData.id,
          make: watchData.make,
          model: watchData.model,
          price: watchData.price,
          quantity: 1,
          createdAt: Date.now()
          })
          console.log('updated cart', req.session.cart)
          res.json(watch)
        })
        .catch(next)
    }
  }
})

router.put('/', hasCart, (req, res, next) => {
  if (req.user) {
    getCart(req.user.id)
      .then(order => OrderWatch.update(req.body, {
        where: {
          orderId: order.id,
          watchId: req.body.watchId
        }
      }))
      .then(() => res.sendStatus(202))
      .catch(next)
  } else {
    console.log("I ran")
  }
})

router.delete('/:watchId', hasCart, (req, res, next) => {
  if (req.user) {
    getCart(req.user.id)
      .then(order => OrderWatch.destroy({
        where: {
          orderId: order.id,
          watchId: req.params.watchId
        }
      }))
      .then(() => res.sendStatus(202))
      .catch(next)
  } else {
    req.session.cart = [...req.session.cart.filter(cartWatch => cartWatch.id !== req.body.watchId)]
    res.sendStatus(202)
  }
})

// utils
const getCart = (userId) => {
  return Order.findOne({
    where: {
      status: 'cart',
      userId
    }
  })
}
