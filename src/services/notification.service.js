import NotificationModel from './../models/notification.model'
import UserModel from './../models/user.model'

const LIMIT_NUMBER_TAKEN = 10
/**
 * get notification when f5 page
 * just 10 item one time
 * @param {string} currentUserId
 * @param {number} limit
 */
const getNotifications = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notifications = await NotificationModel.model.getByUserIdAndLimit(
        currentUserId,
        LIMIT_NUMBER_TAKEN
      )

      const getNotifContents = notifications.map(async (notification) => {
        const sender = await UserModel.findUserById(notification.senderId)
        return NotificationModel.contents.getContent(
          notification.type,
          notification.isRead,
          sender._id,
          sender.username,
          sender.avatar
        )
      })

      resolve(await Promise.all(getNotifContents))
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * count all notifications unread
 * @param {*} currentUserId
 */
const countNotifUnread = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationsUnread =
        await NotificationModel.model.countNotifUnread(currentUserId)
      resolve(notificationsUnread)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * read more notification, max 10 item one time
 * @param {string} currentUserId
 * @param {number} skipNumberNotif
 * @returns
 */
const readMore = (currentUserId, skipNumberNotif) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newNotifications = await NotificationModel.model.readMore(
        currentUserId,
        skipNumberNotif,
        LIMIT_NUMBER_TAKEN
      )

      const getNotifContents = newNotifications.map(async (notification) => {
        const sender = await UserModel.findUserById(notification.senderId)
        return NotificationModel.contents.getContent(
          notification.type,
          notification.isRead,
          sender._id,
          sender.username,
          sender.avatar
        )
      })

      resolve(await Promise.all(getNotifContents))
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * mask notifications as read
 * @param {string} currentUserId
 * @param {array} targetUsers
 * @returns
 */
const markAllAsRead = (currentUserId, targetUsers) => {
  return new Promise(async (resolve, reject) => {
    try {
      await NotificationModel.model.markAllAsRead(currentUserId, targetUsers)
      resolve(true)
    } catch (error) {
      console.log(`Erro when mark notifications as read: ${error}`)
      reject(false)
    }
  })
}

module.exports = {
  getNotifications,
  countNotifUnread,
  readMore,
  markAllAsRead,
}
