const db = require('./db')
var admin = require("firebase-admin");


exports.getDetails = async id => {
  const Project = (await db.collection('Projects').doc(id).get()).data()
  return Project
}

exports.setDetails = async (data, id) => {
  var skill = data.task.skills.split(' ')
  data.task['skills'] = skill.splice(0, skill.length - 1)
  const Project = await db.collection('Projects').doc(id)
  const res = await Project.set(data, { merge: true })
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


exports.createProject = async (data, uid) => {
  var pid;
  await db.collection("Projects").add(data)
    .then(async (id) => {
      console.log(data.team);
      data.team.forEach(member => {
        console.log(member);
      })
      const Project = db.collection('Projects').doc(id.id)
      await Project.set({ projid: id.id }, { merge: true })

      const User = db.collection('Users').doc(uid).update({
        project: admin.firestore.FieldValue.arrayUnion(id.id)
      });
      pid = id.id
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  return pid
}

