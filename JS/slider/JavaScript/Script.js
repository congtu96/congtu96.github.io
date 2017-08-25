var INDEX_CURRENT = 0; //Default value when load page
var LOOP = true;  // LOOP is start
var DURATION = 5000; //time LOOP 
var CALL = true;//Flag to CALL next or previous image
//Array images taken from class name image
var LIST_IMG = document.getElementsByClassName("slider")[0].getElementsByClassName("images");
//Array point status following slide image
var BAR_STATUS = document.getElementsByClassName("status")[0].getElementsByClassName("point");
/*
* Set image
* @para indexOld
* indexOld (nums) current image to next image
*/
function setImage(indexOld) {
     for (i = 0; i < LIST_IMG.length; i++) {
         if (i != indexOld)
            LIST_IMG[i].style.opacity = 0;
    }
    var opacity = 0;
    var opacityImageOld = 1;
    var setOpacity =  setInterval(function () {
            LIST_IMG[INDEX_CURRENT].style.opacity = opacity;
            LIST_IMG[indexOld].style.opacity = opacityImageOld;
            if (opacity >= 1 && opacityImageOld <= 0) {
                CALL = true;
                clearInterval(setOpacity);
                return;
            }
            opacity += 0.02;
            if (opacityImageOld > 0) {
                opacityImageOld -= 0.02;
            }
            if (opacityImageOld < 0) {
                opacityImageOld = 0;
            }
    }, DURATION / 200); 
}
/*onmouseover
* @para n
* n is nums image under slider
*/
function mouseIn(n) {
    LOOP = false;
    CALL = false;
    for (i = 0; i < BAR_STATUS.length; i++)
        if (i == n) {
            BAR_STATUS[i].style.opacity = 1;
        } else {
            BAR_STATUS[i].style.opacity = 0.3;
        }
}
/*onmouseout*/
function mouseOut() {
    LOOP = true;
    CALL = true;
    for (i = 0; i < BAR_STATUS.length; i++) {
        BAR_STATUS[i].style.opacity = 0.3;
    }
}
/*select picture under slide
* @para n
* n is nums image under slider
*/
function selectImg(n) {
    LOOP = false;
    CALL = false;
    INDEX_CURRENT = n;
    for (i = 0; i < LIST_IMG.length; i++) {
         if (i != n) {
            LIST_IMG[i].style.opacity = 0;
        }
    }
     LIST_IMG[n].style.opacity = 1;
}
/*get next image*/
function getNextImage() {
    if (CALL == false) {
        return;
    }
    if (INDEX_CURRENT == LIST_IMG.length - 1) {
        INDEX_CURRENT = 0;
        setImage( LIST_IMG.length - 1);
    }
    else {
         INDEX_CURRENT++;
         setImage(INDEX_CURRENT - 1);
    }
    CALL = false;
}
/*get previous image*/
function getPrevImage() {
    if (CALL == false) {
        return;
    }
    if (INDEX_CURRENT == 0) {
        INDEX_CURRENT = LIST_IMG.length - 1;
        setImage( 0);
    }
    else {
         INDEX_CURRENT--;
         setImage(INDEX_CURRENT + 1);
    }
    CALL = false;
}
/*auto slider with default time*/
function initSlider() {
    LIST_IMG[INDEX_CURRENT].style.opacity = 1;
    if (LOOP) {
            setInterval(getNextImage, DURATION);
    }
}
