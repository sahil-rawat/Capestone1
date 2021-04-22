const express = require('express');
const router=express.Router()
const isAuthenticated=require('../middleware/isAuthenticated')
const {getDetails,setDetails,createProject, projectDetails, checkProject,progressUpdate} =require('../controllers/functions')



//router.use(isAuthenticated)
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
				id:req.user.id,
				name:req.user.displayName
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
		data['progress']=0
		team=req.body.team
		mentor=req.body.mentor
		await createProject(data,req.user,team,mentor,res)
	
	}
	render()
})


router.get('/:id/edit',function(req,res){
	async function render(){
		isAllowed = //await checkProject(req.user.uid,req.params.id)
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
		var temp={}
		var totalprogress=0;
		Object.keys(data.task.subtask).forEach(e=>{
			var item=[]
			var items=0;

			if(data.task.subtask[e].subtask){
				Object.keys(data.task.subtask[e].subtask).forEach(j=>{
					totalprogress+=100
					items+=1
					item.push({
						'id':'task-'+j,
						'title':data.task.subtask[e].subtask[j].name
					})

				})
			}else{
				totalprogress+=100
				items+=1
				item.push({
					'id':'task-1',
					'title':data.task.subtask[e].name
				})
			}
			temp[e]=[
				{
					'id' : '_backlog',
					'title'  : 'Backlog',
					'class'  : 'backlog',
					'item'  : item,
					'prog':items
				},
				{
					'id' : '_inprogress',
					'title'  : 'In Progress',
					'class' : 'inprogress',
					'item':[],
					'prog':0			
				},
				{
					'id' : '_review',
					'title'  : 'Mentor Review',
					'class' : 'review',
					'item':[],
					'prog':0
				},
				{
					'id' : '_completed',
					'title'  : 'Completed',
					'class' : 'completed',
					'item':[],
					'prog':0
				},
			]
		})
  	data['pp']=temp
		data['submitted']=true
		data['totalprogress']=totalprogress
		projDetail = await setDetails(data,req.params.id)
		res.send(req.params.id)
	}
	render()
})

router.get('/:id',function(req,res){
	async function render(){
		isAllowed = //await checkProject(req.user.uid,req.params.id)
		projDetail = await getDetails(req.params.id)
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
		isAllowed = //await checkProject(req.user.uid,req.params.id)
		projDetail = await getDetails(req.params.id)
		if(isAllowed && projDetail){
			res.render('projProgress',{ 
				data:JSON.stringify(projDetail),
				projid:req.params.id,
				pp:JSON.stringify(projDetail['pp'])
			})
		}
		else{
			res.render('404')
		}
	}
	render()
})


router.post('/:id/progress/update',function(req,res){
	async function render(){

		data=req.body
		await progressUpdate(data.pp,req.params.id,res)

	}
	render()
})



router.get('/:id/review',function(req,res){
	async function render(){
		isAllowed = //await checkProject(req.user.uid,req.params.id)
		projDetail = await getDetails(req.params.id)
		if(isAllowed && projDetail){
			res.render('mentorReview',{ 
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
