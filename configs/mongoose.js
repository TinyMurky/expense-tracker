import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Category from '../models/category.js'
import categoryJSON from '../models/seeds/category.json'  assert { type: "json" }
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' })
}
mongoose.connect(process.env.MONGODB_URL)
export const db = mongoose.connection
db.on('error', (error) => {
  console.error('MongoDB fatal fail: ', error.message)
})
db.once('open', async () => {
  await createDefaultCategory()
  console.log('Mongodb connected successfully')
})

async function createDefaultCategory () {
  try {
    categoryJSON.forEach(async (item, index) => {
      const category = await Category.findOne({ name: item.name })
      if (!category) {
        const defaultCategory = new Category({
          _id:item._id,
          name:item.name,
          icon:item.icon
        })
        await defaultCategory.save()
        console.log('建立Default category: ', item.name)
      } else {
        console.log(`category "${item.name}" 已存在, 不執行建立Default category`)
      }
    })
  } catch (error) {
    console.error('建立default category遇到以下問題： ', error.message)
  }
}
