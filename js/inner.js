/* Author:  Alexander Berdyshev
 */

$(document).ready(function () {


    $('.portfolio_main_imgs_slider__arr-l').click(function () {
        ///put ajax request here
        initImg('tmp/big.jpg');
    })

    $('.portfolio_main_imgs_slider__arr-r').click(function () {
        ///put ajax request here
        initImg('tmp/big.jpg');
    })


    initImg('tmp/big.jpg');


})


function initImg(imgName) {


    $.preload([
        root + imgName
    ], {
        init:function (loaded, total) {
            $("#preloader ").show();
            $("#project ").hide();
        },
        loaded:function (img, loaded, total) {

            var loader = 245 - ((loaded / total) * 245);
            var prozent = Math.round(loaded / total * 100);
            $("#loadingtext").html(prozent + "%");
            //        $("#loadingtext").html("Lade jede Menge Inhalte: "+loaded+"/"+total);
            $("#loadingbar").css({"background-position":"0px " + loader + "px"});
        },
        loaded_all:function (loaded, total) {
            // $("#loadingtext").html("100%");
            $("#preloader").delay(500).fadeOut();
            $("#project ").delay(1000).fadeIn(400);
            setTimeout(function () {
                $('#bg-image img').draggable({
                    containment:[
                        ($('#bg-image img').width() - $(window).width()) * -1,
                        ($('#bg-image img').height() - $(window).height() + 36) * -1,
                        0 ,
                        36

                    ]
                });
            }, 1600)
        }
    });


}





