const router = require('express').Router()
const { Order, Watch } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Watch,
      attributes: ['id', 'make']
    }]
  })
  .then(orders => res.json(orders))
  .catch(next)
});
