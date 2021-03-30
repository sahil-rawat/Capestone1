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
  
exports.createProject= async (data,user,team,mentor,res) => {
  var pid;
  var sent=false;
  var uid = user.uid
  var uemail=user.email
  var uname=user.displayName
  var teamMemberRole="Team Member"
  var tmp=await db.collection("Projects").add(data)
  .then(async (id)=>{
    var tmp=await team.forEach(async (member,index) =>{
      var tmp=await admin.auth().getUserByEmail(member)
      .then(async (userRecord) => {
        var teamMemberName=userRecord.displayName;
        var temMemberId=userRecord.uid
        var teamMemberMail=userRecord.email;
        var temp={}
        temp[teamMemberName]=[teamMemberMail,temMemberId,teamMemberRole]
        const Project = db.collection('Projects').doc(id.id)
        var tmp=await Project.set({
          team: temp
         }, { merge: true })
        if(temMemberId!=uid){
          var tmp=await db.collection('Users').doc(temMemberId).update({
          project: admin.firestore.FieldValue.arrayUnion({pid:id.id,role:"Team Member"})
        });     
      } 
      },(error) => {
        res.status(404).send(index.toString())
        sent=true
        console.log('Error fetching user data:', error);
      });
    })
    if(mentor && !sent){
      console.log("in mentor",sent)
      admin.auth().getUserByEmail(mentor)
      .then(async (userRecord) => {
        var mentorName=userRecord.displayName;
        var mentorId=userRecord.uid
        var mentorMail=userRecord.email;
        var temp={}
        temp[mentorName]=[mentorMail,mentorId,"Mentor"]
        const Project = db.collection('Projects').doc(id.id)
        var tmp=await Project.set({
          mentor: temp
        }, { merge: true })
        if(mentorId!=uid){
          var tmp=await db.collection('Users').doc(mentorId).update({
          project: admin.firestore.FieldValue.arrayUnion({pid:id.id,role:"Mentor"})
          });     
        } 
        },(error) => {
          if(!sent){
            res.status(404).send('4')
            sent=true
          }
          console.log('Error fetching user data:', error);
        })        
    }
    if(!sent){

      console.log("in team leader",sent)

      var temp={}
      temp[uname]=[uemail,uid,"Team Leader"]

      const Project=db.collection('Projects').doc(id.id)
      var now = new Date();
      var tmp=await Project.set({
        projid:id.id,
        startDate:dateFormat(now,'mediumDate')
      }, { merge: true })
        
      var tmp=await Project.set({
        team: temp
      },{ merge: true })
    
      var tmp=await db.collection('Users').doc(uid).update({
          project: admin.firestore.FieldValue.arrayUnion({pid:id.id,role:"Team Leader"})
        });      
      
      pid=id.id
      if(!sent){
        console.log("in returning pid",sent)

        res.send('/project/'+pid+'/edit')
        sent=true
        }
    }
    
  },(error) => {
    console.log(sent)
    if(!sent){
      console.log("in 500 err")

      res.status(500).send("Error adding document")
    }
    console.error("Error adding document: ", error);
  })
}

exports.projectDetails = async (uid) => {
  const projid = [];
  const dashDetails = [];

  const prid = db.collection("Users").doc(uid);
  
  await prid.get().then((doc) => {
    doc.data().project.forEach(proj => {
      projid.push(proj);
    })
  })
  for(let i=0;i<projid.length;i++){
    await db.collection("Projects").doc(projid[i].pid)
    .get().then((doc)=>{
      const personDetails = {};
      personDetails.name = doc.data().project_name;
      personDetails.date = doc.data().startDate;
      personDetails.id = doc.data().projid;
      personDetails.submitted = doc.data().submitted;
      personDetails.role=projid[i].role
      if (personDetails.submitted){
        dashDetails.push(personDetails);
      }
      if(!personDetails.submitted && personDetails.role=="Team Leader"){
        dashDetails.push(personDetails);
      }
  
      
    })
  }

  return dashDetails
}


exports.checkProject = async (uid,pid) =>{
  var check=false;
  await db.collection("Users").doc(uid).get().then((doc) => {
    doc.data().project.forEach(proj => {
      if (proj.pid==pid){
        check= true
      }
    })
  })
  return check
}