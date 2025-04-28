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
        const $navArea = $(".nav_area");
        const $subMenu = $(".gnb .sub");
        const $bg = $(".nav_area .bg");

        $("#gnb .depth1 > li > a").on("focus mouseover", function () {
            $navArea.addClass("folding");
            $subMenu.show();
            $bg.stop(true, true).slideDown(300);
        });

        $("#header .nav_area").on("mouseleave", function () {
            $navArea.removeClass("folding");
            $subMenu.hide();
            $bg.stop(true, true).slideUp(200);
        });

        $("#header .logo a, #main, #container").on("focusin", function () {
            $navArea.removeClass("folding");
            $subMenu.hide();
            $bg.stop(true, true).slideUp(200);
        });
    };

    // Side Gnb
    const sideNave = function () {
        const $mgnb = $("#sideGnb");
        const $dim = $(".side_dim");
        const $body = $("body");
        const $focusIn = $("#sideGnb .utility a:first-child");
        const $focusOut = $(".sideOpen");

        $(".sideOpen").on("click", function () {
            $mgnb.show().stop(true, true).animate({ right: "0" }, 300).attr("aria-hidden", "false");

            $body.addClass("sideOn");
            $dim.show();
            $(this).attr("aria-expanded", "true");

            $focusIn.focus();
        });

        $(".sideClose").on("click", function () {
            $mgnb.stop(true, true).animate({ right: "-100%" }, 300, function () {
                $mgnb.hide().attr("aria-hidden", "true");
                $focusOut.focus();
            });

            $body.removeClass("sideOn");
            $dim.hide();
            $(".sideOpen").attr("aria-expanded", "false");
        });

        $(document).on("keydown", function (e) {
            if (e.key === "Escape" && $mgnb.is(":visible")) {
                $(".sideClose").trigger("click");
            }
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

    // LNB
    function lnbToggle() {
        $(document)
            .off("click.lnb")
            .on("click.lnb", "#lnb > li > a", function (e) {
                e.preventDefault();

                var $this = $(this),
                    $li = $this.parent(),
                    $sub = $this.next("ul"),
                    $allItems = $("#lnb > li"),
                    $allSubs = $("#lnb > li > ul"),
                    hasSub = $sub.length > 0,
                    isOpen = $li.hasClass("on");

                $allItems.removeClass("on").children("[role=menuitem]").attr("aria-expanded", "false");
                $allSubs.slideUp(300).attr("aria-hidden", "true");

                if (hasSub && !isOpen) {
                    $li.addClass("on").children("a").attr("aria-expanded", "true");
                    $sub.stop(true, true).slideDown(300).attr("aria-hidden", "false");
                } else {
                    $li.removeClass("on").children("a").attr("aria-expanded", "false");
                }
            });
    }

    // allSearch
    var allSearch = function () {
        var $allSearchBox = $("#allSearchBox");
        var $openBtn = $("#header .btn_allsearch");
        var $closeBtn = $("#allSearchBox .btn_allsearch_close");

        $openBtn.on("click", function () {
            $allSearchBox.stop(true, true).slideDown(300, function () {
                $allSearchBox.find("input").focus();
            });
        });

        $closeBtn.on("click", function () {
            $allSearchBox.stop(true, true).slideUp(300, function () {
                $openBtn.focus();
            });
        });

        $(document).on("keydown", function (e) {
            if (e.key === "Escape" && $allSearchBox.is(":visible")) {
                $closeBtn.trigger("click");
            }
        });
    };

    // Select Layer
    const selectLayer = function () {
        const $titles = $(".select_layer .select_tit");

        $titles.on("click", function (e) {
            const $parent = $(this).parent();
            const isOpen = $parent.hasClass("on");

            $(".select_layer").removeClass("on").find(".select_box").hide();
            $(".select_layer .select_tit").attr("aria-expanded", "false");

            if (!isOpen) {
                $parent.addClass("on").find(".select_box").show();
                $(this).attr("aria-expanded", "true");
                console.log("닫기");
            } else {
                console.log("열기");
            }
        });

        $(document).on("click", function (e) {
            if (!$(e.target).closest(".select_layer").length) {
                $(".select_layer").removeClass("on").find(".select_box").hide();
                $(".select_layer .select_tit").attr("title", "열기");
            }
        });
    };

    // Common Tab
    const commonTab = function () {
        $(".tab_area .tab li").on("click", function () {
            const $clickedTab = $(this);
            const $tabList = $clickedTab.parent();
            const $tabContainer = $tabList.closest(".tab_area");
            const tabIndex = $clickedTab.index();

            $tabContainer.find(".tab_cont").hide().attr("aria-hidden", "true");
            $tabContainer.find(".tab_cont").eq(tabIndex).show().attr("aria-hidden", "false");
            $tabList.find("li").removeClass("on").children("button, a").attr("aria-selected", "false");
            $clickedTab.addClass("on").children("button, a").attr("aria-selected", "true");
            return false;
        });
    };

    // Accordion
    const accordion = function () {
        const accFold = $(".accordion_area .fold");
        const accBox = $(".accordion_box");
        const accBody = $(".accordion_body");

        accFold.on("click", function () {
            const $this = $(this);

            if ($this.closest(".accordion_box").hasClass("is_open")) {
                $this.attr("aria-expanded", "false").parent().next(accBody).slideUp();
                $this.closest(".accordion_box").removeClass("is_open");
            } else {
                accBox.removeClass("is_open");
                accFold.attr("aria-expanded", "false");
                accBody.slideUp();

                $this.closest(".accordion_box").addClass("is_open");
                $this
                    .attr("aria-expanded", "true")
                    .parent()
                    .next(accBody)
                    .slideDown(400, function () {
                        $("html, body").animate({ scrollTop: $this.offset().top - 19 }, 300);
                    });
            }
        });
    };

    // Layer
    const layerFix = function () {
        // LayerFix
        $(".layerFix").each(function () {
            const left = ($(window).width() - $(this).width()) / 2;
            const top = ($(window).height() - $(this).height()) / 2;

            $(this).css({ left: left, top: top });
        });

        $(window).resize(function () {
            $(".layerFix").each(function () {
                const left = ($(window).width() - $(this).width()) / 2;
                const top = ($(window).height() - $(this).height()) / 2;

                $(this).css({ left: left, top: top });
            });
        });
    };

    // LayerClose
    const layerClose = function () {
        $(".layerFix .layer_close").click(function (e) {
            $(this).parents(".layerFix, .layerDim").hide();
            $(".layerDim").hide();
            $("html").removeClass("layerOpen");
            $("#wrap").removeAttr("aria-hidden");
        });
    };

    // alertLayerClose
    // const alertLayerClose = function () {
    //     $(".alertPopup .layer_close").click(function (e) {
    //         $(this).parents(".layerFix, .layerDim").hide();
    //         $(".layerDim").hide();
    //         $("html").removeClass("layerOpen");
    //     });
    // };

    // 퍼블확인용
    const urlChk = function () {
        const menuMap = {
            "/info/": ".menuitem-01",
            "/edu/": ".menuitem-02",
            "/edutest/": ".menuitem-03",
            "/education/": ".menuitem-04",
            "/license/": ".menuitem-05",
            "/my/": ".menuitem-06",
            "/cs/": ".menuitem-07",
            "/search/": ".menuitem-08",
        };

        //$(".lnb_wrap").hide();

        for (const path in menuMap) {
            if (window.location.href.indexOf(path) > -1) {
                $(menuMap[path]).show();
                break;
            }
        }

        // 통합검색 value 삭제 샘플
        $(".allsearch_wrap .inp .btn_reset").click(function () {
            const $input = $(this).parent().children("input");
            $input.val("").focus();
        });
    };
    // 퍼블확인용
    const includeHtml = function () {
        const includeTarget = document.querySelectorAll(".includeJs");
        includeTarget.forEach(function (el, idx) {
            const targetFile = el.dataset.includeFile;
            if (targetFile) {
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE) {
                        this.status === 200 ? (el.innerHTML = this.responseText) : null;
                        this.status === 404 ? (el.innerHTML = "include not found.") : null;
                        allNaveToggle();
                        sideNave();
                        // SideNaveClose();
                        moGnbToggle();
                        allSearch();
                        selectLayer();
                        urlChk();
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
    layerClose();
    urlChk();
    includeHtml();
});
