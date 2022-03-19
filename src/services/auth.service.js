import UserModel from './../models/user.model'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import { transError, transSuccess } from '../../lang/vi'

const saltRounds = 7

const register =  (email, gender, password) => {
  return new Promise( async (resolve, rejects) => {
    const userByEmail = await UserModel.findByEmail(email)
    if (userByEmail) {
      if (userByEmail.deletedAt != null) {
        return rejects(transError.account_removed)
      }if (!userByEmail.local.isActive) {
        return rejects(transError.accout_isNotActive)
      }
      return rejects(transError.account_in_use)
    }
  
    const salt = bcrypt.genSaltSync(saltRounds)
    const userItem = {
      username: email.split('@')[0],
      gender: gender,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        verifyToken: uuidv4()
      }
    }
    const user = await UserModel.createNew(userItem)
    resolve(transSuccess.userCreated(user.local.email))
  })
}

module.exports = {
  register
}