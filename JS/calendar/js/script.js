/***********************************
* ARR_MONTH: list month of year
* ARR_DAY: list day of week
* TODAY: use to get date, month, year
* CURR_MONTH: present month of TODAY
* CURR_DAY: present day of TODAY
* CURR_YEARS: present year of TODAY
************************************/
var ARR_MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var ARR_DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var TODAY = new Date();
var CURR_MONTH;
var CURR_DAY;
var CURR_YEARS;
var colum;
var flag; //get (number) location fist day of month in array of tag <td> (in func set_Calendar)
var lengthArr; // = num date of month + flag
var checkTable = true; // check create table
var input = document.getElementById("out-date");
input.addEventListener("click", function() {
    if (checkTable)
        create_Empty_Calendar();
	if (input.value == "") {
		CURR_MONTH = TODAY.getMonth() + 1;
		CURR_YEARS = TODAY.getFullYear();
        set_Calendar();
	} else
    if (checkInput(input.value) == 1) {
        CURR_MONTH = parseInt(input.value.split("/")[1]);
        CURR_YEARS = parseInt(input.value.split("/")[2]);
        if (document.getElementsByClassName("today").length != 0) {
        document.getElementsByClassName("today")[0].classList.remove("today");
        }
        if (document.getElementsByClassName("active").length != 0) {
            document.getElementsByClassName("active")[0].classList.remove("active");
        }
        clear_Calendar();
        set_Calendar();
    }
});
/**
* Check format date to get day, month, year
**/
function checkInput(textIn) {
    // regex DD/MM/YYYY
    var reg = "(([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([0-9]{4}))";
    var regexDate = new RegExp(reg).test(textIn)
    if (regexDate) { return 1; }

    return 0;
}
/**
* Clear calendar
**/
function clear_Calendar() {
    var colum = document.getElementsByTagName("td");
    for (var i = colum.length - 1; i >= 7; i--) {
        colum[i].innerHTML = "";
    }
}
/**
* Set calendar
**/
function set_Calendar(){
    var firstDay = new Date(CURR_YEARS, CURR_MONTH - 1, 1);
    var lastOfMonth = new Date(CURR_YEARS, CURR_MONTH, 0); //lastOfMonth.getDate(); ==> 31 days of month 7th
    document.getElementById("idOption_Year").value = CURR_YEARS; //set present years 
    document.getElementById("idOption_Month").value = CURR_MONTH; //set present month
    // firstDay.getDay() get  first Day of week
    // lastOfMonth.getDate() get nums days of month
    var numsDayOfMonth = lastOfMonth.getDate();
    var first = firstDay.getDay();
    // array follow tag td
    colum = document.getElementsByTagName("td");
    for (var i = 0; i > 7; i++) {
        colum[i].innerHTML = CURR_DAY[i];
    }
    for (var i = colum.length - 1; i >= 7; i--) {
        if (i-7 == first)
      	{
           	colum[i].innerHTML = "first";
            flag = i;
        }   
    }
    // all arr tag <td>, [0-7] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']: day of week 
    // fill day of month
    var index = 1;
    lengthArr = numsDayOfMonth + flag;
    for (var i = flag; i < lengthArr; i++){
        colum[i].innerHTML = index;
        // add event click for a day to get date
        colum[i].addEventListener("click", function() {
           aDay(this);
        });
        var tmp = new Date();// use to get month and year at present
        if (CURR_MONTH == tmp.getMonth() + 1 && CURR_YEARS == tmp.getFullYear())
            if (index == TODAY.getDate())
                colum[i].classList.add("today");
            else colum[i].classList.add("default");
        index++;
    }
}
/**
* Set date for input box (out-date) when click on table calendar
**/
function aDay(day) {
    for (var i = flag; i < lengthArr; i++) {
        if(colum[i].classList.contains("active"))
            colum[i].classList.remove("active");
        if(colum[i].classList.contains("default"))
            colum[i].classList.remove("default");
    }
    if (day.innerHTML == "" || day.innerHTML == null) {
        day.classList.add("default");
    } else {
                input.value = day.innerHTML + "/" + CURR_MONTH + "/" + CURR_YEARS;
                delete_Calendar();
            }
    day.classList.add("active");
}
/**
* Summation month
**/
function addMonth() {
    if (document.getElementsByClassName("today").length != 0) {
        document.getElementsByClassName("today")[0].classList.remove("today");
    }
    if (document.getElementsByClassName("active").length != 0) {
        document.getElementsByClassName("active")[0].classList.remove("active");
    }
    if (CURR_MONTH < 12)
        CURR_MONTH ++;
    clear_Calendar();
    set_Calendar();  
}
/**
* Subtraction month
**/
function minusMonth() {
    if (document.getElementsByClassName("today").length != 0) {
        document.getElementsByClassName("today")[0].classList.remove("today");
    }
    if (document.getElementsByClassName("active").length != 0) {
        document.getElementsByClassName("active")[0].classList.remove("active");
    }
    if (CURR_MONTH > 1)
        CURR_MONTH --;
    clear_Calendar();
    set_Calendar();
}
/**
* Summation year
**/
function addYear() {
    if (document.getElementsByClassName("today").length != 0) {
        document.getElementsByClassName("today")[0].classList.remove("today");
    }
    if (document.getElementsByClassName("active").length != 0) {
        document.getElementsByClassName("active")[0].classList.remove("active");
    }
    if (CURR_YEARS < TODAY.getFullYear() + 400)
        CURR_YEARS ++;
    clear_Calendar();
    set_Calendar(); 
}
/**
* Subtraction year
**/
function minusYear() {
    if (document.getElementsByClassName("today").length != 0) {
        document.getElementsByClassName("today")[0].classList.remove("today");
    }
    if (document.getElementsByClassName("active").length != 0) {
        document.getElementsByClassName("active")[0].classList.remove("active");
    }
    if (CURR_YEARS > 1900)
        CURR_YEARS --;
    clear_Calendar();
    set_Calendar(); 
}
/**
* Select month in option box
**/
function choseMonth() {
    if (document.getElementsByClassName("today").length != 0) {
        document.getElementsByClassName("today")[0].classList.remove("today");
    }
    if (document.getElementsByClassName("active").length != 0) {
        document.getElementsByClassName("active")[0].classList.remove("active");
    }
    CURR_MONTH = document.getElementById("idOption_Month").value;
    clear_Calendar();
    set_Calendar();
}
/**
* Select year in option box
**/
function choseYear() {
    if (document.getElementsByClassName("today").length != 0) {
        document.getElementsByClassName("today")[0].classList.remove("today");
    }
    if (document.getElementsByClassName("active").length != 0) {
        document.getElementsByClassName("active")[0].classList.remove("active");
    }
    CURR_YEARS = document.getElementById("idOption_Year").value;
    clear_Calendar();
    set_Calendar();
}
/**
* Clear table calendar
**/
function clearTable() {
    for (var i = 0; i < colum.length; i++){
        colum[i].innerHTML = "";
    }
}
/**
* Create table calendar
**/
function create_Empty_Calendar() {
    checkTable = false;
    var input = document.getElementById("input");
    var div = document.createElement("div");
    div.id = "calendar";
    input.parentNode.appendChild(div);
/*========= CREATE DIV HEADER OF CALENDAR =========*/
    var header = document.createElement("div");
    header.id = "id_header";
    /*--- create div year ---*/
    /*create button left of year*/
    var btn_L_Year = document.createElement("button");
    btn_L_Year.id = "idBtn_L_year";
    btn_L_Year.innerHTML = "&lt;";
    btn_L_Year.type = "button";
    btn_L_Year.setAttribute("onclick","minusYear()");
    btn_L_Year.classList.add("button_Control");
    header.appendChild(btn_L_Year);
    /*create option year*/
    var select_Year = document.createElement("select");
    select_Year.id = "idOption_Year";
    select_Year.setAttribute("onchange","choseYear()");
    for (var i = 1900; i < TODAY.getFullYear() + 400; i++) {
        var option_Year = document.createElement("option");
        option_Year.value = i;// 1- january 2- fedruary
        option_Year.text = i;
        select_Year.appendChild(option_Year);
    }
    header.appendChild(select_Year);
    /*create button right of year*/
    var btn_R_Year = document.createElement("button");
    btn_R_Year.id = "idBtn_R_year";
    btn_R_Year.innerHTML = "&gt;";
    btn_R_Year.type = "button";
    btn_R_Year.setAttribute("onclick","addYear()");
    btn_R_Year.classList.add("button_Control");
    header.appendChild(btn_R_Year);
    /*--- create div month ---*/
    /*create button left of month*/
    var btn_L_Month = document.createElement("button");
    btn_L_Month.id = "idBtn_L_month";
    btn_L_Month.innerHTML ="&lt;";
    btn_L_Month.type = "button";
    btn_L_Month.setAttribute("onclick","minusMonth()");
    btn_L_Month.classList.add("button_Control");
    header.appendChild(btn_L_Month);
    /*create option month*/
    var select_Month = document.createElement("select");
    select_Month.id = "idOption_Month";
    select_Month.setAttribute("onchange","choseMonth()");
    for (var i = 0; i < ARR_MONTH.length; i++) {
        var option_Month = document.createElement("option");
        option_Month.value = i + 1;// 1- january 2- fedruary
        option_Month.text = ARR_MONTH[i];
        select_Month.appendChild(option_Month);
    }
    header.appendChild(select_Month);
    /*create button right of month*/
    var btn_R_Month = document.createElement("button");
    btn_R_Month.id = "idBtn_R_month";
    btn_R_Month.innerHTML = "&gt;";
    btn_R_Month.type = "button";
    btn_R_Month.setAttribute("onclick","addMonth()");
    btn_R_Month.classList.add("button_Control");
    btn_R_Month.classList.add("class_R_month");
    header.appendChild(btn_R_Month);
/*========= CREATE DIV TABLE CALENDAR =========*/
    // set day name
    var body = document.getElementsByTagName("body")[0];
    var top_Table = document.createElement("table");
    top_Table.id = "dayName";
      for (var i = 0; i < 7; i++) {
        var tmp = document.createElement("td");
        tmp.innerHTML = ARR_DAY[i];
        top_Table.appendChild(tmp);
    }
    body.appendChild(top_Table);
    //top_Table.setAttribute("border","2");
    // create elements <table> and a <tbody>
    var tbl = document.createElement("table");
    tbl.id = "table"
    var tblBody = document.createElement("tbody");
    // cells creation
    for (var j = 0; j < 6; j++) {
    // table row creation
        var row = document.createElement("tr");
        row.id = "row";
        for (var i = 0; i < 7; i++) {
            // create element <td> and text node 
            // Make text node the contents of <td> element
            // put <td> at end of the table row
            var cell = document.createElement("td");
            cell.id = "colum";
            row.appendChild(cell);
        }
        // row added to end of table body
        tblBody.appendChild(row);
    }
    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);
    div.appendChild(header);
    div.appendChild(top_Table);
    div.appendChild(tbl);
}
/*
* Delete table calendar
*/
function delete_Calendar() {
    checkTable = true;
    var calendar = document.getElementById("calendar");
    if (calendar != null) {
        calendar.parentNode.removeChild(calendar);
    }
}