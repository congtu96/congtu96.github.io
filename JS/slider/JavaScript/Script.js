var IndexCurrent = 0; //Default value when load page
var loop = true;  // Loop is start
var showbutton =true;  //Show button arrow
var duration = 5000; //time loop 
var call = true;//Flag to call next or previous image
//Array images taken from class name image
var List_img = document.getElementsByClassName("slider")[0].getElementsByClassName("images");
//Array point status following slide image
var Bar_status= document.getElementsByClassName("status")[0].getElementsByClassName("point");
//func set a image
function setImage(indexOld){
     for(i = 0; i < List_img.length; i++){
         if(i != indexOld)
            List_img[i].style.opacity = 0;
    }
    var opacity = 0;
    var opacityImageOld = 1;
    var setOpacity =  setInterval(function (){
            List_img[IndexCurrent].style.opacity = opacity;
            List_img[indexOld].style.opacity = opacityImageOld;
            if(opacity >= 1 && opacityImageOld <= 0){
                call = true;
                clearInterval(setOpacity);
                return;
            }
            opacity += 0.02;
            opacityImageOld -= 0.02;    
    }, duration / 200); 
}
//mouse event
function MouseIn(n) {
    loop=false;
    call=false;
    for (i=0; i<Bar_status.length;i++)
        if (i==n)
            Bar_status[i].style.opacity=1;
        else Bar_status[i].style.opacity=0.3;
}
function MouseOut(){
    loop=true;
    call=true;
    for (i=0; i<Bar_status.length;i++)
        Bar_status[i].style.opacity=0.3;
}
//Select picture under slide
function Select(n){
    oop=false;
    call=false;
    IndexCurrent=n;
    for(i = 0; i < List_img.length; i++){
         if(i != n)
            List_img[i].style.opacity = 0;
    }
     List_img[n].style.opacity = 1;
}
//func get next image
function getNextImage(){
    if(call == false){
        return;
    }
    if(IndexCurrent == List_img.length - 1){
        IndexCurrent = 0;
        setImage( List_img.length - 1);
    }
    else {
         IndexCurrent++;
         setImage(IndexCurrent - 1);
    }
    call = false;
}
//func get previous image
function getPrevImage(){
    if(call == false){
        return;
    }
    if(IndexCurrent == 0){
        IndexCurrent = List_img.length - 1;
        setImage( 0);
    }
    else {  
         IndexCurrent--;
         setImage(IndexCurrent + 1);
    }
    call = false;
}
//func auto slide with default time
function initSlider(){
    List_img[IndexCurrent].style.opacity = 1;
    if(loop){
            setInterval(getNextImage, duration);
    }
}

