function validateForm(){
	event.preventDefault()
	var inputs=document.getElementsByClassName('taskinput')
	for (let index = 0; index < inputs.length; index++) {
		inputs[index].style.border=""
		if (inputs[index].value==''){
			inputs[index].style.border="2px solid red"
			return false
		}
		
	}
	var durationinput=document.getElementsByClassName('durationinput')
	for (let index = 0; index < durationinput.length; index++) {
		durationinput[index].style.border=""
		if (durationinput[index].value==''){
			durationinput[index].style.border="2px solid red"
			return false
		}
		
	}
	
	return true
}


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

	if(a.parentElement.parentElement.id==3){
		i2.onclick=void 0
		i2.style.color='grey'
	}

	input.id=input.id.slice(0,input.id.length-6)+'[subtask]['+(event.target.parentElement.childElementCount-2)+']'+'[name]'


	input.name=input.name.slice(0,input.name.length-6)+'[subtask]['+(event.target.parentElement.childElementCount-2)+']'+'[name]'

	input.value=''

	li.appendChild(i1)
	li.appendChild(input)
	li.appendChild(i2)
	ul.appendChild(li)
	ul.id=parseInt(a.parentElement.parentElement.id)+1
	ul.style.listStyle='none'
	
	a.parentElement.appendChild(ul);

	var descdiv=document.getElementById('description')

	var div=document.createElement('div')
	var description=document.createElement('div')
	var descriptiondiv=document.createElement('div')


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
	if(a.parentElement.parentElement.id==2){
		var durationdiv=document.createElement('div')
		durationdiv.id='inp'
		var duration=document.createElement('input')
		duration.type="number"
		duration.classList.add('durationinput')
		duration.id=input.name.slice(0,input.name.length-6)+'[duration]'
		duration.name=input.name.slice(0,input.name.length-6)+'[duration]'
		duration.placeholder='Duration (In Days)'
		durationdiv.appendChild(duration)
		div.appendChild(durationdiv)
		div.appendChild(document.createElement('br'))
		div.appendChild(document.createElement('br'))

	}

	description.id='inp'
	description.style.display='block'
	description.appendChild(textarea)

	descriptiondiv.appendChild(label)
	descriptiondiv.appendChild(description)


	div.appendChild(descriptiondiv)
	div.id=input.id.slice(0,input.id.length-6)+'[description]'

	descdiv.appendChild(div)
}



function delself (){
	id=event.target.nextSibling.id.slice(0,event.target.id.length-6)+'[description]'
	event.target.parentElement.remove()
	document.getElementById(id).remove()
	
}


function showdesc(){
	
	b=document.getElementsByClassName('form-group')
	for (let index = 0; index < b.length; index++) {
		b[index].style.display='none'		
	}
	id=event.target.name.slice(0,event.target.name.length-6)+'[description]'
	document.getElementById(id).style.display='block'
}

function render(){
	x=document.getElementById(event.target.id.slice(0,event.target.name.length-6)+'[heading]')
	x.innerHTML=event.target.value
}

function showname(){
	
	id=event.target.name
	document.getElementById(id).style.display='inline'
}

function hidename(){
	
	id=event.target.name
	document.getElementById(id).style.display='none'
}