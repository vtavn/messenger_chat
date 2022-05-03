import { notification } from './../services'

const getHome = async (req, res) => {
  // only 10 items one time
  const notifications = await notification.getNotifications(req.user._id)

  // get amount notifications unread
  const countNotifUnread = await notification.countNotifUnread(req.user._id)

  return res.render('main/home/home', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    user: req.user,
    notifications: notifications,
    countNotifUnread: countNotifUnread,
  })
}

module.exports = {
  getHome,
}
