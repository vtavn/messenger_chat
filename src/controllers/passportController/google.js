import passport from 'passport'
import passportGoogle from 'passport-google-oauth'
import UserModel from './../../models/user.model'
const GoogleStrategy = passportGoogle.OAuth2Strategy
import { transError, transSuccess } from '../../../lang/vi'
require('dotenv').config()

/**
 *  Valid user account type: google
 */

const initPassportGoogle = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GG_APP_ID,
    clientSecret: process.env.GG_APP_SECRET,
    callbackURL: process.env.GG_CALLBACK_URL,
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const user = await UserModel.findByGoogleUid(profile.id)

      if(user) {
        return done(null, user, req.flash("success", transSuccess.login_success(user.username)))
      }

      const newUserItem = {
        username: profile.displayName,
        gender: profile.gender,
        local: { isActive: true },
        google: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value
        }
      }

      const newUser = await UserModel.createNew(newUserItem)

      return done(null, newUser, req.flash("success", transSuccess.login_success(newUser.username)))

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

module.exports = initPassportGoogle