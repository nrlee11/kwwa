$(function () {
    // Side Folding
    const sideFolding = function () {
        const $lyBody = $("body"),
            $lySideFoling = $("#aside, #content"),
            $lySideBtn = $("#aside .btnFolding");

        $lySideBtn.click(function (e) {
            if ($lyBody.hasClass("is_open")) {
                $lySideBtn.children("span").text("열기");
                $lySideFoling.css("left", "-240px");
                $lyBody.removeClass("is_open").addClass("is_close");
            } else {
                $lySideBtn.children("span").text("접기");
                $lySideFoling.css("left", "0");
                $lyBody.removeClass("is_close").addClass("is_open");
            }
        });
    };

    // GNB
    function uiGnb() {
        $hasSup = $("#gnb .depth2 > li, #gnb .depth3 > li");
        $hasSup.each(function () {
            $(this).parent().parent().addClass("has");
        });

        $(document).on("click", "#gnb > li > a", function (e) {
            e.preventDefault();

            var $this = $(this),
                $sub = $this.next(".depth2"),
                $li = $("#gnb > li"),
                $subDepth = $("#gnb > li > ul"),
                _hasSub = $sub.length >= 1,
                _bool = $this.parent().hasClass("on");

            $li.removeClass("on");
            $this.parent().toggleClass("on", !_bool);

            if (!_bool) {
                $subDepth.slideUp(300); // 모두 닫기
                $sub.slideDown(300); // 열기
            } else {
                $sub.slideUp(300); // 닫기
            }
        });

        $(document).on("click", ".depth2 > li > a", function (e) {
            e.preventDefault();

            var $this = $(this),
                $sub = $this.next(".depth3"),
                $li = $("#gnb .depth2 > li"),
                $subDepth = $("#gnb .depth2 > li > ul"),
                _hasSub = $sub.length >= 1,
                _bool = $this.parent().hasClass("on");

            $li.removeClass("on");
            $this.parent().toggleClass("on", !_bool);

            if (!_bool) {
                $subDepth.slideUp(300); // 모두 닫기
                $sub.slideDown(300); // 열기
            } else {
                $sub.slideUp(300); // 닫기
            }
        });

        $(document).on("click", ".depth3 > li > a", function (e) {
            e.preventDefault();

            var $this = $(this),
                $li = $("#gnb .depth3 > li"),
                _bool = $this.parent().hasClass("on");

            $li.removeClass("on");
            $this.parent().toggleClass("on", !_bool);
        });
    }

    // Search
    const boardSearch = function () {
        const $allSearchBox = $(".board_search .search_toggle_sec");

        $(".board_search_area .search_toggle .btn_sm_toggle").click(function (e) {
            if ($(this).hasClass("on")) {
                $(this).removeClass("on").children(".hidden").text("열기");
                $allSearchBox.hide();
            } else {
                $(this).addClass("on").children(".hidden").text("닫기");
                $allSearchBox.show();
            }
        });
    };

    // Select Layer
    const selectLayer = function () {
        const $this = $(".select_layer .select_tit");
        const $selectLayerBox = $(".select_layer .select_box");

        $this.click(function (e) {
            if ($(this).hasClass("on")) {
                $(this).removeClass("on").children(".hidden").text("닫기");
                $selectLayerBox.hide();
            } else {
                $(this).addClass("on").children(".hidden").text("열기");
                $selectLayerBox.show();
            }
        });

        $(".select_layer .select_list li").each(function (index) {
            $(this).parent().parent().addClass("autoHeight");
            if ($(this).parent().find("li").length > 10) {
                $(this).parent().parent().removeClass("autoHeight").addClass("limitHeight");
            }
        });
    };

    // Common Tab
    var commonTab = function () {
        $(".multi_tab_area .multi_tab > ul > li").on("click", function () {
            $(this).parents().find(".multi_cont").css("display", "none");
            $(this).parents().find(".multi_cont").eq($(this).index()).css("display", "block");
            $(this).parent().find("li").removeClass("on");
            $(this).addClass("on");
            return false;
        });
    };
    // const formInpUnit = function () {
    //     $(".form_item").each(function () {
    //         var totalWidth = 0;
    //         var set1 = $(this).width();
    //         var set2 = $(this).children(".unit").width();
    //         // var set3 = $(this).parent("td").width();

    //         if ($(this).children().hasClass("unit")) {
    //             totalWidth = set1 - set2 - 10;
    //             // $(this).css("width", set3);
    //             $(this).children("input[type=text]").css("width", totalWidth);
    //         }
    //     });
    // };

    // $(".form_item input").css("width", $(".form_item .unit").width());

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
            // $("body").removeClass("notScroll");
        });

        $(".layerFix.alert .alert_close").click(function () {
            $(".layerFix.alert").hide();
        });
    };

    sideFolding();
    uiGnb();
    boardSearch();
    selectLayer();
    commonTab();
    // formInpUnit();
    layerFix();
    layerClose();
});
