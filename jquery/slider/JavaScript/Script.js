var ARR_IMG = $(".images");//Array image on slide
var ARR_IMG_mini = $(".point");//Array image on status bar
var ARR_IMG_CURRENT = 0;//Variable index img on slider
var TIME_AUTO = 3000;//3s
var TIME;// Variable time for slide
var CHECK_MOUSE = true;//Check mouseover and mouseout

/*Event click*/
$(".pre").click(function() {
	ARR_IMG_CURRENT--;
	console.log(ARR_IMG_CURRENT);
	if (ARR_IMG_CURRENT < 0) {
		ARR_IMG_CURRENT = ARR_IMG.length - 1;
	}
	showARR_IMG();
});
$(".next").click(function() {
	nextARR_IMG();
});
$(".point").click(function() {
	ARR_IMG_CURRENT = ARR_IMG_mini.index(this);
	console.log(ARR_IMG_CURRENT);
	showARR_IMG();
});
$(".point").mouseenter(function() {
	CHECK_MOUSE = false;
	blurARR_IMG(ARR_IMG_mini.index(this));
});
$(".point").mouseleave(function() {
	CHECK_MOUSE = true;
	blurARR_IMG(ARR_IMG_CURRENT);
});
/**
* Next image
*/
function nextARR_IMG() {
	ARR_IMG_CURRENT++;
	if (ARR_IMG_CURRENT > ARR_IMG.length - 1) {
		ARR_IMG_CURRENT = 0;
	}
	console.log(ARR_IMG_CURRENT);
	showARR_IMG();
}
/**
* Show image
*/
function showARR_IMG() {
	for (var i = 0; i < ARR_IMG.length; i++) {
		$(".ARR_IMG").eq(i).hide();
		if (CHECK_MOUSE) {
			blurARR_IMG(i);
		}
	}
	ARR_IMG.eq(ARR_IMG_CURRENT).show();
	if (CHECK_MOUSE) {
		blurARR_IMG(ARR_IMG_CURRENT);
	}
	Loop();
}
/** 
 * Effect
 * @param {number}
 * number: index img to show
 */
 function blurARR_IMG(number) {
 	ARR_IMG.css("opacity","0");
 	ARR_IMG.eq(number).css("opacity","1");
 	ARR_IMG_mini.css("opacity","0.5");
 	ARR_IMG_mini.eq(number).css("opacity","1");
 }
 /**
 * Loop of slide
 */
function Loop() {
	clearTimeout(TIME);
	TIME = setTimeout(function() {
		nextARR_IMG();
	}, TIME_AUTO);
}
showARR_IMG();
