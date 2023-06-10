import express from 'express'

import { router as entries } from './modules/entries.js'
export const router = express.Router()

router.use('/entries', entries)
router.get('/', (req, res) => {
  res.redirect('/entries')
})
