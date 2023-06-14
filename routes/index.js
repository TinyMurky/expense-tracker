import express from 'express'

import { router as entries } from './modules/entries.js'
import { router as users } from './modules/users.js'
import { authorization } from '../middlewares/authorization.js'
export const router = express.Router()

router.use('/users', users)
router.use('/entries', authorization, entries)
router.get('/', (req, res) => {
  res.redirect('/entries')
})
