import mongoose from 'mongoose'
import Counter from './counter.js'
const UserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    require: [true, 'User document need an _id']
  },
  name: {
    type: String,
    require: [true, 'User document need a name']
  },
  email: {
    type: String,
    require: [true, 'User document need an email']
  },
  password: {
    type: String,
    require: [true, 'User document need a password']
  }
})
UserSchema.pre('save', async function (next) {
  try {
    const doc = this // 代表現在新增的document
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'userId' }, // 找到Couter中紀錄的model_id
      { $inc: { sequence: 1 } }, // sequence + 1
      { new: true, upsert: true }
      // new: true => findByIdAndUpdate會回傳未更新的document, true可以回傳更新過的
      // upsert: true 如果沒有就建立一個新的counter document
    ).exec()

    doc._id = counter.sequence // 新建的category _id = sequence
    next() // 儲存
  } catch (error) {
    next(error)
  }
})

export default mongoose.models?.User ||
  mongoose.model('User', UserSchema)
