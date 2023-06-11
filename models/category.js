import mongoose from 'mongoose'
const CategorySchema = new mongoose.Schema({
  _id: {
    type: Number,
    require: [true, 'Category need an _id']
  }
})

export default mongoose.models?.Category ||
  mongoose.model('Category', CategorySchema)
