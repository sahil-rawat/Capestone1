const fs=require('./db')
var admin = require("firebase-admin");
var dateFormat = require("dateformat");

const db=fs.firestore()

exports.getDetails= async id=> {
  const Project = (await db.collection('Projects').doc(id).get()).data()
  
  return Project
}

exports.postcomment = async (task,msg,name,id)=>{

  const Project = (await db.collection('Projects').doc(id).get()).data()
  var now = new Date();
  const path=task.split(',')

  if(path.length ==1){
    if(!Project['task']['subtask'][path[0]]['comments']){
      Project['task']['subtask'][path[0]]['comments']=
      [
        {
          'id':0,
          'name':name,
          'message':msg,
          'commentDate':dateFormat(now,'mediumDate'),
          'replies':[]
        }
      ]
    }else{
      var id1=Project['task']['subtask'][path[0]]['comments'].length

      Project['task']['subtask'][path[0]]['comments'].push(
        {
          'id':id1,
          'name':name,
          'message':msg,
          'commentDate':dateFormat(now,'mediumDate'),
          'replies':[]
        })
    }

    await db.collection('Projects').doc(id).update({
      'task':Project['task'],
    },{ merge: true })

  }else{
    if(!Project['task']['subtask'][path[0]][path[1]][path[2]]['comments']){

      Project['task']['subtask'][path[0]][path[1]][path[2]]['comments']=[
        {
          'id':0,
          'name':name,
          'message':msg,
          'commentDate':dateFormat(now,'mediumDate'),
          'replies':[]
        }]
      
    }else{
      var id1=Project['task']['subtask'][path[0]][path[1]][path[2]]['comments'].length

      Project['task']['subtask'][path[0]][path[1]][path[2]]['comments'].push(
        {
          'id':id1,
          'name':name,
          'message':msg,
          'commentDate':dateFormat(now,'mediumDate'),
          'replies':[]
        })
    }
    
    await db.collection('Projects').doc(id).update(
      {
      'task':Project['task'],
      },{ merge: true }
    )
  }
}



exports.postreply = async (task,msg,name,id)=>{

  const Project = (await db.collection('Projects').doc(id).get()).data()
  var now = new Date();
  const path=task.split(',')
  if(path.length == 2){
    var msgpre='@'+Project['task']['subtask'][path[0]]['comments'][path[1]]['name']+' '

    Project['task']['subtask'][path[0]]['comments'][path[1]]['replies'].push(
      {
        'name':name,
        'replyto':msgpre,
        'message':msg,
        'commentDate':dateFormat(now,'mediumDate'),
      })
    await db.collection('Projects').doc(id).update({
      'task':Project['task'],
    },{ merge: true })

  }else{
    
    var msgpre='@'+Project['task']['subtask'][path[0]][path[1]][path[2]]['comments'][path[3]]['name']+' '

    Project['task']['subtask'][path[0]][path[1]][path[2]]['comments'][path[3]]['replies'].push(
      {
        'name':name,
        'replyto':msgpre,
        'message':msg,
        'commentDate':dateFormat(now,'mediumDate'),

      })
    await db.collection('Projects').doc(id).update(
      {
        'task':Project['task'],
      },{ merge: true }
    )
  }
}


exports.postreply2 = async (task,msg,name,id)=>{

  const Project = (await db.collection('Projects').doc(id).get()).data()
  var now = new Date();
  const path=task.split(',')
  console.log(path,path.length)
  if(path.length == 3){
    
    var msgpre='@'+Project['task']['subtask'][path[0]]['comments'][path[1]]['replies'][path[2]]['name']+' '
    console.log(msgpre)

     Project['task']['subtask'][path[0]]['comments'][path[1]]['replies'].push(
      {
        'name':name,
        'replyto':msgpre,
        'message':msg,
        'commentDate':dateFormat(now,'mediumDate'),
      })
    await db.collection('Projects').doc(id).update({
      'task':Project['task'],
    },{ merge: true })

  }else{
    var msgpre='@'+Project['task']['subtask'][path[0]][path[1]][path[2]]['comments'][path[3]]['replies'][path[4]]['name']+' '

    Project['task']['subtask'][path[0]][path[1]][path[2]]['comments'][path[3]]['replies'].push(
      {
        'name':name,
        'replyto':msgpre,
        'message':msg,
        'commentDate':dateFormat(now,'mediumDate'),

      })
    await db.collection('Projects').doc(id).update(
      {
        'task':Project['task'],
      },{ merge: true }
    )
   }
}

exports.setDetails= async (data,id) =>{
  var skill= data.task.skills.split(' ')
  data.task['skills']=skill.splice(0,skill.length-1)

  const Project = db.collection('Projects').doc(id)
  await Project.set(data, { merge: true })

  const pdata=(await Project.get()).data()

  var duration=0;

  Object.keys(pdata.task['subtask']).forEach(e=>{
    if(pdata.task['subtask'][e]['subtask']){
      Object.keys(pdata.task['subtask'][e]['subtask']).forEach(j=>{
        duration+=parseInt(pdata.task['subtask'][e]['subtask'][j]['duration'])    
      })
    }
  })
  await Project.set({'duration':duration}, { merge: true })
}


exports.progressUpdate= async (data,id,res) =>{

  const Project = db.collection('Projects').doc(id)
  var tempprog=0
  var totalprogress=0
  
  await Project.set({
    pp:data,
  },{ merge: true })

  await Project.get().then(val =>{
    pupdate=val.data()
    totalprogress=pupdate.totalprogress
    Object.keys(pupdate.pp).forEach(i=>{
      pupdate.pp[i].forEach(val=>{
        if(val.id=='_backlog'){
          tempprog+=val.prog*0
        }else if(val.id=='_inprogress'){
          tempprog+=val.prog*30
        }else if(val.id=='_review'){
          tempprog+=val.prog*60
        }else if(val.id=='_completed'){
          tempprog+=val.prog*100
        }
      })
    })
  })

  await Project.set({
    progress:tempprog,
  },{ merge: true })
  res.send(((tempprog/totalprogress)*100).toFixed(0).toString())

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