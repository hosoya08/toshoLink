/*!
 * chartjs-plugin-style v0.5.0
 * https://nagix.github.io/chartjs-plugin-style
 * (c) 2019 Akihiko Kusanagi
 * Released under the MIT license
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("chart.js")))
    : "function" == typeof define && define.amd
    ? define(["chart.js"], t)
    : ((e = e || self).ChartStyle = t(e.Chart));
})(this, function (e) {
  "use strict";
  var t = (e = e && e.hasOwnProperty("default") ? e.default : e).helpers,
    o = t.options || {},
    r = t.extend(o, {
      resolve:
        o.resolve ||
        function (e, o, r) {
          var l, n, a;
          for (l = 0, n = e.length; l < n; ++l) if (void 0 !== (a = e[l]) && (void 0 !== o && "function" == typeof a && (a = a(o)), void 0 !== r && t.isArray(a) && (a = a[r]), void 0 !== a)) return a;
        },
    }),
    l = e.helpers,
    n = r.resolve;
  function a(e) {
    return -1 !== e.indexOf("Color");
  }
  var i = {
      styleKeys: [
        "shadowOffsetX",
        "shadowOffsetY",
        "shadowBlur",
        "shadowColor",
        "bevelWidth",
        "bevelHighlightColor",
        "bevelShadowColor",
        "innerGlowWidth",
        "innerGlowColor",
        "outerGlowWidth",
        "outerGlowColor",
        "backgroundOverlayColor",
        "backgroundOverlayMode",
      ],
      lineStyleKeys: ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "outerGlowWidth", "outerGlowColor"],
      pointStyleKeys: [
        "pointShadowOffsetX",
        "pointShadowOffsetY",
        "pointShadowBlur",
        "pointShadowColor",
        "pointBevelWidth",
        "pointBevelHighlightColor",
        "pointBevelShadowColor",
        "pointInnerGlowWidth",
        "pointInnerGlowColor",
        "pointOuterGlowWidth",
        "pointOuterGlowColor",
        "pointBackgroundOverlayColor",
        "pointBackgroundOverlayMode",
      ],
      hoverStyleKeys: [
        "hoverShadowOffsetX",
        "hoverShadowOffsetY",
        "hoverShadowBlur",
        "hoverShadowColor",
        "hoverBevelWidth",
        "hoverBevelHighlightColor",
        "hoverBevelShadowColor",
        "hoverInnerGlowWidth",
        "hoverInnerGlowColor",
        "hoverOuterGlowWidth",
        "hoverOuterGlowColor",
        "hoverBackgroundOverlayColor",
        "hoverBackgroundOverlayMode",
      ],
      pointHoverStyleKeys: [
        "pointHoverShadowOffsetX",
        "pointHoverShadowOffsetY",
        "pointHoverShadowBlur",
        "pointHoverShadowColor",
        "pointHoverBevelWidth",
        "pointHoverBevelHighlightColor",
        "pointHoverBevelShadowColor",
        "pointHoverInnerGlowWidth",
        "pointHoverInnerGlowColor",
        "pointHoverOuterGlowWidth",
        "pointHoverOuterGlowColor",
        "pointHoverBackgroundOverlayColor",
        "pointHoverBackgroundOverlayMode",
      ],
      drawBackground: function (e, t) {
        var o = e.borderWidth;
        (e.borderWidth = 0), t(), (e.borderWidth = o);
      },
      drawBorder: function (e, t) {
        var o = e.backgroundColor;
        e.borderWidth && ((e.backgroundColor = "rgba(0, 0, 0, 0)"), t(), (e.backgroundColor = o));
      },
      drawShadow: function (e, t, o, r) {
        var l = e.ctx,
          n = e.currentDevicePixelRatio;
        l.save(),
          (l.shadowOffsetX = (t.shadowOffsetX + 1e6) * n),
          (l.shadowOffsetY = t.shadowOffsetY * n),
          (l.shadowBlur = t.shadowBlur * n),
          (l.shadowColor = t.shadowColor),
          r && (l.globalCompositeOperation = "destination-over"),
          l.translate(-1e6, 0),
          o(),
          l.restore();
      },
      setPath: function (e, t) {
        e.save(), e.beginPath(), e.clip(), t(), e.restore();
      },
      drawBevel: function (e, t, o) {
        var r,
          l,
          n = e.ctx,
          a = e.currentDevicePixelRatio,
          i = (5 * a) / 6,
          d = t.bevelWidth * i,
          s = t.borderWidth,
          h = t.parsedBorderWidth;
        d &&
          ((r = this.opaque(t.borderColor)
            ? h
              ? { top: d + h.top * a, left: d + h.left * a, bottom: d + h.bottom * a, right: d + h.right * a }
              : { top: (l = d + ((s > 0 ? s : 0) * a) / 2), left: l, bottom: l, right: l }
            : { top: d, left: d, bottom: d, right: d }),
          n.save(),
          this.setPath(n, o),
          n.clip(),
          n.translate(-1e6, 0),
          this.setPath(n, o),
          n.rect(0, 0, e.width, e.height),
          (n.fillStyle = "black"),
          (n.shadowOffsetX = 1e6 * a - r.right),
          (n.shadowOffsetY = -r.bottom),
          (n.shadowBlur = d),
          (n.shadowColor = t.bevelShadowColor),
          (navigator && navigator.userAgent.match("Windows.+Firefox")) || (n.globalCompositeOperation = "source-atop"),
          n.fill("evenodd"),
          (n.shadowOffsetX = 1e6 * a + r.left),
          (n.shadowOffsetY = r.top),
          (n.shadowColor = t.bevelHighlightColor),
          n.fill("evenodd"),
          n.restore());
      },
      drawGlow: function (e, t, o, r) {
        var l = e.ctx,
          n = r ? t.outerGlowWidth : t.innerGlowWidth,
          a = t.borderWidth,
          i = e.currentDevicePixelRatio;
        n &&
          (l.save(),
          this.setPath(l, o),
          r && l.rect(0, 0, e.width, e.height),
          l.clip("evenodd"),
          l.translate(-1e6, 0),
          this.setPath(l, o),
          r || l.rect(0, 0, e.width, e.height),
          (l.lineWidth = a),
          (l.strokeStyle = "black"),
          (l.fillStyle = "black"),
          (l.shadowOffsetX = 1e6 * i),
          (l.shadowBlur = n * i),
          (l.shadowColor = r ? t.outerGlowColor : t.innerGlowColor),
          l.fill("evenodd"),
          a && l.stroke(),
          l.restore());
      },
      drawInnerGlow: function (e, t, o) {
        this.drawGlow(e, t, o);
      },
      drawOuterGlow: function (e, t, o) {
        this.drawGlow(e, t, o, !0);
      },
      drawBackgroundOverlay: function (e, t, o) {
        var r = e.ctx,
          l = t.backgroundOverlayColor;
        l && (r.save(), this.setPath(r, o), (r.fillStyle = l), (r.globalCompositeOperation = t.backgroundOverlayMode), r.fill(), r.restore());
      },
      opaque: function (e) {
        return l.color(e).alpha() > 0;
      },
      getHoverColor: function (e) {
        return void 0 !== e ? l.getHoverColor(e) : e;
      },
      mergeStyle: function (e, t) {
        if (void 0 !== e && void 0 !== t)
          return (
            this.styleKeys.forEach(function (o) {
              e[o] = t[o];
            }),
            e
          );
      },
      setHoverStyle: function (e, t) {
        var o,
          r,
          l = this.styleKeys,
          n = this.hoverStyleKeys;
        if (void 0 !== e && void 0 !== t) {
          for (o = 0, r = l.length; o < r; ++o) e[l[o]] = t[n[o]];
          return e;
        }
      },
      saveStyle: function (e) {
        var t = e._model,
          o = e.$previousStyle;
        o && this.mergeStyle(o, t);
      },
      resolveStyle: function (e, t, o, r) {
        var l,
          i,
          d,
          s,
          h = e.chart,
          p = h.data.datasets[e.index],
          u = t.custom || {},
          c = this.styleKeys,
          v = this.hoverStyleKeys,
          y = {},
          f = { chart: h, dataIndex: o, dataset: p, datasetIndex: t._datasetIndex };
        for (l = 0, i = c.length; l < i; ++l) (y[(d = c[l])] = s = n([u[d], p[d], r[d]], f, o)), (y[(d = v[l])] = n([u[d], p[d], r[d], a(d) ? this.getHoverColor(s) : s], f, o));
        return y;
      },
      resolveLineStyle: function (e, t, o) {
        var r,
          l,
          a,
          i = e.chart,
          d = i.data.datasets[e.index],
          s = t.custom || {},
          h = this.lineStyleKeys,
          p = {},
          u = { chart: i, dataset: d, datasetIndex: t._datasetIndex };
        for (r = 0, l = h.length; r < l; ++r) p[(a = h[r])] = n([s[a], d[a], o[a]], u);
        return p;
      },
      resolvePointStyle: function (e, t, o, r) {
        var l,
          i,
          d,
          s,
          h = this,
          p = e.chart,
          u = p.data.datasets[e.index],
          c = t.custom || {},
          v = h.styleKeys,
          y = h.hoverStyleKeys,
          f = h.pointStyleKeys,
          g = h.pointHoverStyleKeys,
          w = {},
          b = { chart: p, dataIndex: o, dataset: u, datasetIndex: t._datasetIndex };
        for (l = 0, i = v.length; l < i; ++l) (w[(d = v[l])] = s = n([c[d], u[f[l]], u[d], r[d]], b, o)), (w[(d = y[l])] = n([c[d], u[g[l]], r[d], a(d) ? h.getHoverColor(s) : s], b, o));
        return w;
      },
    },
    d = e.helpers;
  function s(e, t) {
    if (void 0 === t) return e;
    var o = d.color(e);
    return o.alpha(t * o.alpha()).rgbaString();
  }
  var h = e.Tooltip,
    p = h.extend({
      initialize: function () {
        h.prototype.initialize.apply(this, arguments), i.mergeStyle(this._model, this._options);
      },
      update: function () {
        return h.prototype.update.apply(this, arguments), i.mergeStyle(this._model, this._options), this;
      },
      drawBackground: function (e, t, o, r, l) {
        var n = this,
          a = arguments,
          p = n._chart,
          u = d.extend({}, t, {
            bevelHighlightColor: s(t.bevelHighlightColor, l),
            bevelShadowColor: s(t.bevelShadowColor, l),
            innerGlowColor: s(t.innerGlowColor, l),
            outerGlowColor: s(t.outerGlowColor, l),
          }),
          c = function () {
            h.prototype.drawBackground.apply(n, a);
          };
        i.drawShadow(p, t, c), i.opaque(t.backgroundColor) && (i.drawBackground(t, c), i.drawBevel(p, u, c)), i.drawInnerGlow(p, u, c), i.drawOuterGlow(p, u, c), i.drawBorder(t, c);
      },
    }),
    u = e.elements.Rectangle,
    c = u.extend({
      draw: function () {
        var e = this,
          t = arguments,
          o = e._chart,
          r = e._view,
          l = function () {
            u.prototype.draw.apply(e, t);
          },
          n = function () {
            e.setPath();
          };
        i.drawShadow(o, r, l, !0),
          i.opaque(r.backgroundColor) && (i.drawBackground(r, l), i.drawBackgroundOverlay(o, r, n), i.drawBevel(o, r, n)),
          i.drawInnerGlow(o, r, n),
          i.drawOuterGlow(o, r, n),
          i.drawBorder(r, l);
      },
      setPath: function () {
        var e,
          t,
          o,
          r,
          l = this._chart.ctx,
          n = this._view;
        void 0 !== n.width
          ? ((e = n.x - n.width / 2), (o = n.width), (t = Math.min(n.y, n.base)), (r = Math.abs(n.y - n.base)))
          : ((e = Math.min(n.x, n.base)), (o = Math.abs(n.x - n.base)), (t = n.y - n.height / 2), (r = n.height)),
          l.rect(e, t, o, r);
      },
    }),
    v = e.helpers.extend;
  function y(e, t, o) {
    return e === t ? o : e === o ? t : e;
  }
  function f(e) {
    var t,
      o,
      r,
      l,
      n,
      a,
      i = e.borderWidth,
      d = (function (e) {
        var t = e.borderSkipped,
          o = {};
        return t ? (e.horizontal ? e.base > e.x && (t = y(t, "left", "right")) : e.base < e.y && (t = y(t, "bottom", "top")), (o[t] = !0), o) : o;
      })(e);
    return (
      void 0 !== e.width ? ((t = e.width / 2), (o = Math.abs(e.y - e.base) / 2)) : ((t = Math.abs(e.x - e.base) / 2), (o = e.height / 2)),
      null !== i && "[object Object]" === Object.prototype.toString.call(i) ? ((r = +i.top || 0), (l = +i.right || 0), (n = +i.bottom || 0), (a = +i.left || 0)) : (r = l = n = a = +i || 0),
      { top: d.top || r < 0 ? 0 : r > o ? o : r, right: d.right || l < 0 ? 0 : l > t ? t : l, bottom: d.bottom || n < 0 ? 0 : n > o ? o : n, left: d.left || a < 0 ? 0 : a > t ? t : a }
    );
  }
  var g = e.controllers.bar,
    w = g.extend({
      dataElementType: c,
      updateElement: function (e, t) {
        var o = i.resolveStyle(this, e, t, this.chart.options.elements.rectangle),
          r = {};
        Object.defineProperty(e, "_model", {
          configurable: !0,
          get: function () {
            return r;
          },
          set: function (e) {
            v(r, e, o);
          },
        }),
          g.prototype.updateElement.apply(this, arguments),
          delete e._model,
          (e._model = v(r, { parsedBorderWidth: f(r) })),
          (e._styleOptions = o);
      },
      setHoverStyle: function (e) {
        g.prototype.setHoverStyle.apply(this, arguments), i.saveStyle(e), i.setHoverStyle(e._model, e._styleOptions);
      },
      removeHoverStyle: function (e) {
        e.$previousStyle || i.mergeStyle(e._model, e._styleOptions), g.prototype.removeHoverStyle.apply(this, arguments);
      },
    }),
    b =
      e.helpers.canvas._isPointInArea ||
      function (e, t) {
        return e.x > t.left - 1e-6 && e.x < t.right + 1e-6 && e.y > t.top - 1e-6 && e.y < t.bottom + 1e-6;
      },
    S = e.elements.Point,
    m = S.extend({
      draw: function (e) {
        var t = this,
          o = arguments,
          r = t._chart,
          l = t._view,
          n = function () {
            S.prototype.draw.apply(t, o);
          };
        l.skip ||
          (void 0 !== e && !b(l, e)) ||
          (i.drawShadow(r, l, n, !0),
          i.opaque(l.backgroundColor) && (i.drawBackground(l, n), i.drawBackgroundOverlay(r, l, n), i.drawBevel(r, l, n)),
          i.drawInnerGlow(r, l, n),
          i.drawOuterGlow(r, l, n),
          i.drawBorder(l, n));
      },
    }),
    O = e.helpers.extend,
    _ = e.controllers.bubble,
    C = _.extend({
      dataElementType: m,
      updateElement: function (e, t) {
        var o = i.resolveStyle(this, e, t, this.chart.options.elements.point),
          r = {};
        Object.defineProperty(e, "_model", {
          configurable: !0,
          get: function () {
            return r;
          },
          set: function (e) {
            O(r, e, o);
          },
        }),
          _.prototype.updateElement.apply(this, arguments),
          delete e._model,
          (e._model = r),
          (e._styleOptions = o);
      },
      setHoverStyle: function (e) {
        _.prototype.setHoverStyle.apply(this, arguments), i.saveStyle(e), i.setHoverStyle(e._model, e._styleOptions);
      },
      removeHoverStyle: function (e) {
        e.$previousStyle || i.mergeStyle(e._model, e._styleOptions), _.prototype.removeHoverStyle.apply(this, arguments);
      },
    }),
    x = e.helpers,
    H = e.elements.Arc,
    B = H.extend({
      draw: function () {
        var e = this,
          t = arguments,
          o = e._chart,
          r = e._view,
          l = function () {
            H.prototype.draw.apply(e, t);
          };
        i.drawShadow(o, r, l, !0),
          i.opaque(r.backgroundColor) &&
            (i.drawBackground(r, l), i.drawBackgroundOverlay(o, r, l), i.drawBevel(o, "inner" === r.borderAlign ? x.extend({}, r, { borderWidth: 2 * r.borderWidth }) : r, l)),
          i.drawInnerGlow(o, r, l),
          i.drawOuterGlow(o, r, l),
          i.drawBorder(r, l);
      },
    }),
    k = e.defaults,
    W = e.helpers.extend,
    G = r.resolve;
  k.doughnut.legend.labels.generateLabels = k.pie.legend.labels.generateLabels = function (e) {
    var t = e.data;
    return t.labels.length && t.datasets.length
      ? t.labels.map(function (o, r) {
          var l = e.getDatasetMeta(0),
            n = t.datasets[0],
            a = l.data[r] || {},
            d = a.custom || {},
            s = e.options.elements.arc,
            h = G([d.backgroundColor, n.backgroundColor, s.backgroundColor], void 0, r),
            p = G([d.borderColor, n.borderColor, s.borderColor], void 0, r),
            u = G([d.borderWidth, n.borderWidth, s.borderWidth], void 0, r);
          return W({ text: o, fillStyle: h, strokeStyle: p, lineWidth: u, hidden: isNaN(n.data[r]) || l.data[r].hidden, index: r }, i.resolveStyle(l.controller, a, r, s));
        })
      : [];
  };
  var I = e.controllers.doughnut,
    P = I.extend({
      dataElementType: B,
      updateElement: function (e, t) {
        var o = i.resolveStyle(this, e, t, this.chart.options.elements.arc),
          r = {};
        Object.defineProperty(e, "_model", {
          configurable: !0,
          get: function () {
            return r;
          },
          set: function (e) {
            W(r, e, o);
          },
        }),
          I.prototype.updateElement.apply(this, arguments),
          delete e._model,
          (e._model = r),
          (e._styleOptions = o);
      },
      setHoverStyle: function (e) {
        I.prototype.setHoverStyle.apply(this, arguments), i.saveStyle(e), i.setHoverStyle(e._model, e._styleOptions);
      },
      removeHoverStyle: function (e) {
        e.$previousStyle || i.mergeStyle(e._model, e._styleOptions), I.prototype.removeHoverStyle.apply(this, arguments);
      },
    }),
    E = w.extend({
      _getValueScaleId: function () {
        return this.getMeta().xAxisID;
      },
      _getIndexScaleId: function () {
        return this.getMeta().yAxisID;
      },
      getValueScaleId: function () {
        return this.getMeta().xAxisID;
      },
      getIndexScaleId: function () {
        return this.getMeta().yAxisID;
      },
    }),
    M = e.elements.Line,
    D = M.extend({
      draw: function () {
        var e = this,
          t = arguments,
          o = e._chart,
          r = e._view,
          l = function () {
            M.prototype.draw.apply(e, t);
          };
        i.drawShadow(o, r, l), i.drawShadow(o, { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: r.outerGlowWidth, shadowColor: r.outerGlowColor }, l), i.drawBorder(r, l);
      },
    }),
    A = e.helpers.extend,
    K = e.controllers.line,
    j = K.extend({
      datasetElementType: D,
      dataElementType: m,
      update: function () {
        var e = this.getMeta().dataset,
          t = i.resolveLineStyle(this, e, this.chart.options.elements.line),
          o = {};
        Object.defineProperty(e, "_model", {
          configurable: !0,
          get: function () {
            return o;
          },
          set: function (e) {
            A(o, e, t);
          },
        }),
          K.prototype.update.apply(this, arguments),
          delete e._model,
          (e._model = o),
          (e._styleOptions = t);
      },
      updateElement: function (e, t) {
        var o = i.resolvePointStyle(this, e, t, this.chart.options.elements.point);
        K.prototype.updateElement.apply(this, arguments), A(e._model, o), (e._styleOptions = o);
      },
      setHoverStyle: function (e) {
        K.prototype.setHoverStyle.apply(this, arguments), i.saveStyle(e), i.setHoverStyle(e._model, e._styleOptions);
      },
      removeHoverStyle: function (e) {
        e.$previousStyle || i.mergeStyle(e._model, e._styleOptions), K.prototype.removeHoverStyle.apply(this, arguments);
      },
    }),
    L = e.helpers.extend,
    T = r.resolve;
  e.defaults.polarArea.legend.labels.generateLabels = function (e) {
    var t = e.data;
    return t.labels.length && t.datasets.length
      ? t.labels.map(function (o, r) {
          var l = e.getDatasetMeta(0),
            n = t.datasets[0],
            a = l.data[r] || {},
            d = a.custom || {},
            s = e.options.elements.arc,
            h = T([d.backgroundColor, n.backgroundColor, s.backgroundColor], void 0, r),
            p = T([d.borderColor, n.borderColor, s.borderColor], void 0, r),
            u = T([d.borderWidth, n.borderWidth, s.borderWidth], void 0, r);
          return L({ text: o, fillStyle: h, strokeStyle: p, lineWidth: u, hidden: isNaN(n.data[r]) || l.data[r].hidden, index: r }, i.resolveStyle(l.controller, a, r, s));
        })
      : [];
  };
  var X = e.controllers.polarArea,
    Y = X.extend({
      dataElementType: B,
      updateElement: function (e, t) {
        var o = i.resolveStyle(this, e, t, this.chart.options.elements.arc),
          r = {};
        Object.defineProperty(e, "_model", {
          configurable: !0,
          get: function () {
            return r;
          },
          set: function (e) {
            L(r, e, o);
          },
        }),
          X.prototype.updateElement.apply(this, arguments),
          delete e._model,
          (e._model = r),
          (e._styleOptions = o);
      },
      setHoverStyle: function (e) {
        X.prototype.setHoverStyle.apply(this, arguments), i.saveStyle(e), i.setHoverStyle(e._model, e._styleOptions);
      },
      removeHoverStyle: function (e) {
        e.$previousStyle || i.mergeStyle(e._model, e._styleOptions), X.prototype.removeHoverStyle.apply(this, arguments);
      },
    }),
    $ = e.helpers.extend,
    q = e.controllers.radar,
    R = q.extend({
      datasetElementType: D,
      dataElementType: m,
      update: function () {
        var e = this.getMeta().dataset,
          t = i.resolveLineStyle(this, e, this.chart.options.elements.line),
          o = {};
        Object.defineProperty(e, "_model", {
          configurable: !0,
          get: function () {
            return o;
          },
          set: function (e) {
            $(o, e, t);
          },
        }),
          q.prototype.update.apply(this, arguments),
          delete e._model,
          (e._model = o),
          (e._styleOptions = t);
      },
      updateElement: function (e, t) {
        var o = i.resolvePointStyle(this, e, t, this.chart.options.elements.point);
        q.prototype.updateElement.apply(this, arguments), $(e._model, o), (e._styleOptions = o);
      },
      setHoverStyle: function (e) {
        q.prototype.setHoverStyle.apply(this, arguments), i.saveStyle(e), i.setHoverStyle(e._model, e._styleOptions);
      },
      removeHoverStyle: function (e) {
        e.$previousStyle || i.mergeStyle(e._model, e._styleOptions), q.prototype.removeHoverStyle.apply(this, arguments);
      },
    }),
    V = e.defaults,
    z = e.helpers,
    N = e.layouts || e.layoutService,
    J = z.valueOrDefault || z.getValueOrDefault,
    U = z.valueAtIndexOrDefault || z.getValueAtIndexOrDefault,
    F =
      z.mergeIf ||
      function (e, t) {
        return z.configMerge.call(this, t, e);
      },
    Q = z.extend;
  function Z(e, t, o) {
    var r = e.ctx;
    i.drawShadow(e, t, o, !0),
      i.opaque(r.fillStyle) && (r.save(), (r.strokeStyle = "rgba(0, 0, 0, 0)"), o(), i.drawBackgroundOverlay(e, t, o), i.drawBevel(e, t, o), r.restore()),
      i.drawInnerGlow(e, t, o),
      i.drawOuterGlow(e, t, o),
      (r.fillStyle = "rgba(0, 0, 0, 0)"),
      o(),
      r.restore();
  }
  V.global.legend.labels.generateLabels = function (e) {
    var t = e.data,
      o = e.options.legend || {},
      r = o.labels && o.labels.usePointStyle;
    return z.isArray(t.datasets)
      ? t.datasets.map(function (t, o) {
          var l,
            n,
            a = e.getDatasetMeta(o),
            d = a.controller,
            s = e.options.elements;
          return (
            r
              ? ((l = a.data[0] || {}), (n = i.resolvePointStyle(d, l, o, s.point)))
              : a.dataset
              ? ((l = a.dataset), (n = i.resolveLineStyle(d, l, s.line)))
              : ((l = a.data[0] || {}), (n = i.resolveStyle(d, l, o, a.bar ? s.rectangle : s.point))),
            Q(
              {
                text: t.label,
                fillStyle: U(t.backgroundColor, 0),
                hidden: !e.isDatasetVisible(o),
                lineCap: t.borderCapStyle,
                lineDash: t.borderDash,
                lineDashOffset: t.borderDashOffset,
                lineJoin: t.borderJoinStyle,
                lineWidth: t.borderWidth,
                strokeStyle: t.borderColor,
                pointStyle: t.pointStyle,
                datasetIndex: o,
              },
              n
            )
          );
        }, this)
      : [];
  };
  var ee = e.Legend.extend({
    draw: function () {
      var t,
        o = this.chart,
        r = V.global,
        l = z.each,
        n = z.canvas.drawPoint,
        a = this.ctx;
      (z.each = function (e, o) {
        l(e, function (e) {
          var l,
            n,
            a = Object.keys(e);
          for (t = {}, l = 0, n = a.length; l < n; l++) t[a[l]] = e[a[l]];
          (t.borderColor = J(e.strokeStyle, r.defaultColor)), (t.borderWidth = J(e.lineWidth, r.elements.line.borderWidth)), o.apply(null, arguments);
        });
      }),
        (z.canvas.drawPoint = function () {
          var e = arguments;
          Z(o, t, function () {
            n.apply(null, e);
          });
        }),
        (a.strokeRect = function () {}),
        (a.fillRect = function (e, r, l, n) {
          Z(o, t, function () {
            a.beginPath(), a.rect(e, r, l, n), a.fill(), 0 !== t.borderWidth && a.stroke();
          });
        }),
        e.Legend.prototype.draw.apply(this, arguments),
        (z.each = l),
        (z.canvas.drawPoint = n),
        delete a.fillRect,
        delete a.strokeRect;
    },
  });
  function te(e, t) {
    var o = new ee({ ctx: e.ctx, options: t, chart: e });
    N.configure(e, o, t), N.addBox(e, o), (e.legend = o);
  }
  var oe = {
      id: "legend",
      _element: ee,
      beforeInit: function (e) {
        var t = e.options.legend;
        t && te(e, t);
      },
      beforeUpdate: function (e) {
        var t = e.options.legend,
          o = e.legend;
        t ? (F(t, V.global.legend), o ? (N.configure(e, o, t), (o.options = t)) : te(e, t)) : o && (N.removeBox(e, o), delete e.legend);
      },
      afterEvent: function (e, t) {
        var o = e.legend;
        o && o.handleEvent(t);
      },
    },
    re = e.helpers,
    le = e.layouts || e.layoutService,
    ne = e.plugins,
    ae = { bar: w, bubble: C, doughnut: P, horizontalBar: E, line: j, polarArea: Y, pie: P, radar: R, scatter: j };
  function ie() {
    var e = this,
      t = [];
    return (
      re.each(
        e.data.datasets,
        function (o, r) {
          var l = e.getDatasetMeta(r),
            n = o.type || e.config.type;
          if ((l.type && l.type !== n && (e.destroyDatasetMeta(r), (l = e.getDatasetMeta(r))), (l.type = n), l.controller)) l.controller.updateIndex(r), l.controller.linkScales();
          else {
            var a = ae[l.type];
            if (void 0 === a) throw new Error('"' + l.type + '" is not a chart type.');
            (l.controller = new a(e, r)), t.push(l.controller);
          }
        },
        e
      ),
      t
    );
  }
  function de() {
    var e = this;
    e.tooltip = new p({ _chart: e, _chartInstance: e, _data: e.data, _options: e.options.tooltips }, e);
  }
  var se = ne.descriptors;
  ne.descriptors = function (e) {
    var t = e._style;
    if (t) {
      var o = e.$plugins || e._plugins || (e.$plugins = e._plugins = {});
      if (o.id === this._cacheId) return o.descriptors;
      var r,
        l = this._plugins;
      this._plugins = l.map(function (e) {
        return "legend" === e.id ? oe : e;
      });
    }
    return (r = se.apply(this, arguments)), t && (this._plugins = l), r;
  };
  var he = {
    id: "style",
    beforeInit: function (e) {
      (e._style = {}), (e.buildOrUpdateControllers = ie), (e.initToolTip = de), e.legend && (le.removeBox(e, e.legend), delete e.legend), delete e.$plugins, delete e._plugins, ne.descriptors(e);
    },
  };
  return e.plugins.register(he), he;
});
