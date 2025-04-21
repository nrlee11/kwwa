$(function () {
    // device detect
    var device = function () {
        var ua = navigator.userAgent,
            ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
            deviceInfo = ["android", "iphone", "ipod", "ipad", "blackberry", "windows ce", "samsung", "lg", "mot", "sonyericsson", "nokia", "opeara mini", "opera mobi", "webos", "iemobile", "kfapwi", "rim", "bb10"],
            filter = "win16|win32|win64|mac|macintel",
            uAgent = ua.toLowerCase(),
            deviceInfo_len = deviceInfo.length;

        var browser = (window.browser = {}),
            support = (window.support = {}),
            i = 0,
            version,
            device;

        for (i = 0; i < deviceInfo_len; i++) {
            if (uAgent.match(deviceInfo[i]) != null) {
                device = deviceInfo[i];
                break;
            }
        }

        browser.local = /^http:\/\//.test(location.href);
        browser.firefox = /firefox/i.test(ua);
        browser.webkit = /applewebkit/i.test(ua);
        browser.chrome = /chrome/i.test(ua);
        browser.opera = /opera/i.test(ua);
        browser.ios = /ip(ad|hone|od)/i.test(ua);
        browser.android = /android/i.test(ua);
        browser.safari = browser.webkit && !browser.chrome;
        browser.app = ua.indexOf("appname") > -1 ? true : false;

        //touch, mobile 환경 구분
        support.touch = browser.ios || browser.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
        browser.mobile = support.touch && (browser.ios || browser.android);
        //navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';

        //os 구분
        browser.os = navigator.appVersion.match(/(mac|win|linux)/i);
        browser.os = browser.os ? browser.os[1].toLowerCase() : "";

        //version 체크
        if (browser.ios || browser.android) {
            version = ua.match(/applewebkit\/([0-9.]+)/i);
            version && version.length > 1 ? (browser.webkitversion = version[1]) : "";
            if (browser.ios) {
                version = ua.match(/version\/([0-9.]+)/i);
                version && version.length > 1 ? (browser.ios = version[1]) : "";
            } else if (browser.android) {
                version = ua.match(/android ([0-9.]+)/i);
                version && version.length > 1 ? (browser.android = parseInt(version[1].replace(/\./g, ""))) : "";
            }
        }

        if (ie) {
            browser.ie = ie = parseInt(ie[1] || ie[2]);
            11 > ie ? (support.pointerevents = false) : "";
            9 > ie ? (support.svgimage = false) : "";
        } else {
            browser.ie = false;
        }

        var clsBrowser = browser.chrome ? "chrome" : browser.firefox ? "firefox" : browser.opera ? "opera" : browser.safari ? "safari" : browser.ie ? "ie ie" + browser.ie : "other";
        var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : "etc";
        var clsMobile = browser.mobile ? (browser.app ? "ui-a ui-m" : "ui-m") : "ui-d";

        $("html").addClass(browser.os);
        $("html").addClass(clsBrowser);
        $("html").addClass(clsMobileSystem);
        $("html").addClass(clsMobile);
    };

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $("html") || document.getElementsByTagName("html")[0],
        $body = $("body"),
        $header = $("#header"),
        $main = $("#container"),
        $footer = $("#footer");

    // GNB
    const allNaveToggle = function () {
        $("#gnb .depth1 > li > a").bind("focus mouseover", function () {
            $(".nav_area").addClass("folding");
            $(".gnb .sub").show();
            $(".nav_area .bg").stop().slideDown(300);
        });

        $("#header .nav_area").mouseleave(function () {
            $(".nav_area").removeClass("folding");
            $(".gnb .sub, .nav_area .bg").hide();
        });

        $("#header .logo a, .banner_area a").focusin(function () {
            $(".nav_area").removeClass("folding");
            $(".gnb .sub, .nav_area .bg").hide();
        });
    };

    // Side Gnb
    const sideNave = function () {
        $mgnb = $("#sideGnb");
        $dim = $(".side_dim");
        $fousin = $("#sideGnb .utility a:first-child");
        $fousout = $(".sideOpen");

        $(".sideOpen").click(function (e) {
            $mgnb.show().stop().animate({ right: "0" }, 300).attr("aria-hidden", false);
            $body.addClass("sideOn");
            $dim.show();
            $fousin.focus();
        });

        $(".sideClose").click(function (e) {
            $mgnb.stop().animate({ right: "-100%" }, 300, function () {
                $(this).hide().attr("aria-hidden", true).focus(".sideOpen");
                $dim.hide();
            });
            $body.removeClass("sideOn");
            $fousout.focus();
        });
    };

    // Side Gnb Toggle
    function moGnbToggle() {
        $(document)
            .off("click.mo_gnb")
            .on("click.mo_gnb", "#moGnb > li > a", function (e) {
                e.preventDefault();

                var $this = $(this),
                    $sub = $this.next("ul"),
                    $li = $("#moGnb > li"),
                    $subDepth = $("#moGnb > li > ul"),
                    _hasSub = $sub.length >= 1,
                    _bool = $this.parent().hasClass("on");

                $li.removeClass("on");
                $this.parent().toggleClass("on", _hasSub && !_bool);

                if (_hasSub && !_bool) {
                    $subDepth.slideUp(300); // 모두 닫기
                    $sub.slideDown(300); // 열기
                } else {
                    $sub.slideUp(300); // 닫기
                }
            });
    }

    function lnbToggle() {
        $(document)
            .off("click.lnb")
            .on("click.lnb", "#lnb > li > a", function (e) {
                e.preventDefault();

                var $this = $(this),
                    $sub = $this.next("ul"),
                    $li = $("#lnb > li"),
                    $subDepth = $("#lnb > li > ul"),
                    _hasSub = $sub.length >= 1,
                    _bool = $this.parent().hasClass("on");

                $li.removeClass("on");
                $this.parent().toggleClass("on", _hasSub && !_bool);

                if (_hasSub && !_bool) {
                    $subDepth.slideUp(300); // 모두 닫기
                    $sub.slideDown(300); // 열기
                } else {
                    $sub.slideUp(300); // 닫기
                }
            });
    }

    // allSearch
    var allSearch = function () {
        var $allSearchBox = $("#allSearchBox");

        $("#header .btn_allsearch").click(function () {
            $allSearchBox.slideDown().focus();
        });

        $("#allSearchBox .btn_allsearch_close").click(function () {
            $allSearchBox.slideUp();
            $("#header .btn_allsearch").focus();
        });
    };

    // Select Layer
    const selectLayer = function () {
        const $this = $(".select_layer .select_tit");
        $this.click(function (e) {
            if ($(this).parent().hasClass("on")) {
                $(this).attr("title", "열기").parent().removeClass("on").children(".select_box").hide();
                console.log("열기");
            } else {
                $(this).attr("title", "닫기").parent().addClass("on").children(".select_box").show();
                console.log("닫기");
            }
        });
    };

    // Common Tab (수정예정)
    const commonTab = function () {
        $(".tab_area .tab li").on("click", function () {
            $(this).parent().parent().parent().find(".tab_cont").hide().attr("aria-hidden", "true");
            $(this).parent().parent().parent().find(".tab_cont").eq($(this).index()).show().attr("aria-hidden", "false");
            $(this).parent().find("li").removeClass("on").children("button, a").attr("aria-selected", "false");
            $(this).addClass("on").children("button, a").attr("aria-selected", "true");
            return false;
        });
    };

    // Accordion
    const accordion = function () {
        const accFold = $(".accordion_area .fold");
        const accBox = $(".accordion_box");
        const accBody = $(".accordion_body");
        accFold.on("click", function () {
            if ($(this).parent().parent().hasClass("is_open")) {
                $(this).attr("aria-expanded", "false").parent().next(accBody).slideUp();
                $(this).parent().parent().removeClass("is_open");
            } else {
                accBox.removeClass("is_open");
                accFold.attr("aria-expanded", "false");
                accBody.slideUp();
                $(this).parent().parent().addClass("is_open");
                $(this).attr("aria-expanded", "true").parent().next(accBody).slideDown();

                setTimeout(() => {
                    $("body, html").animate(
                        {
                            scrollTop: $(this).offset().top - 19,
                        },
                        500
                    );
                }, 400);
            }
        });
    };

    // Layer
    const layerFix = function () {
        // LayerFix
        $(".layerFix").each(function () {
            const left = ($(window).width() - $(this).width()) / 2;
            const top = ($(window).height() - $(this).height()) / 2;

            //if (top < 0) top = 0;
            //if (left < 0) left = 0;

            $(this).css({ left: left, top: top });
        });

        $(window).resize(function () {
            $(".layerFix").each(function () {
                const left = ($(window).width() - $(this).width()) / 2;
                const top = ($(window).height() - $(this).height()) / 2;

                //if (top < 0) top = 0;
                //if (left < 0) left = 0;

                $(this).css({ left: left, top: top });
            });
        });
    };

    // fullLayerClose
    const fullLayerClose = function () {
        $(".fullPopup .layer_close").click(function (e) {
            $(this).parents(".layerFix, .layerDim").hide();
            $(".layerDim").hide();
            $("html").removeClass("layerOpen");
        });
    };

    // alertLayerClose
    const alertLayerClose = function () {
        $(".alertPopup .layer_close").click(function (e) {
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
                    allNaveToggle();
                    sideNave();
                    // SideNaveClose();
                    moGnbToggle();
                    allSearch();
                    selectLayer();
                    if (this.readyState === XMLHttpRequest.DONE) {
                        this.status === 200 ? (el.innerHTML = this.responseText) : null;
                        this.status === 404 ? (el.innerHTML = "include not found.") : null;
                        allNaveToggle();
                        sideNave();
                        // SideNaveClose();
                        moGnbToggle();
                        allSearch();
                        selectLayer();
                    }
                };
                xhttp.open("GET", targetFile, true);
                xhttp.send();
                return;
            }
        });
    };

    device();
    allNaveToggle();
    sideNave();
    // SideNaveClose();
    moGnbToggle();
    lnbToggle();
    allSearch();
    selectLayer();
    commonTab();
    accordion();
    layerFix();
    fullLayerClose();
    alertLayerClose();
    includeHtml();
});
