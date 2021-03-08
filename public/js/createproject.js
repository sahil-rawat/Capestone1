
function notRegistered(index){
  document.getElementById(index).style.border="1px solid red"
  document.getElementById(index).parentElement.parentElement.parentElement.style.color='red'
  document.getElementById(index).previousElementSibling.style.color='red'
  document.getElementById(index).previousElementSibling.style.border="1px solid red"

  document.getElementById('warning').innerHTML='* "'+document.getElementById(index).value + '" is not registered'
  document.getElementById('warning').style.display='block'
}
function formSubmit() {
  event.preventDefault();
  var formdata={}
  var data={};
  var team=[]
  data['project_name']= document.querySelector('#Project_Name').value;
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
  
  data['mentor']=document.querySelector('#mentor_mailid').value
  data['progress']=0
  data['submitted']=false

  formdata['team']=team
  formdata['data']=data

  var dataJson=JSON.stringify(formdata)

  var request=new XMLHttpRequest()
  request.open("POST", "/project/createproject/submit");
  request.setRequestHeader("Content-Type","application/json")
  request.send(dataJson);

  request.onreadystatechange = function () {
	if(request.readyState === XMLHttpRequest.DONE) {
		var status = request.status;
		if (status === 0 || (status >= 200 && status < 400)) {
      window.location=(request.responseText)
		} else {
      console.log(request.responseText);
      if(request.status==404){
        notRegistered(request.responseText)
      }else{
			alert("Something Went Wrong!! Please Try again Later!")
      }
		}
	}
}
  }