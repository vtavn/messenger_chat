import passport from 'passport'
import passportLocal from 'passport-local'
import UserModel from './../../models/user.model'
const LocalStrategy = passportLocal.Strategy
import { transError, transSuccess } from '../../../lang/vi'

/**
 *  Valid user account type: local
 */

const initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, passport, done) => {
    try {
      const user = await UserModel.findByEmail(email)

      if (!user) {
        return done(null, false, req.flash("errors", transError.login_failed))
      }
      if (!user.local.isActive) {
        return done(null, false, req.flash("errors", transError.account_isNotActive))
      }
      
      const checkPassword = await user.comparePassword(passport)
      if (!checkPassword) {
        return done(null, false, req.flash("errors", transError.login_failed))
      }

      return done(null, user, req.flash("success", transSuccess.login_success(user.username)))
    } catch (error) {
      console.log(error)
      return done(null, false, req.flash("errors", transError.server_error))
    }
  }))

  //save userid to session
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    UserModel.findUserById(id)
      .then( user => {
        return done(null, user)
      })
      .catch( error => {
        return done(error, null)
      })
  })
}

module.exports = initPassportLocal