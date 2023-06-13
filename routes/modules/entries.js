import express from 'express'
import Record from '../../models/record.js'
import { getCategory } from '../../plugins/toolbox.js'
export const router = express.Router()

// 所有的categories去出
const categories = await getCategory()

// 新增支出的頁面
router.get('/new', (req, res) => {
  // 在post的時候出現錯誤從此取出
  const newErrors = req.flash('new_errors')[0]

  res.render('new', { stylesheet: 'new.css', script: 'new.js', categories, newErrors })
})
// 創建新的支出
router.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error)
    // 如果出現任何錯誤就放入flash後導回/new_頁面
    req.flash('new_errors', error.errors)
    res.redirect('/entries/new')
  }
})

// 主要頁面 categoryID非必要，若無則全部顯示
router.get('/:categoryID?', async (req, res) => {
  try {
    // 如果主畫面 與 delete出現error都會放入indexError並從此取出
    const indexErrors = req.flash('index_page_error')
    const categoryID = req.params.categoryID
    const query = { userID: 0 }
    if (categoryID) { // 如果沒有提供categoryID就不用該條件搜尋，以呈現所有records
      query.categoryID = categoryID
    }
    const entries = await Record.find(query).sort({ date: -1, _id: -1 }).lean()
    let totalSpend = 0
    for (const entry of entries) {
      entry.date = entry.date.toLocaleDateString('zh-TW')
      totalSpend += entry.amount
    }
    res.render('index', { stylesheet: 'index.css', script: 'index.js', entries, totalSpend, categories, categoryID, indexErrors })
  } catch (error) {
    console.error(error)
    req.flash('index_page_error', error.errors)
    // res.redirect('/entries')
  }
})

// 刪除頁面
router.delete('/:id', async (req, res) => {
  try {
    const _id = parseInt(req.params.id, 10)
    await Record.deleteOne({ _id, userID: 0 })
    res.redirect('/entries')
  } catch (error) {
    console.error(error)
    req.flash('index_page_error', error.message)
    res.redirect('/entries')
  }
})
