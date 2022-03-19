import { validationResult } from 'express-validator/check'
import { auth } from './../services/index'

const getLoginRegister = (req, res) => {
  return res.render('auth/master', {
    errors: req.flash('errors'),
    success: req.flash('success')
  })
}

const postRegister = async (req, res) => {
  const errorArr = []
  const successArr = []

  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    const errors = Object.values(validationError.mapped())
    errors.forEach(item => {
      errorArr.push(item.msg)
    })
    req.flash('errors', errorArr)

    return res.redirect('/login-register')
  }
  try {
    const createUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password)
    successArr.push(createUserSuccess)
    
    req.flash('success', successArr)
    return res.redirect('/login-register')
  } catch (error) {
    errorArr.push(error)
    req.flash('errors', errorArr)
    return res.redirect('/login-register')
  }
}

module.exports = { 
  getLoginRegister,
  postRegister
}