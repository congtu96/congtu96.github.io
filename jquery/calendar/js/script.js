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
var input = $("#out-date");
$("#out-date").click(function() {

    if (checkTable) {
        create_Empty_Calendar();
    }

    if (checkInput(input.val()) == 0) {
        CURR_MONTH = TODAY.getMonth() + 1;
        CURR_YEARS = TODAY.getFullYear();
        set_Calendar();
    } else if (checkInput(input.val()) == 1) {
        var tmp = input.val().split("/");
        CURR_MONTH = tmp[1];
        CURR_YEARS = tmp[2];

        if ($(".today").length != 0) {
            $(".today")[0].classList.remove("today");
        }

        if ($(".active").length != 0) {
            $(".active")[0].classList.remove("active");
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

    if (regexDate) {
    	return 1;
    }
    return 0;
}
/**
* Clear calendar
**/
function clear_Calendar() {
    var colum = $("td");
    for (var i = colum.length - 1; i >= 7; i --) {
        colum[i].innerHTML = "";
    }
}
/**
* Set calendar
**/
function set_Calendar(){
    var firstDay = new Date(CURR_YEARS, CURR_MONTH - 1, 1);
    var lastOfMonth = new Date(CURR_YEARS, CURR_MONTH, 0); //lastOfMonth.getDate(); ==> 31 days of month 7th
    console.log(CURR_YEARS);
    $("#idOption_Year").val(CURR_YEARS); //set present years 
    $("#idOption_Month").val(CURR_MONTH); //set present month
    // firstDay.getDay() get  first Day of week
    // lastOfMonth.getDate() get nums days of month
    var numsDayOfMonth = lastOfMonth.getDate();
    var first = firstDay.getDay();
    // array follow tag td
    colum = $("td");
    colum.click(function() {
        aDay(this);
    });
    for (var i = 0; i > 7; i ++) {
        colum[i].text(CURR_DAY[i]); 
    }
    for (var i = colum.length - 1; i >= 7; i --) {

        if (i - 7 == first)
        {
            flag = i;
        }   
    }
    // all arr tag <td>, [0-7] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']: day of week 
    // fill day of month
    var index = 1;
    lengthArr = numsDayOfMonth + flag;
    for (var i = flag; i < lengthArr; i ++){
        colum[i].innerHTML = index;
        // add event click for a day to get date
        var tmp = new Date();// use to get month and year at present

        if (CURR_MONTH == tmp.getMonth() + 1 && CURR_YEARS == tmp.getFullYear())

            if (index == TODAY.getDate()) {
                colum[i].classList.add("today");
            }
            else {
                colum[i].classList.add("default");
            }
        index ++;
    }
}
/**
* Set date for input box (out-date) when click on table calendar
**/
function aDay(day) {
    for (var i = flag; i < lengthArr; i ++) {

        if(colum[i].classList.contains("active")) {
            colum[i].classList.remove("active");
        }

        if(colum[i].classList.contains("default")) {
            colum[i].classList.remove("default");
        }
    }

    if (day.innerHTML == "" || day.innerHTML == null) {
            day.classList.add("default");
    } else {
                input.val(day.innerHTML + "/" + CURR_MONTH + "/" + CURR_YEARS);
                delete_Calendar();
            }
    day.classList.add("active");
}
/**
* Summation month
**/
function addMonth() {

    if ($(".today").length != 0) {
        $(".today")[0].classList.remove("today");
    }

    if ($(".active").length != 0) {
        $(".active")[0].classList.remove("active");
    }

    if (CURR_MONTH <= 12) {
        CURR_MONTH ++;
    }

    if (CURR_MONTH > 12) {
        CURR_MONTH = 1;
        CURR_YEARS ++;
    }
    clear_Calendar();
    set_Calendar();
}
/**
* Subtraction month
**/
function minusMonth() {

    if ($(".today").length != 0) {
        $(".today")[0].classList.remove("today");
    }

    if ($(".active").length != 0) {
        $(".active")[0].classList.remove("active");
    }

    if (CURR_MONTH >= 1) {
        CURR_MONTH --;
    }

    if (CURR_MONTH < 1) {
        CURR_MONTH = 12;
        CURR_YEARS --;
    }
    clear_Calendar();
    set_Calendar();
}
/**
* Summation year
**/
function addYear() {

    if ($(".today").length != 0) {
        $(".today")[0].classList.remove("today");
    }

    if ($(".active").length != 0) {
        $(".active")[0].classList.remove("active");
    }

    if (CURR_YEARS < TODAY.getFullYear() + 400) {
        CURR_YEARS ++;
    }
    clear_Calendar();
    set_Calendar(); 
}
/**
* Subtraction year
**/
function minusYear() {

    if ($(".today").length != 0) {
        $(".today")[0].classList.remove("today");
    }

    if ($(".active").length != 0) {
        $(".active")[0].classList.remove("active");
    }

    if (CURR_YEARS > 1900) {
        CURR_YEARS --;
    }
    clear_Calendar();
    set_Calendar(); 
}
/**
* Select month in option box
**/
function choseMonth() {

    if ($(".today").length != 0) {
        $(".today")[0].classList.remove("today");
    }

    if ($(".active").length != 0) {
        $(".active")[0].classList.remove("active");
    }
    CURR_MONTH = document.getElementById("idOption_Month").value;
    clear_Calendar();
    set_Calendar();
}
/**
* Select year in option box
**/
function choseYear() {

    if ($(".today").length != 0) {
        $(".today")[0].classList.remove("today");
    }

    if ($(".active").length != 0) {
        $(".active")[0].classList.remove("active");
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
    var input = $("#input");
    var div = $("<div>", { id: "calendar"});
    input.append(div);
/*========= CREATE DIV HEADER OF CALENDAR =========*/
    var header = $("<div>", { id: "id_header"});
    /*--- create div year ---*/
    /*create button left of year*/
    var btn_L_Year = $("<button>", {text: "<", id: "idBtn_L_year", "class": "button_Control", type: "button"});
    /*create option year*/
    var select_Year = $("<select>", {id: "idOption_Year"});
    for (var i = 1899; i < TODAY.getFullYear() + 400; i++) {
        var option_Year = $("<option>", {value: i, text: i});
        select_Year.append(option_Year);
    }
    /*create button right of year*/
    var btn_R_Year = $("<button>", {text: ">", id: "idBtn_R_year", "class": "button_Control", type: "button"});
    /*--- create div month ---*/
    /*create button left of month*/
    var btn_L_Month = $("<button>", {text: "<", id: "idBtn_L_month", "class": "button_Control", type: "button"});
    /*create option month*/
    var select_Month = $("<select>", {id: "idOption_Month"});
      for (var i = 0; i < ARR_MONTH.length; i++) {
        var option_Month = $("<option>", {value: i+1, text: ARR_MONTH[i]});
        select_Month.append(option_Month);
    }
    /*create button right of month*/
    var btn_R_Month = $("<button>", {text: ">", id: "idBtn_R_month", "class": "button_Control", type: "button"});

/*========= CREATE DIV TABLE CALENDAR =========*/
    // set day name
    var body = $("body");
    var top_Table = $("<table>", {id: "dayName"});
    body.append(top_Table);
    for (var i = 0; i < 7; i++) {
        var tmp = $("<td>", {text: ARR_DAY[i]});
        top_Table.append(tmp);
    }
    // create elements <table> and a <tbody>
    var tbl =$("<table>", {id: "table"});
    var tblBody = $("<tbody>");
    for (var j = 0; j < 6; j++) {
    // table row creation
        var row = $("<tr>", {id: "row"});
        for (var i = 0; i < 7; i++) {
            // create element <td> and text node 
            // Make text node the contents of <td> element
            // put <td> at end of the table row
            var cell = $("<td>", {id: "colum"});
            row.append(cell);
        }
        // row added to end of table body
        tblBody.append(row);
    }
    tbl.append(tblBody);
    header.append(btn_L_Year, select_Year, btn_R_Year, btn_L_Month, select_Month, btn_R_Month);
    div.append(header, top_Table, tbl);
    /*event click*/
    $("#idBtn_R_month").click(addMonth);
    $("#idBtn_L_month").click(minusMonth);
    $("#idBtn_L_year").click(minusYear);
    $("#idBtn_R_year").click(addYear);
    $("#idOption_Month").click(choseMonth);
    $("#idOption_Year").click(choseYear);
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
