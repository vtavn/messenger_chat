var express = require('express')
var app = express()

var hostname = "localhost"
var port = 3300

app.get('/helloworld', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(port, hostname, () => {
  console.log(`Server is running at ${hostname}:${port}`)
})