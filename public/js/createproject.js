
function formSubmit() {
  event.preventDefault();
  var data={};
  var team=[]
  var mentor=[]
  data['ProjName']= document.querySelector('#Project_Name').value;
  team.push(document.querySelector('#MailId').value)
  data['contactNo'] = document.querySelector('#contact_no').value
  if(document.querySelector('#mailid_1').value!=''){
    team.push(document.querySelector('#mailid_1').value)
  }
  if(document.querySelector('#mailid_2').value!=''){
    team.push(document.querySelector('#mailid_2').value)
  }
  if(document.querySelector('#mailid_3').value!=''){
    team.push(document.querySelector('#mailid_3').value)
  }
  if(document.querySelector('#mailid_4').value!=''){
    team.push(document.querySelector('#mailid_4').value)
  }
  mentor.push(document.querySelector('#mentor_mailid').value)
  data['git'] = document.querySelector('#git').value;
  data['googleDocs'] = document.querySelector('#google_docs').value;
  data['slack'] = document.querySelector('#slack').value;
  data['team']=team
  data['mentor']=mentor
  console.log(data);

  var dataJson=JSON.stringify(data)

  var request=new XMLHttpRequest()
  request.open("POST", "/project/createproject/submit");
  request.setRequestHeader("Content-Type","application/json")
  request.send(dataJson);

  request.onreadystatechange = function () {
	if(request.readyState === XMLHttpRequest.DONE) {
		var status = request.status;
		if (status === 0 || (status >= 200 && status < 400)) {
			console.log(request.responseText)
            window.location=(request.responseText)
		} else {
			alert("Something Went Wrong!! Please Try again Later!")
		}
	}
}


}
