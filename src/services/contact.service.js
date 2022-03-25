import ContactModel from './../models/contact.model'
import UserModel from './../models/user.model'
import _ from 'lodash'

const findUsersContact = (currentUserId, keyword) => {
  return new Promise( async (resolve, reject) => {
    let deprecatedUserIds = []
    const contactsByUser = await ContactModel.findAllByUser(currentUserId)
    contactsByUser.forEach((contact) => {
      deprecatedUserIds.push(contact.userId)
      deprecatedUserIds.push(contact.contactId)
    })

    deprecatedUserIds = _.uniqBy(deprecatedUserIds)

    const users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword)
    resolve(users)
  })
}

module.exports = {
  findUsersContact
}