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
    await db.collection("Projects").doc(projid[i].pid).get()
    .then((doc)=>{
      const personDetails = {};
      personDetails.name = doc.data().project_name;
      personDetails.date = doc.data().startDate;
      personDetails.id = doc.data().projid;
      personDetails.submitted = doc.data().submitted;
      personDetails.show = doc.data().show;
      personDetails.role=projid[i].role

      if (personDetails.submitted && personDetails.show){
        dashDetails.push(personDetails);
      }
      if(!personDetails.submitted && personDetails.role=="Team Leader" &&personDetails.show){
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

exports.createProject= async (data,user,team,mentor,res) => {
  var pid;
  var uid = user.uid
  var uemail=user.email
  var uname=user.displayName
  var teamMemberRole="Team Member"

  const check=async ()=>{
    var success=true
    var i
    var err
    for (let index = 0; index < team.length; index++){
      if(team[index]==uemail){
        success=false 
        i=index
        err="Your own email" 
        return {'err':err,'i':i,'isOk':success} 
      }
      await admin.auth().getUserByEmail(team[index])
      .catch(() => {
        success=false 
        i=index
        err="Not Registered"
        return {'err':err,'i':i,'isOk':success}
      })
    }
    return {'err':err,'i':i,'isOk':success}
  }
  
  check().then(async (val)=>{
    if(val['isOk']){
      db.collection("Projects").add(data)
      .then(async (id)=>{
        for (let index = 0; index < team.length; index++){
          admin.auth().getUserByEmail(team[index])
          .then(async (userRecord) => {
            var teamMemberName=userRecord.displayName;
            var temMemberId=userRecord.uid
            var teamMemberMail=userRecord.email;
            var temp={}
            temp[teamMemberName]=[teamMemberMail,temMemberId,teamMemberRole]
            const Project = db.collection('Projects').doc(id.id)
            await Project.set({
              team: temp
            },{ merge: true })

            if(temMemberId!=uid){
              await db.collection('Users').doc(temMemberId).update({
                project: admin.firestore.FieldValue.arrayUnion({
                  pid:id.id,
                  role:"Team Member"
                })
              });
            }
          })
        }
        if(mentor){
          admin.auth().getUserByEmail(mentor)
          .then(async (userRecord) => {
            var mentorName=userRecord.displayName;
            var mentorId=userRecord.uid
            var mentorMail=userRecord.email;
            var temp={}
            temp[mentorName]=[mentorMail,mentorId,"Mentor"]
            const Project = db.collection('Projects').doc(id.id)
            await Project.set({
              mentor: temp
            },{ merge: true })

            if(mentorId!=uid){
              await db.collection('Users').doc(mentorId).update({
                project: admin.firestore.FieldValue.arrayUnion({
                  pid:id.id,
                  role:"Mentor"
                })
              })
            }
          })
        }
        var temp={}
        temp[uname]=[uemail,uid,"Team Leader"]
        const Project=db.collection('Projects').doc(id.id)
        var now = new Date();
        await Project.set({
          projid:id.id,
          startDate:dateFormat(now,'mediumDate'),
          team: temp
        },{ merge: true })
        
        await db.collection('Users').doc(uid).update({
          project: admin.firestore.FieldValue.arrayUnion({
            pid:id.id,
            role:"Team Leader"
          })
        })
        pid=id.id
        res.send('/project/'+pid+'/edit')
      })
    }else{
      res.status(404).send([val['i'].toString(),val["err"]])
    }
  })
}