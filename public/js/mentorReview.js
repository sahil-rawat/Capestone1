function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
}

function showname(){
	
	id=event.target.name
	document.getElementById(id).style.display='inline'
}

function hidename(){
	
	id=event.target.name
	document.getElementById(id).style.display='none'
}

function formSubmit(){
	var pid=document.getElementById('pid').value
	event.preventDefault()
	var temp={}
	temp['name']="tempp"
	temp['message']=document.getElementById('message').value
	temp['path']=document.getElementById('dropdown').selectedOptions[0].value
	var http = new XMLHttpRequest();
	http.open("POST", "/project/"+pid+"/mentorReview/post");
	http.setRequestHeader("Content-Type","application/json")
	http.send(JSON.stringify(temp));
	http.onreadystatechange = function () {
		if(http.readyState === XMLHttpRequest.DONE) {
			window.location=("/project/"+http.responseText+"/review")
		}
	}
}

function replyinp(){
	replybtn=event.target

	var replydiv=document.createElement('div')
	replydiv.id='replyinp'

	var replytext=document.createElement('textarea')
	replytext.id='reply'
	replytext.classList.add('form-control')
	replytext.rows=3
	replytext.placeholder="Write Your Reply Here...."

	var buttondiv=document.createElement('div')
	buttondiv.classList.add('mar-top', 'clearfix')

	var button=document.createElement('button')
	button.classList.add('btn', 'btn-sm','btn-primary', 'pull-right')
	button.innerHTML="Comment"

	buttondiv.appendChild(button)

	replydiv.appendChild(replytext)
	replydiv.appendChild(buttondiv)

	button.addEventListener('click',()=>{
		var msg=document.getElementById("reply").value
		var path=replybtn.parentNode.children[0].children[0].id

		var temp1={}
		temp1['name']="tempp"
		temp1['message']=msg
		temp1['path']=path
		var projid=document.getElementById('pid').value

		var http1 = new XMLHttpRequest();
		http1.open("POST", "/project/"+projid+"/mentorReview/reply");
		http1.setRequestHeader("Content-Type","application/json")
		http1.send(JSON.stringify(temp1));
		http1.onreadystatechange = function () {
		if(http1.readyState === XMLHttpRequest.DONE) {
			window.location=("/project/"+http1.responseText+"/review")
		}
	}
		
	})
	if(event.target.nextSibling){
		event.target.parentNode.insertBefore(replydiv,event.target.nextSibling);
	}else{
		event.target.parentNode.appendChild(replydiv);
	}
}


function replyinp2(){
	replybtn=event.target

	var replydiv=document.createElement('div')
	replydiv.id='replyinp'

	var replytext=document.createElement('textarea')
	replytext.id='reply'
	replytext.classList.add('form-control')
	replytext.rows=3
	replytext.placeholder="Write Your Reply Herer...."

	var buttondiv=document.createElement('div')
	buttondiv.classList.add('mar-top', 'clearfix')

	var button=document.createElement('button')
	button.classList.add('btn', 'btn-sm','btn-primary', 'pull-right')
	button.innerHTML="Comment"

	buttondiv.appendChild(button)

	replydiv.appendChild(replytext)
	replydiv.appendChild(buttondiv)

	button.addEventListener('click',()=>{
		var msg=document.getElementById("reply").value
		var path=replybtn.parentNode.children[0].children[0].id

		var temp1={}
		temp1['name']="tempp"
		temp1['message']=msg
		temp1['path']=path
		var projid=document.getElementById('pid').value

		var http2 = new XMLHttpRequest();
		http2.open("POST", "/project/"+projid+"/mentorReview/reply2");
		http2.setRequestHeader("Content-Type","application/json")
		http2.send(JSON.stringify(temp1));
		http2.onreadystatechange = function () {
		if(http2.readyState === XMLHttpRequest.DONE) {
			window.location=("/project/"+http2.responseText+"/review")
		}
	}
		
	})
	if(event.target.nextSibling){
		event.target.parentNode.insertBefore(replydiv,event.target.nextSibling);
	}else{
		event.target.parentNode.appendChild(replydiv);
	}
}
