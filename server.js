var express = require('express');
const fs = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});
const db = fs.firestore(); 


var app= express()
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views/");



const getData = async function (id) {
	const Project = await (await db.collection('Projects').doc(id).get()).data()
	return Project
}

app.use(express.static('public'));
getData('RlZhpFYwWaCyBC3z6s88').then(res=>{
	console.log(res)
	
})

app.get('/project/:id1',function(req,res){
	console.log();

	async function ren(){
		s = await getData(req.params.id1)

		await res.render('projDetails',{ 
			data:JSON.stringify(s),
		})
	}
	ren()	

})


app.listen(process.env.PORT || 8080)