import express from 'express'
import ConnectDB from './configs/connectDB'
import configViewEngine from './configs/viewEngine'
import initRoutes from './routes/web'

// init app
const app = express()
//connect to mongodb
ConnectDB()

//config view engine 
configViewEngine(app)

//config routes
initRoutes(app)


app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server is running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})