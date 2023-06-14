import express from 'express'
import passport from 'passport'
export const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login', { stylesheet: 'login.css' })
})

router.post('/login', (req, res) => {
  passport.authenticate('local', { failureRedirect: '/login' },
    function (req, res) {
      res.redirect('/')
    })
})

router.get('/register', (req, res) => {
  res.render('register', { stylesheet: 'login.css' })
})

router.post('/register', (req, res) => {
})
