const firebase = require('../controllers/auth')
const fs = require('../controllers/db')
const express = require('express');
const router=express.Router()
const db=fs.firestore()

router.get('/',function(req,res){
    res.redirect('/project/dashboard')
})

router.get('/login',function(req,res){
    res.render('login')
})

router.get('/register',function(req,res){
    res.render('register')
})

router.post("/register",function(req,res){
    var email = req.body.usn;
    var password = req.body.pwd;
    var username = req.body.name

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false)
    {
        res.redirect("/register")
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            var user=userCredential.user
            user.updateProfile({
                displayName:username
              })

            await db.collection("Users").doc(user.uid).set({project:[]});
            db.collection('Users')
            res.send("/project/dashboard")
        })
        .catch((error) => {
            var errorMessage = error.message;
            res.status(401).send(errorMessage)
        });
})

router.post("/login",function(req,res){

    var email = req.body.usn;
    var password = req.body.pwd;

      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false)
      {
        res.redirect("/login")
      }

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {

      res.send("/project/dashboard")
      })
      .catch((error) => {
      var errorMessage = error.message;
      res.status(401).send(errorMessage)
    });
})

router.post("/logout",function(req,res){

    firebase.auth().signOut().then(() => {
        res.send("/")
    }).catch((error) => {
        res.status(401).send(errorMessage)
      });
})

module.exports=router





/*
const firebase = require('../controllers/auth')
const fs = require('../controllers/db')
const express = require('express');
const router=express.Router()
const db=fs.firestore()

router.get('/',function(req,res){
    res.redirect('/project/dashboard')
})

router.get('/login',function(req,res){
    res.render('login')
})

router.get('/register',function(req,res){
    res.render('register')
})
*/
