var express = require('express')
var app = express()
var _ = require('lodash')

app.use(express.static('client'))


let matches = []
let id = 0

app.listen(3000)
console.log('on port 3000')