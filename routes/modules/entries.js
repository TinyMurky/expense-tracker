import express from 'express'
import Record from '../../models/record.js'
export const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { stylesheet: 'index.css', script: 'index.js', repeat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4] })
})

// 新增支出的頁面
router.get('/new', (req, res) => {
  res.render('new', { stylesheet: 'new.css', script: 'new.js' })
})
// 創建新的支出
router.post('/', async (req, res) => {
  // { name: 'a', date: '2023-06-12', category: '1', number: '1' }
  let { name, date, category, amount } = req.body
  date = new Date(date)
  amount = parseInt(amount, 10)
  const entry = new Record({
    name,
    date,
    category,
    amount,
    userID: 0,
    categoryID: 0
  })
  await entry.save()
  res.redirect('/entries')
})
