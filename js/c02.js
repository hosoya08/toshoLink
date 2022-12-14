/*
 * @license
 * chartjs-plugin-deferred
 * http://chartjs.org/
 * Version: 1.0.1
 *
 * Copyright 2018 Simon Brunel
 * Released under the MIT license
 * https://github.com/chartjs/chartjs-plugin-deferred/blob/master/LICENSE.md
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(require("chart.js")) : "function" == typeof define && define.amd ? define(["chart.js"], t) : t(e.Chart);
})(this, function (e) {
  "use strict";
  var a = (e = e && e.hasOwnProperty("default") ? e.default : e).helpers,
    o = "$chartjs_deferred",
    i = "$deferred";
  function r(e, t) {
    t ? window.setTimeout(e, t) : a.requestAnimFrame.call(window, e);
  }
  function d(e, t) {
    var n = parseInt(e, 10);
    return isNaN(n) ? 0 : "string" == typeof e && -1 !== e.indexOf("%") ? (n / 100) * t : n;
  }
  function f(e) {
    var t = e[i].options,
      n = e.chart.canvas;
    if (!n || null === n.offsetParent) return !1;
    var r = n.getBoundingClientRect(),
      a = d(t.yOffset || 0, r.height),
      o = d(t.xOffset || 0, r.width);
    return 0 <= r.right - o && 0 <= r.bottom - a && r.left + o <= window.innerWidth && r.top + a <= window.innerHeight;
  }
  function l(e) {
    var a = e.target[o];
    a.ticking ||
      ((a.ticking = !0),
      r(function () {
        var e,
          t,
          n = a.charts.slice(),
          r = n.length;
        for (t = 0; t < r; ++t) f((e = n[t])) && (u(e), (e[i].appeared = !0), e.update());
        a.ticking = !1;
      }));
  }
  function s(e) {
    if (e.nodeType === Node.ELEMENT_NODE) {
      var t = a.getStyle(e, "overflow-x"),
        n = a.getStyle(e, "overflow-y");
      return "auto" === t || "scroll" === t || "auto" === n || "scroll" === n;
    }
    return e.nodeType === Node.DOCUMENT_NODE;
  }
  function u(n) {
    n[i].elements.forEach(function (e) {
      var t = e[o].charts;
      t.splice(t.indexOf(n), 1), t.length || (a.removeEvent(e, "scroll", l), delete e[o]);
    }),
      (n[i].elements = []);
  }
  (e.defaults.global.plugins.deferred = { xOffset: 0, yOffset: 0, delay: 0 }),
    e.plugins.register({
      id: "deferred",
      beforeInit: function (e, t) {
        (e[i] = { options: t, appeared: !1, delayed: !1, loaded: !1, elements: [] }),
          (function (e) {
            for (var t, n, r = e.chart.canvas.parentElement; r; )
              s(r) && (0 === (n = (t = r[o] || (r[o] = {})).charts || (t.charts = [])).length && a.addEvent(r, "scroll", l), n.push(e), e[i].elements.push(r)),
                (r = r.parentElement || r.ownerDocument);
          })(e);
      },
      beforeDatasetsUpdate: function (e, t) {
        var n = e[i];
        if (!n.loaded) {
          if (!n.appeared && !f(e)) return !1;
          if (((n.appeared = !0), (n.loaded = !0), u(e), 0 < t.delay))
            return (
              (n.delayed = !0),
              r(function () {
                (n.delayed = !1), e.update();
              }, t.delay),
              !1
            );
        }
        if (n.delayed) return !1;
      },
      destroy: function (e) {
        u(e);
      },
    });
});
// ALL CHECk
const parentBtn = document.querySelectorAll('.parente');
const chaildBtn = document.querySelectorAll('.ECM_CheckboxInput');

parentBtn.forEach((btn) => {
    btn.addEventListener("click",function(){
        chaildBtn.click();
    })
})