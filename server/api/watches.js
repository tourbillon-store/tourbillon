const router = require('express').Router()
const {Watch} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Watch.findAll()
    .then(watches => res.json(watches))
    .catch(next)
});
