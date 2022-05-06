import { notification } from './../services/index'

const readMore = async (req, res) => {
  try {
    let skipNumberNotif = +req.query.skipNumber

    const newNotification = await notification.readMore(
      req.user._id,
      skipNumberNotif
    )

    return res.status(200).send(newNotification)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  readMore,
}
