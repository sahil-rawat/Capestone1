const fs = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
   });
   
const db = fs.firestore(); 

exports.getDetails= async id=> {
  const Project = await (await db.collection('Projects').doc(id).get()).data()
  return Project
}

exports.setDetails= async (data,id) =>{
  var skill= data.task.skills.split(' ')
  data.task['skills']=skill.splice(0,skill.length-1)
  const Project = await db.collection('Projects').doc(id)
  const res = await Project.set(data, { merge: true })
}


exports.createProject= async (data,req,res) => {
  db.collection("Projects").add(data)
  .then(async (id)=>{
    console.log(id);
    const Project=await db.collection('Projects').doc(id.id)
    const res = await Project.set({projid:id.id}, { merge: true })
    await res.send(id.id)
    
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

