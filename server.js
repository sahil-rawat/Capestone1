var express = require('express');
const workspaceRoute=require('./routes/projectWorkspace')


var app= express()

app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views/");




app.use(express.static('public'));

app.use('/project',workspaceRoute)



app.listen(process.env.PORT || 8080)