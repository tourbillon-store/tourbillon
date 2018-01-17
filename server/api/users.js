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

// Cart subroutes
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
    res.json(req.session.cart)
  } else {
    res.status(401).send('You are not authorized')
  }
})

router.post('/:userId/cart/:watchId', (req, res, next) => {
  let { userId } = req.params,
      { watch } = req.body,
      orderId,
      newQuantity
  if (req.user && (+userId === +req.user.id || req.user.isAdmin)) {
    getCart(userId)
      .then(order => {
        orderId = order.id
        return OrderWatch.findOne({
          where: {
            watchId: watch.id,
            orderId
          }
        })
      })
      .then(orderWatch => {
        if (orderWatch && orderWatch.quantity) {
          newQuantity = orderWatch.quantity
          return orderWatch.update({ quantity: orderWatch.quantity + 1 })
        }
        else {
          return OrderWatch.create({
            quantity: 1,
            fixedPrice: watch.price,
            watchId: watch.id,
            orderId
          })
        }
      })
      .then(() => {
        watch.quantity = newQuantity || 1
        res.json(watch)
      })
      .catch(next)
  } else if (userId === 'visitor') {
    let cartWatch = req.session.cart.find(item => item.id === watch.id)
    if (cartWatch) {
      cartWatch.quantity++
      req.session.cart = [...req.session.cart.filter(item => item.id !== watch.id), cartWatch]
      res.json(watch)
    } else {
      Watch.findById(watch.id)
        .then(watchData => {
          req.session.cart.push({
          id: watchData.id,
          make: watchData.make,
          model: watchData.model,
          price: watchData.price,
          quantity: 1,
          createdAt: Date.now()
          })
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
    let watch = req.session.cart.find(cartWatch => cartWatch.id === +req.params.watchId)
    watch.quantity = req.body.quantity
    req.session.cart = [...req.session.cart.filter(cartWatch => cartWatch.id !== watch.id), watch]
    res.sendStatus(202)
  } else {
    res.status(401).send('You are not authorized')
  }
})

router.delete('/:userId/cart', (req, res, next) => {
  console.log('delete cart api params', req.params)
  let { userId } = req.params
  if (req.user && (+userId === +req.user.id || req.user.isAdmin)) {
    getCart(userId)
      .then(order => order.update({status: 'created'}))
      .then(() =>
        Order.create({
          status: 'cart',
          userId
        })
      )
      .then(() => res.sendStatus(202))
      .catch(next)
  } else if (userId === 'visitor') {
    console.log('in visitor bloc')
    req.session.cart = []
    res.sendStatus(202)
  } else {
    res.status(401).send('You are not authorized')
  }
})

router.delete('/:userId/cart/:watchId', (req, res, next) => {
  let { userId, watchId } = req.params
  if (req.user && (+userId === +req.user.id || req.user.isAdmin)) {
    getCart(userId)
      .then(order => OrderWatch.destroy({
        where: {
          orderId: order.id,
          watchId
        }
      }))
      .then(() => res.sendStatus(202))
      .catch(next)
  } else if (userId === 'visitor') {
    req.session.cart = req.session.cart.filter(cartWatch => cartWatch.id !== +watchId)
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
