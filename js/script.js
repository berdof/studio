/* Author:  Alexander Berdyshev
 */
var cssFix = function () {
    var u = navigator.userAgent.toLowerCase(),
        addClass = function (el, val) {
            if (!el.className) {
                el.className = val;
            } else {
                var newCl = el.className;
                newCl += (" " + val);
                el.className = newCl;
            }
        },
        is = function (t) {
            return (u.indexOf(t) != -1)
        };
    addClass(document.getElementsByTagName('html')[0], [
        (!(/opera|webtv/i.test(u)) && /msie (d)/.test(u)) ? ('ie ie' + RegExp.$1)
            : is('firefox/2') ? 'gecko ff2'
            : is('firefox/3') ? 'gecko ff3'
            : is('gecko/') ? 'gecko'
            : is('opera/9') ? 'opera opera9' : /opera (d)/.test(u) ? 'opera opera' + RegExp.$1
            : is('konqueror') ? 'konqueror'
            : is('applewebkit/') ? 'webkit safari'
            : is('mozilla/') ? 'gecko' : '',
        (is('x11') || is('linux')) ? ' linux'
            : is('mac') ? ' mac'
            : is('win') ? ' win' : ''
    ].join(" "));
}();



$(document).ready(function () {

    $('body').localScroll({
        onAfter:function (target) {
            location = '#' + ( target.id || target.name );
        }
    });
        if($(window).height()<800){
            paralaxActivate(false)
        }

    $('.btn-toggler').click(function () {
        $(this).toggleClass('active');
    })


    var scrollP;
    $('.live-article .btn-toggler').click(function () {

        $('.live-article-nav').toggleClass('inside outside');

        scrollP = $('.live-article_contents').jScrollPane({
            autoReinitialise:true,
            autoReinitialiseDelay:50,
            animateScroll:true,
            verticalDragMinHeight:15,
            verticalDragMaxHeight:15});

        if (!$('.live-article .btn-toggler').hasClass('active')) {
            var api = scrollP.data('jsp');
            api.destroy();

        }


        //  var api = scrollP.data('jsp');
        //api.destroy();

        $(this).closest('.live-article').toggleClass('opened');
    })


    $('.inside .live-article-nav_prev').live('click', function () {
        var api = scrollP.data('jsp');
        api.scrollByY(-60)
    })
    $('.inside .live-article-nav_next').live('click', function () {
        var api = scrollP.data('jsp');
        api.scrollByY(60)
    })

    $('.outside .live-article-nav_prev').live('click', function () {
        //put ajax logic here
    })
    $('.outside .live-article-nav_next').live('click', function () {
        //put ajax logic here
    })


    activateMenu('.nav__content a');
    activateMenu('.nav__content__live a');
    activateMenu('.nav__header a');
    activateMenu('.nav__footer a');

    function activateMenu(selector) {
        $(selector).click(function () {
            $(selector).removeClass('active');
            $(this).addClass('active');
        })
    }


    $('.support_btn').click(function () {
        $(this).parent().toggleClass('closed');
    })


    $('.live-team-article .btn-toggler').live('click', function () {
        var bFlag = $(this).closest('.live-team-article').find('.live-team-article_spoiler').css('display') == 'block';
        console.debug(bFlag);
        if (bFlag) {
            $('.live-team-article .live-team-article_spoiler').slideUp(400);

        } else {
            $('.live-team-article .live-team-article_spoiler').slideUp(400);
            $('.live-team-article-list li').attr('data-free', 'yes');
            $(this).closest('li').attr('data-free', 'no');
            $('.live-team-article-list li[data-free=yes]').animate({'height':'164px'}, 400);
            $(this).closest('.live-team-article').find('.live-team-article_spoiler').slideDown(400);
        }
        $(this).closest('li').animate({'height':(!bFlag ? '249px' : '164px')}, 400);
        $('.live-team-article-list').animate({'height':( bFlag ? '656px' : '732px')}, 400);
        $('.live-team-article-list li[data-free=yes] .btn-toggler').removeClass('active');
    })

    $('.live-slideshow').cycle({
        fx:'scrollHorz',
        speed:'300',
        timeout:0
    });

    $('.nav__content__live li').click(function () {
        $('.live-slideshow').cycle($(this).index());
        return false;
    });

    $('.portfolio_slideshow').cycle({
        fx:'scrollHorz',
        speed:'300',
        timeout:0,
        prev:'.portfolio-nav.portfolio__arr-l',
        next:'.portfolio-nav.portfolio__arr-r',
        onPrevNextEvent:function (isNext, zeroBasedSlideIndex, slideElement) {
        }
    });
    $('.portfolio_main_imgs_slider').cycle({
        fx:'scrollHorz',
        speed:'300',
        timeout:0,
        prev:'.portfolio_main_imgs_slider__arr-l',
        next:'.portfolio_main_imgs_slider__arr-r',
        onPrevNextEvent:function (isNext, zeroBasedSlideIndex, slideElement) {
            $('.portfolio_main_imgs_counter').html((zeroBasedSlideIndex + 1) + ' из ' + $('.portfolio_main_imgs_slider img').length)
        }
    });

    $('.portfolio_thumbs_overlay, .portfolio_slider-main_close').click(function () {
        $(this).closest('.portfolio_slideshow').toggleClass('opened');
        $('.portfolio_slider-main').toggleClass('opened');
        $('.portfolio-nav').fadeToggle(1700);
    })
    $('.portfolio_slider-main_close').click(function () {
        $('.portfolio_slideshow').toggleClass('opened');
    })
    $('.portfolio_main_imgs_counter').html('1 из ' + $('.portfolio_main_imgs_slider img').length)


    $('.portfolio_slider-main  .portfolio__arr-l').click(function () {

        ///put ajax request here

    })
    $('.portfolio_slider-main  .portfolio__arr-r').click(function () {

        ///put ajax request here
    })


    $('a[data-setup=carousel]').click(function () {
        setTimeout(function () {
            ActivateCarousel();
        }, 500)

    })

    $('.projects-article-slogan_arr').click(function(){

        $(this).closest('.projects-article-slogan').toggleClass('opened')
    })


})

