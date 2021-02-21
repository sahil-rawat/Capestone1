var express = require('express');
const bodyParser=require('body-parser')
const workspaceRoute=require('./routes/projectWorkspace')



var app= express()

app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views/");

app.use(express.static(__dirname +"/public/"));
//app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type:"application/*"}))
app.use('/project',workspaceRoute)


app.listen(process.env.PORT || 8080)