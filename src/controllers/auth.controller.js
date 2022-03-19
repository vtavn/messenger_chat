import { validationResult } from 'express-validator/check'

const getLoginRegister = (req, res) => {
  return res.render('auth/master')
}

const postRegister = (req, res) => {
  const errorArr = []

  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    const errors = Object.values(validationError.mapped())
    errors.forEach(item => {
      errorArr.push(item.msg)
    })
    return
  }

}

module.exports = { 
  getLoginRegister,
  postRegister
}