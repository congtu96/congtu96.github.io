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
$(document).ready(function() {
	$(".submit").click(function() {
		if (checkPass() && checkUserName() && checkEmail() && checkDate()) {
			$.ajax({
			url : 'GetUserServlet',
			data : {
				userName : $('#idName').val()
			},
			success : function(responseText) {
				alert("ok");
			}
		});
		} else {
			alert("Pleases, check again!");
		}
	});
});
/**
* Event keyup, click, change for text box
*/
$(document).ready(function() {
	$("#idName").keyup(checkUserName);
	$("#idPass").keyup(checkPass);
	$("#idEmail").keyup(checkEmail);
	$("#out-date").keyup(checkDate);
	$("#out-date").click(checkDate);
	$("#out-date").change(checkDate);
	$(".reset").click(reset);
});
/**
* Check input username
*/
function checkUserName() {
	var name = $("#idName");
	var error = $("#check-name");
	if (name.val() == "" || name.val().length <= 0) {
		error.html("");
		return CHECK_USER_NAME = false;
	}
	if (name.val().length < 6) {
		error.html("Short, username is not valid!");
		error.css("color", NOT);
		return CHECK_USER_NAME = false;
	}
	if (name.val().length > 30) {
		error.html("Max length <= 30 character");
		error.css("color", NOT);
		return CHECK_USER_NAME = false;
	}
	if (name.val().length > 6 && name.val().length <= 30) {
		error.html("OK");
		error.css("color", OK);
		return CHECK_USER_NAME = true;
	}
}
/**
* Check input password
*/
function checkPass() {
	var name = $("#idPass");
	var error = $("#check-pass");
	if (name.val() == "" || name.val().length <= 0) {
		error.html("");
		return CHECK_PASSWORD = false;
	}
	if (name.val().length < 6) {
		error.html("Short, password is not valid!");
		error.css("color", NOT);
		return CHECK_PASSWORD = false;
	}
	if (name.val().length > 30) {
		error.html("Max length <= 30 character");
		error.css("color", NOT);
		return CHECK_PASSWORD = false;
	}
	if (name.val().length > 6 && name.val().length <= 30) {
		error.html("OK");
		error.css("color", OK);
		return CHECK_PASSWORD = true;
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
*/
function checkEmail() {
	var name = $("#idEmail");
	var error = $("#check-email");
	if (name.val() == "" || name.val().length <= 0) {
		error.html("");
		return CHECK_EMAIL = false;
	}
	if (regexMail(name.val())) {
		error.html("OK");
		error.css("color", OK);
		return CHECK_EMAIL = true;
	} else {
		error.html("Email is not valid!");
		error.css("color", NOT);
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
*/
function checkDate() {
	var name = $("#out-date");
	var error = $("#check-date");
	if (name.val().length > 0) {
		if (regexDate(name.val())) {
			error.html("OK");
			error.css("color", OK);
			return CHECK_DATE = true;
		} else {
			error.html("is not valid");
			error.css("color", NOT);
			return CHECK_DATE = false;
		}
	}
	if (name.val().length <= 0) {
		error.html("");
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
	$("#idName").val("");
	$("#idPass").val("");
	$("#idEmail").val("");
	$("#out-date").val("");
	$("#check-name").html("");
	$("#check-date").html("");
	$("#check-email").html("");
	$("#check-pass").html("");
}