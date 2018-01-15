const router = require('express').Router()
const { Order, Watch } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Watch
    }]
  })
  .then(orders => res.json(orders))
  .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [{
        model: Watch
    }]
  })
  .then(order => res.json(order))
  .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [{
        model: Watch
    }]
  })
  .then(order => order.update(req.body))
  .then(order => res.json(order))
  .catch(next)
})
