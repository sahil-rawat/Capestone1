const db=require('./db')
var admin = require("firebase-admin");


exports.getDetails= async id=> {
    const Project = (await db.collection('Projects').doc(id).get()).data()
    return Project
  }
  
  exports.setDetails= async (data,id) =>{
    var skill= data.task.skills.split(' ')
    data.task['skills']=skill.splice(0,skill.length-1)
    const Project = await db.collection('Projects').doc(id)
    const res = await Project.set(data, { merge: true })
  }
  
  
  exports.createProject= async (data,uid) => {
    var pid;
    await db.collection("Projects").add(data)
    .then(async (id)=>{
        console.log(data.team);
        data.team.forEach(member =>{
            console.log(member);
        })
      const Project=db.collection('Projects').doc(id.id)
      await Project.set({projid:id.id}, { merge: true })
  
      const User=db.collection('Users').doc(uid).update({
        project: admin.firestore.FieldValue.arrayUnion(id.id)
      });      
      pid=id.id
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    return pid
  }
  
  