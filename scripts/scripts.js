$(document).ready(function() {

    if ($('#tab_contents').length > 0) {
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


    $('#show_content, #header').click(function() {
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

//TODO: Creating image fade cycling for Projects columns. I won't implement a carousel, damn it!
var market = $('#market   img'),
    setList = $('#set_list img'),
    noodle = $('#noodle   img'),
    projectImg = $('#projects img'),
    indexStore = 0,
    arrayStore;

function imageCycle(imgArray) {
    var oldIndex = imgArray[indexStore];
    newIndexIndex = $(imgArray).index(oldIndex),
        newIndex = imgArray[newIndexIndex + 3],
        //newIndex should never go over array.length limit because of final if / else check at end of fucntion
        //increase newIndex to the maximum length of the longest array in set, assuming [firstArray].length is shorter. If not, then longestArray.length + 1
        newIndexRefresh = $(imgArray).index(newIndex),
        indexBack = index[newIndexRefresh - 1],
        indexForw = index[newIndexRefresh + 1],
        tempVar;

    if ((indexBack == undefined) && (($(imgArray).index(oldIndex) + 3) >= (imgArray.length))) {
        tempVar = ((imgArray.length - 1) - $(imgArray).index(newIndex) + 3);
        //begrudgingly have to create a tempVar variable because array[indexes] can handle simple math but not function calls
        indexBack = index[tempVar];
    }

    //TODO: Mirror above if statement functionality
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

    if (indexStore + 3 >= imgArray.length) {
        indexStore = ((imgArray.length - 1) - (indexStore + 3));
    } else {
        indexStore += 3;
    }
};

setInterval(function() {
    imageCycle(projectImg);
}, 500);


/* Vertical Alignment */
function vertAlign(elem) {
    if (elem) {
        elem.css({
            'marginTop': -elem.height() / 2
        }).fadeIn();
    }
}
