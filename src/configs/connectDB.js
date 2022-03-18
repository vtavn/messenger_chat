import mongoose from 'mongoose'
import bluebird from 'bluebird'

/**
 * Connect to MongoDB
 */

const connectDB = () => {
  mongoose.Promise = bluebird

  const DB_CONNECTION = "mongodb"
  const DB_HOST = "localhost"
  const DB_PORT = "27017"
  const DB_NAME = "messenger_chat"
  const DB_USERNAME = ""
  const DB_PASSWORD = ""

  const URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

  return mongoose.connect(URI, { useMongoClient: true })
}

module.exports = connectDB