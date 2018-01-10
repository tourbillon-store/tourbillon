const router = require('express').Router()
const {Lesson} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //yoursite.com/api/lessons?category=music
  //CG: Anyone remember req.query? 
  let whereObj = {};
  if(req.query.category){
    whereObj.category = req.query.category; 
  }
  Lesson.findAll({
    where: whereObj
  })
    .then(lessons => res.json(lessons))
    .catch(next)
});

/*

router.get('/:id', (req, res, next) => {
  Lesson.findById(+req.params.id)
    .then(lesson => res.json(lesson))
    .catch(next);
})


*/
