var express = require('express');
const bodyParser=require('body-parser')
const workspaceRoute=require('./routes/projectWorkspace');
const authRoute=require('./routes/auth');

const { render } = require('ejs');



var app= express()

app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views/");

app.use(express.static(__dirname +"/public/"));

app.use(bodyParser.json({type:"application/*"}))
app.use('/',authRoute)

app.use('/project',workspaceRoute)



//  app.get('*',function(req,res){
//      console.log(req.url);
//      res.render('404')
//  })


app.listen(process.env.PORT || 8080)