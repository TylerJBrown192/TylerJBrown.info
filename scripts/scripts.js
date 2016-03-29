$(document).ready(function(){

	if( $('#tab_contents').length > 0 ) {
		$('#tab_contents').flexslider({
			controlNav: true,
			directionNav: false,
			animationLoop: false,
			animationSpeed: 1000,
			animation: 'slide',
			slideshow: false,
			manualControls: '#mainmenu li a'
		}).mCustomScrollbar({
			autoHideScrollbar: false,
			alwaysShowScrollbar: 2,
			mouseWheel: true
		});
	}


	$('#show_content, #header').click(function(){
		$('#content').addClass('visible');
		$('body').addClass('content_vis');

		document.getElementById('header').style.zIndex = 2;
		document.getElementById('header_opacity').style.background = 'none';

		if (screen.height >= 800 && screen.width <= 1024) {
			var swipeInst = document.getElementById('swipe_inst');

			setTimeout(function() {
				swipeInst.style.visibility = 'visible';
				swipeInst.style.opacity = 1;
			}, 2000);

			setTimeout(function() {
				swipeInst.style.visibility = 'hidden';
				swipeInst.style.opacity = 0;
			}, 6500);
		}

		return false;
	});

	$('.close_content').click(function() {
		$('#content').removeClass('visible');
		$('body').removeClass('content_vis');

		document.getElementById('header').style.zIndex = 3;

		if (screen.width < 1024) {
			document.getElementById('header_opacity').style.background = 'rgba(0,0,0,.7)';
		}

		return false;
	});
});


// var market = $("#market img"),
// 	setList = $("#set_list img"),
// 	noodle = $("#noodle img");
//
// function imageCycle(imgArray) {
// 	imgArray.forEach(function(image) {
// 		var oldIndex = null,
// 			index = imgArray.indexOf(image);
//
// 		if (index === imgArray.length - 1) {
// 			oldIndex = imgArray[0];
// 		} else if (index === 0) {
// 			oldIndex = imgArray[imgArray.length - 1];
// 		} else {
// 			oldIndex = imgArray[index - 1];
// 		}
//
// 		oldImage.style.visibility = 'hidden';
// 		oldImage.style.visibility = 0;
//
// 		image.style.visibility = 'visible';
// 		image.style.opacity = 1;
// 	});
// };
//
// setInterval(function() {
// 	imageCycle(market);
// }, 2000); //different than other timeout because of array.length
//
// setInterval(function() {
// 	imageCycle(setList);
// 	imageCycle(noodle);
// }, 3000);


/* Vertical Alignment */
function vertAlign(elem) {
	if(elem) {
		elem.css({
			'marginTop' : - elem.height()/2
		}).fadeIn();
	}
}
