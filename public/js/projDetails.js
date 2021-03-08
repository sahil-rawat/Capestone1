
let a = document.getElementsByTagName('i')

 for(let index = 0; index < a.length; index++){
 	a[index].addEventListener("click",function () {
 		if (a[index].nextElementSibling.nextElementSibling.style.display === 'none'){
 			a[index].classList.remove("fa-plus-circle");
 			a[index].classList.add("fa-minus-circle");
 			a[index].nextElementSibling.nextElementSibling.style.display = 'block';
 		}else{
 			a[index].classList.add("fa-plus-circle");
 			a[index].classList.remove("fa-minus-circle");
 			a[index].nextElementSibling.nextElementSibling.style.display = 'none';
 		}
 	})
 }


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


function showname(){
	
	id=event.target.name
	document.getElementById(id).style.display='inline'
}

function hidename(){
	
	id=event.target.name
	document.getElementById(id).style.display='none'
}