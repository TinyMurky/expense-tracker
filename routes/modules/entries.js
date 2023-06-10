import express from 'express'
export const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { stylesheet: 'index.css', script: 'index.js', repeat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4] })
})
