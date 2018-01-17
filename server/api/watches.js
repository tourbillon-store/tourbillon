const router = require('express').Router()
const { Watch, Review } = require('../db/models')
const { isAdmin } = require('../utils/gatekeepermiddleware')
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

router.post('/', isAdmin, (req, res, next) => {
  Watch.create(req.body)
    .then(watch => res.status(201).json(watch))
    .catch(next);
})

router.put('/:watchId', isAdmin, (req, res, next) => {
  Watch.findById(req.params.watchId, {
    include: [{
        model: Review
    }]
  })
  .then(watch => watch.update(req.body))
  .then(watch => res.json(watch))
  .catch(next)
})
