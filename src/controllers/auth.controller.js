const getLoginRegister = (req, res) => {
  return res.render('auth/master')
}

const getLogout = (req, res) => {

}

module.exports = { 
  getLoginRegister,
  getLogout
}