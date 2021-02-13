var express = require('express');
const path = require('path');


var app= express()

app.use(express.static('res'));


app.get('/home',function(req,res){
	res.sendFile( __dirname + "/res/" + "index.html" )
})

app.listen(process.env.PORT || 8080)