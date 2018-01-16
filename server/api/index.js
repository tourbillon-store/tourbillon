const router = require('express').Router()
const { isAdmin } = require('../utils/gatekeepermiddleware')
module.exports = router

router.use('/users', require('./users'))
router.use('/watches', require('./watches'))
router.use('/orders', require('./orders'))
router.use('/admin', isAdmin, require('./admin'))
router.use('/reviews', require('./reviews'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
