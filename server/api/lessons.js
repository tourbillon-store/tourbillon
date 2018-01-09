const router = require('express').Router()
const {Lesson} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Lesson.findAll()
    .then(lessons => res.json(lessons))
    .catch(next)
});
