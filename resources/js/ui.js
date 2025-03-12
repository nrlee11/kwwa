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

    // 퍼블확인용! (삭제예정)
    function includeHtml() {
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
    }

    //gnbMenu();
    selectLayer();
    includeHtml();
});
