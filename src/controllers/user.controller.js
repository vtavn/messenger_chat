import multer from 'multer'
import { app } from './../configs/app'
import { transError } from '../../lang/vi'
import uuidv4 from 'uuid/v4'
import { user } from './../services/index'
import fsExtra from 'fs-extra'
import { transSuccess } from '../../lang/vi'
import { validationResult } from 'express-validator/check'

const storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.avatar_directory)
  },
  filename: (req, file, callback) => {
    const math = app.avatar_type
    if (math.indexOf(file.mimetype) === -1) {
      return callback(transError.avatar_type, null)
    }

    const avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`
    callback(null, avatarName)
  }
})

const avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: app.avatar_limit_size }
}).single('avatar')

const updateAvatar =  (req, res) => {
  avatarUploadFile (req, res, async (error) => {
    if (error) {
      if (error.message) {
        return res.status(500).send(transError.avatar_size)
      }
      return res.status(500).send(error)
    }
    try {
      const updateUserItem = {
        avatar: req.file.filename,
        updatedAt: Date.now()
      }
      // update user
      const userUpdate = await user.updateUser(req.user._id, updateUserItem)

      // remove avatar old
      await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`)

      const result = {
        message: transSuccess.info_updated,
        imageSrc: `/images/users/${req.file.filename}`
      }
      return res.status(200).send(result)
    } catch (error) {
      return res.status(500).send(error)
    }
  })
}

const updateInfo = async (req, res) => {
  const errorArr = []
  const successArr = []

  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    const errors = Object.values(validationError.mapped())
    errors.forEach(item => {
      errorArr.push(item.msg)
    })

    return res.status(500).send(errorArr)
  }

  try {
    const updateUserItem = req.body

    await user.updateUser(req.user._id, updateUserItem)

    const result = {
      message: transSuccess.info_updated
    }
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  updateAvatar,
  updateInfo
}