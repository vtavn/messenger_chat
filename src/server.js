import express from 'express'
let app = express()

let hostname = "localhost"
let port = 3300

app.get('/helloworld', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(port, hostname, () => {
  console.log(`Server is running at ${hostname}:${port}`)
})