$(window).resize(function(){
    if($(window).height()<1000){
        paralaxActivate(true)
    }
})

$(window).load(function () {
        $('.projects-article__text').jScrollPane({
            animateScroll:true,
            verticalDragMinHeight:15,
            verticalDragMaxHeight:15});

})
function ActivateCarousel() {
    $('.live-team-article-list').jCarouselLite({
        btnNext:".live-team-article-nav .live-article-nav_next",
        btnPrev:".live-team-article-nav .live-article-nav_prev",
        vertical:true,
        visible:4,
        scroll:1,
        speed:400,
        beforeStart:function () {
            $('.live-team-article .live-team-article_spoiler').slideUp(400);
            $('.live-team-article-list li').attr('data-free', 'yes').animate({'height':'164px'}, 400);
            $('.live-team-article-list .btn-toggler').removeClass('active');
            $('.live-team-article-list').animate({'height':'656px'}, 400);
        }
    })
    if ($('html').hasClass('lt-ie8')) {


        $('.live-team-article-list').parent().find('.live-article-nav_prev').trigger('click');


    }
}

function paralaxActivate(small){
     //.parallax(xPosition, speedFactor, outerHeight) options:
    //xPosition - Horizontal position of the element
    //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
    //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    $('#home').parallax("50%", 0.1);
    $('#portfolio').parallax("50%", 0.3);
    $('.bg').parallax("50%", -0.4);
    $('.bg2').parallax("70%", 0.4);
    $('#live').parallax("50%", 0.3);
    $('#projects').parallax("50%", 0.3);
    $('.bg3').parallax("100%", 0.3);
    $('#contacts').parallax("50%", 0.3);
    /*if(!small){
      $('.bg4').parallax("50%   ", 0.9,'1000px' );
    }else{
      $('.bg4').parallax("50%   ", -1.3,'786px' );
    }*/
}



