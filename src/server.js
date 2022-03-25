import express from 'express'
import ConnectDB from './configs/connectDB'
import configViewEngine from './configs/viewEngine'
import initRoutes from './routes/web'
import bodyParser from 'body-parser'
import connectFlash from 'connect-flash'
import session from './configs/session'
import passport from 'passport'
import http from 'http'
import socketio from 'socket.io'
import initSockets from './sockets/index'

import cookieParser from 'cookie-parser'
import configSocketIo from './configs/socketio'

// init app
const app = express()

// init server with socket.io & express app
const server = http.createServer(app)
const io = socketio(server)

//connect to mongodb
ConnectDB()

// config session 
session.config(app)

//config view engine 
configViewEngine(app)

//config body parser
app.use(bodyParser.urlencoded({ extended: true }))

//connect flash
app.use(connectFlash())

// user cookie parser 
app.use(cookieParser())

// config passport
app.use(passport.initialize())
app.use(passport.session())

//config routes
initRoutes(app)

//config socket io
configSocketIo(io, cookieParser, session.sessionStore)

// init all sockets
initSockets(io)

server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server is running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})