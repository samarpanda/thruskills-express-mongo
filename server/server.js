var express = require('express')
var app = express()
var _ = require('lodash')
var bodyParser = require('body-parser')

app.use(express.static('client'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


let matches = []
let id = 0

app.get('/matches', function(req, res){
	res.json(matches)
})

app.get('/matches/:id', function(req, res){
	var match = _.find(matches, {id: req.params.id})
	res.json(match || {})
})

app.post('/matches', function(req, res){
	var match = req.body
	id++
	match.id = id + ''
	matches.push(match)
	res.send(match)
})

app.put('/matches/:id', function(req, res){
	var update = req.body
	console.log(update)
	if(update.id){
		delete update.id
	}

	var match = _.findIndex(matches, {id:req.params.id})
	if(!matches[match]){
		res.send()
	}else{
		var updateMatch = _.assign(matches[match], update)
		res.json(updateMatch)
	}
})

app.listen(3000)
console.log('on port 3000')