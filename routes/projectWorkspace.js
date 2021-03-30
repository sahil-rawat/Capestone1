const express = require('express');
const router=express.Router()
const isAuthenticated=require('../middleware/isAuthenticated')
const {getDetails,setDetails,createProject, projectDetails, checkProject} =require('../controllers/functions')



router.use(isAuthenticated)
router.get('/createproject',function(req,res){
    res.render('createProject')
 })

 router.get('/dashboard',function(req,res){

	async function render(){
		uid=req.user.uid
		const dashboardDetail = await projectDetails(uid);
		if(dashboardDetail){
			res.render('dashboard',{ 
				data:JSON.stringify(dashboardDetail),
				id:req.user.id
			})
		}
		else{
			res.render('404')
		}
	}
	render();

 })



router.post('/createproject/submit',function(req,res){
	async function render(){
		data=req.body.data
		team=req.body.team
		mentor=req.body.mentor
		await createProject(data,req.user,team,mentor,res)
		.then(async (r)=>{
				console.log(r)
			}
		)
		//res.send(projId)

	}
	render()
})


router.get('/:id/edit',function(req,res){
	async function render(){
		isAllowed = await checkProject(req.user.uid,req.params.id)
		projDetail = await getDetails(req.params.id)
		if(isAllowed && projDetail){
			if(!projDetail.submitted){
				res.render('editProjDetails',{ 
				data:JSON.stringify(projDetail),
				projid:req.params.id
				})
			}else{
				res.render('projDetails',{ 
				data:JSON.stringify(projDetail),
				projid:req.params.id
				})
			}
		}else{
			res.render('404')
		}
		
	}
	render()
})
router.post('/:id/submit',function(req,res){
	async function render(){
		data=req.body
		data['submitted']=true
		projDetail = await setDetails(data,req.params.id)
		res.send(req.params.id)
	}
	render()
})

router.get('/:id',function(req,res){
	async function render(){
		isAllowed = await checkProject(req.user.uid,req.params.id)
		projDetail = await getDetails(req.params.id)
		console.log(isAllowed && projDetail);
		if(isAllowed && projDetail){
			res.render('projDetails',{ 
				data:JSON.stringify(projDetail),
				projid:req.params.id
			})
		}
		else{
			res.render('404')
		}
	}
	render()
})

router.get('/:id/progress',function(req,res){
	async function render(){
		isAllowed = await checkProject(req.user.uid,req.params.id)
		projDetail = await getDetails(req.params.id)
		if(isAllowed && projDetail){
			res.render('projProgress',{ 
				data:JSON.stringify(projDetail),
				projid:req.params.id
			})
		}
		else{
			res.render('404')
		}
	}
	render()
})

module.exports = router;