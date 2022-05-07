import { notification, contact } from './../services'

const getHome = async (req, res) => {
  // only 10 items one time
  const notifications = await notification.getNotifications(req.user._id)

  // get amount notifications unread
  const countNotifUnread = await notification.countNotifUnread(req.user._id)

  //get contacts
  const contacts = await contact.getContacts(req.user._id)

  //get contact sent
  const contactsSent = await contact.getContactsSent(req.user._id)

  //get contact received
  const contactsReceived = await contact.getContactsReceived(req.user._id)

  // count contacts
  const countAllContacts = await contact.countAllContacts(req.user._id)
  const countAllContactsSent = await contact.countAllContactsSent(req.user._id)
  const countAllContactsReceived = await contact.countAllContactsReceived(
    req.user._id
  )

  return res.render('main/home/home', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    user: req.user,
    notifications: notifications,
    countNotifUnread: countNotifUnread,
    contacts: contacts,
    contactsSent: contactsSent,
    contactsReceived: contactsReceived,
    countAllContacts: countAllContacts,
    countAllContactsSent: countAllContactsSent,
    countAllContactsReceived: countAllContactsReceived,
  })
}

module.exports = {
  getHome,
}
