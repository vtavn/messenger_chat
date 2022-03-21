import express from 'express'
import { home, auth } from './../controllers'
import { authValid } from './../validation/index'
import initPassportLocal from './../controllers/passportController/local'
import passport from 'passport'

// init all passportlocal
initPassportLocal();

const router = express.Router()

/**
 * Init all routes
 * @param app form exactly express module
 */

const initRoutes = (app) => {
  router.get('/', home.getHome)
  
  router.get('/login-register', auth.getLoginRegister)

  router.post('/register', authValid.register, auth.postRegister)

  router.get('/verify/:token', auth.verifyAccount)

  router.post('/login', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login-register',
    successFlash: true,
    failureFlash: true
  }))

  return app.use("/", router)
}

module.exports = initRoutes