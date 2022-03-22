import passport from 'passport'
import passportFacebook from 'passport-facebook'
import UserModel from './../../models/user.model'
const FacebookStrategy = passportFacebook.Strategy
import { transError, transSuccess } from '../../../lang/vi'
require('dotenv').config()

/**
 *  Valid user account type: facebook
 */

const initPassportFacebook = () => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
    passReqToCallback: true,
    profileFields: ['email', 'gender', 'displayName']
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const user = await UserModel.findByFacebookUid(profile.id)

      if(user) {
        return done(null, user, req.flash("success", transSuccess.login_success(user.username)))
      }

      console.log(profile);
      console.log(process.env.FB_CALLBACK_URL);
      const newUserItem = {
        username: profile.displayName,
        gender: profile.gender,
        local: { isActive: true },
        facebook: {
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

module.exports = initPassportFacebook