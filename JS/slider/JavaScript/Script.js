var IndexCurrent = 0; //Default value when load page
var loop = true;  // Loop is start
var showbutton =true;  //Show button arrow
var duration = 3000; //time loop 
//Array images taken from class name image
var List_img = document.getElementsByClassName("slider")[0].getElementsByClassName("images");
var call = true;//Flag to call next or previous image
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
    }, duration / 100); 
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

