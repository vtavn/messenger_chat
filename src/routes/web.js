import express from 'express'
import { home, auth, user, contact, notif } from './../controllers'
import { authValid, userValid, contactValid } from './../validation/index'
import initPassportLocal from './../controllers/passportController/local'
import initPassportFacebook from './../controllers/passportController/facebook'
import initPassportGoogle from './../controllers/passportController/google'
import passport from 'passport'

// init all passportlocal
initPassportLocal()
initPassportFacebook()
initPassportGoogle()

const router = express.Router()

/**
 * Init all routes
 * @param app form exactly express module
 */

const initRoutes = (app) => {
  router.get('/', auth.checkLoginIn, home.getHome)

  router.get('/login-register', auth.checkLogout, auth.getLoginRegister)

  router.post(
    '/register',
    auth.checkLogout,
    authValid.register,
    auth.postRegister
  )

  router.get('/verify/:token', auth.checkLogout, auth.verifyAccount)

  router.post(
    '/login',
    auth.checkLogout,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login-register',
      successFlash: true,
      failureFlash: true,
    })
  )

  router.get(
    '/auth/facebook',
    auth.checkLogout,
    passport.authenticate('facebook', { scope: ['email'] })
  )

  router.get(
    '/auth/facebook/callback',
    auth.checkLogout,
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login-register',
    })
  )

  router.get(
    '/auth/google',
    auth.checkLogout,
    passport.authenticate('google', { scope: ['email'] })
  )

  router.get(
    '/auth/google/callback',
    auth.checkLogout,
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login-register',
    })
  )

  router.get('/logout', auth.checkLoginIn, auth.getLogout)

  router.put('/user/update-avatar', auth.checkLoginIn, user.updateAvatar)

  router.put(
    '/user/update-info',
    auth.checkLoginIn,
    userValid.updateInfo,
    user.updateInfo
  )

  router.put(
    '/user/update-password',
    auth.checkLoginIn,
    userValid.updatePassword,
    user.updatePassword
  )

  router.get(
    '/contact/find-users/:keyword',
    auth.checkLoginIn,
    contactValid.findUsersContact,
    contact.findUsersContact
  )

  router.post('/contact/add', auth.checkLoginIn, contact.addNew)

  router.delete(
    '/contact/remove-request',
    auth.checkLoginIn,
    contact.removeRequestContact
  )

  router.get('/notification/read-more', auth.checkLoginIn, notif.readMore)

  router.put(
    '/notification/mark-all-as-read',
    auth.checkLoginIn,
    notif.markAllAsRead
  )

  return app.use('/', router)
}

module.exports = initRoutes
