$(function () {
    // // GNB
    // function gnbMenu() {
    //     var $gWrap = $("#gnb"),
    //         $gm_list = $("#gnb > ul > li "),
    //         $gm_tit = $gm_list.find("> a"),
    //         $gm_bg = $("#gnb .bg");

    //     $gm_tit.on("mouseenter focus", function () {
    //         var $acThis = $(this);

    //         $gm_list.each(function () {
    //             $(this).removeClass("active");
    //             $(this).find(".sub").hide();
    //         });

    //         $acThis.parent().addClass("active");

    //         if ($gWrap.hasClass("folding")) {
    //             $acThis.next().show();
    //         } else {
    //             $gWrap.addClass("folding").find(".bg").stop().slideDown(200);
    //             $acThis.next("div").stop().slideDown(200);
    //         }
    //         return false;
    //     });

    //     $("#header").on("mouseleave", function () {
    //         $gWrap.removeClass("folding");
    //         $gm_list.removeClass("active");
    //         $gWrap.find(".sub, .bg").stop().slideUp(200);
    //     });

    //     $("#gnb li:last").on("focusout", function () {
    //         $gWrap.removeClass("on");
    //         $gm_list.removeClass("active");
    //         $gWrap.find(".sub, .bg").stop().slideUp(200);
    //     });
    // }

    // Select Layer
    const selectLayer = function () {
        const $this = $(".select_layer .select_tit");

        $this.click(function (e) {
            if ($(this).parent().hasClass("on")) {
                $(this).attr("title", "열기").parent().removeClass("on").children(".select_box").hide();
                console.log(1);
            } else {
                $(this).attr("title", "닫기").parent().addClass("on").children(".select_box").show();
                console.log(2);
            }
        });
    };

    // Layer
    const layerFix = function () {
        // LayerFix
        $(".layerFix").each(function () {
            var left = ($(window).width() - $(this).width()) / 2;
            var top = ($(window).height() - $(this).height()) / 2;

            if (top < 0) top = 0;
            if (left < 0) left = 0;

            $(this).css({ left: left, top: top });
        });

        $(window).resize(function () {
            $(".layerFix").each(function () {
                var left = ($(window).width() - $(this).width()) / 2;
                var top = ($(window).height() - $(this).height()) / 2;

                if (top < 0) top = 0;
                if (left < 0) left = 0;

                $(this).css({ left: left, top: top });
            });
        });
    };

    // LayerClose
    const layerClose = function () {
        $(".layer_wrap .layer_close").click(function (e) {
            $(this).parents(".layerFix, .layerDim").hide();
            $(".layerDim").hide();
        });
    };

    // 퍼블확인용! (삭제예정)
    const includeHtml = function () {
        const includeTarget = document.querySelectorAll(".includeJs");
        includeTarget.forEach(function (el, idx) {
            const targetFile = el.dataset.includeFile;
            if (targetFile) {
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    selectLayer();
                    if (this.readyState === XMLHttpRequest.DONE) {
                        this.status === 200 ? (el.innerHTML = this.responseText) : null;
                        this.status === 404 ? (el.innerHTML = "include not found.") : null;
                    }
                };
                xhttp.open("GET", targetFile, true);
                xhttp.send();
                return;
            }
        });
    };

    //gnbMenu();
    layerFix();
    layerClose();
    selectLayer();
    includeHtml();
});
