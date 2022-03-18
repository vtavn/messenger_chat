import express from 'express'
import ConnectDB from './configs/connectDB'
import ContactModel from './models/contact.model'

const app = express()
//connect to mongodb
ConnectDB()

const hostname = "localhost"
const port = 3300

app.get('/testdatabase', async (req, res) => {
  try {
    const item = {
      userId: "1233123",
      contactId: "12312312"
    }
    const contact = await ContactModel.createNew(item)
    res.send(contact)
  } catch (error) {
    console.log(error)
  }
})

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server is running at ${hostname}:${port}`)
})