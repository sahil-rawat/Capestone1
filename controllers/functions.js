const fs=require('./db')
var admin = require("firebase-admin");
var dateFormat = require("dateformat");

const db=fs.firestore()

exports.getDetails= async id=> {
    const Project = (await db.collection('Projects').doc(id).get()).data()
    return Project
}
  
exports.setDetails= async (data,id) =>{
  var skill= data.task.skills.split(' ')
  data.task['skills']=skill.splice(0,skill.length-1)
  const Project = db.collection('Projects').doc(id)
  await Project.set(data, { merge: true })
}
  
exports.createProject= async (data,user,team,res) => {
  var pid;
  var uid = user.uid
  var uemail=user.email
  var uname=user.displayName
  await db.collection("Projects").add(data)
  .then(async (id)=>{
    await team.forEach((member,index) =>{
      admin.auth().getUserByEmail(member)
      .then(async (userRecord) => {
        var teamMemberName=userRecord.displayName;
        var temMemberId=userRecord.uid
        var teamMemberMail=userRecord.email;
        var temp={}
        temp[teamMemberName]=[teamMemberMail,temMemberId]
        const Project = db.collection('Projects').doc(id.id)
        await Project.set({
          team: temp
         }, { merge: true })
        
        await db.collection('Users').doc(temMemberId).update({
          project: admin.firestore.FieldValue.arrayUnion(id.id)
        });      
      })
      .catch((error) => {
        res.status(404).send(index.toString())
        console.log('Error fetching user data:', error);
      });
    })

    var temp={}
    temp[uname]=[uemail,uid]

    const Project=db.collection('Projects').doc(id.id)
    var now = new Date();
    await Project.set({
      projid:id.id,
      startDate:dateFormat(now,'mediumDate')
    }, { merge: true })
      
    await Project.set({
      team: temp
    },{ merge: true })
  
    await db.collection('Users').doc(uid).update({
        project: admin.firestore.FieldValue.arrayUnion(id.id)
      });      
    
    pid=id.id
    res.send('/project/'+pid+'/edit')
  })
  .catch((error) => {
    res.status(500).send("Error adding document")
    console.error("Error adding document: ", error);
  });

}
  
  

let projid = [];
let dashDetails = [];
exports.projectDetails = async () => {

  let id = "LKYT3pNnTybNUMHfhCoKabH63hV2";
  const prid = db.collection("Users").doc(id);
  await prid.get().then((doc) => {
    if(!doc.exists) return;
    doc.data().project.forEach(project => {
      projid.push(project);
    })
    console.log(projid);
  })

  for(let i=0;i<projid.length;i++){
    await db.collection("Projects").doc(projid[i])
    .get().then((doc)=>{
      if(!doc.exists) return;
      const personDetails = new Object();
      personDetails.name = doc.data().ProjName;
      personDetails.date = doc.data().startDate;
      dashDetails.push(personDetails);
    })
  }
  console.log(dashDetails);
}
