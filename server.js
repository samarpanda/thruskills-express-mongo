/*
 * TODO: create a basic server with express
 * respond index.html on a get request to '/'
 * respond jsonData on a get request to '/data'
 */

var jsonData = {count: 12, message: 'Hello World'}

var express = require('express')
var app = express()

// GET / with index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html', function(err){
		if(err){
			res.status(500).send(err)
		}
	})
})

// GET /data with jsonData
app.get('/data', function(req, res){
	res.json(jsonData)
})

var port = 3000
app.listen(port, function(){
	console.log('listening on http://localhost', port)
})