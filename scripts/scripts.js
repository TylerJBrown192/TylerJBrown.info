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


var market  	= $('#market   img'),
	setList 	= $('#set_list img'),
	noodle  	= $('#noodle   img'),
	projectImg  = $('#projects img'),
	indexStore  = 0,
	arrayStore;

function imageCycle(imgArray) {
	var	oldIndex 	= imgArray[indexStore];
	var newIndexIndex = $(imgArray).index(oldIndex);
	var	newIndex	= imgArray[newIndexIndex + 3];	//increase newIndex to the maximum length of the longest array in set, assuming [firstArray].length is shorter. If not, then longestArray.length + 1
	var newIndexRefresh = $(imgArray).index(newIndex);
	var	indexBack 	= index[newIndexRefresh - 1];
	var	indexForw	= index[newIndexRefresh + 1];

	if (indexBack == undefined && (($(imgArray).index(oldIndex) + 3) >= (imgArray.length + 1))) {

		indexBack = newIndex[imgArray.length - 1];
	}

	if (indexForw >= imgArray.length) {
		indexForw = newIndex[0];
	}

	//turn this into case switch, assuming switch checks falsy values
	if ($.inArray(newIndex, market) !== (-1)) {
		arrayStore = market;
	} else if ($.inArray(newIndex, setList) !== (-1)) {
		arrayStore = setList;
	} else {
		arrayStore = noodle;
	}

	if (($(indexBack).css('visibility') == 'visible') && ($.inArray(indexBack, arrayStore) !== (-1))) {
		oldIndex = indexBack;
	} else {
		oldIndex = indexForw;
	}

	$(oldIndex).css('visibility', 'hidden');
	$(oldIndex).css('opacity', 0);

	$(newIndex).css('visibility', 'visible');
	$(newIndex).css('opacity', 1);

	if (indexStore >= imgArray.length) {
		indexStore = imgArray.length - indexStore;
	} else {
		indexStore += 3;
	}
};

setInterval(function() {
	imageCycle(projectImg);
}, 500);


// function imageCycle() {
// 	var total = $('#market img').length;
//
// 	$('#market img').css('z-index', 1);
//
// 	$('#market img:nth-child(' + counter + ')').css({
// 		'opacity': 0,
// 		'display': 'block',
// 		'z-index': 2
// 	});
//
// 	$('#market img:nth-child(' + counter + ')').animate({
// 		'opacity': 1
// 	}, 1000);
//
// 	counter++;
// 	if (counter > total) { counter = 1 }
// };


// setInterval(function() {
// 	imageCycle(setList);
// 	imageCycle(noodle);
// }, 8000);

// function imageCycle(imgArray) {
// 	imgArray.each(function(index, image) {
// 		var oldIndex = null;
//
// 		if (index === (imgArray.length - 1)) {
// 			oldIndex = imgArray[0];
// 		} else if (index === 0) {
// 			oldIndex = imgArray[imgArray.length - 1];
// 		} else {
// 			oldIndex = imgArray[index - 1];
// 		}
//
// 		// setTimeout(function() {
// 			oldIndex = $(oldIndex).css("visibility", "hidden");
// 			oldIndex = $(oldIndex).css("opacity", 0);
// 		// }, 1000);
//
// 		setTimeout(function() {
// 			image = $(image).css("visibility", "visible");
// 			image = $(image).css("opacity", 1);
// 		})
// 	});
// };


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
// 		oldIndex.style.visibility = 'hidden';
// 		oldIndex.style.visibility = 0;
//
// 		image.style.visibility = 'visible';
// 		image.style.opacity = 1;
// 	});
// };


/* Vertical Alignment */
function vertAlign(elem) {
	if(elem) {
		elem.css({
			'marginTop' : - elem.height()/2
		}).fadeIn();
	}
}
