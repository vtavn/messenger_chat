import ContactModel from './../models/contact.model'
import UserModel from './../models/user.model'
import NotificationModel from './../models/notification.model'
import _ from 'lodash'

const LIMIT_NUMBER_TAKEN = 10

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

const getContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contacts = await ContactModel.getContacts(
        currentUserId,
        LIMIT_NUMBER_TAKEN
      )

      const users = contacts.map(async (contact) => {
        if (contact.contactId == currentUserId) {
          return await UserModel.findUserById(contact.userId)
        } else {
          return await UserModel.findUserById(contact.contactId)
        }
      })

      resolve(await Promise.all(users))
    } catch (error) {
      reject(error)
    }
  })
}

const getContactsSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contacts = await ContactModel.getContactsSent(
        currentUserId,
        LIMIT_NUMBER_TAKEN
      )

      const users = contacts.map(async (contact) => {
        return await UserModel.findUserById(contact.contactId)
      })

      resolve(await Promise.all(users))
    } catch (error) {
      reject(error)
    }
  })
}

const getContactsReceived = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contacts = await ContactModel.getContactsReceived(
        currentUserId,
        LIMIT_NUMBER_TAKEN
      )

      const users = contacts.map(async (contact) => {
        return await UserModel.findUserById(contact.userId)
      })

      resolve(await Promise.all(users))
    } catch (error) {
      reject(error)
    }
  })
}

const countAllContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await ContactModel.countAllContacts(currentUserId)
      resolve(count)
    } catch (error) {
      reject(error)
    }
  })
}

const countAllContactsSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await ContactModel.countAllContactsSent(currentUserId)
      resolve(count)
    } catch (error) {
      reject(error)
    }
  })
}

const countAllContactsReceived = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await ContactModel.countAllContactsReceived(currentUserId)
      resolve(count)
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = {
  findUsersContact,
  addNew,
  removeRequestContact,
  getContacts,
  getContactsSent,
  getContactsReceived,
  countAllContacts,
  countAllContactsSent,
  countAllContactsReceived,
}
