import NotificationModel from './../models/notification.model'
import UserModel from './../models/user.model'

/**
 * get notification when f5 page
 * just 10 item one time
 * @param {string} currentUserId
 * @param {number} limit
 */
const getNotifications = (currentUserId, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notifications = await NotificationModel.model.getByUserIdAndLimit(
        currentUserId,
        limit
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

module.exports = {
  getNotifications,
}
