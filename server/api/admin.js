const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/users', (req, res, next) => {
  User.findAll({
    // explicitly return all the attributes needed for the admin panel
    attributes: ['id', 'firstName', 'lastName', 'email', 'googleId', 'facebookId', 'isAdmin', 'createdAt', 'updatedAt']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.delete('/users/:userId', (req, res, next) => {
  const id = req.params.userId

  User.destroy({where: { id } })
    .then(() => res.status.(204).end())
    .catch(next)
})
