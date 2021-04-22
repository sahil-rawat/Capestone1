function notRegistered(val){
  console.log(typeof val)
  console.log(val[0])
  
  document.getElementById(val[0]).style.border="1px solid red"
  
  document.getElementById('warning').innerHTML='* "'+document.getElementById(val[0]).value + '" is '+val[1]
  document.getElementById('warning').style.display='block'
}

function projnameempty(){
  document.getElementById('Project_Name').style.border="1px solid red"
  
  document.getElementById('warning').innerHTML='*Project Name Cant Be Empty '
  document.getElementById('warning').style.display='block'
}

function clear(){
  const tags=document.getElementsByTagName('input')
  for(var i=0;i<tags.length;i++){
    tags[i].style.border=""
  }
  document.getElementById('warning').innerHTML='* '
  document.getElementById('warning').style.display='none'
}

function formSubmit() {
  document.getElementById("loader").style.display="block"
  event.preventDefault();
  clear()
  var formdata={}
  var data={};
  var team=[]
  var mentor;
  data['project_name']= document.querySelector('#Project_Name').value;

  if(data['project_name']==''){
    projnameempty()
    return 
  }

  if(document.getElementById('0').value!=''){
    team.push(document.getElementById('0').value)
  }
  if(document.getElementById('1').value!=''){
    team.push(document.getElementById('1').value)
  }
  if(document.getElementById('2').value!=''){
    team.push(document.getElementById('2').value)
  }
  if(document.getElementById('3').value!=''){
    team.push(document.getElementById('3').value)
  }
  data['git'] = document.querySelector('#git').value;
  data['doc'] = document.querySelector('#google_docs').value;
  data['slack'] = document.querySelector('#slack').value;
  if(document.getElementById('4').value!=''){
    mentor = document.getElementById('4').value
    formdata['mentor']=mentor
  }
  data['progress']=0
  data['submitted']=false
  data['show']=true


  formdata['team']=team
  formdata['data']=data
  

  var dataJson=JSON.stringify(formdata)

  var request=new XMLHttpRequest()
  request.open("POST", "/project/createproject/submit");
  request.setRequestHeader("Content-Type","application/json")
  request.send(dataJson);

  request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
    document.getElementById("loader").style.display="none" 
		var status = request.status;
		if (status === 0 || (status >= 200 && status < 400)) {
      window.location=(request.responseText)
		} else {
      if(request.status==404){
        notRegistered(JSON.parse(request.responseText))
      }else{
			alert("Something Went Wrong!! Please Try again Later!")
      }
		}
	}else{
    
  }
}
  }