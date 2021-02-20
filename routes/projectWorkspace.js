const {getDetails} =require('../controllers/projectDetails')

var express = require('express');
const router=express.Router()



router.get('/:id1',function(req,res){
	async function render(){
		projDetail = await getDetails(req.params.id1)
		await res.render('projDetails',{ 
			data:JSON.stringify(projDetail),
		})
	}
	render()	
})

module.exports = router;
