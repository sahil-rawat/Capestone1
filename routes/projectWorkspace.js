const {getDetails,setDetails} =require('../controllers/db')
const express = require('express');
const router=express.Router()

router.get('/:id',function(req,res){
	async function render(){
		projDetail = await getDetails(req.params.id)
		if(projDetail){
			await res.render('projDetails',{ 
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

router.get('/:id/edit',function(req,res){
	async function render(){
		projDetail = await getDetails(req.params.id)
		if(projDetail){
			if(!projDetail.submitted){
				await res.render('editProjDetails',{ 
					data:JSON.stringify(projDetail),
					projid:req.params.id
				})
			}else{
				await res.render('projDetails',{ 
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

module.exports = router;