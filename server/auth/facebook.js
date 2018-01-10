const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.FACEBOOK_CLIENT_ID = 'your facebook client id'
 * process.env.FACEBOOK_CLIENT_SECRET = 'your facebook client secret'
 * process.env.FACEBOOK_CALLBACK = '/your/facebook/callback'
 */

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {

  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')

} else {

  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'email']
  }

  const strategy = new FacebookStrategy(facebookConfig, (token, refreshToken, profile, done) => {
    const facebookId = profile.id
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName
    const email = profile.emails[0].value

    User.find({where: {facebookId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({firstName, lastName, email, facebookId})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('facebook', {scope: 'email'}))

  router.get('/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }))

}
