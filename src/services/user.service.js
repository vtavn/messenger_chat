import UserModel from './../models/user.model'
import { transError } from '../../lang/vi'
import bcrypt from 'bcrypt'

const saltRounds = 7
/**
 * update userInfor
 * @param {userId} id 
 * @param {dataUpdate} item 
 * @returns 
 */
const updateUser = (id, item) => {
  return UserModel.updateUser(id, item)
}

/**
 * update password
 * @param {userId} id 
 * @param {dataUpdate} dataUpdate 
 */
const updatePassword = (id, dataUpdate) => {
  return new Promise( async (resolve, reject) => {
    const currenUser = await UserModel.findUserById(id)
    if (!currenUser) {
      return reject(transError.account_undefined)
    }
    
    const checkCurrentPassword = await currenUser.comparePassword(dataUpdate.currentPassword)
    if (!checkCurrentPassword) {
      return reject(transError.account_current_password_failed)
    }

    const salt = bcrypt.genSaltSync(saltRounds)

    await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt))
    resolve(true)
  })
}

module.exports = {
  updateUser,
  updatePassword
}