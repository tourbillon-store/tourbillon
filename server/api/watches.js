const router = require('express').Router()
const { Watch, Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Watch.findAll({
    include: [{
      model: Review
    }]
  })
    .then(watches => res.json(watches))
    .catch(next)
})

router.get('/:watchId', (req, res, next) => {
  Watch.findById(req.params.watchId, {
    include: [{
      model: Review
    }]
  })
    .then(watch => res.json(watch))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Watch.create(req.body)
    .then(watch => res.status(201).json(watch))
    .catch(next);
})
