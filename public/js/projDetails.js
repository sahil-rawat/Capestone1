$('i').each(function(){
	var curritag=$(this)
	$(curritag.on('click',function(){
		if(curritag.next().next().css('display')=='none'){
			$(curritag.removeClass('fa-plus-circle'))
			$(curritag.addClass('fa-minus-circle'))
			$(curritag.next().next().css('display','block'))
		}else{
			$(curritag.removeClass('fa-minus-circle'))
			$(curritag.addClass('fa-add-circle'))
			$(curritag.next().next().css('display','none'))
		}
	}))
})


let b = document.getElementsByTagName('span')
for (let index = 0; index < b.length; index++) {
	b[index].addEventListener("click",function () {
		let d=document.getElementsByClassName('col-xl-7')[0].children
		for (let j = 0; j < d.length; j++) {
			d[j].style.display='none'
		}
		c=document.getElementsByClassName(b[index].id)[0]
		c.style.display='block'
	  })
}