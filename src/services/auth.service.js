import UserModel from './../models/user.model'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import { transError, transSuccess, transMail } from '../../lang/vi'
import sendMail from './../configs/mailler'

const saltRounds = 7

const register = (email, gender, password, protocol, host) => {
  return new Promise(async (resolve, rejects) => {
    const userByEmail = await UserModel.findByEmail(email)
    if (userByEmail) {
      if (userByEmail.deletedAt != null) {
        return rejects(transError.account_removed)
      }
      if (!userByEmail.local.isActive) {
        return rejects(transError.account_isNotActive)
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
        verifyToken: uuidv4(),
      },
    }
    const user = await UserModel.createNew(userItem)
    const link_active = `${protocol}://${host}/verify/${user.local.verifyToken}`
    //send mail active account
    // sendMail(email, transMail.subject_active, transMail.template_active(link_active))
    //   .then(success => {
    //     resolve(transSuccess.userCreated(user.local.email))
    //   })
    //   .catch( async (error) => {
    //     // remove user
    //     await UserModel.removeById(user._id)
    //     console.log(error)
    //     reject(transMail.send_failed)
    //   })s
    resolve(transSuccess.userCreated(user.local.email))
  })
}

const verifyAccount = (token) => {
  return new Promise(async (resolve, reject) => {
    const userByToken = await UserModel.findByToken(token)
    if (!userByToken) {
      return reject(transError.token_undefined)
    }
    await UserModel.verify(token)
    resolve(transSuccess.account_active_success)
  })
}

module.exports = {
  register,
  verifyAccount,
}
