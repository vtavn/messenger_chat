import mongoose from 'mongoose'

let Schema = mongoose.Schema

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
})

ContactSchema.statics = {
  createNew(item) {
    return this.create(item)
  },

  /**
   * Find all items that related with user
   * @param {string} userId
   */
  findAllByUser(userId) {
    return this.find({
      $or: [{ userId: userId }, { contactId: userId }],
    }).exec()
  },

  /**
   * check exists of 2 user
   * @param {string} userId
   * @param {string} contactId
   */
  checkExists(userId, contactId) {
    return this.findOne({
      $or: [
        { $and: [{ userId: userId }, { contactId: contactId }] },
        { $and: [{ userId: contactId }, { contactId: userId }] },
      ],
    }).exec()
  },

  /**
   * remove request contact
   * @param {string} userId
   * @param {string} contactId
   */
  removeRequestContact(userId, contactId) {
    return this.remove({
      $and: [{ userId: userId }, { contactId: contactId }],
    }).exec()
  },

  /**
   * get contact by userid and limit
   * @param {string} userId
   * @param {number} limit
   * @returns
   */
  getContacts(userId, limit) {
    return this.find({
      $and: [
        { $or: [{ userId: userId }, { contactId: userId }] },
        { status: true },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec()
  },

  /**
   * get contact sent by userid and limit
   * @param {string} userId
   * @param {number} limit
   * @returns
   */
  getContactsSent(userId, limit) {
    return this.find({
      $and: [{ userId: userId }, { status: false }],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec()
  },

  /**
   * get contact received by userid and limit
   * @param {string} userId
   * @param {number} limit
   * @returns
   */
  getContactsReceived(userId, limit) {
    return this.find({
      $and: [{ contactId: userId }, { status: false }],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec()
  },

  /**
   * get count contact by userid and limit
   * @param {string} userId
   * @returns
   */
  countAllContacts(userId, limit) {
    return this.count({
      $and: [
        { $or: [{ userId: userId }, { contactId: userId }] },
        { status: true },
      ],
    }).exec()
  },

  /**
   * get count contact sent by userid and limit
   * @param {string} userId
   * @returns
   */
  countAllContactsSent(userId, limit) {
    return this.count({
      $and: [{ userId: userId }, { status: false }],
    }).exec()
  },

  /**
   * get count contact received by userid and limit
   * @param {string} userId
   * @returns
   */
  countAllContactsReceived(userId, limit) {
    return this.count({
      $and: [{ contactId: userId }, { status: false }],
    }).exec()
  },
}

module.exports = mongoose.model('contact', ContactSchema)
