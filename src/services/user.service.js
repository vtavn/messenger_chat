import UserModel from './../models/user.model'

/**
 * update userInfor
 * @param {userId} id 
 * @param {dataUpdate} item 
 * @returns 
 */
const updateUser = (id, item) => {
  return UserModel.updateUser(id, item)
}

module.exports = {
  updateUser
}