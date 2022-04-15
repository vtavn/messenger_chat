import ContactModel from './../models/contact.model'
import UserModel from './../models/user.model'
import NotificationModel from './../models/notification.model'
import _ from 'lodash'

const findUsersContact = (currentUserId, keyword) => {
  return new Promise(async (resolve, reject) => {
    let deprecatedUserIds = [currentUserId]
    const contactsByUser = await ContactModel.findAllByUser(currentUserId)
    contactsByUser.forEach((contact) => {
      deprecatedUserIds.push(contact.userId)
      deprecatedUserIds.push(contact.contactId)
    })

    deprecatedUserIds = _.uniqBy(deprecatedUserIds)

    const users = await UserModel.findAllForAddContact(
      deprecatedUserIds,
      keyword
    )
    resolve(users)
  })
}

const addNew = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    const contactExists = await ContactModel.checkExists(
      currentUserId,
      contactId
    )
    if (contactExists) {
      return reject(false)
    }
    //create contact
    const newContactItem = {
      userId: currentUserId,
      contactId: contactId,
    }
    const newContact = await ContactModel.createNew(newContactItem)

    const notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.ADD_CONTACT,
    }
    await NotificationModel.model.createNew(notificationItem)

    resolve(newContact)
  })
}

const removeRequestContact = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    const removeReq = await ContactModel.removeRequestContact(
      currentUserId,
      contactId
    )
    if (removeReq.result.n === 0) {
      return reject(false)
    }
    //remove notifacation
    await NotificationModel.model.removeRequestContactNotification(
      currentUserId,
      contactId,
      NotificationModel.types.ADD_CONTACT
    )
    resolve(true)
  })
}

module.exports = {
  findUsersContact,
  addNew,
  removeRequestContact,
}
