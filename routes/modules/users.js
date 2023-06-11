import express from 'express'
export const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login', { stylesheet: 'login.css' })
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register', { stylesheet: 'login.css' })
})

router.post('/register', (req, res) => {
})
