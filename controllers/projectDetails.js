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
       const Project = await db.collection('Projects').doc(id)
       const res = await Project.set(data, { merge: true })

}
