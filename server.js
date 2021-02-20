var express = require('express');
const workspaceRoute=require('./routes/projectWorkspace')


var app= express()

app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views/");




app.use(express.static(__dirname +"/public/"));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/'+'test.html')
})

app.use('/project',workspaceRoute)



app.listen(process.env.PORT || 8080)