import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // 要打開這個才能回傳flash
  },
  async function verify (req, email, password, done) {
    console.log('I am in verify')
    try {
      if (!email || !password) {
        const message = '信箱或密碼未填寫'
        req.flash('login_error', message)
        return done(null, false, { message })
      }

      const user = await User.findOne({ email })
      if (!user) {
        const message = '您提供的信箱尚未註冊'
        req.flash('login_error', message)
        return done(null, false, { message })
      }

      const psIsCorrect = await bcrypt.compare(password, user.password)
      if (!psIsCorrect) {
        const message = '您提供的密碼與信箱不符'
        req.flash('login_error', message)
        return done(null, false, { message })
      }
      return done(null, user)
    } catch (error) {
      req.flash('login_error', error.message)
      return done(error, false)
    }
  }
)

export function usePassport (app) {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(localStrategy)
  passport.serializeUser(function (user, done) {
    return done(null, user.id)
  })

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  })
}
