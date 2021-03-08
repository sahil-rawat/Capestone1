const express = require('express');
const router=express.Router()
const isAuthenticated=require('../middleware/isAuthenticated')
const {getDetails,setDetails,createProject, projectDetails} =require('../controllers/functions')



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
		projId = await createProject(data,req.user,team,res)

	}
	render()
})


router.get('/:id/edit',function(req,res){
	async function render(){
		projDetail = await getDetails(req.params.id)
		if(projDetail){
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
		data['submitted']=false
		projDetail = await setDetails(data,req.params.id)
		res.send(req.params.id)
	}
	render()
})
router.get('/:id',function(req,res){
	async function render(){
		projDetail = await getDetails(req.params.id)
		if(projDetail){
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

module.exports = router;