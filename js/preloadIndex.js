
$(function () {
    $.preload([
        root+'contactBG.jpg',
        root+'contactBG_in1.png',
        root+'768/contactBG_in1.png',
        root+'firstBG.jpg',
        root+'firstBG-in1.png',
        root+'768/firstBG-in1.png',
        root+'firstBG-in2.png',
        root+'images-s7f92dd6fa9.png',
        root+'liveBG.jpg',
        root+'portfolioBG.png',
        root+'projectsBG.jpg'
    ], {
        init:function (loaded, total) {
            $(".header, #home, #portfolio, #live, #projects, #contacts").animate({
                opacity:0
            });
        },
        loaded:function (img, loaded, total) {

            var loader = 245 - ((loaded / total) * 245);
            var prozent = Math.round(loaded / total * 100);
            $("#loadingtext").html(  prozent + "%");
            //$("#loadingtext").html("Lade jede Menge Inhalte: "+loaded+"/"+total);
            $("#loadingbar").css({"background-position":"0px " + loader + "px"});
        },
        loaded_all:function (loaded, total) {
           // $("#loadingtext").html("100%");
            $("#preloader").delay(500).fadeOut();

            $(".header, #home, #portfolio, #live, #projects, #contacts").delay(1000).animate({
                opacity:1
            });

            $('#projects').parallax("50%", 0.3);
                 $('#home').parallax("50%", 0.1);
                 $('#portfolio').parallax("50%", 0.3);
                 $('.bg').parallax("50%", -0.4);
                 $('.bg2').parallax("70%", 0.4);
                 $('#live').parallax("50%", 0.3);
                 $('.bg3').parallax("100%", 0.3);
                 $('#contacts').parallax("50%", 0.3);
                 $('.bg4').parallax("50%", 0.9);
        }
    });
});
