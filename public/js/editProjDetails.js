function addchild (){
	var a = event.target;

	var i2 = a.cloneNode(true);
	var input = a.previousElementSibling.cloneNode(true)
	var i1 = a.cloneNode(true);

	var ul = document.createElement('ul')
	var li =document.createElement('li')

	i1.classList.remove('fa-plus-circle')
	i1.classList.add('fa-minus-circle')
	i1.style.color='red'
	i1.onclick= delself

	input.id=input.id.slice(0,input.id.length-6)+'[subtask]['+(event.target.parentElement.childElementCount-2)+']'+'[name]'


	input.name=input.name.slice(0,input.name.length-6)+'[subtask]['+(event.target.parentElement.childElementCount-2)+']'+'[name]'

	input.value=''

	li.appendChild(i1)
	li.appendChild(input)
	li.appendChild(i2)

	ul.appendChild(li)
	ul.style.listStyle='none'
	
	a.parentElement.appendChild(ul);

	var descdiv=document.getElementById('description')

	var div=document.createElement('div')
	var h3=document.createElement('h3')

	var label=document.createElement('label')
	var textarea=document.createElement('textarea')

	div.classList.add('form-group')
	div.style.display='none'
	
	label.innerHTML='Task Description'

	textarea.classList.add('form-control')
	textarea.rows=15

	textarea.name=input.name.slice(0,input.name.length-6)+'[description]'

	textarea.id=input.name.slice(0,input.name.length-6)+'[description]'

	h3.id=input.id.slice(0,input.name.length-6)+'[heading]'

	div.appendChild(h3)
	div.appendChild(label)
	div.appendChild(textarea)

	descdiv.appendChild(div)
}



function delself (){
	id=event.target.nextSibling.id.slice(0,event.target.id.length-6)+'[description]'
	event.target.parentElement.remove()
	document.getElementById(id).parentElement.remove()
	
}



function showdesc(){
	
	b=document.getElementsByClassName('form-group')
	for (let index = 0; index < b.length; index++) {
		b[index].style.display='none'		
	}
	id=event.target.name.slice(0,event.target.name.length-6)+'[description]'

	document.getElementById(id).parentElement.style.display='block'
}

function render(){
	x=document.getElementById(event.target.id.slice(0,event.target.name.length-6)+'[heading]')
	x.innerHTML=event.target.value
}
