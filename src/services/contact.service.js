import ContactModel from './../models/contact.model'
import UserModel from './../models/user.model'
import _ from 'lodash'

const findUsersContact = (currentUserId, keyword) => {
  return new Promise( async (resolve, reject) => {
    let deprecatedUserIds = [currentUserId]
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

const addNew = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    const contactExists = await ContactModel.checkExists(currentUserId, contactId)
    if (contactExists) {
      return reject(false)
    }

    const newContactItem = {
      userId: currentUserId,
      contactId: contactId
    }

    const newContact = await ContactModel.createNew(newContactItem)

    resolve(newContact)
  })
}

const removeRequestContact = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    const removeReq = await ContactModel.removeRequestContact(currentUserId, contactId)
    if (removeReq.result.n === 0) {
      return reject(false)
    }
    resolve(true)
  })
}

module.exports = {
  findUsersContact,
  addNew,
  removeRequestContact
}