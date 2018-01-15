const router = require('express').Router()
const { User, Watch, Order, OrderWatch } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName']
  })
    .then(users => res.json(users))
    .catch(next)
})

//cart section beigns here

router.get('/:userId/cart', (req, res, next) => {
  let userId = req.params.userId
  if (req.user && (+userId === +req.user.id || req.user.isAdmin)) {
    User.findById(userId)
    .then(user => user.getOrders({
      attributes: ['id', 'updatedAt'],
      include: [{ model: Watch }],
      where: [{ status: 'cart'}]
    }))
    .then(orders => res.json(orders))
    .catch(next)
  } else if (userId === 'visitor'){
    console.log('get req.session.cart', req.session.cart)
    res.json(req.session.cart)
  } else { res.status(401).send('You are not authorized')
  }
})

router.post('/:userId/cart', (req, res, next) => {
  let userId = req.params.userId
  if (req.user && (+userId === +req.user.id || req.user.isAdmin)) {
    console.log('post to logged in user cart')
    console.log('req.user', req.user)
  } else if (userId === 'visitor') {
    console.log('cart makes it here', req.session.cart)
    let watch = req.session.cart.find(cartWatch => cartWatch.id === req.body.watchId)
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
  } else {
    res.status(401).send('You are not authorized')
  }
})

router.put('/:userId/cart/:watchId', (req, res, next) => {
  let userId = req.params.userId
  if (req.user && (+userId === +req.user.id || req.user.isAdmin)) {
    getCart(userId)
      .then(order => OrderWatch.update(req.body, {
        where: {
          orderId: order.id,
          watchId: req.params.watchId
        }
      }))
      .then(() => res.sendStatus(202))
      .catch(next)
  } else if (userId === 'visitor') {
    let watch = req.session.cart.find(cartWatch => +cartWatch.id === +req.params.watchId)
    watch.quantity = req.body.quantity
    req.session.cart = [...req.session.cart.filter(cartWatch => cartWatch.id !== req.body.watchId), watch]
    res.sendStatus(202)
  } else {
    res.status(401).send('You are not authorized')
  }
})

router.delete('/:userId/cart/:watchId', (req, res, next) => {
  let userId = req.params.userId
  if (req.user && (+userId === +req.user.id || req.user.isAdmin)) {
    getCart(userId)
      .then(order => OrderWatch.destroy({
        where: {
          orderId: order.id,
          watchId: req.params.watchId
        }
      }))
      .then(() => res.sendStatus(202))
      .catch(next)
  } else if (userId === 'visitor') {
    req.session.cart = [...req.session.cart.filter(cartWatch => cartWatch.id !== req.body.watchId)]
    res.sendStatus(202)
  } else {
    res.status(401).send('You are not authorized')
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
