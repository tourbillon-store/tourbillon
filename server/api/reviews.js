const router = require('express').Router()
const { Watch, Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll({
    include: [{
      model: Watch
    }]
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId, {
    include: [{
      model: Watch
    }]
  })
    .then(review => res.json(review))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
})
