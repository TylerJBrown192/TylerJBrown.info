/* == malihu jquery custom scrollbar plugin ==
    Version: 3.0.5,
    License: MIT License (MIT) */
! function(e, t, o) {
    ! function(t) {
        var a = "function" == typeof define && define.amd,
            n = "https:" == o.location.protocol ? "https:" : "http:",
            r = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.11/jquery.mousewheel.min.js";
        a || e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + r + "%3E%3C/script%3E")), t()
    }(function() {
        var a = "mCustomScrollbar",
            n = "mCS",
            r = ".mCustomScrollbar",
            i = {
                setWidth: !1,
                setHeight: !1,
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                autoHideScrollbar: !1,
                autoExpandScrollbar: !1,
                alwaysShowScrollbar: 0,
                snapAmount: null,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    preventDefault: !1,
                    deltaFactor: "auto",
                    normalizeDelta: !1,
                    invert: !1,
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    enable: !1,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: !0,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                advanced: {
                    autoExpandHorizontalScroll: !1,
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: !0,
                    updateOnSelectorChange: !1,
                    releaseDraggableSelectors: !1
                },
                theme: "light",
                callbacks: {
                    onInit: !1,
                    onScrollStart: !1,
                    onScroll: !1,
                    onTotalScroll: !1,
                    onTotalScrollBack: !1,
                    whileScrolling: !1,
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: !0,
                    onOverflowY: !1,
                    onOverflowX: !1,
                    onOverflowYNone: !1,
                    onOverflowXNone: !1
                },
                live: !1,
                liveSelector: null
            },
            l = 0,
            s = {},
            c = function(e) {
                s[e] && (clearTimeout(s[e]), h._delete.call(null, s[e]))
            },
            d = t.attachEvent && !t.addEventListener ? 1 : 0,
            u = !1,
            f = {
                init: function(t) {
                    var t = e.extend(!0, {}, i, t),
                        o = h._selector.call(this);
                    if (t.live) {
                        var a = t.liveSelector || this.selector || r,
                            d = e(a);
                        if ("off" === t.live) return void c(a);
                        s[a] = setTimeout(function() {
                            d.mCustomScrollbar(t), "once" === t.live && d.length && c(a)
                        }, 500)
                    } else c(a);
                    return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : h._findAxis.call(null, t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = h._findScrollButtonsType.call(null, t.scrollButtons.scrollType), h._theme.call(null, t), e(o).each(function() {
                        var o = e(this);
                        if (!o.data(n)) {
                            o.data(n, {
                                idx: ++l,
                                opt: t,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                contentReset: {
                                    y: null,
                                    x: null
                                },
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: o.css("direction"),
                                cbOffsets: null,
                                trigger: null
                            });
                            var a = o.data(n).opt,
                                r = o.data("mcs-axis"),
                                i = o.data("mcs-scrollbar-position"),
                                s = o.data("mcs-theme");
                            r && (a.axis = r), i && (a.scrollbarPosition = i), s && (a.theme = s, h._theme.call(null, a)), h._pluginMarkup.call(this), f.update.call(null, o)
                        }
                    })
                },
                update: function(t) {
                    var o = t || h._selector.call(this);
                    return e(o).each(function() {
                        var t = e(this);
                        if (t.data(n)) {
                            var o = t.data(n),
                                a = o.opt,
                                r = e("#mCSB_" + o.idx + "_container"),
                                i = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                            if (!r.length) return;
                            o.tweenRunning && h._stop.call(null, t), t.hasClass("mCS_disabled") && t.removeClass("mCS_disabled"), t.hasClass("mCS_destroyed") && t.removeClass("mCS_destroyed"), h._maxHeight.call(this), h._expandContentHorizontally.call(this), "y" === a.axis || a.advanced.autoExpandHorizontalScroll || r.css("width", h._contentWidth(r.children())), o.overflowed = h._overflowed.call(this), h._scrollbarVisibility.call(this), a.autoDraggerLength && h._setDraggerLength.call(this), h._scrollRatio.call(this), h._bindEvents.call(this);
                            var l = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                            "x" !== a.axis && (o.overflowed[0] ? i[0].height() > i[0].parent().height() ? h._resetContentPosition.call(this) : (h._scrollTo.call(this, t, l[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), o.contentReset.y = null) : (h._resetContentPosition.call(this), "y" === a.axis ? h._unbindEvents.call(this) : "yx" === a.axis && o.overflowed[1] && h._scrollTo.call(this, t, l[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== a.axis && (o.overflowed[1] ? i[1].width() > i[1].parent().width() ? h._resetContentPosition.call(this) : (h._scrollTo.call(this, t, l[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), o.contentReset.x = null) : (h._resetContentPosition.call(this), "x" === a.axis ? h._unbindEvents.call(this) : "yx" === a.axis && o.overflowed[0] && h._scrollTo.call(this, t, l[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), h._autoUpdate.call(this)
                        }
                    })
                },
                scrollTo: function(t, o) {
                    if ("undefined" != typeof t && null != t) {
                        var a = h._selector.call(this);
                        return e(a).each(function() {
                            var a = e(this);
                            if (a.data(n)) {
                                var r = a.data(n),
                                    i = r.opt,
                                    l = {
                                        trigger: "external",
                                        scrollInertia: i.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    },
                                    s = e.extend(!0, {}, l, o),
                                    c = h._arr.call(this, t),
                                    d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                                c[0] = h._to.call(this, c[0], "y"), c[1] = h._to.call(this, c[1], "x"), s.moveDragger && (c[0] *= r.scrollRatio.y, c[1] *= r.scrollRatio.x), s.dur = d, setTimeout(function() {
                                    null !== c[0] && "undefined" != typeof c[0] && "x" !== i.axis && r.overflowed[0] && (s.dir = "y", s.overwrite = "all", h._scrollTo.call(this, a, c[0].toString(), s)), null !== c[1] && "undefined" != typeof c[1] && "y" !== i.axis && r.overflowed[1] && (s.dir = "x", s.overwrite = "none", h._scrollTo.call(this, a, c[1].toString(), s))
                                }, s.timeout)
                            }
                        })
                    }
                },
                stop: function() {
                    var t = h._selector.call(this);
                    return e(t).each(function() {
                        var t = e(this);
                        t.data(n) && h._stop.call(null, t)
                    })
                },
                disable: function(t) {
                    var o = h._selector.call(this);
                    return e(o).each(function() {
                        var o = e(this);
                        if (o.data(n)) {
                            {
                                var a = o.data(n);
                                a.opt
                            }
                            h._autoUpdate.call(this, "remove"), h._unbindEvents.call(this), t && h._resetContentPosition.call(this), h._scrollbarVisibility.call(this, !0), o.addClass("mCS_disabled")
                        }
                    })
                },
                destroy: function() {
                    var t = h._selector.call(this);
                    return e(t).each(function() {
                        var o = e(this);
                        if (o.data(n)) {
                            var r = o.data(n),
                                i = r.opt,
                                l = e("#mCSB_" + r.idx),
                                s = e("#mCSB_" + r.idx + "_container"),
                                d = e(".mCSB_" + r.idx + "_scrollbar");
                            i.live && c(t), h._autoUpdate.call(this, "remove"), h._unbindEvents.call(this), h._resetContentPosition.call(this), o.removeData(n), h._delete.call(null, this.mcs), d.remove(), l.replaceWith(s.contents()), o.removeClass(a + " _" + n + "_" + r.idx + " mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")
                        }
                    })
                }
            },
            h = {
                _selector: function() {
                    return "object" != typeof e(this) || e(this).length < 1 ? r : this
                },
                _theme: function(t) {
                    var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                        a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                        n = ["minimal", "minimal-dark"],
                        r = ["minimal", "minimal-dark"],
                        i = ["minimal", "minimal-dark"];
                    t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, r) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, i) > -1 ? "outside" : t.scrollbarPosition
                },
                _findAxis: function(e) {
                    return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
                },
                _findScrollButtonsType: function(e) {
                    return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
                },
                _pluginMarkup: function() {
                    var t = e(this),
                        o = t.data(n),
                        r = o.opt,
                        i = r.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : "",
                        l = ["<div id='mCSB_" + o.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_vertical" + i + "'><div class='mCSB_draggerContainer'><div id='mCSB_" + o.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + o.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_horizontal" + i + "'><div class='mCSB_draggerContainer'><div id='mCSB_" + o.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                        s = "yx" === r.axis ? "mCSB_vertical_horizontal" : "x" === r.axis ? "mCSB_horizontal" : "mCSB_vertical",
                        c = "yx" === r.axis ? l[0] + l[1] : "x" === r.axis ? l[1] : l[0],
                        d = "yx" === r.axis ? "<div id='mCSB_" + o.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                        u = r.autoHideScrollbar ? " mCS-autoHide" : "",
                        f = "x" !== r.axis && "rtl" === o.langDir ? " mCS-dir-rtl" : "";
                    r.setWidth && t.css("width", r.setWidth), r.setHeight && t.css("height", r.setHeight), r.setLeft = "y" !== r.axis && "rtl" === o.langDir ? "989999px" : r.setLeft, t.addClass(a + " _" + n + "_" + o.idx + u + f).wrapInner("<div id='mCSB_" + o.idx + "' class='mCustomScrollBox mCS-" + r.theme + " " + s + "'><div id='mCSB_" + o.idx + "_container' class='mCSB_container' style='position:relative; top:" + r.setTop + "; left:" + r.setLeft + ";' dir=" + o.langDir + " /></div>");
                    var _ = e("#mCSB_" + o.idx),
                        m = e("#mCSB_" + o.idx + "_container");
                    "y" === r.axis || r.advanced.autoExpandHorizontalScroll || m.css("width", h._contentWidth(m.children())), "outside" === r.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), _.addClass("mCSB_outside").after(c)) : (_.addClass("mCSB_inside").append(c), m.wrap(d)), h._scrollButtons.call(this);
                    var p = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                    p[0].css("min-height", p[0].height()), p[1].css("min-width", p[1].width())
                },
                _contentWidth: function(t) {
                    return Math.max.apply(Math, t.map(function() {
                        return e(this).outerWidth(!0)
                    }).get())
                },
                _expandContentHorizontally: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = o.opt,
                        r = e("#mCSB_" + o.idx + "_container");
                    a.advanced.autoExpandHorizontalScroll && "y" !== a.axis && r.css({
                        position: "absolute",
                        width: "auto"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(r[0].getBoundingClientRect().right + .4) - Math.floor(r[0].getBoundingClientRect().left),
                        position: "relative"
                    }).unwrap()
                },
                _scrollButtons: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = o.opt,
                        r = e(".mCSB_" + o.idx + "_scrollbar:first"),
                        i = ["<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"],
                        l = ["x" === a.axis ? i[2] : i[0], "x" === a.axis ? i[3] : i[1], i[2], i[3]];
                    a.scrollButtons.enable && r.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
                },
                _maxHeight: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = (o.opt, e("#mCSB_" + o.idx)),
                        r = t.css("max-height"),
                        i = -1 !== r.indexOf("%"),
                        l = t.css("box-sizing");
                    if ("none" !== r) {
                        var s = i ? t.parent().height() * parseInt(r) / 100 : parseInt(r);
                        "border-box" === l && (s -= t.innerHeight() - t.height() + (t.outerHeight() - t.innerHeight())), a.css("max-height", Math.round(s))
                    }
                },
                _setDraggerLength: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = e("#mCSB_" + o.idx),
                        r = e("#mCSB_" + o.idx + "_container"),
                        i = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                        l = [a.height() / r.outerHeight(!1), a.width() / r.outerWidth(!1)],
                        s = [parseInt(i[0].css("min-height")), Math.round(l[0] * i[0].parent().height()), parseInt(i[1].css("min-width")), Math.round(l[1] * i[1].parent().width())],
                        c = d && s[1] < s[0] ? s[0] : s[1],
                        u = d && s[3] < s[2] ? s[2] : s[3];
                    i[0].css({
                        height: c,
                        "max-height": i[0].parent().height() - 10
                    }).find(".mCSB_dragger_bar").css({
                        "line-height": s[0] + "px"
                    }), i[1].css({
                        width: u,
                        "max-width": i[1].parent().width() - 10
                    })
                },
                _scrollRatio: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = e("#mCSB_" + o.idx),
                        r = e("#mCSB_" + o.idx + "_container"),
                        i = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                        l = [r.outerHeight(!1) - a.height(), r.outerWidth(!1) - a.width()],
                        s = [l[0] / (i[0].parent().height() - i[0].height()), l[1] / (i[1].parent().width() - i[1].width())];
                    o.scrollRatio = {
                        y: s[0],
                        x: s[1]
                    }
                },
                _onDragClasses: function(e, t, o) {
                    var a = o ? "mCSB_dragger_onDrag_expanded" : "",
                        n = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag"],
                        r = e.closest(".mCSB_scrollTools");
                    "active" === t ? (e.toggleClass(n[0] + " " + a), r.toggleClass(n[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(n[0]), r.removeClass(n[1])) : (e.addClass(n[0]), r.addClass(n[1])))
                },
                _overflowed: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = e("#mCSB_" + o.idx),
                        r = e("#mCSB_" + o.idx + "_container"),
                        i = null == o.overflowed ? r.height() : r.outerHeight(!1),
                        l = null == o.overflowed ? r.width() : r.outerWidth(!1);
                    return [i > a.height(), l > a.width()]
                },
                _resetContentPosition: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = o.opt,
                        r = e("#mCSB_" + o.idx),
                        i = e("#mCSB_" + o.idx + "_container"),
                        l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                    if (h._stop(t), ("x" !== a.axis && !o.overflowed[0] || "y" === a.axis && o.overflowed[0]) && (l[0].add(i).css("top", 0), h._scrollTo(t, "_resetY")), "y" !== a.axis && !o.overflowed[1] || "x" === a.axis && o.overflowed[1]) {
                        var s = dx = 0;
                        "rtl" === o.langDir && (s = r.width() - i.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), i.css("left", s), l[1].css("left", dx), h._scrollTo(t, "_resetX")
                    }
                },
                _bindEvents: function() {
                    function t() {
                        i = setTimeout(function() {
                            e.event.special.mousewheel ? (clearTimeout(i), h._mousewheel.call(o[0])) : t()
                        }, 1e3)
                    }
                    var o = e(this),
                        a = o.data(n),
                        r = a.opt;
                    if (!a.bindEvents) {
                        if (h._draggable.call(this), r.contentTouchScroll && h._contentDraggable.call(this), r.mouseWheel.enable) {
                            var i;
                            t()
                        }
                        h._draggerRail.call(this), h._wrapperScroll.call(this), r.advanced.autoScrollOnFocus && h._focus.call(this), r.scrollButtons.enable && h._buttons.call(this), r.keyboard.enable && h._keyboard.call(this), a.bindEvents = !0
                    }
                },
                _unbindEvents: function() {
                    var t = e(this),
                        a = t.data(n),
                        r = a.opt,
                        i = n + "_" + a.idx,
                        l = ".mCSB_" + a.idx + "_scrollbar",
                        s = e("#mCSB_" + a.idx + ",#mCSB_" + a.idx + "_container,#mCSB_" + a.idx + "_container_wrapper," + l + " .mCSB_draggerContainer,#mCSB_" + a.idx + "_dragger_vertical,#mCSB_" + a.idx + "_dragger_horizontal," + l + ">a"),
                        c = e("#mCSB_" + a.idx + "_container");
                    r.advanced.releaseDraggableSelectors && s.add(e(r.advanced.releaseDraggableSelectors)), a.bindEvents && (e(o).unbind("." + i), s.each(function() {
                        e(this).unbind("." + i)
                    }), clearTimeout(t[0]._focusTimeout), h._delete.call(null, t[0]._focusTimeout), clearTimeout(a.sequential.step), h._delete.call(null, a.sequential.step), clearTimeout(c[0].onCompleteTimeout), h._delete.call(null, c[0].onCompleteTimeout), a.bindEvents = !1)
                },
                _scrollbarVisibility: function(t) {
                    var o = e(this),
                        a = o.data(n),
                        r = a.opt,
                        i = e("#mCSB_" + a.idx + "_container_wrapper"),
                        l = i.length ? i : e("#mCSB_" + a.idx + "_container"),
                        s = [e("#mCSB_" + a.idx + "_scrollbar_vertical"), e("#mCSB_" + a.idx + "_scrollbar_horizontal")],
                        c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
                    "x" !== r.axis && (a.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass("mCS_no_scrollbar_y mCS_y_hidden")) : (r.alwaysShowScrollbar ? (2 !== r.alwaysShowScrollbar && c[0].add(s[0].children("a")).css("display", "none"), l.removeClass("mCS_y_hidden")) : (s[0].css("display", "none"), l.addClass("mCS_y_hidden")), l.addClass("mCS_no_scrollbar_y"))), "y" !== r.axis && (a.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass("mCS_no_scrollbar_x mCS_x_hidden")) : (r.alwaysShowScrollbar ? (2 !== r.alwaysShowScrollbar && c[1].add(s[1].children("a")).css("display", "none"), l.removeClass("mCS_x_hidden")) : (s[1].css("display", "none"), l.addClass("mCS_x_hidden")), l.addClass("mCS_no_scrollbar_x"))), a.overflowed[0] || a.overflowed[1] ? o.removeClass("mCS_no_scrollbar") : o.addClass("mCS_no_scrollbar")
                },
                _coordinates: function(e) {
                    var t = e.type;
                    switch (t) {
                        case "pointerdown":
                        case "MSPointerDown":
                        case "pointermove":
                        case "MSPointerMove":
                        case "pointerup":
                        case "MSPointerUp":
                            return [e.originalEvent.pageY, e.originalEvent.pageX, !1];
                        case "touchstart":
                        case "touchmove":
                        case "touchend":
                            var o = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                                a = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                            return [o.pageY, o.pageX, a > 1];
                        default:
                            return [e.pageY, e.pageX, !1]
                    }
                },
                _draggable: function() {
                    function t(e) {
                        var t = p.find("iframe");
                        if (t.length) {
                            var o = e ? "auto" : "none";
                            t.css("pointer-events", o)
                        }
                    }

                    function a(e, t, o, a) {
                        if (p[0].idleTimer = f.scrollInertia < 233 ? 250 : 0, r.attr("id") === m[1]) var n = "x",
                            i = (r[0].offsetLeft - t + a) * c.scrollRatio.x;
                        else var n = "y",
                            i = (r[0].offsetTop - e + o) * c.scrollRatio.y;
                        h._scrollTo(s, i.toString(), {
                            dir: n,
                            drag: !0
                        })
                    }
                    var r, i, l, s = e(this),
                        c = s.data(n),
                        f = c.opt,
                        _ = n + "_" + c.idx,
                        m = ["mCSB_" + c.idx + "_dragger_vertical", "mCSB_" + c.idx + "_dragger_horizontal"],
                        p = e("#mCSB_" + c.idx + "_container"),
                        g = e("#" + m[0] + ",#" + m[1]),
                        v = f.advanced.releaseDraggableSelectors ? g.add(e(f.advanced.releaseDraggableSelectors)) : g;
                    g.bind("mousedown." + _ + " touchstart." + _ + " pointerdown." + _ + " MSPointerDown." + _, function(a) {
                        if (a.stopImmediatePropagation(), a.preventDefault(), h._mouseBtnLeft(a)) {
                            u = !0, d && (o.onselectstart = function() {
                                return !1
                            }), t(!1), h._stop(s), r = e(this);
                            var n = r.offset(),
                                c = h._coordinates(a)[0] - n.top,
                                _ = h._coordinates(a)[1] - n.left,
                                m = r.height() + n.top,
                                p = r.width() + n.left;
                            m > c && c > 0 && p > _ && _ > 0 && (i = c, l = _), h._onDragClasses(r, "active", f.autoExpandScrollbar)
                        }
                    }).bind("touchmove." + _, function(e) {
                        e.stopImmediatePropagation(), e.preventDefault();
                        var t = r.offset(),
                            o = h._coordinates(e)[0] - t.top,
                            n = h._coordinates(e)[1] - t.left;
                        a(i, l, o, n)
                    }), e(o).bind("mousemove." + _ + " pointermove." + _ + " MSPointerMove." + _, function(e) {
                        if (r) {
                            var t = r.offset(),
                                o = h._coordinates(e)[0] - t.top,
                                n = h._coordinates(e)[1] - t.left;
                            if (i === o) return;
                            a(i, l, o, n)
                        }
                    }).add(v).bind("mouseup." + _ + " touchend." + _ + " pointerup." + _ + " MSPointerUp." + _, function() {
                        r && (h._onDragClasses(r, "active", f.autoExpandScrollbar), r = null), u = !1, d && (o.onselectstart = null), t(!0)
                    })
                },
                _contentDraggable: function() {
                    function t(e, t) {
                        var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                        return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
                    }

                    function o(e, t, o, a, n, r) {
                        e && h._scrollTo(g, e.toString(), {
                            dur: t,
                            scrollEasing: o,
                            dir: a,
                            overwrite: n,
                            drag: r
                        })
                    }
                    var a, r, i, l, s, c, d, f, _, m, p, g = e(this),
                        v = g.data(n),
                        x = v.opt,
                        S = n + "_" + v.idx,
                        C = e("#mCSB_" + v.idx),
                        b = e("#mCSB_" + v.idx + "_container"),
                        w = [e("#mCSB_" + v.idx + "_dragger_vertical"), e("#mCSB_" + v.idx + "_dragger_horizontal")],
                        y = [],
                        B = [],
                        T = 0,
                        M = "yx" === x.axis ? "none" : "all",
                        k = [];
                    b.bind("touchstart." + S + " pointerdown." + S + " MSPointerDown." + S, function(e) {
                        if (h._pointerTouch(e) && !u && !h._coordinates(e)[2]) {
                            var t = b.offset();
                            a = h._coordinates(e)[0] - t.top, r = h._coordinates(e)[1] - t.left, k = [h._coordinates(e)[0], h._coordinates(e)[1]]
                        }
                    }).bind("touchmove." + S + " pointermove." + S + " MSPointerMove." + S, function(e) {
                        if (h._pointerTouch(e) && !u && !h._coordinates(e)[2]) {
                            e.stopImmediatePropagation(), c = h._getTime();
                            var t = C.offset(),
                                n = h._coordinates(e)[0] - t.top,
                                i = h._coordinates(e)[1] - t.left,
                                l = "mcsLinearOut";
                            if (y.push(n), B.push(i), k[2] = Math.abs(h._coordinates(e)[0] - k[0]), k[3] = Math.abs(h._coordinates(e)[1] - k[1]), v.overflowed[0]) var s = w[0].parent().height() - w[0].height(),
                                d = a - n > 0 && n - a > -(s * v.scrollRatio.y) && (2 * k[3] < k[2] || "yx" === x.axis);
                            if (v.overflowed[1]) var f = w[1].parent().width() - w[1].width(),
                                _ = r - i > 0 && i - r > -(f * v.scrollRatio.x) && (2 * k[2] < k[3] || "yx" === x.axis);
                            (d || _) && e.preventDefault(), m = "yx" === x.axis ? [a - n, r - i] : "x" === x.axis ? [null, r - i] : [a - n, null], b[0].idleTimer = 250, v.overflowed[0] && o(m[0], T, l, "y", "all", !0), v.overflowed[1] && o(m[1], T, l, "x", M, !0)
                        }
                    }), C.bind("touchstart." + S + " pointerdown." + S + " MSPointerDown." + S, function(e) {
                        if (h._pointerTouch(e) && !u && !h._coordinates(e)[2]) {
                            e.stopImmediatePropagation(), h._stop(g), s = h._getTime();
                            var t = C.offset();
                            i = h._coordinates(e)[0] - t.top, l = h._coordinates(e)[1] - t.left, y = [], B = []
                        }
                    }).bind("touchend." + S + " pointerup." + S + " MSPointerUp." + S, function(e) {
                        if (h._pointerTouch(e) && !u && !h._coordinates(e)[2]) {
                            e.stopImmediatePropagation(), d = h._getTime();
                            var a = C.offset(),
                                n = h._coordinates(e)[0] - a.top,
                                r = h._coordinates(e)[1] - a.left;
                            if (!(d - c > 30)) {
                                _ = 1e3 / (d - s);
                                var g = "mcsEaseOut",
                                    S = 2.5 > _,
                                    w = S ? [y[y.length - 2], B[B.length - 2]] : [0, 0];
                                f = S ? [n - w[0], r - w[1]] : [n - i, r - l];
                                var T = [Math.abs(f[0]), Math.abs(f[1])];
                                _ = S ? [Math.abs(f[0] / 4), Math.abs(f[1] / 4)] : [_, _];
                                var k = [Math.abs(b[0].offsetTop) - f[0] * t(T[0] / _[0], _[0]), Math.abs(b[0].offsetLeft) - f[1] * t(T[1] / _[1], _[1])];
                                m = "yx" === x.axis ? [k[0], k[1]] : "x" === x.axis ? [null, k[1]] : [k[0], null], p = [4 * T[0] + x.scrollInertia, 4 * T[1] + x.scrollInertia];
                                var O = parseInt(x.contentTouchScroll) || 0;
                                m[0] = T[0] > O ? m[0] : 0, m[1] = T[1] > O ? m[1] : 0, v.overflowed[0] && o(m[0], p[0], g, "y", M, !1), v.overflowed[1] && o(m[1], p[1], g, "x", M, !1)
                            }
                        }
                    })
                },
                _mousewheel: function() {
                    function t(e) {
                        var t = null;
                        try {
                            var o = e.contentDocument || e.contentWindow.document;
                            t = o.body.innerHTML
                        } catch (a) {}
                        return null !== t
                    }
                    var o = e(this),
                        a = o.data(n);
                    if (a) {
                        var r = a.opt,
                            i = n + "_" + a.idx,
                            l = e("#mCSB_" + a.idx),
                            s = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")],
                            c = e("#mCSB_" + a.idx + "_container").find("iframe"),
                            u = l;
                        c.length && c.each(function() {
                            var o = this;
                            t(o) && (u = u.add(e(o).contents().find("body")))
                        }), u.bind("mousewheel." + i, function(t, n) {
                            if (h._stop(o), !h._disableMousewheel(o, t.target)) {
                                var i = "auto" !== r.mouseWheel.deltaFactor ? parseInt(r.mouseWheel.deltaFactor) : d && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100;
                                if ("x" === r.axis || "x" === r.mouseWheel.axis) var c = "x",
                                    u = [Math.round(i * a.scrollRatio.x), parseInt(r.mouseWheel.scrollAmount)],
                                    f = "auto" !== r.mouseWheel.scrollAmount ? u[1] : u[0] >= l.width() ? .9 * l.width() : u[0],
                                    _ = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetLeft),
                                    m = s[1][0].offsetLeft,
                                    p = s[1].parent().width() - s[1].width(),
                                    g = t.deltaX || t.deltaY || n;
                                else var c = "y",
                                    u = [Math.round(i * a.scrollRatio.y), parseInt(r.mouseWheel.scrollAmount)],
                                    f = "auto" !== r.mouseWheel.scrollAmount ? u[1] : u[0] >= l.height() ? .9 * l.height() : u[0],
                                    _ = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetTop),
                                    m = s[0][0].offsetTop,
                                    p = s[0].parent().height() - s[0].height(),
                                    g = t.deltaY || n;
                                "y" === c && !a.overflowed[0] || "x" === c && !a.overflowed[1] || (r.mouseWheel.invert && (g = -g), r.mouseWheel.normalizeDelta && (g = 0 > g ? -1 : 1), (g > 0 && 0 !== m || 0 > g && m !== p || r.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), h._scrollTo(o, (_ - g * f).toString(), {
                                    dir: c
                                }))
                            }
                        })
                    }
                },
                _disableMousewheel: function(t, o) {
                    var a = o.nodeName.toLowerCase(),
                        r = t.data(n).opt.mouseWheel.disableOver,
                        i = ["select", "textarea"];
                    return e.inArray(a, r) > -1 && !(e.inArray(a, i) > -1 && !e(o).is(":focus"))
                },
                _draggerRail: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = n + "_" + o.idx,
                        r = e("#mCSB_" + o.idx + "_container"),
                        i = r.parent(),
                        l = e(".mCSB_" + o.idx + "_scrollbar .mCSB_draggerContainer");
                    l.bind("touchstart." + a + " pointerdown." + a + " MSPointerDown." + a, function() {
                        u = !0
                    }).bind("touchend." + a + " pointerup." + a + " MSPointerUp." + a, function() {
                        u = !1
                    }).bind("click." + a, function(a) {
                        if (e(a.target).hasClass("mCSB_draggerContainer") || e(a.target).hasClass("mCSB_draggerRail")) {
                            h._stop(t);
                            var n = e(this),
                                l = n.find(".mCSB_dragger");
                            if (n.parent(".mCSB_scrollTools_horizontal").length > 0) {
                                if (!o.overflowed[1]) return;
                                var s = "x",
                                    c = a.pageX > l.offset().left ? -1 : 1,
                                    d = Math.abs(r[0].offsetLeft) - .9 * c * i.width()
                            } else {
                                if (!o.overflowed[0]) return;
                                var s = "y",
                                    c = a.pageY > l.offset().top ? -1 : 1,
                                    d = Math.abs(r[0].offsetTop) - .9 * c * i.height()
                            }
                            h._scrollTo(t, d.toString(), {
                                dir: s,
                                scrollEasing: "mcsEaseInOut"
                            })
                        }
                    })
                },
                _focus: function() {
                    var t = e(this),
                        a = t.data(n),
                        r = a.opt,
                        i = n + "_" + a.idx,
                        l = e("#mCSB_" + a.idx + "_container"),
                        s = l.parent();
                    l.bind("focusin." + i, function() {
                        var a = e(o.activeElement),
                            n = l.find(".mCustomScrollBox").length,
                            i = 0;
                        a.is(r.advanced.autoScrollOnFocus) && (h._stop(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = n ? (i + 17) * n : 0, t[0]._focusTimeout = setTimeout(function() {
                            var e = [a.offset().top - l.offset().top, a.offset().left - l.offset().left],
                                o = [l[0].offsetTop, l[0].offsetLeft],
                                n = [o[0] + e[0] >= 0 && o[0] + e[0] < s.height() - a.outerHeight(!1), o[1] + e[1] >= 0 && o[0] + e[1] < s.width() - a.outerWidth(!1)],
                                c = "yx" !== r.axis || n[0] || n[1] ? "all" : "none";
                            "x" === r.axis || n[0] || h._scrollTo(t, e[0].toString(), {
                                dir: "y",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: c,
                                dur: i
                            }), "y" === r.axis || n[1] || h._scrollTo(t, e[1].toString(), {
                                dir: "x",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: c,
                                dur: i
                            })
                        }, t[0]._focusTimer))
                    })
                },
                _wrapperScroll: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = n + "_" + o.idx,
                        r = e("#mCSB_" + o.idx + "_container").parent();
                    r.bind("scroll." + a, function() {
                        (0 !== r.scrollTop() || 0 !== r.scrollLeft()) && e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
                    })
                },
                _buttons: function() {
                    var t = e(this),
                        o = t.data(n),
                        a = o.opt,
                        r = o.sequential,
                        i = n + "_" + o.idx,
                        l = (e("#mCSB_" + o.idx + "_container"), ".mCSB_" + o.idx + "_scrollbar"),
                        s = e(l + ">a");
                    s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i + " mouseup." + i + " touchend." + i + " pointerup." + i + " MSPointerUp." + i + " mouseout." + i + " pointerout." + i + " MSPointerOut." + i + " click." + i, function(n) {
                        function i(e, o) {
                            r.scrollAmount = a.snapAmount || a.scrollButtons.scrollAmount, h._sequentialScroll.call(this, t, e, o)
                        }
                        if (n.preventDefault(), h._mouseBtnLeft(n)) {
                            var l = e(this).attr("class");
                            switch (r.type = a.scrollButtons.scrollType, n.type) {
                                case "mousedown":
                                case "touchstart":
                                case "pointerdown":
                                case "MSPointerDown":
                                    if ("stepped" === r.type) return;
                                    u = !0, o.tweenRunning = !1, i("on", l);
                                    break;
                                case "mouseup":
                                case "touchend":
                                case "pointerup":
                                case "MSPointerUp":
                                case "mouseout":
                                case "pointerout":
                                case "MSPointerOut":
                                    if ("stepped" === r.type) return;
                                    u = !1, r.dir && i("off", l);
                                    break;
                                case "click":
                                    if ("stepped" !== r.type || o.tweenRunning) return;
                                    i("on", l)
                            }
                        }
                    })
                },
                _keyboard: function() {
                    var t = e(this),
                        a = t.data(n),
                        r = a.opt,
                        i = a.sequential,
                        l = n + "_" + a.idx,
                        s = e("#mCSB_" + a.idx),
                        c = e("#mCSB_" + a.idx + "_container"),
                        d = c.parent(),
                        u = "input,textarea,select,datalist,keygen,[contenteditable='true']";
                    s.attr("tabindex", "0").bind("blur." + l + " keydown." + l + " keyup." + l, function(n) {
                        function l(e, o) {
                            i.type = r.keyboard.scrollType, i.scrollAmount = r.snapAmount || r.keyboard.scrollAmount, "stepped" === i.type && a.tweenRunning || h._sequentialScroll.call(this, t, e, o)
                        }
                        switch (n.type) {
                            case "blur":
                                a.tweenRunning && i.dir && l("off", null);
                                break;
                            case "keydown":
                            case "keyup":
                                var s = n.keyCode ? n.keyCode : n.which,
                                    f = "on";
                                if ("x" !== r.axis && (38 === s || 40 === s) || "y" !== r.axis && (37 === s || 39 === s)) {
                                    if ((38 === s || 40 === s) && !a.overflowed[0] || (37 === s || 39 === s) && !a.overflowed[1]) return;
                                    "keyup" === n.type && (f = "off"), e(o.activeElement).is(u) || (n.preventDefault(), n.stopImmediatePropagation(), l(f, s))
                                } else if (33 === s || 34 === s) {
                                    if ((a.overflowed[0] || a.overflowed[1]) && (n.preventDefault(), n.stopImmediatePropagation()), "keyup" === n.type) {
                                        h._stop(t);
                                        var _ = 34 === s ? -1 : 1;
                                        if ("x" === r.axis || "yx" === r.axis && a.overflowed[1] && !a.overflowed[0]) var m = "x",
                                            p = Math.abs(c[0].offsetLeft) - .9 * _ * d.width();
                                        else var m = "y",
                                            p = Math.abs(c[0].offsetTop) - .9 * _ * d.height();
                                        h._scrollTo(t, p.toString(), {
                                            dir: m,
                                            scrollEasing: "mcsEaseInOut"
                                        })
                                    }
                                } else if ((35 === s || 36 === s) && !e(o.activeElement).is(u) && ((a.overflowed[0] || a.overflowed[1]) && (n.preventDefault(), n.stopImmediatePropagation()), "keyup" === n.type)) {
                                    if ("x" === r.axis || "yx" === r.axis && a.overflowed[1] && !a.overflowed[0]) var m = "x",
                                        p = 35 === s ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                                    else var m = "y",
                                        p = 35 === s ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                    h._scrollTo(t, p.toString(), {
                                        dir: m,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                        }
                    })
                },
                _sequentialScroll: function(t, o, a) {
                    function r(e) {
                        var o = "stepped" !== c.type,
                            a = e ? o ? s.scrollInertia / 1.5 : s.scrollInertia : 1e3 / 60,
                            n = e ? o ? 7.5 : 40 : 2.5,
                            i = [Math.abs(d[0].offsetTop), Math.abs(d[0].offsetLeft)],
                            u = [l.scrollRatio.y > 10 ? 10 : l.scrollRatio.y, l.scrollRatio.x > 10 ? 10 : l.scrollRatio.x],
                            f = "x" === c.dir[0] ? i[1] + c.dir[1] * u[1] * n : i[0] + c.dir[1] * u[0] * n,
                            _ = "x" === c.dir[0] ? i[1] + c.dir[1] * parseInt(c.scrollAmount) : i[0] + c.dir[1] * parseInt(c.scrollAmount),
                            m = "auto" !== c.scrollAmount ? _ : f,
                            p = e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                            g = e ? !0 : !1;
                        return e && 17 > a && (m = "x" === c.dir[0] ? i[1] : i[0]), h._scrollTo(t, m.toString(), {
                            dir: c.dir[0],
                            scrollEasing: p,
                            dur: a,
                            onComplete: g
                        }), e ? void(c.dir = !1) : (clearTimeout(c.step), void(c.step = setTimeout(function() {
                            r()
                        }, a)))
                    }

                    function i() {
                        clearTimeout(c.step), h._stop(t)
                    }
                    var l = t.data(n),
                        s = l.opt,
                        c = l.sequential,
                        d = e("#mCSB_" + l.idx + "_container"),
                        u = "stepped" === c.type ? !0 : !1;
                    switch (o) {
                        case "on":
                            if (c.dir = ["mCSB_buttonRight" === a || "mCSB_buttonLeft" === a || 39 === a || 37 === a ? "x" : "y", "mCSB_buttonUp" === a || "mCSB_buttonLeft" === a || 38 === a || 37 === a ? -1 : 1], h._stop(t), h._isNumeric(a) && "stepped" === c.type) return;
                            r(u);
                            break;
                        case "off":
                            i(), (u || l.tweenRunning && c.dir) && r(!0)
                    }
                },
                _arr: function(t) {
                    var o = e(this).data(n).opt,
                        a = [];
                    return "function" == typeof t && (t = t()), t instanceof Array ? a = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (a[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, a[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof a[0] && (a[0] = a[0]()), "function" == typeof a[1] && (a[1] = a[1]()), a
                },
                _to: function(t, o) {
                    if (null != t && "undefined" != typeof t) {
                        var a = e(this),
                            r = a.data(n),
                            i = r.opt,
                            l = e("#mCSB_" + r.idx + "_container"),
                            s = l.parent(),
                            c = typeof t;
                        o || (o = "x" === i.axis ? "x" : "y");
                        var d = "x" === o ? l.outerWidth(!1) : l.outerHeight(!1),
                            u = "x" === o ? l.offset().left : l.offset().top,
                            _ = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
                            m = "x" === o ? "left" : "top";
                        switch (c) {
                            case "function":
                                return t();
                            case "object":
                                if (t.nodeType) var p = "x" === o ? e(t).offset().left : e(t).offset().top;
                                else if (t.jquery) {
                                    if (!t.length) return;
                                    var p = "x" === o ? t.offset().left : t.offset().top
                                }
                                return p - u;
                            case "string":
                            case "number":
                                if (h._isNumeric.call(null, t)) return Math.abs(t);
                                if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
                                if (-1 !== t.indexOf("-=")) return Math.abs(_ - parseInt(t.split("-=")[1]));
                                if (-1 !== t.indexOf("+=")) {
                                    var g = _ + parseInt(t.split("+=")[1]);
                                    return g >= 0 ? 0 : Math.abs(g)
                                }
                                if (-1 !== t.indexOf("px") && h._isNumeric.call(null, t.split("px")[0])) return Math.abs(t.split("px")[0]);
                                if ("top" === t || "left" === t) return 0;
                                if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
                                if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
                                if ("first" === t || "last" === t) {
                                    var v = l.find(":" + t),
                                        p = "x" === o ? e(v).offset().left : e(v).offset().top;
                                    return p - u
                                }
                                if (e(t).length) {
                                    var p = "x" === o ? e(t).offset().left : e(t).offset().top;
                                    return p - u
                                }
                                return l.css(m, t), void f.update.call(null, a[0])
                        }
                    }
                },
                _autoUpdate: function(t) {
                    function o() {
                        clearTimeout(u[0].autoUpdate), u[0].autoUpdate = setTimeout(function() {
                            return d.advanced.updateOnSelectorChange && (_ = i(), _ !== S) ? (l(), void(S = _)) : (d.advanced.updateOnContentResize && (m = [u.outerHeight(!1), u.outerWidth(!1), g.height(), g.width(), x()[0], x()[1]], (m[0] !== C[0] || m[1] !== C[1] || m[2] !== C[2] || m[3] !== C[3] || m[4] !== C[4] || m[5] !== C[5]) && (l(), C = m)), d.advanced.updateOnImageLoad && (p = a(), p !== b && (u.find("img").each(function() {
                                r(this.src)
                            }), b = p)), void((d.advanced.updateOnSelectorChange || d.advanced.updateOnContentResize || d.advanced.updateOnImageLoad) && o()))
                        }, 60)
                    }

                    function a() {
                        var e = 0;
                        return d.advanced.updateOnImageLoad && (e = u.find("img").length), e
                    }

                    function r(e) {
                        function t(e, t) {
                            return function() {
                                return t.apply(e, arguments)
                            }
                        }

                        function o() {
                            this.onload = null, l()
                        }
                        var a = new Image;
                        a.onload = t(a, o), a.src = e
                    }

                    function i() {
                        d.advanced.updateOnSelectorChange === !0 && (d.advanced.updateOnSelectorChange = "*");
                        var t = 0,
                            o = u.find(d.advanced.updateOnSelectorChange);
                        return d.advanced.updateOnSelectorChange && o.length > 0 && o.each(function() {
                            t += e(this).height() + e(this).width()
                        }), t
                    }

                    function l() {
                        clearTimeout(u[0].autoUpdate), f.update.call(null, s[0])
                    }
                    var s = e(this),
                        c = s.data(n),
                        d = c.opt,
                        u = e("#mCSB_" + c.idx + "_container");
                    if (t) return clearTimeout(u[0].autoUpdate), void h._delete.call(null, u[0].autoUpdate);
                    var _, m, p, g = u.parent(),
                        v = [e("#mCSB_" + c.idx + "_scrollbar_vertical"), e("#mCSB_" + c.idx + "_scrollbar_horizontal")],
                        x = function() {
                            return [v[0].is(":visible") ? v[0].outerHeight(!0) : 0, v[1].is(":visible") ? v[1].outerWidth(!0) : 0]
                        },
                        S = i(),
                        C = [u.outerHeight(!1), u.outerWidth(!1), g.height(), g.width(), x()[0], x()[1]],
                        b = a();
                    o()
                },
                _snapAmount: function(e, t, o) {
                    return Math.round(e / t) * t - o
                },
                _stop: function(t) {
                    var o = t.data(n),
                        a = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
                    a.each(function() {
                        h._stopTween.call(this)
                    })
                },
                _scrollTo: function(t, o, a) {
                    function r(e) {
                        return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
                    }

                    function i() {
                        return [c.callbacks.alwaysTriggerOffsets || S >= C[0] + w, c.callbacks.alwaysTriggerOffsets || -y >= S]
                    }

                    function l() {
                        var e = [_[0].offsetTop, _[0].offsetLeft],
                            o = [v[0].offsetTop, v[0].offsetLeft],
                            n = [_.outerHeight(!1), _.outerWidth(!1)],
                            r = [f.height(), f.width()];
                        t[0].mcs = {
                            content: _,
                            top: e[0],
                            left: e[1],
                            draggerTop: o[0],
                            draggerLeft: o[1],
                            topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(n[0]) - r[0])),
                            leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(n[1]) - r[1])),
                            direction: a.dir
                        }
                    }
                    var s = t.data(n),
                        c = s.opt,
                        d = {
                            trigger: "internal",
                            dir: "y",
                            scrollEasing: "mcsEaseOut",
                            drag: !1,
                            dur: c.scrollInertia,
                            overwrite: "all",
                            callbacks: !0,
                            onStart: !0,
                            onUpdate: !0,
                            onComplete: !0
                        },
                        a = e.extend(d, a),
                        u = [a.dur, a.drag ? 0 : a.dur],
                        f = e("#mCSB_" + s.idx),
                        _ = e("#mCSB_" + s.idx + "_container"),
                        m = _.parent(),
                        p = c.callbacks.onTotalScrollOffset ? h._arr.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
                        g = c.callbacks.onTotalScrollBackOffset ? h._arr.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
                    if (s.trigger = a.trigger, (0 !== m.scrollTop() || 0 !== m.scrollLeft()) && (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (r("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (r("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
                        switch (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (r("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (r("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount && (o = h._snapAmount(o, c.snapAmount, c.snapOffset)), a.dir) {
                            case "x":
                                var v = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                                    x = "left",
                                    S = _[0].offsetLeft,
                                    C = [f.width() - _.outerWidth(!1), v.parent().width() - v.width()],
                                    b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                                    w = p[1],
                                    y = g[1],
                                    B = w > 0 ? w / s.scrollRatio.x : 0,
                                    T = y > 0 ? y / s.scrollRatio.x : 0;
                                break;
                            case "y":
                                var v = e("#mCSB_" + s.idx + "_dragger_vertical"),
                                    x = "top",
                                    S = _[0].offsetTop,
                                    C = [f.height() - _.outerHeight(!1), v.parent().height() - v.height()],
                                    b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                                    w = p[0],
                                    y = g[0],
                                    B = w > 0 ? w / s.scrollRatio.y : 0,
                                    T = y > 0 ? y / s.scrollRatio.y : 0
                        }
                        b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= C[1] ? b = [C[0], C[1]] : b[0] = -b[0], t[0].mcs || (l(), r("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(_[0].onCompleteTimeout), (s.tweenRunning || !(0 === S && b[0] >= 0 || S === C[0] && b[0] <= C[0])) && (h._tweenTo.call(null, v[0], x, Math.round(b[1]), u[1], a.scrollEasing), h._tweenTo.call(null, _[0], x, Math.round(b[0]), u[0], a.scrollEasing, a.overwrite, {
                            onStart: function() {
                                a.callbacks && a.onStart && !s.tweenRunning && (r("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, h._onDragClasses(v), s.cbOffsets = i())
                            },
                            onUpdate: function() {
                                a.callbacks && a.onUpdate && r("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]))
                            },
                            onComplete: function() {
                                if (a.callbacks && a.onComplete) {
                                    "yx" === c.axis && clearTimeout(_[0].onCompleteTimeout);
                                    var e = _[0].idleTimer || 0;
                                    _[0].onCompleteTimeout = setTimeout(function() {
                                        r("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), r("onTotalScroll") && b[1] >= C[1] - B && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), r("onTotalScrollBack") && b[1] <= T && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, _[0].idleTimer = 0, h._onDragClasses(v, "hide")
                                    }, e)
                                }
                            }
                        }))
                    }
                },
                _tweenTo: function(e, o, a, n, r, i, l) {
                    function s() {
                        w.stop || (S || p.call(), S = h._getTime() - x, c(), S >= w.time && (w.time = S > w.time ? S + _ - (S - w.time) : S + _ - 1, w.time < S + 1 && (w.time = S + 1)), w.time < n ? w.id = m(s) : v.call())
                    }

                    function c() {
                        n > 0 ? (w.currVal = f(w.time, C, y, n, r), b[o] = Math.round(w.currVal) + "px") : b[o] = a + "px", g.call()
                    }

                    function d() {
                        _ = 1e3 / 60, w.time = S + _, m = t.requestAnimationFrame ? t.requestAnimationFrame : function(e) {
                            return c(), setTimeout(e, .01)
                        }, w.id = m(s)
                    }

                    function u() {
                        null != w.id && (t.requestAnimationFrame ? t.cancelAnimationFrame(w.id) : clearTimeout(w.id), w.id = null)
                    }

                    function f(e, t, o, a, n) {
                        switch (n) {
                            case "linear":
                            case "mcsLinear":
                                return o * e / a + t;
                            case "mcsLinearOut":
                                return e /= a, e--, o * Math.sqrt(1 - e * e) + t;
                            case "easeInOutSmooth":
                                return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);
                            case "easeInOutStrong":
                                return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                            case "easeInOut":
                            case "mcsEaseInOut":
                                return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
                            case "easeOutSmooth":
                                return e /= a, e--, -o * (e * e * e * e - 1) + t;
                            case "easeOutStrong":
                                return o * (-Math.pow(2, -10 * e / a) + 1) + t;
                            case "easeOut":
                            case "mcsEaseOut":
                            default:
                                var r = (e /= a) * e,
                                    i = r * e;
                                return t + o * (.499999999999997 * i * r + -2.5 * r * r + 5.5 * i + -6.5 * r + 4 * e)
                        }
                    }
                    e._malihuTween || (e._malihuTween = {
                        top: {},
                        left: {}
                    });
                    var _, m, l = l || {},
                        p = l.onStart || function() {},
                        g = l.onUpdate || function() {},
                        v = l.onComplete || function() {},
                        x = h._getTime(),
                        S = 0,
                        C = e.offsetTop,
                        b = e.style,
                        w = e._malihuTween[o];
                    "left" === o && (C = e.offsetLeft);
                    var y = a - C;
                    w.stop = 0, "none" !== i && u(), d()
                },
                _getTime: function() {
                    return t.performance && t.performance.now ? t.performance.now() : t.performance && t.performance.webkitNow ? t.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
                },
                _stopTween: function() {
                    var e = this;
                    e._malihuTween || (e._malihuTween = {
                        top: {},
                        left: {}
                    }), e._malihuTween.top.id && (t.requestAnimationFrame ? t.cancelAnimationFrame(e._malihuTween.top.id) : clearTimeout(e._malihuTween.top.id), e._malihuTween.top.id = null, e._malihuTween.top.stop = 1), e._malihuTween.left.id && (t.requestAnimationFrame ? t.cancelAnimationFrame(e._malihuTween.left.id) : clearTimeout(e._malihuTween.left.id), e._malihuTween.left.id = null, e._malihuTween.left.stop = 1)
                },
                _delete: function(e) {
                    try {
                        delete e
                    } catch (t) {
                        e = null
                    }
                },
                _mouseBtnLeft: function(e) {
                    return !(e.which && 1 !== e.which)
                },
                _pointerTouch: function(e) {
                    var t = e.originalEvent.pointerType;
                    return !(t && "touch" !== t && 2 !== t)
                },
                _isNumeric: function(e) {
                    return !isNaN(parseFloat(e)) && isFinite(e)
                }
            };
        e.fn[a] = function(t) {
            return f[t] ? f[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : f.init.apply(this, arguments)
        }, e[a] = function(t) {
            return f[t] ? f[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : f.init.apply(this, arguments)
        }, e[a].defaults = i, t[a] = !0, e(t).load(function() {
            e(r)[a]()
        })
    })
}(jQuery, window, document);
