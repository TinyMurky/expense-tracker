import express from 'express'
import exphbs from 'express-handlebars'
import methodOverride from 'method-override'
import session from 'express-session'
import flash from 'connect-flash'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' })
}
const PORT = process.env.PORT

const app = express()
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: require('./plugins/handlebars-helpers')
}))
app.set('view engine', 'handlebars')
