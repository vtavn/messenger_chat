import express from 'express'
import ConnectDB from './configs/connectDB'
import configViewEngine from './configs/viewEngine'

// init app
const app = express()
//connect to mongodb
ConnectDB()

//config view engine 
configViewEngine(app)

app.get('/', (req, res) => {
  return res.render('main/master')
})

app.get('/login-register', (req, res) => {
  return res.render('auth/loginRegister')
})

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server is running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})