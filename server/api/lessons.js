const router = require('express').Router()
const {Lesson} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Lesson.findAll()
    .then(lessons => res.json(lessons))
    .catch(next)
});

router.get('/:lessonId', (req, res, next) => {
  Lesson.findById(req.params.lessonId)
    .then(lesson => res.json(lesson))
    .catch(next)
});
