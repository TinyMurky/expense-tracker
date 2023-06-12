import express from 'express'
import Record from '../../models/record.js'
import { getCategory } from '../../plugins/toolbox.js'
export const router = express.Router()

// 所有的categories去出
const categories = await getCategory()

// 主要頁面
router.get('/', async (req, res) => {
  const entries = await Record.find({ userID: 0 }).sort({ date: -1, _id: -1 }).lean()
  let totalSpend = 0
  for (const entry of entries) {
    entry.date = entry.date.toLocaleDateString('zh-TW')
    totalSpend += entry.amount
  }

  res.render('index', { stylesheet: 'index.css', script: 'index.js', entries, totalSpend, categories })
})

// 新增支出的頁面
router.get('/new', (req, res) => {
  res.render('new', { stylesheet: 'new.css', script: 'new.js', categories })
})
// 創建新的支出
router.post('/', async (req, res) => {
  // { name: 'a', date: '2023-06-12', category: '1', number: '1' }
  let { name, date, categoryID, amount } = req.body
  date = new Date(date)
  amount = parseInt(amount, 10)
  const entry = new Record({
    name,
    date,
    amount,
    userID: 0,
    categoryID
  })
  await entry.save()
  res.redirect('/entries')
})

// 刪除頁面
router.delete('/:id', async (req, res) => {
  const _id = parseInt(req.params.id, 10)
  await Record.deleteOne({ _id, userID: 0 })
  res.redirect('/entries')
})
