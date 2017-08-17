var CHECK_USER_NAME; //type boolean check user name
var CHECK_PASSWORD; //type boolean check password
var CHECK_EMAIL; //type boolean check email
var CHECK_BIRTH_DAY; //type boolean check birth day
var CHECK_DATE; //type boolean check user date
var OK = "green"; //status checked
var NOT = "red"; //status  not checked
/**
* Submit data 
* Last check and send data to server
*/
function btnSubmit() {
	var _username = document.getElementById("idName");
	var _pass = document.getElementById("idPass");
	var _email = document.getElementById("idEmail");
	var _birthDay = document.getElementById("out-date");
	var _checkName = document.getElementById("check-name");
	var _checkPass = document.getElementById("check-pass");
	if (checkPass(_pass) && checkUserName(_username) && checkEmail(_email) && checkDate(_birthDay)) {
		var xhttp;
		if (window.XMLHttpRequest) {
 			xhttp = new XMLHttpRequest();
 		}
 		else {
 			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
 		}
  		xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	      		_checkName.innerHTML = this.responseText;
	    	} else {
	    		_checkName.innerHTML = "wrong";
	    	}
  		};
  		console.log(_username.value);
  		xhttp.open("GET", "login?q="+_username.value, true);
		xhttp.send();
	} else {
		alert("Pleases, check again!");
	}
}
/**
* Check input username
* @para name
* name: get value from username box 
*/
function checkUserName(name) {
	var error = document.getElementById("check-name");
	if (name.value == "" || name.value.length <= 0) {
		error.innerHTML = "";
		return CHECK_USER_NAME = false;
	}
	if (name.value.length < 6) {
		error.innerHTML = "Short, username is not valid";
		error.style.color = NOT;
		return CHECK_USER_NAME = false;
	}
	if (name.value.length > 30) {
		error.innerHTML = "Max length <= 30 character";
		error.style.color = NOT;
		return CHECK_USER_NAME = false;
	}
	if (name.value.length > 6 && name.value.length <= 30) {
		error.innerHTML = "OK";
		error.style.color = OK;
		return CHECK_USER_NAME = true;
	}
}
/**
* Check input password
* @para name
* name: get value from password box 
*/
function checkPass(name) {
	var error = document.getElementById("check-pass");
	if (name.value == "" || name.value.length <= 0) {
		error.innerHTML = "";
		return CHECK_USER_NAME = false;
	}
	if (name.value.length < 6) {
		error.innerHTML = "Short, password is not valid";
		error.style.color = NOT;
		return CHECK_USER_NAME = false;
	}
	if (name.value.length > 30) {
		error.innerHTML = "Max length <= 30 character";
		error.style.color = NOT;
		return CHECK_USER_NAME = false;
	}
	if (name.value.length > 6 && name.value.length <= 30) {
		var tmp = document.getElementById("idName").value;
			error.innerHTML = "OK";
			error.style.color = OK;
			return CHECK_USER_NAME = true;
			if (tmp == name.value) {
				error.innerHTML = "Low security!";
		}
	}
}
/**
* Regex format email
* @para inputReg
* inputReg: string 
*/
function regexMail(inputReg) {
	var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var checkRegex = new RegExp(reg);
	// begin check data with format
	if (!checkRegex.test(inputReg)) {
		return false;
	}
	return true;
}
/**
* Check input Email
* @para name
* name: get value from email box 
*/
function checkEmail(name) {
	var error = document.getElementById("check-email");
	if (name.value == "" || name.value.length <= 0) {
		error.innerHTML = "";
		return CHECK_EMAIL = false;
	}
	if (regexMail(name.value)) {
		error.innerHTML = "OK";
		error.style.color = OK;
		return CHECK_EMAIL = true;
	} else {
		error.innerHTML = error.value + " is not valid";
		error.style.color = NOT;
		return CHECK_EMAIL = false;
	}
}
/**
* Check input Date with regex 
* @para inputDate
* inputDate: string date
*/
function regexDate(inputDate) {
	var reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
	var checkRegex = new RegExp(reg);
	// begin check data with format
	if (!checkRegex.test(inputDate)) {
		return false;
	}
	return true;
}
/**
* Check input Date 
* @para name
* name: string date, get data from birthday box
*/
function checkDate(name) {
	var error = document.getElementById("check-date");
	var date = name.value;
	if (name.value.length > 0) {
		if (regexDate(name.value)) {
			error.innerHTML = "OK";
			error.style.color = OK;
			return CHECK_DATE = true;

		} else {
			error.innerHTML = error.value + " is not valid";
			error.style.color = NOT;
			return CHECK_DATE = false;
		}
	}
	if (name.value.length <= 0) {
		error.innerHTML = "";
		return CHECK_USER_NAME = false;
	}
	return CHECK_USER_NAME = false;
}
/**
* Reset all value in form
*/
function reset() {
	CHECK_USER_NAME = false;
	CHECK_PASSWORD = false;
	CHECK_EMAIL = false;
	CHECK_BIRTH_DAY = false;
	CHECK_DATE = false;
	document.getElementById("idName").value = "";
	document.getElementById("idPass").value = "";
	document.getElementById("idEmail").value = "";
	document.getElementById("out-date").value = "";
	document.getElementById("check-name").innerHTML ="";
	document.getElementById("check-date").innerHTML	= "";
	document.getElementById("check-email").innerHTML = "";
	document.getElementById("check-pass").innerHTML = "";
}
