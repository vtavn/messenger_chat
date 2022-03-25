import { contact } from './../services/index'
import { validationResult } from 'express-validator/check'

const findUsersContact = async (req, res) => {
  let errorArr = []

  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    const errors = Object.values(validationError.mapped())
    errors.forEach(item => {
      errorArr.push(item.msg)
    })
    return res.status(500).send(errorArr)
  }

  try {
    const currentUserId = req.user._id
    const keyword = req.params.keyword

    const users = await contact.findUsersContact(currentUserId, keyword)
    
    return res.render('main/contact/sections/_findUsersContact', { users })

  } catch (error) {
    return res.status(500).send(error)
  }
}

const addNew = async (req, res) => {
  try {
    const currentUserId = req.user._id
    const contactId = req.body.uid

    const newContact = await contact.addNew(currentUserId, contactId)
    return res.status(200).send({success: !!newContact})
    
  } catch (error) {
    return res.status(500).send(error)
  }
}

const removeRequestContact = async (req, res) => {
  try {
    const currentUserId = req.user._id
    const contactId = req.body.uid

    const removeReq = await contact.removeRequestContact(currentUserId, contactId)
    return res.status(200).send({success: !!removeReq})
    
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  findUsersContact,
  addNew,
  removeRequestContact
}