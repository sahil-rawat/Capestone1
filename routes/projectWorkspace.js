const {getDetails,setDetails} =require('../controllers/projectDetails')
const express = require('express');
const router=express.Router()

router.get('/:id1',function(req,res){
	async function render(){
		projDetail = await getDetails(req.params.id1)
		await res.render('projDetails',{ 
			data:JSON.stringify(projDetail),
			projid:req.params.id1
		})
	}
	render()
})

router.get('/:id1/edit',function(req,res){
	async function render(){
		projDetail = await getDetails(req.params.id1)
		await res.render('editProjDetails',{ 
			data:JSON.stringify(projDetail),
			projid:req.params.id1
		})
	}
	render()
})

router.post('/:id1/submit',function(req,res){
	async function render(){
		projDetail = await setDetails(req.body,req.params.id1)
	}
	render()
})

module.exports = router;