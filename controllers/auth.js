var firebase = require("firebase/app");
var auth = require("firebase/auth");


var firebaseConfig = {
    apiKey: "AIzaSyDekw2vmrtSX0XmU570XhyZS1xcLu8fcIg",
        authDomain: "capestone1-6b9f3.firebaseapp.com",
        databaseURL: "https://capestone1-6b9f3-default-rtdb.firebaseio.com",
        projectId: "capestone1-6b9f3",
        storageBucket: "capestone1-6b9f3.appspot.com",
        messagingSenderId: "772346577220",
        appId: "1:772346577220:web:9d620f4e01393a0a5f5711",
        measurementId: "G-EQ8PDHCQ6E"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  module.exports=firebase
