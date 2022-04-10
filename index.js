var express = require('express')
var app = express()
var port = process.env.PORT;

app.use('/',express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World! <br><center><h1>app under construction')
})

app.listen(port , function() {
  console.log("Node app is running at localhost:" + port);
})
