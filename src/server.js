import express from 'express'
import ConnectDB from './configs/connectDB'
import configViewEngine from './configs/viewEngine'
import initRoutes from './routes/web'
import bodyParser from 'body-parser'
import connectFlash from 'connect-flash'
import configSession from './configs/session'
import passport from 'passport'

// init app
const app = express()

//connect to mongodb
ConnectDB()

// config session 
configSession(app)

//config view engine 
configViewEngine(app)

//config body parser
app.use(bodyParser.urlencoded({ extended: true }))

//connect flash
app.use(connectFlash())

// config passport
app.use(passport.initialize())
app.use(passport.session())

//config routes
initRoutes(app)


app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server is running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})