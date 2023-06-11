import express from 'express'

import { router as entries } from './modules/entries.js'
import { router as users } from './modules/users.js'
export const router = express.Router()

router.use('/entries', entries)
router.use('/users', users)
router.get('/', (req, res) => {
  res.redirect('/entries')
})
