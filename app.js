import express from 'express'
import exphbs from 'express-handlebars'
import methodOverride from 'method-override'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import { router as routes } from './routes/index.js'
import { helpers } from './plugins/handlebars-helpers.js'
import './configs/mongoose.js'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' })
}
const PORT = process.env.PORT

const app = express()
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SECRET_SESSION_WORD,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(routes)
app.listen(PORT, () => {
  console.log(`Port: ${PORT} started`)
})
