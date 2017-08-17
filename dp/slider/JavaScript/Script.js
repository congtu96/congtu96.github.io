var _slider = (function() {
	var ARR_IMG = $(".images");//Array image on slide
	var ARR_IMG_mini = $(".point");//Array image on status bar
	var ARR_IMG_CURRENT = 0;//Variable index img on slider
	var TIME_AUTO = 2500;//2.5s
	var TIME;// Variable time for slide
	var CHECK_MOUSE = true;//Check mouseover and mouseout
	var speed = 500;//speed of effect slider

	/**
	* Next image
	*/
	function nextARR_IMG() {
		ARR_IMG_CURRENT ++;

		if (ARR_IMG_CURRENT > ARR_IMG.length - 1) {
			ARR_IMG_CURRENT = 0;
		}
		showARR_IMG();
	}

	/**
	* Previus image
	*/
	function preARR_IMG() {
		ARR_IMG_CURRENT --;

		if (ARR_IMG_CURRENT < 0) {
			ARR_IMG_CURRENT = ARR_IMG.length - 1;
		}
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
		effectSlider(ARR_IMG_CURRENT);
		Loop();
	}

	/**Effect slider
	* @param number
	* number: picture index in slider
	*/
	function effectSlider(number) {
		ARR_IMG.eq(number).css({"opacity": "1"});
		ARR_IMG.animate({right: 907 * number}, speed);
	}

	/** 
	 * Effect mini images
	 * @param {number}
	 * number: index img to show
	 */
	 function blurARR_IMG(number) {
	 	ARR_IMG.css({"opacity": "0"});
	 	ARR_IMG_mini.css("opacity", "0.3");
	 	ARR_IMG_mini.eq(number).css("opacity", "1");
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
	function choseImg(index) {
		ARR_IMG_CURRENT = ARR_IMG_mini.index(index);
		showARR_IMG();
	}
	return {
		next: nextARR_IMG,
		previous: preARR_IMG,
		autoSlide: showARR_IMG,
		blur: blurARR_IMG,
		chose: choseImg,
	}
})();

/**
* Event click
*/
$(document).ready(function() {
	_slider.autoSlide();
	$(".pre").click(function() {
		_slider.previous();
	});
	$(".next").click(function() {
		_slider.next();
	});
	$(".point").click(function () {
		_slider.chose(this);
	});
});
