import express from 'express'
import passport from 'passport'

export const router = express.Router()
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }))

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/user/login', failureMessage: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/entries')
  })
