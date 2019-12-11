var express = require('express')
var app = express()
var port = process.env.PORT | 80 ;

app.use('/',express.static(__dirname + '/public'))

app.get('/hi', function(request, response) {
  response.send('Hello World!')
})

app.listen(port , function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
