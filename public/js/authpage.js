function formSubmitLogin() {
	event.preventDefault();

	var data={};
	data['usn']= document.querySelector('#entry_usn').value;
	data['pwd'] = document.querySelector('#entry_pass').value;
  
	var dataJson=JSON.stringify(data)
  
	var request=new XMLHttpRequest()
	request.open("POST", "/login");
	request.setRequestHeader("Content-Type","application/json")
	request.send(dataJson);
  
	request.onreadystatechange = function () {
	  if(request.readyState === XMLHttpRequest.DONE) {
		  var status = request.status;
		  if (status === 0 || (status >= 200 && status < 400)) {
			  window.location=(request.responseText)
		  }else {
				alert(request.responseText)
			}
	  }
  }
}
  



function formSubmitRegister() {
	event.preventDefault();

	var data={};
	data['name'] = document.querySelector('#entry_name').value;
	data['usn']= document.querySelector('#entry_usn').value;
	data['pwd'] = document.querySelector('#entry_pass').value;
  
	var dataJson=JSON.stringify(data)
  
	var request=new XMLHttpRequest()
	request.open("POST", "/register");
	request.setRequestHeader("Content-Type","application/json")
	request.send(dataJson);
  
	request.onreadystatechange = function () {
	  if(request.readyState === XMLHttpRequest.DONE) {
		  var status = request.status;
		  if (status === 0 || (status >= 200 && status < 400)) {
			  window.location=(request.responseText)
		  } else {
			  alert(request.responseText)
		  }
	  }
  }
}

function logout() {

	var request=new XMLHttpRequest()
	request.open("POST", "/login");
	request.setRequestHeader("Content-Type","application/json")
  
	request.onreadystatechange = function () {
	  if(request.readyState === XMLHttpRequest.DONE) {
		  var status = request.status;
		  if (status === 0 || (status >= 200 && status < 400)) {
			  window.location=(request.responseText)
		  }else {
				alert(request.responseText)
			}
	  }
  }
}