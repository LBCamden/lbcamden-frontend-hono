var ge = Object.defineProperty;
var he = (d, r, a) => r in d ? ge(d, r, { enumerable: !0, configurable: !0, writable: !0, value: a }) : d[r] = a;
var Co = (d, r, a) => he(d, typeof r != "symbol" ? r + "" : r, a);
import { html as Yo, raw as ve } from "hono/html";
import { isValidElement as ue } from "hono/jsx";
var me = {
  Stringify: 1
}, Eo = (d, r) => {
  const a = new String(d);
  return a.isEscaped = !0, a.callbacks = r, a;
}, fe = /[&<>'"]/, Fe = async (d, r) => {
  let a = "";
  r || (r = []);
  const e = await Promise.all(d);
  for (let o = e.length - 1; a += e[o], o--, !(o < 0); o--) {
    let l = e[o];
    typeof l == "object" && r.push(...l.callbacks || []);
    const L = l.isEscaped;
    if (l = await (typeof l == "object" ? l.toString() : l), typeof l == "object" && r.push(...l.callbacks || []), l.isEscaped ?? L)
      a += l;
    else {
      const g = [a];
      To(l, g), a = g[0];
    }
  }
  return Eo(a, r);
}, To = (d, r) => {
  const a = d.search(fe);
  if (a === -1) {
    r[0] += d;
    return;
  }
  let e, o, l = 0;
  for (o = a; o < d.length; o++) {
    switch (d.charCodeAt(o)) {
      case 34:
        e = "&quot;";
        break;
      case 39:
        e = "&#39;";
        break;
      case 38:
        e = "&amp;";
        break;
      case 60:
        e = "&lt;";
        break;
      case 62:
        e = "&gt;";
        break;
      default:
        continue;
    }
    r[0] += d.substring(l, o) + e, l = o + 1;
  }
  r[0] += d.substring(l, o);
}, Oe = (d) => {
  const r = d.callbacks;
  if (!(r != null && r.length))
    return d;
  const a = [d], e = {};
  return r.forEach((o) => o({ phase: me.Stringify, buffer: a, context: e })), a[0];
}, ne = Symbol("RENDERER"), ye = Symbol("ERROR_HANDLER"), Ve = Symbol("INTERNAL"), Wo = Symbol("PERMALINK"), Xo = (d) => (d[Ve] = !0, d), je = (d) => ({ value: r, children: a }) => {
  if (!a)
    return;
  const e = {
    children: [
      {
        tag: Xo(() => {
          d.push(r);
        }),
        props: {}
      }
    ]
  };
  Array.isArray(a) ? e.children.push(...a.flat()) : e.children.push(a), e.children.push({
    tag: Xo(() => {
      d.pop();
    }),
    props: {}
  });
  const o = { tag: "", props: e, type: "" };
  return o[ye] = (l) => {
    throw d.pop(), l;
  }, o;
}, Ko = [], we = (d) => {
  const r = [d], a = (e) => {
    r.push(e.value);
    let o;
    try {
      o = e.children ? (Array.isArray(e.children) ? new de("", {}, e.children) : e.children).toString() : "";
    } finally {
      r.pop();
    }
    return o instanceof Promise ? o.then((l) => Eo(l, l.callbacks)) : Eo(o);
  };
  return a.values = r, a.Provider = a, a[ne] = je(r), Ko.push(a), a;
}, Ro = (d) => d.values.at(-1), Ee = {
  title: [],
  script: ["src"],
  style: ["data-href"],
  link: ["href"],
  meta: ["name", "httpEquiv", "charset", "itemProp"]
}, Qo = {}, Pe = "data-precedence", Go = (d) => Array.isArray(d) ? d : [d], _o = /* @__PURE__ */ new WeakMap(), oe = (d, r, a, e) => ({ buffer: o, context: l }) => {
  if (!o)
    return;
  const L = _o.get(l) || {};
  _o.set(l, L);
  const g = L[d] || (L[d] = []);
  let s = !1;
  const v = Ee[d];
  if (v.length > 0) {
    o:
      for (const [, b] of g)
        for (const m of v)
          if (((b == null ? void 0 : b[m]) ?? null) === (a == null ? void 0 : a[m])) {
            s = !0;
            break o;
          }
  }
  if (s ? o[0] = o[0].replaceAll(r, "") : v.length > 0 ? g.push([r, a, e]) : g.unshift([r, a, e]), o[0].indexOf("</head>") !== -1) {
    let b;
    if (e === void 0)
      b = g.map(([m]) => m);
    else {
      const m = [];
      b = g.map(([i, , h]) => {
        let c = m.indexOf(h);
        return c === -1 && (m.push(h), c = m.length - 1), [i, c];
      }).sort((i, h) => i[1] - h[1]).map(([i]) => i);
    }
    b.forEach((m) => {
      o[0] = o[0].replaceAll(m, "");
    }), o[0] = o[0].replace(/(?=<\/head>)/, b.join(""));
  }
}, So = (d, r, a) => Eo(new Fo(d, a, Go(r ?? [])).toString()), Ho = (d, r, a, e) => {
  if ("itemProp" in a)
    return So(d, r, a);
  let { precedence: o, blocking: l, ...L } = a;
  o = e ? o ?? "" : void 0, e && (L[Pe] = o);
  const g = new Fo(d, L, Go(r || [])).toString();
  return g instanceof Promise ? g.then(
    (s) => Eo(g, [
      ...s.callbacks || [],
      oe(d, s, L, o)
    ])
  ) : Eo(g, [oe(d, g, L, o)]);
}, Ce = ({ children: d, ...r }) => {
  const a = $o();
  if (a) {
    const e = Ro(a);
    if (e === "svg" || e === "head")
      return new Fo(
        "title",
        r,
        Go(d ?? [])
      );
  }
  return Ho("title", d, r, !1);
}, Te = ({
  children: d,
  ...r
}) => {
  const a = $o();
  return ["src", "async"].some((e) => !r[e]) || a && Ro(a) === "head" ? So("script", d, r) : Ho("script", d, r, !1);
}, Ie = ({
  children: d,
  ...r
}) => ["href", "precedence"].every((a) => a in r) ? (r["data-href"] = r.href, delete r.href, Ho("style", d, r, !0)) : So("style", d, r), Be = ({ children: d, ...r }) => ["onLoad", "onError"].some((a) => a in r) || r.rel === "stylesheet" && (!("precedence" in r) || "disabled" in r) ? So("link", d, r) : Ho("link", d, r, "precedence" in r), Ae = ({ children: d, ...r }) => {
  const a = $o();
  return a && Ro(a) === "head" ? So("meta", d, r) : Ho("meta", d, r, !1);
}, ce = (d, { children: r, ...a }) => new Fo(d, a, Go(r ?? [])), Se = (d) => (typeof d.action == "function" && (d.action = Wo in d.action ? d.action[Wo] : void 0), ce("form", d)), ie = (d, r) => (typeof r.formAction == "function" && (r.formAction = Wo in r.formAction ? r.formAction[Wo] : void 0), ce(d, r)), He = (d) => ie("input", d), Me = (d) => ie("button", d);
const No = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Me,
  form: Se,
  input: He,
  link: Be,
  meta: Ae,
  script: Te,
  style: Ie,
  title: Ce
}, Symbol.toStringTag, { value: "Module" }));
var We = /* @__PURE__ */ new Map([
  ["className", "class"],
  ["htmlFor", "for"],
  ["crossOrigin", "crossorigin"],
  ["httpEquiv", "http-equiv"],
  ["itemProp", "itemprop"],
  ["fetchPriority", "fetchpriority"],
  ["noModule", "nomodule"],
  ["formAction", "formaction"]
]), ee = (d) => We.get(d) || d, Re = (d, r) => {
  for (const [a, e] of Object.entries(d)) {
    const o = a[0] === "-" || !/[A-Z]/.test(a) ? a : a.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
    r(
      o,
      e == null ? null : typeof e == "number" ? o.match(
        /^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/
      ) ? `${e}` : `${e}px` : e
    );
  }
}, Ao = void 0, $o = () => Ao, Ge = (d) => /[A-Z]/.test(d) && d.match(
  /^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/
) ? d.replace(/([A-Z])/g, "-$1").toLowerCase() : d, Ne = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
], Ue = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "download",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
], Zo = (d, r) => {
  for (let a = 0, e = d.length; a < e; a++) {
    const o = d[a];
    if (typeof o == "string")
      To(o, r);
    else {
      if (typeof o == "boolean" || o === null || o === void 0)
        continue;
      o instanceof Fo ? o.toStringToBuffer(r) : typeof o == "number" || o.isEscaped ? r[0] += o : o instanceof Promise ? r.unshift("", o) : Zo(o, r);
    }
  }
}, Fo = class {
  constructor(d, r, a) {
    Co(this, "tag");
    Co(this, "props");
    Co(this, "key");
    Co(this, "children");
    Co(this, "isEscaped", !0);
    Co(this, "localContexts");
    this.tag = d, this.props = r, this.children = a;
  }
  get type() {
    return this.tag;
  }
  get ref() {
    return this.props.ref || null;
  }
  toString() {
    var r, a;
    const d = [""];
    (r = this.localContexts) == null || r.forEach(([e, o]) => {
      e.values.push(o);
    });
    try {
      this.toStringToBuffer(d);
    } finally {
      (a = this.localContexts) == null || a.forEach(([e]) => {
        e.values.pop();
      });
    }
    return d.length === 1 ? "callbacks" in d ? Oe(Eo(d[0], d.callbacks)).toString() : d[0] : Fe(d, d.callbacks);
  }
  toStringToBuffer(d) {
    const r = this.tag, a = this.props;
    let { children: e } = this;
    d[0] += `<${r}`;
    const o = Ao && Ro(Ao) === "svg" ? (l) => Ge(ee(l)) : (l) => ee(l);
    for (let [l, L] of Object.entries(a))
      if (l = o(l), l !== "children") {
        if (l === "style" && typeof L == "object") {
          let g = "";
          Re(L, (s, v) => {
            v != null && (g += `${g ? ";" : ""}${s}:${v}`);
          }), d[0] += ' style="', To(g, d), d[0] += '"';
        } else if (typeof L == "string")
          d[0] += ` ${l}="`, To(L, d), d[0] += '"';
        else if (L != null) if (typeof L == "number" || L.isEscaped)
          d[0] += ` ${l}="${L}"`;
        else if (typeof L == "boolean" && Ue.includes(l))
          L && (d[0] += ` ${l}=""`);
        else if (l === "dangerouslySetInnerHTML") {
          if (e.length > 0)
            throw "Can only set one of `children` or `props.dangerouslySetInnerHTML`.";
          e = [Eo(L.__html)];
        } else if (L instanceof Promise)
          d[0] += ` ${l}="`, d.unshift('"', L);
        else if (typeof L == "function") {
          if (!l.startsWith("on"))
            throw `Invalid prop '${l}' of type 'function' supplied to '${r}'.`;
        } else
          d[0] += ` ${l}="`, To(L.toString(), d), d[0] += '"';
      }
    if (Ne.includes(r) && e.length === 0) {
      d[0] += "/>";
      return;
    }
    d[0] += ">", Zo(e, d), d[0] += `</${r}>`;
  }
}, Uo = class extends Fo {
  toStringToBuffer(d) {
    const { children: r } = this, a = this.tag.call(null, {
      ...this.props,
      children: r.length <= 1 ? r[0] : r
    });
    if (!(typeof a == "boolean" || a == null))
      if (a instanceof Promise)
        if (Ko.length === 0)
          d.unshift("", a);
        else {
          const e = Ko.map((o) => [o, o.values.at(-1)]);
          d.unshift(
            "",
            a.then((o) => (o instanceof Fo && (o.localContexts = e), o))
          );
        }
      else a instanceof Fo ? a.toStringToBuffer(d) : typeof a == "number" || a.isEscaped ? (d[0] += a, a.callbacks && (d.callbacks || (d.callbacks = []), d.callbacks.push(...a.callbacks))) : To(a, d);
  }
}, de = class extends Fo {
  toStringToBuffer(d) {
    Zo(this.children, d);
  }
}, ae = !1, Do = (d, r, a) => {
  if (!ae) {
    for (const e in Qo)
      No[e][ne] = Qo[e];
    ae = !0;
  }
  return typeof d == "function" ? new Uo(d, r, a) : No[d] ? new Uo(
    No[d],
    r,
    a
  ) : d === "svg" || d === "head" ? (Ao || (Ao = we("")), new Fo(d, r, [
    new Uo(
      Ao,
      {
        value: d
      },
      a
    )
  ])) : new Fo(d, r, a);
}, zo = ({
  children: d
}) => new de(
  "",
  {
    children: d
  },
  Array.isArray(d) ? d : d ? [d] : []
);
function no(d, r, a) {
  let e;
  if (!r || !("children" in r))
    e = Do(d, r, []);
  else {
    const o = r.children;
    e = Array.isArray(o) ? Do(d, r, o) : Do(d, r, [o]);
  }
  return e.key = a, e;
}
var De = typeof globalThis < "u" || typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ke(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var ke = { exports: {} };
/*! Browser bundle of nunjucks 3.2.4 (slim, only works with precompiled templates) */
(function(d, r) {
  (function(a, e) {
    d.exports = e();
  })(typeof self < "u" ? self : De, function() {
    return (
      /******/
      function(a) {
        var e = {};
        function o(l) {
          if (e[l])
            return e[l].exports;
          var L = e[l] = {
            /******/
            i: l,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return a[l].call(L.exports, L, L.exports, o), L.l = !0, L.exports;
        }
        return o.m = a, o.c = e, o.d = function(l, L, g) {
          o.o(l, L) || Object.defineProperty(l, L, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: g
            /******/
          });
        }, o.n = function(l) {
          var L = l && l.__esModule ? (
            /******/
            function() {
              return l.default;
            }
          ) : (
            /******/
            function() {
              return l;
            }
          );
          return o.d(L, "a", L), L;
        }, o.o = function(l, L) {
          return Object.prototype.hasOwnProperty.call(l, L);
        }, o.p = "", o(o.s = 6);
      }([
        /* 0 */
        /***/
        function(a, e) {
        },
        /* 1 */
        /***/
        function(a, v, o) {
          var l = Array.prototype, L = Object.prototype, g = {
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
            "<": "&lt;",
            ">": "&gt;",
            "\\": "&#92;"
          }, s = /[&"'<>\\]/g, v = a.exports = {};
          function b(B, G) {
            return L.hasOwnProperty.call(B, G);
          }
          v.hasOwnProp = b;
          function m(B) {
            return g[B];
          }
          function i(B, G, N) {
            if (N.Update || (N = new v.TemplateError(N)), N.Update(B), !G) {
              var R = N;
              N = new Error(R.message), N.name = R.name;
            }
            return N;
          }
          v._prettifyError = i;
          function h(B, G, N) {
            var R, Z;
            B instanceof Error && (Z = B, B = Z.name + ": " + Z.message), Object.setPrototypeOf ? (R = new Error(B), Object.setPrototypeOf(R, h.prototype)) : (R = this, Object.defineProperty(R, "message", {
              enumerable: !1,
              writable: !0,
              value: B
            })), Object.defineProperty(R, "name", {
              value: "Template render error"
            }), Error.captureStackTrace && Error.captureStackTrace(R, this.constructor);
            var W;
            if (Z) {
              var D = Object.getOwnPropertyDescriptor(Z, "stack");
              W = D && (D.get || function() {
                return D.value;
              }), W || (W = function() {
                return Z.stack;
              });
            } else {
              var z = new Error(B).stack;
              W = function() {
                return z;
              };
            }
            return Object.defineProperty(R, "stack", {
              get: function() {
                return W.call(R);
              }
            }), Object.defineProperty(R, "cause", {
              value: Z
            }), R.lineno = G, R.colno = N, R.firstUpdate = !0, R.Update = function(J) {
              var Q = "(" + (J || "unknown path") + ")";
              return this.firstUpdate && (this.lineno && this.colno ? Q += " [Line " + this.lineno + ", Column " + this.colno + "]" : this.lineno && (Q += " [Line " + this.lineno + "]")), Q += `
 `, this.firstUpdate && (Q += " "), this.message = Q + (this.message || ""), this.firstUpdate = !1, this;
            }, R;
          }
          Object.setPrototypeOf ? Object.setPrototypeOf(h.prototype, Error.prototype) : h.prototype = Object.create(Error.prototype, {
            constructor: {
              value: h
            }
          }), v.TemplateError = h;
          function c(B) {
            return B.replace(s, m);
          }
          v.escape = c;
          function u(B) {
            return L.toString.call(B) === "[object Function]";
          }
          v.isFunction = u;
          function t(B) {
            return L.toString.call(B) === "[object Array]";
          }
          v.isArray = t;
          function p(B) {
            return L.toString.call(B) === "[object String]";
          }
          v.isString = p;
          function n(B) {
            return L.toString.call(B) === "[object Object]";
          }
          v.isObject = n;
          function k(B) {
            return B ? typeof B == "string" ? B.split(".") : [B] : [];
          }
          function f(B) {
            var G = k(B);
            return function(N) {
              for (var R = N, Z = 0; Z < G.length; Z++) {
                var W = G[Z];
                if (b(R, W))
                  R = R[W];
                else
                  return;
              }
              return R;
            };
          }
          v.getAttrGetter = f;
          function F(B, G, N) {
            for (var R = {}, Z = u(G) ? G : f(G), W = 0; W < B.length; W++) {
              var D = B[W], z = Z(D, W);
              if (z === void 0 && N === !0)
                throw new TypeError('groupby: attribute "' + G + '" resolved to undefined');
              (R[z] || (R[z] = [])).push(D);
            }
            return R;
          }
          v.groupBy = F;
          function j(B) {
            return Array.prototype.slice.call(B);
          }
          v.toArray = j;
          function w(B) {
            var G = [];
            if (!B)
              return G;
            for (var N = B.length, R = j(arguments).slice(1), Z = -1; ++Z < N; )
              E(R, B[Z]) === -1 && G.push(B[Z]);
            return G;
          }
          v.without = w;
          function C(B, G) {
            for (var N = "", R = 0; R < G; R++)
              N += B;
            return N;
          }
          v.repeat = C;
          function P(B, G, N) {
            if (B != null) {
              if (l.forEach && B.forEach === l.forEach)
                B.forEach(G, N);
              else if (B.length === +B.length)
                for (var R = 0, Z = B.length; R < Z; R++)
                  G.call(N, B[R], R, B);
            }
          }
          v.each = P;
          function y(B, G) {
            var N = [];
            if (B == null)
              return N;
            if (l.map && B.map === l.map)
              return B.map(G);
            for (var R = 0; R < B.length; R++)
              N[N.length] = G(B[R], R);
            return B.length === +B.length && (N.length = B.length), N;
          }
          v.map = y;
          function O(B, G, N) {
            var R = -1;
            function Z() {
              R++, R < B.length ? G(B[R], R, Z, N) : N();
            }
            Z();
          }
          v.asyncIter = O;
          function V(B, G, N) {
            var R = S(B || {}), Z = R.length, W = -1;
            function D() {
              W++;
              var z = R[W];
              W < Z ? G(z, B[z], W, Z, D) : N();
            }
            D();
          }
          v.asyncFor = V;
          function E(B, G, N) {
            return Array.prototype.indexOf.call(B || [], G, N);
          }
          v.indexOf = E;
          function S(B) {
            var G = [];
            for (var N in B)
              b(B, N) && G.push(N);
            return G;
          }
          v.keys = S;
          function T(B) {
            return S(B).map(function(G) {
              return [G, B[G]];
            });
          }
          v._entries = T;
          function H(B) {
            return S(B).map(function(G) {
              return B[G];
            });
          }
          v._values = H;
          function I(B, G) {
            return B = B || {}, S(G).forEach(function(N) {
              B[N] = G[N];
            }), B;
          }
          v._assign = v.extend = I;
          function M(B, G) {
            if (t(G) || p(G))
              return G.indexOf(B) !== -1;
            if (n(G))
              return B in G;
            throw new Error('Cannot use "in" operator to search for "' + B + '" in unexpected types.');
          }
          v.inOperator = M;
        },
        /* 2 */
        /***/
        function(a, e, o) {
          var l = o(1), L = Array.from, g = typeof Symbol == "function" && Symbol.iterator && typeof L == "function", s = /* @__PURE__ */ function() {
            function y(V, E) {
              this.variables = /* @__PURE__ */ Object.create(null), this.parent = V, this.topLevel = !1, this.isolateWrites = E;
            }
            var O = y.prototype;
            return O.set = function(V, E, S) {
              var T = V.split("."), H = this.variables, I = this;
              if (S && (I = this.resolve(T[0], !0))) {
                I.set(V, E);
                return;
              }
              for (var M = 0; M < T.length - 1; M++) {
                var B = T[M];
                H[B] || (H[B] = {}), H = H[B];
              }
              H[T[T.length - 1]] = E;
            }, O.get = function(V) {
              var E = this.variables[V];
              return E !== void 0 ? E : null;
            }, O.lookup = function(V) {
              var E = this.parent, S = this.variables[V];
              return S !== void 0 ? S : E && E.lookup(V);
            }, O.resolve = function(V, E) {
              var S = E && this.isolateWrites ? void 0 : this.parent, T = this.variables[V];
              return T !== void 0 ? this : S && S.resolve(V);
            }, O.push = function(V) {
              return new y(this, V);
            }, O.pop = function() {
              return this.parent;
            }, y;
          }();
          function v(y, O, V) {
            return function() {
              for (var E = arguments.length, S = new Array(E), T = 0; T < E; T++)
                S[T] = arguments[T];
              var H = h(S), I, M = i(S);
              if (H > y.length)
                I = S.slice(0, y.length), S.slice(I.length, H).forEach(function(N, R) {
                  R < O.length && (M[O[R]] = N);
                }), I.push(M);
              else if (H < y.length) {
                I = S.slice(0, H);
                for (var B = H; B < y.length; B++) {
                  var G = y[B];
                  I.push(M[G]), delete M[G];
                }
                I.push(M);
              } else
                I = S;
              return V.apply(this, I);
            };
          }
          function b(y) {
            return y.__keywords = !0, y;
          }
          function m(y) {
            return y && Object.prototype.hasOwnProperty.call(y, "__keywords");
          }
          function i(y) {
            var O = y.length;
            if (O) {
              var V = y[O - 1];
              if (m(V))
                return V;
            }
            return {};
          }
          function h(y) {
            var O = y.length;
            if (O === 0)
              return 0;
            var V = y[O - 1];
            return m(V) ? O - 1 : O;
          }
          function c(y) {
            if (typeof y != "string")
              return y;
            this.val = y, this.length = y.length;
          }
          c.prototype = Object.create(String.prototype, {
            length: {
              writable: !0,
              configurable: !0,
              value: 0
            }
          }), c.prototype.valueOf = function() {
            return this.val;
          }, c.prototype.toString = function() {
            return this.val;
          };
          function u(y, O) {
            return y instanceof c ? new c(O) : O.toString();
          }
          function t(y) {
            var O = typeof y;
            return O === "string" ? new c(y) : O !== "function" ? y : function(V) {
              var E = y.apply(this, arguments);
              return typeof E == "string" ? new c(E) : E;
            };
          }
          function p(y, O) {
            return y = y ?? "", O && !(y instanceof c) && (y = l.escape(y.toString())), y;
          }
          function n(y, O, V) {
            if (y == null)
              throw new l.TemplateError("attempted to output null or undefined value", O + 1, V + 1);
            return y;
          }
          function k(y, O) {
            if (y != null)
              return typeof y[O] == "function" ? function() {
                for (var V = arguments.length, E = new Array(V), S = 0; S < V; S++)
                  E[S] = arguments[S];
                return y[O].apply(y, E);
              } : y[O];
          }
          function f(y, O, V, E) {
            if (y) {
              if (typeof y != "function")
                throw new Error("Unable to call `" + O + "`, which is not a function");
            } else throw new Error("Unable to call `" + O + "`, which is undefined or falsey");
            return y.apply(V, E);
          }
          function F(y, O, V) {
            var E = O.lookup(V);
            return E !== void 0 ? E : y.lookup(V);
          }
          function j(y, O, V) {
            return y.lineno ? y : new l.TemplateError(y, O, V);
          }
          function w(y, O, V, E) {
            if (l.isArray(y)) {
              var S = y.length;
              l.asyncIter(y, function(T, H, I) {
                switch (O) {
                  case 1:
                    V(T, H, S, I);
                    break;
                  case 2:
                    V(T[0], T[1], H, S, I);
                    break;
                  case 3:
                    V(T[0], T[1], T[2], H, S, I);
                    break;
                  default:
                    T.push(H, S, I), V.apply(this, T);
                }
              }, E);
            } else
              l.asyncFor(y, function(T, H, I, M, B) {
                V(T, H, I, M, B);
              }, E);
          }
          function C(y, O, V, E) {
            var S = 0, T, H;
            function I(Z, W) {
              S++, H[Z] = W, S === T && E(null, H.join(""));
            }
            if (l.isArray(y))
              if (T = y.length, H = new Array(T), T === 0)
                E(null, "");
              else
                for (var M = 0; M < y.length; M++) {
                  var B = y[M];
                  switch (O) {
                    case 1:
                      V(B, M, T, I);
                      break;
                    case 2:
                      V(B[0], B[1], M, T, I);
                      break;
                    case 3:
                      V(B[0], B[1], B[2], M, T, I);
                      break;
                    default:
                      B.push(M, T, I), V.apply(this, B);
                  }
                }
            else {
              var G = l.keys(y || {});
              if (T = G.length, H = new Array(T), T === 0)
                E(null, "");
              else
                for (var N = 0; N < G.length; N++) {
                  var R = G[N];
                  V(R, y[R], N, T, I);
                }
            }
          }
          function P(y) {
            return typeof y != "object" || y === null || l.isArray(y) ? y : g && Symbol.iterator in y ? L(y) : y;
          }
          a.exports = {
            Frame: s,
            makeMacro: v,
            makeKeywordArgs: b,
            numArgs: h,
            suppressValue: p,
            ensureDefined: n,
            memberLookup: k,
            contextOrFrameLookup: F,
            callWrap: f,
            handleError: j,
            isArray: l.isArray,
            keys: l.keys,
            SafeString: c,
            copySafeness: u,
            markSafe: t,
            asyncEach: w,
            asyncAll: C,
            inOperator: l.inOperator,
            fromIterator: P
          };
        },
        /* 3 */
        /***/
        function(a, e, o) {
          function l(v, b) {
            v.prototype = Object.create(b.prototype), v.prototype.constructor = v, L(v, b);
          }
          function L(v, b) {
            return L = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(m, i) {
              return m.__proto__ = i, m;
            }, L(v, b);
          }
          var g = o(4), s = /* @__PURE__ */ function(v) {
            l(b, v);
            function b(i) {
              var h;
              return h = v.call(this) || this, h.precompiled = i || {}, h;
            }
            var m = b.prototype;
            return m.getSource = function(i) {
              return this.precompiled[i] ? {
                src: {
                  type: "code",
                  obj: this.precompiled[i]
                },
                path: i
              } : null;
            }, b;
          }(g);
          a.exports = {
            PrecompiledLoader: s
          };
        },
        /* 4 */
        /***/
        function(a, e, o) {
          function l(b, m) {
            b.prototype = Object.create(m.prototype), b.prototype.constructor = b, L(b, m);
          }
          function L(b, m) {
            return L = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, h) {
              return i.__proto__ = h, i;
            }, L(b, m);
          }
          var g = o(0), s = o(5), v = s.EmitterObj;
          a.exports = /* @__PURE__ */ function(b) {
            l(m, b);
            function m() {
              return b.apply(this, arguments) || this;
            }
            var i = m.prototype;
            return i.resolve = function(h, c) {
              return g.resolve(g.dirname(h), c);
            }, i.isRelative = function(h) {
              return h.indexOf("./") === 0 || h.indexOf("../") === 0;
            }, m;
          }(v);
        },
        /* 5 */
        /***/
        function(a, e, o) {
          function l(p, n) {
            for (var k = 0; k < n.length; k++) {
              var f = n[k];
              f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(p, g(f.key), f);
            }
          }
          function L(p, n, k) {
            return n && l(p.prototype, n), Object.defineProperty(p, "prototype", { writable: !1 }), p;
          }
          function g(p) {
            var n = s(p, "string");
            return typeof n == "symbol" ? n : String(n);
          }
          function s(p, n) {
            if (typeof p != "object" || p === null) return p;
            var k = p[Symbol.toPrimitive];
            if (k !== void 0) {
              var f = k.call(p, n);
              if (typeof f != "object") return f;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(p);
          }
          function v(p, n) {
            p.prototype = Object.create(n.prototype), p.prototype.constructor = p, b(p, n);
          }
          function b(p, n) {
            return b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(k, f) {
              return k.__proto__ = f, k;
            }, b(p, n);
          }
          var m = o(13), i = o(1);
          function h(p, n) {
            return typeof p != "function" || typeof n != "function" ? n : function() {
              var k = this.parent;
              this.parent = p;
              var f = n.apply(this, arguments);
              return this.parent = k, f;
            };
          }
          function c(p, n, k) {
            k = k || {}, i.keys(k).forEach(function(F) {
              k[F] = h(p.prototype[F], k[F]);
            });
            var f = /* @__PURE__ */ function(F) {
              v(j, F);
              function j() {
                return F.apply(this, arguments) || this;
              }
              return L(j, [{
                key: "typename",
                get: function() {
                  return n;
                }
              }]), j;
            }(p);
            return i._assign(f.prototype, k), f;
          }
          var u = /* @__PURE__ */ function() {
            function p() {
              this.init.apply(this, arguments);
            }
            var n = p.prototype;
            return n.init = function() {
            }, p.extend = function(k, f) {
              return typeof k == "object" && (f = k, k = "anonymous"), c(this, k, f);
            }, L(p, [{
              key: "typename",
              get: function() {
                return this.constructor.name;
              }
            }]), p;
          }(), t = /* @__PURE__ */ function(p) {
            v(n, p);
            function n() {
              var f, F;
              return F = p.call(this) || this, (f = F).init.apply(f, arguments), F;
            }
            var k = n.prototype;
            return k.init = function() {
            }, n.extend = function(f, F) {
              return typeof f == "object" && (F = f, f = "anonymous"), c(this, f, F);
            }, L(n, [{
              key: "typename",
              get: function() {
                return this.constructor.name;
              }
            }]), n;
          }(m);
          a.exports = {
            Obj: u,
            EmitterObj: t
          };
        },
        /* 6 */
        /***/
        function(a, e, o) {
          var l = o(1), L = o(7), g = L.Environment, s = L.Template, v = o(4), b = o(3), m = o(0), i = o(0), h = o(0), c = o(0), u = o(2), t = o(0), p = o(17), n;
          function k(f, F) {
            F = F || {}, l.isObject(f) && (F = f, f = null);
            var j;
            return b.FileSystemLoader ? j = new b.FileSystemLoader(f, {
              watch: F.watch,
              noCache: F.noCache
            }) : b.WebLoader && (j = new b.WebLoader(f, {
              useCache: F.web && F.web.useCache,
              async: F.web && F.web.async
            })), n = new g(j, F), F && F.express && n.express(F.express), n;
          }
          a.exports = {
            Environment: g,
            Template: s,
            Loader: v,
            FileSystemLoader: b.FileSystemLoader,
            NodeResolveLoader: b.NodeResolveLoader,
            PrecompiledLoader: b.PrecompiledLoader,
            WebLoader: b.WebLoader,
            compiler: i,
            parser: h,
            lexer: c,
            runtime: u,
            lib: l,
            nodes: t,
            installJinjaCompat: p,
            configure: k,
            reset: function() {
              n = void 0;
            },
            compile: function(f, F, j, w) {
              return n || k(), new s(f, F, j, w);
            },
            render: function(f, F, j) {
              return n || k(), n.render(f, F, j);
            },
            renderString: function(f, F, j) {
              return n || k(), n.renderString(f, F, j);
            },
            precompile: m ? m.precompile : void 0,
            precompileString: m ? m.precompileString : void 0
          };
        },
        /* 7 */
        /***/
        function(a, e, o) {
          function l(S, T) {
            S.prototype = Object.create(T.prototype), S.prototype.constructor = S, L(S, T);
          }
          function L(S, T) {
            return L = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(H, I) {
              return H.__proto__ = I, H;
            }, L(S, T);
          }
          var g = o(8), s = o(11), v = o(1), b = o(0), m = o(12), i = o(3), h = i.FileSystemLoader, c = i.WebLoader, u = i.PrecompiledLoader, t = o(14), p = o(15), n = o(5), k = n.Obj, f = n.EmitterObj, F = o(2), j = F.handleError, w = F.Frame, C = o(16);
          function P(S, T, H) {
            g(function() {
              S(T, H);
            });
          }
          var y = {
            type: "code",
            obj: {
              root: function(S, T, H, I, M) {
                try {
                  M(null, "");
                } catch (B) {
                  M(j(B, null, null));
                }
              }
            }
          }, O = /* @__PURE__ */ function(S) {
            l(T, S);
            function T() {
              return S.apply(this, arguments) || this;
            }
            var H = T.prototype;
            return H.init = function(I, M) {
              var B = this;
              M = this.opts = M || {}, this.opts.dev = !!M.dev, this.opts.autoescape = M.autoescape != null ? M.autoescape : !0, this.opts.throwOnUndefined = !!M.throwOnUndefined, this.opts.trimBlocks = !!M.trimBlocks, this.opts.lstripBlocks = !!M.lstripBlocks, this.loaders = [], I ? this.loaders = v.isArray(I) ? I : [I] : h ? this.loaders = [new h("views")] : c && (this.loaders = [new c("/views")]), typeof globalThis < "u" && globalThis.nunjucksPrecompiled && this.loaders.unshift(new u(globalThis.nunjucksPrecompiled)), this._initLoaders(), this.globals = p(), this.filters = {}, this.tests = {}, this.asyncFilters = [], this.extensions = {}, this.extensionsList = [], v._entries(m).forEach(function(G) {
                var N = G[0], R = G[1];
                return B.addFilter(N, R);
              }), v._entries(t).forEach(function(G) {
                var N = G[0], R = G[1];
                return B.addTest(N, R);
              });
            }, H._initLoaders = function() {
              var I = this;
              this.loaders.forEach(function(M) {
                M.cache = {}, typeof M.on == "function" && (M.on("update", function(B, G) {
                  M.cache[B] = null, I.emit("update", B, G, M);
                }), M.on("load", function(B, G) {
                  I.emit("load", B, G, M);
                }));
              });
            }, H.invalidateCache = function() {
              this.loaders.forEach(function(I) {
                I.cache = {};
              });
            }, H.addExtension = function(I, M) {
              return M.__name = I, this.extensions[I] = M, this.extensionsList.push(M), this;
            }, H.removeExtension = function(I) {
              var M = this.getExtension(I);
              M && (this.extensionsList = v.without(this.extensionsList, M), delete this.extensions[I]);
            }, H.getExtension = function(I) {
              return this.extensions[I];
            }, H.hasExtension = function(I) {
              return !!this.extensions[I];
            }, H.addGlobal = function(I, M) {
              return this.globals[I] = M, this;
            }, H.getGlobal = function(I) {
              if (typeof this.globals[I] > "u")
                throw new Error("global not found: " + I);
              return this.globals[I];
            }, H.addFilter = function(I, M, B) {
              var G = M;
              return B && this.asyncFilters.push(I), this.filters[I] = G, this;
            }, H.getFilter = function(I) {
              if (!this.filters[I])
                throw new Error("filter not found: " + I);
              return this.filters[I];
            }, H.addTest = function(I, M) {
              return this.tests[I] = M, this;
            }, H.getTest = function(I) {
              if (!this.tests[I])
                throw new Error("test not found: " + I);
              return this.tests[I];
            }, H.resolveTemplate = function(I, M, B) {
              var G = I.isRelative && M ? I.isRelative(B) : !1;
              return G && I.resolve ? I.resolve(M, B) : B;
            }, H.getTemplate = function(I, M, B, G, N) {
              var R = this, Z = this, W = null;
              if (I && I.raw && (I = I.raw), v.isFunction(B) && (N = B, B = null, M = M || !1), v.isFunction(M) && (N = M, M = !1), I instanceof E)
                W = I;
              else {
                if (typeof I != "string")
                  throw new Error("template names must be a string: " + I);
                for (var D = 0; D < this.loaders.length; D++) {
                  var z = this.loaders[D];
                  if (W = z.cache[this.resolveTemplate(z, B, I)], W)
                    break;
                }
              }
              if (W)
                if (M && W.compile(), N) {
                  N(null, W);
                  return;
                } else
                  return W;
              var J, Q = function($, K) {
                if (!K && !$ && !G && ($ = new Error("template not found: " + I)), $)
                  if (N) {
                    N($);
                    return;
                  } else
                    throw $;
                var X;
                K ? (X = new E(K.src, R, K.path, M), K.noCache || (K.loader.cache[I] = X)) : X = new E(y, R, "", M), N ? N(null, X) : J = X;
              };
              return v.asyncIter(this.loaders, function($, K, X, Y) {
                function ao(lo, ro) {
                  lo ? Y(lo) : ro ? (ro.loader = $, Y(null, ro)) : X();
                }
                I = Z.resolveTemplate($, B, I), $.async ? $.getSource(I, ao) : ao(null, $.getSource(I));
              }, Q), J;
            }, H.express = function(I) {
              return C(this, I);
            }, H.render = function(I, M, B) {
              v.isFunction(M) && (B = M, M = null);
              var G = null;
              return this.getTemplate(I, function(N, R) {
                if (N && B)
                  P(B, N);
                else {
                  if (N)
                    throw N;
                  G = R.render(M, B);
                }
              }), G;
            }, H.renderString = function(I, M, B, G) {
              v.isFunction(B) && (G = B, B = {}), B = B || {};
              var N = new E(I, this, B.path);
              return N.render(M, G);
            }, H.waterfall = function(I, M, B) {
              return s(I, M, B);
            }, T;
          }(f), V = /* @__PURE__ */ function(S) {
            l(T, S);
            function T() {
              return S.apply(this, arguments) || this;
            }
            var H = T.prototype;
            return H.init = function(I, M, B) {
              var G = this;
              this.env = B || new O(), this.ctx = v.extend({}, I), this.blocks = {}, this.exported = [], v.keys(M).forEach(function(N) {
                G.addBlock(N, M[N]);
              });
            }, H.lookup = function(I) {
              return I in this.env.globals && !(I in this.ctx) ? this.env.globals[I] : this.ctx[I];
            }, H.setVariable = function(I, M) {
              this.ctx[I] = M;
            }, H.getVariables = function() {
              return this.ctx;
            }, H.addBlock = function(I, M) {
              return this.blocks[I] = this.blocks[I] || [], this.blocks[I].push(M), this;
            }, H.getBlock = function(I) {
              if (!this.blocks[I])
                throw new Error('unknown block "' + I + '"');
              return this.blocks[I][0];
            }, H.getSuper = function(I, M, B, G, N, R) {
              var Z = v.indexOf(this.blocks[M] || [], B), W = this.blocks[M][Z + 1], D = this;
              if (Z === -1 || !W)
                throw new Error('no super block available for "' + M + '"');
              W(I, D, G, N, R);
            }, H.addExport = function(I) {
              this.exported.push(I);
            }, H.getExported = function() {
              var I = this, M = {};
              return this.exported.forEach(function(B) {
                M[B] = I.ctx[B];
              }), M;
            }, T;
          }(k), E = /* @__PURE__ */ function(S) {
            l(T, S);
            function T() {
              return S.apply(this, arguments) || this;
            }
            var H = T.prototype;
            return H.init = function(I, M, B, G) {
              if (this.env = M || new O(), v.isObject(I))
                switch (I.type) {
                  case "code":
                    this.tmplProps = I.obj;
                    break;
                  case "string":
                    this.tmplStr = I.obj;
                    break;
                  default:
                    throw new Error("Unexpected template object type " + I.type + "; expected 'code', or 'string'");
                }
              else if (v.isString(I))
                this.tmplStr = I;
              else
                throw new Error("src must be a string or an object describing the source");
              if (this.path = B, G)
                try {
                  this._compile();
                } catch (N) {
                  throw v._prettifyError(this.path, this.env.opts.dev, N);
                }
              else
                this.compiled = !1;
            }, H.render = function(I, M, B) {
              var G = this;
              typeof I == "function" ? (B = I, I = {}) : typeof M == "function" && (B = M, M = null);
              var N = !M;
              try {
                this.compile();
              } catch (J) {
                var R = v._prettifyError(this.path, this.env.opts.dev, J);
                if (B)
                  return P(B, R);
                throw R;
              }
              var Z = new V(I || {}, this.blocks, this.env), W = M ? M.push(!0) : new w();
              W.topLevel = !0;
              var D = null, z = !1;
              return this.rootRenderFunc(this.env, Z, W, F, function(J, Q) {
                if (!(z && B && typeof Q < "u"))
                  if (J && (J = v._prettifyError(G.path, G.env.opts.dev, J), z = !0), B)
                    N ? P(B, J, Q) : B(J, Q);
                  else {
                    if (J)
                      throw J;
                    D = Q;
                  }
              }), D;
            }, H.getExported = function(I, M, B) {
              typeof I == "function" && (B = I, I = {}), typeof M == "function" && (B = M, M = null);
              try {
                this.compile();
              } catch (R) {
                if (B)
                  return B(R);
                throw R;
              }
              var G = M ? M.push() : new w();
              G.topLevel = !0;
              var N = new V(I || {}, this.blocks, this.env);
              this.rootRenderFunc(this.env, N, G, F, function(R) {
                R ? B(R, null) : B(null, N.getExported());
              });
            }, H.compile = function() {
              this.compiled || this._compile();
            }, H._compile = function() {
              var I;
              if (this.tmplProps)
                I = this.tmplProps;
              else {
                var M = b.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts), B = new Function(M);
                I = B();
              }
              this.blocks = this._getBlocks(I), this.rootRenderFunc = I.root, this.compiled = !0;
            }, H._getBlocks = function(I) {
              var M = {};
              return v.keys(I).forEach(function(B) {
                B.slice(0, 2) === "b_" && (M[B.slice(2)] = I[B]);
              }), M;
            }, T;
          }(k);
          a.exports = {
            Environment: O,
            Template: E
          };
        },
        /* 8 */
        /***/
        function(a, e, o) {
          var l = o(9), L = [], g = [], s = l.makeRequestCallFromTimer(v);
          function v() {
            if (g.length)
              throw g.shift();
          }
          a.exports = b;
          function b(i) {
            var h;
            L.length ? h = L.pop() : h = new m(), h.task = i, l(h);
          }
          function m() {
            this.task = null;
          }
          m.prototype.call = function() {
            try {
              this.task.call();
            } catch (i) {
              b.onerror ? b.onerror(i) : (g.push(i), s());
            } finally {
              this.task = null, L[L.length] = this;
            }
          };
        },
        /* 9 */
        /***/
        function(a, e, o) {
          (function(l) {
            a.exports = L;
            function L(t) {
              g.length || s(), g[g.length] = t;
            }
            var g = [], s, v = 0, b = 1024;
            function m() {
              for (; v < g.length; ) {
                var t = v;
                if (v = v + 1, g[t].call(), v > b) {
                  for (var p = 0, n = g.length - v; p < n; p++)
                    g[p] = g[p + v];
                  g.length -= v, v = 0;
                }
              }
              g.length = 0, v = 0;
            }
            var i = typeof l < "u" ? l : self, h = i.MutationObserver || i.WebKitMutationObserver;
            typeof h == "function" ? s = c(m) : s = u(m), L.requestFlush = s;
            function c(t) {
              var p = 1, n = new h(t), k = document.createTextNode("");
              return n.observe(k, { characterData: !0 }), function() {
                p = -p, k.data = p;
              };
            }
            function u(t) {
              return function() {
                var p = setTimeout(k, 0), n = setInterval(k, 50);
                function k() {
                  clearTimeout(p), clearInterval(n), t();
                }
              };
            }
            L.makeRequestCallFromTimer = u;
          }).call(e, o(10));
        },
        /* 10 */
        /***/
        function(a, e) {
          var o;
          o = /* @__PURE__ */ function() {
            return this;
          }();
          try {
            o = o || Function("return this")() || (0, eval)("this");
          } catch {
            typeof globalThis == "object" && (o = globalThis);
          }
          a.exports = o;
        },
        /* 11 */
        /***/
        function(a, e, o) {
          var l, L;
          (function(g) {
            var s = function() {
              var h = Array.prototype.slice.call(arguments);
              typeof h[0] == "function" && h[0].apply(null, h.splice(1));
            }, v = function(h) {
              typeof setImmediate == "function" ? setImmediate(h) : typeof process < "u" && process.nextTick ? process.nextTick(h) : setTimeout(h, 0);
            }, b = function(h) {
              var c = function(u) {
                var t = function() {
                  return h.length && h[u].apply(null, arguments), t.next();
                };
                return t.next = function() {
                  return u < h.length - 1 ? c(u + 1) : null;
                }, t;
              };
              return c(0);
            }, m = Array.isArray || function(h) {
              return Object.prototype.toString.call(h) === "[object Array]";
            }, i = function(h, c, u) {
              var t = u ? v : s;
              if (c = c || function() {
              }, !m(h)) {
                var p = new Error("First argument to waterfall must be an array of functions");
                return c(p);
              }
              if (!h.length)
                return c();
              var n = function(k) {
                return function(f) {
                  if (f)
                    c.apply(null, arguments), c = function() {
                    };
                  else {
                    var F = Array.prototype.slice.call(arguments, 1), j = k.next();
                    j ? F.push(n(j)) : F.push(c), t(function() {
                      k.apply(null, F);
                    });
                  }
                };
              };
              n(b(h))();
            };
            l = [], L = (function() {
              return i;
            }).apply(e, l), L !== void 0 && (a.exports = L);
          })();
        },
        /* 12 */
        /***/
        function(a, g, o) {
          var l = o(1), L = o(2), g = a.exports = {};
          function s(A, U) {
            return A == null || A === !1 ? U : A;
          }
          g.abs = Math.abs;
          function v(A) {
            return A !== A;
          }
          function b(A, U, x) {
            var q, oo = [], eo = [];
            for (q = 0; q < A.length; q++)
              q % U === 0 && eo.length && (oo.push(eo), eo = []), eo.push(A[q]);
            if (eo.length) {
              if (x)
                for (q = eo.length; q < U; q++)
                  eo.push(x);
              oo.push(eo);
            }
            return oo;
          }
          g.batch = b;
          function m(A) {
            A = s(A, "");
            var U = A.toLowerCase();
            return L.copySafeness(A, U.charAt(0).toUpperCase() + U.slice(1));
          }
          g.capitalize = m;
          function i(A, U) {
            if (A = s(A, ""), U = U || 80, A.length >= U)
              return A;
            var x = U - A.length, q = l.repeat(" ", x / 2 - x % 2), oo = l.repeat(" ", x / 2);
            return L.copySafeness(A, q + A + oo);
          }
          g.center = i;
          function h(A, U, x) {
            return x ? A || U : A !== void 0 ? A : U;
          }
          g.default = h;
          function c(A, U, x) {
            if (!l.isObject(A))
              throw new l.TemplateError("dictsort filter: val must be an object");
            var q = [];
            for (var oo in A)
              q.push([oo, A[oo]]);
            var eo;
            if (x === void 0 || x === "key")
              eo = 0;
            else if (x === "value")
              eo = 1;
            else
              throw new l.TemplateError("dictsort filter: You can only sort by either key or value");
            return q.sort(function(po, so) {
              var uo = po[eo], to = so[eo];
              return U || (l.isString(uo) && (uo = uo.toUpperCase()), l.isString(to) && (to = to.toUpperCase())), uo > to ? 1 : uo === to ? 0 : -1;
            }), q;
          }
          g.dictsort = c;
          function u(A, U) {
            return JSON.stringify(A, null, U);
          }
          g.dump = u;
          function t(A) {
            return A instanceof L.SafeString ? A : (A = A ?? "", L.markSafe(l.escape(A.toString())));
          }
          g.escape = t;
          function p(A) {
            return A instanceof L.SafeString ? A : (A = A ?? "", L.markSafe(A.toString()));
          }
          g.safe = p;
          function n(A) {
            return A[0];
          }
          g.first = n;
          function k(A) {
            return A = A ?? "", L.markSafe(l.escape(A.toString()));
          }
          g.forceescape = k;
          function f(A, U) {
            return l.groupBy(A, U, this.env.opts.throwOnUndefined);
          }
          g.groupby = f;
          function F(A, U, x) {
            if (A = s(A, ""), A === "")
              return "";
            U = U || 4;
            var q = A.split(`
`), oo = l.repeat(" ", U), eo = q.map(function(po, so) {
              return so === 0 && !x ? po : "" + oo + po;
            }).join(`
`);
            return L.copySafeness(A, eo);
          }
          g.indent = F;
          function j(A, U, x) {
            return U = U || "", x && (A = l.map(A, function(q) {
              return q[x];
            })), A.join(U);
          }
          g.join = j;
          function w(A) {
            return A[A.length - 1];
          }
          g.last = w;
          function C(A) {
            var U = s(A, "");
            return U !== void 0 ? typeof Map == "function" && U instanceof Map || typeof Set == "function" && U instanceof Set ? U.size : l.isObject(U) && !(U instanceof L.SafeString) ? l.keys(U).length : U.length : 0;
          }
          g.length = C;
          function P(A) {
            if (l.isString(A))
              return A.split("");
            if (l.isObject(A))
              return l._entries(A || {}).map(function(U) {
                var x = U[0], q = U[1];
                return {
                  key: x,
                  value: q
                };
              });
            if (l.isArray(A))
              return A;
            throw new l.TemplateError("list filter: type not iterable");
          }
          g.list = P;
          function y(A) {
            return A = s(A, ""), A.toLowerCase();
          }
          g.lower = y;
          function O(A) {
            return A == null ? "" : L.copySafeness(A, A.replace(/\r\n|\n/g, `<br />
`));
          }
          g.nl2br = O;
          function V(A) {
            return A[Math.floor(Math.random() * A.length)];
          }
          g.random = V;
          function E(A) {
            function U(x, q, oo) {
              q === void 0 && (q = "truthy");
              var eo = this, po = eo.env.getTest(q);
              return l.toArray(x).filter(function(so) {
                return po.call(eo, so, oo) === A;
              });
            }
            return U;
          }
          g.reject = E(!1);
          function S(A, U) {
            return A.filter(function(x) {
              return !x[U];
            });
          }
          g.rejectattr = S, g.select = E(!0);
          function T(A, U) {
            return A.filter(function(x) {
              return !!x[U];
            });
          }
          g.selectattr = T;
          function H(A, U, x, q) {
            var oo = A;
            if (U instanceof RegExp)
              return A.replace(U, x);
            typeof q > "u" && (q = -1);
            var eo = "";
            if (typeof U == "number")
              U = "" + U;
            else if (typeof U != "string")
              return A;
            if (typeof A == "number" && (A = "" + A), typeof A != "string" && !(A instanceof L.SafeString))
              return A;
            if (U === "")
              return eo = x + A.split("").join(x) + x, L.copySafeness(A, eo);
            var po = A.indexOf(U);
            if (q === 0 || po === -1)
              return A;
            for (var so = 0, uo = 0; po > -1 && (q === -1 || uo < q); )
              eo += A.substring(so, po) + x, so = po + U.length, uo++, po = A.indexOf(U, so);
            return so < A.length && (eo += A.substring(so)), L.copySafeness(oo, eo);
          }
          g.replace = H;
          function I(A) {
            var U;
            return l.isString(A) ? U = P(A) : U = l.map(A, function(x) {
              return x;
            }), U.reverse(), l.isString(A) ? L.copySafeness(A, U.join("")) : U;
          }
          g.reverse = I;
          function M(A, U, x) {
            U = U || 0;
            var q = Math.pow(10, U), oo;
            return x === "ceil" ? oo = Math.ceil : x === "floor" ? oo = Math.floor : oo = Math.round, oo(A * q) / q;
          }
          g.round = M;
          function B(A, U, x) {
            for (var q = Math.floor(A.length / U), oo = A.length % U, eo = [], po = 0, so = 0; so < U; so++) {
              var uo = po + so * q;
              so < oo && po++;
              var to = po + (so + 1) * q, go = A.slice(uo, to);
              x && so >= oo && go.push(x), eo.push(go);
            }
            return eo;
          }
          g.slice = B;
          function G(A, U, x) {
            return x === void 0 && (x = 0), U && (A = l.map(A, function(q) {
              return q[U];
            })), x + A.reduce(function(q, oo) {
              return q + oo;
            }, 0);
          }
          g.sum = G, g.sort = L.makeMacro(["value", "reverse", "case_sensitive", "attribute"], [], function(A, U, x, q) {
            var oo = this, eo = l.map(A, function(so) {
              return so;
            }), po = l.getAttrGetter(q);
            return eo.sort(function(so, uo) {
              var to = q ? po(so) : so, go = q ? po(uo) : uo;
              if (oo.env.opts.throwOnUndefined && q && (to === void 0 || go === void 0))
                throw new TypeError('sort: attribute "' + q + '" resolved to undefined');
              return !x && l.isString(to) && l.isString(go) && (to = to.toLowerCase(), go = go.toLowerCase()), to < go ? U ? 1 : -1 : to > go ? U ? -1 : 1 : 0;
            }), eo;
          });
          function N(A) {
            return L.copySafeness(A, A);
          }
          g.string = N;
          function R(A, U) {
            A = s(A, "");
            var x = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi, q = W(A.replace(x, "")), oo = "";
            return U ? oo = q.replace(/^ +| +$/gm, "").replace(/ +/g, " ").replace(/(\r\n)/g, `
`).replace(/\n\n\n+/g, `

`) : oo = q.replace(/\s+/gi, " "), L.copySafeness(A, oo);
          }
          g.striptags = R;
          function Z(A) {
            A = s(A, "");
            var U = A.split(" ").map(function(x) {
              return m(x);
            });
            return L.copySafeness(A, U.join(" "));
          }
          g.title = Z;
          function W(A) {
            return L.copySafeness(A, A.replace(/^\s*|\s*$/g, ""));
          }
          g.trim = W;
          function D(A, U, x, q) {
            var oo = A;
            if (A = s(A, ""), U = U || 255, A.length <= U)
              return A;
            if (x)
              A = A.substring(0, U);
            else {
              var eo = A.lastIndexOf(" ", U);
              eo === -1 && (eo = U), A = A.substring(0, eo);
            }
            return A += q ?? "...", L.copySafeness(oo, A);
          }
          g.truncate = D;
          function z(A) {
            return A = s(A, ""), A.toUpperCase();
          }
          g.upper = z;
          function J(A) {
            var U = encodeURIComponent;
            if (l.isString(A))
              return U(A);
            var x = l.isArray(A) ? A : l._entries(A);
            return x.map(function(q) {
              var oo = q[0], eo = q[1];
              return U(oo) + "=" + U(eo);
            }).join("&");
          }
          g.urlencode = J;
          var Q = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/, $ = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i, K = /^https?:\/\/.*$/, X = /^www\./, Y = /\.(?:org|net|com)(?:\:|\/|$)/;
          function ao(A, U, x) {
            v(U) && (U = 1 / 0);
            var q = x === !0 ? ' rel="nofollow"' : "", oo = A.split(/(\s+)/).filter(function(eo) {
              return eo && eo.length;
            }).map(function(eo) {
              var po = eo.match(Q), so = po ? po[1] : eo, uo = so.substr(0, U);
              return K.test(so) ? '<a href="' + so + '"' + q + ">" + uo + "</a>" : X.test(so) ? '<a href="http://' + so + '"' + q + ">" + uo + "</a>" : $.test(so) ? '<a href="mailto:' + so + '">' + so + "</a>" : Y.test(so) ? '<a href="http://' + so + '"' + q + ">" + uo + "</a>" : eo;
            });
            return oo.join("");
          }
          g.urlize = ao;
          function lo(A) {
            A = s(A, "");
            var U = A ? A.match(/\w+/g) : null;
            return U ? U.length : null;
          }
          g.wordcount = lo;
          function ro(A, U) {
            var x = parseFloat(A);
            return v(x) ? U : x;
          }
          g.float = ro;
          var io = L.makeMacro(["value", "default", "base"], [], function(A, U, x) {
            x === void 0 && (x = 10);
            var q = parseInt(A, x);
            return v(q) ? U : q;
          });
          g.int = io, g.d = g.default, g.e = g.escape;
        },
        /* 13 */
        /***/
        function(a, e, o) {
          var l = typeof Reflect == "object" ? Reflect : null, L = l && typeof l.apply == "function" ? l.apply : function(P, y, O) {
            return Function.prototype.apply.call(P, y, O);
          }, g;
          l && typeof l.ownKeys == "function" ? g = l.ownKeys : Object.getOwnPropertySymbols ? g = function(P) {
            return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
          } : g = function(P) {
            return Object.getOwnPropertyNames(P);
          };
          function s(P) {
            console && console.warn && console.warn(P);
          }
          var v = Number.isNaN || function(P) {
            return P !== P;
          };
          function b() {
            b.init.call(this);
          }
          a.exports = b, a.exports.once = j, b.EventEmitter = b, b.prototype._events = void 0, b.prototype._eventsCount = 0, b.prototype._maxListeners = void 0;
          var m = 10;
          function i(P) {
            if (typeof P != "function")
              throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof P);
          }
          Object.defineProperty(b, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
              return m;
            },
            set: function(P) {
              if (typeof P != "number" || P < 0 || v(P))
                throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + P + ".");
              m = P;
            }
          }), b.init = function() {
            (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
          }, b.prototype.setMaxListeners = function(P) {
            if (typeof P != "number" || P < 0 || v(P))
              throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
            return this._maxListeners = P, this;
          };
          function h(P) {
            return P._maxListeners === void 0 ? b.defaultMaxListeners : P._maxListeners;
          }
          b.prototype.getMaxListeners = function() {
            return h(this);
          }, b.prototype.emit = function(P) {
            for (var y = [], O = 1; O < arguments.length; O++) y.push(arguments[O]);
            var V = P === "error", E = this._events;
            if (E !== void 0)
              V = V && E.error === void 0;
            else if (!V)
              return !1;
            if (V) {
              var S;
              if (y.length > 0 && (S = y[0]), S instanceof Error)
                throw S;
              var T = new Error("Unhandled error." + (S ? " (" + S.message + ")" : ""));
              throw T.context = S, T;
            }
            var H = E[P];
            if (H === void 0)
              return !1;
            if (typeof H == "function")
              L(H, this, y);
            else
              for (var I = H.length, M = k(H, I), O = 0; O < I; ++O)
                L(M[O], this, y);
            return !0;
          };
          function c(P, y, O, V) {
            var E, S, T;
            if (i(O), S = P._events, S === void 0 ? (S = P._events = /* @__PURE__ */ Object.create(null), P._eventsCount = 0) : (S.newListener !== void 0 && (P.emit(
              "newListener",
              y,
              O.listener ? O.listener : O
            ), S = P._events), T = S[y]), T === void 0)
              T = S[y] = O, ++P._eventsCount;
            else if (typeof T == "function" ? T = S[y] = V ? [O, T] : [T, O] : V ? T.unshift(O) : T.push(O), E = h(P), E > 0 && T.length > E && !T.warned) {
              T.warned = !0;
              var H = new Error("Possible EventEmitter memory leak detected. " + T.length + " " + String(y) + " listeners added. Use emitter.setMaxListeners() to increase limit");
              H.name = "MaxListenersExceededWarning", H.emitter = P, H.type = y, H.count = T.length, s(H);
            }
            return P;
          }
          b.prototype.addListener = function(P, y) {
            return c(this, P, y, !1);
          }, b.prototype.on = b.prototype.addListener, b.prototype.prependListener = function(P, y) {
            return c(this, P, y, !0);
          };
          function u() {
            if (!this.fired)
              return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
          }
          function t(P, y, O) {
            var V = { fired: !1, wrapFn: void 0, target: P, type: y, listener: O }, E = u.bind(V);
            return E.listener = O, V.wrapFn = E, E;
          }
          b.prototype.once = function(P, y) {
            return i(y), this.on(P, t(this, P, y)), this;
          }, b.prototype.prependOnceListener = function(P, y) {
            return i(y), this.prependListener(P, t(this, P, y)), this;
          }, b.prototype.removeListener = function(P, y) {
            var O, V, E, S, T;
            if (i(y), V = this._events, V === void 0)
              return this;
            if (O = V[P], O === void 0)
              return this;
            if (O === y || O.listener === y)
              --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete V[P], V.removeListener && this.emit("removeListener", P, O.listener || y));
            else if (typeof O != "function") {
              for (E = -1, S = O.length - 1; S >= 0; S--)
                if (O[S] === y || O[S].listener === y) {
                  T = O[S].listener, E = S;
                  break;
                }
              if (E < 0)
                return this;
              E === 0 ? O.shift() : f(O, E), O.length === 1 && (V[P] = O[0]), V.removeListener !== void 0 && this.emit("removeListener", P, T || y);
            }
            return this;
          }, b.prototype.off = b.prototype.removeListener, b.prototype.removeAllListeners = function(P) {
            var y, O, V;
            if (O = this._events, O === void 0)
              return this;
            if (O.removeListener === void 0)
              return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : O[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete O[P]), this;
            if (arguments.length === 0) {
              var E = Object.keys(O), S;
              for (V = 0; V < E.length; ++V)
                S = E[V], S !== "removeListener" && this.removeAllListeners(S);
              return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
            }
            if (y = O[P], typeof y == "function")
              this.removeListener(P, y);
            else if (y !== void 0)
              for (V = y.length - 1; V >= 0; V--)
                this.removeListener(P, y[V]);
            return this;
          };
          function p(P, y, O) {
            var V = P._events;
            if (V === void 0)
              return [];
            var E = V[y];
            return E === void 0 ? [] : typeof E == "function" ? O ? [E.listener || E] : [E] : O ? F(E) : k(E, E.length);
          }
          b.prototype.listeners = function(P) {
            return p(this, P, !0);
          }, b.prototype.rawListeners = function(P) {
            return p(this, P, !1);
          }, b.listenerCount = function(P, y) {
            return typeof P.listenerCount == "function" ? P.listenerCount(y) : n.call(P, y);
          }, b.prototype.listenerCount = n;
          function n(P) {
            var y = this._events;
            if (y !== void 0) {
              var O = y[P];
              if (typeof O == "function")
                return 1;
              if (O !== void 0)
                return O.length;
            }
            return 0;
          }
          b.prototype.eventNames = function() {
            return this._eventsCount > 0 ? g(this._events) : [];
          };
          function k(P, y) {
            for (var O = new Array(y), V = 0; V < y; ++V)
              O[V] = P[V];
            return O;
          }
          function f(P, y) {
            for (; y + 1 < P.length; y++)
              P[y] = P[y + 1];
            P.pop();
          }
          function F(P) {
            for (var y = new Array(P.length), O = 0; O < y.length; ++O)
              y[O] = P[O].listener || P[O];
            return y;
          }
          function j(P, y) {
            return new Promise(function(O, V) {
              function E(T) {
                P.removeListener(y, S), V(T);
              }
              function S() {
                typeof P.removeListener == "function" && P.removeListener("error", E), O([].slice.call(arguments));
              }
              C(P, y, S, { once: !0 }), y !== "error" && w(P, E, { once: !0 });
            });
          }
          function w(P, y, O) {
            typeof P.on == "function" && C(P, "error", y, O);
          }
          function C(P, y, O, V) {
            if (typeof P.on == "function")
              V.once ? P.once(y, O) : P.on(y, O);
            else if (typeof P.addEventListener == "function")
              P.addEventListener(y, function E(S) {
                V.once && P.removeEventListener(y, E), O(S);
              });
            else
              throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof P);
          }
        },
        /* 14 */
        /***/
        function(a, e, o) {
          var l = o(2).SafeString;
          function L(V) {
            return typeof V == "function";
          }
          e.callable = L;
          function g(V) {
            return V !== void 0;
          }
          e.defined = g;
          function s(V, E) {
            return V % E === 0;
          }
          e.divisibleby = s;
          function v(V) {
            return V instanceof l;
          }
          e.escaped = v;
          function b(V, E) {
            return V === E;
          }
          e.equalto = b, e.eq = e.equalto, e.sameas = e.equalto;
          function m(V) {
            return V % 2 === 0;
          }
          e.even = m;
          function i(V) {
            return !V;
          }
          e.falsy = i;
          function h(V, E) {
            return V >= E;
          }
          e.ge = h;
          function c(V, E) {
            return V > E;
          }
          e.greaterthan = c, e.gt = e.greaterthan;
          function u(V, E) {
            return V <= E;
          }
          e.le = u;
          function t(V, E) {
            return V < E;
          }
          e.lessthan = t, e.lt = e.lessthan;
          function p(V) {
            return V.toLowerCase() === V;
          }
          e.lower = p;
          function n(V, E) {
            return V !== E;
          }
          e.ne = n;
          function k(V) {
            return V === null;
          }
          e.null = k;
          function f(V) {
            return typeof V == "number";
          }
          e.number = f;
          function F(V) {
            return V % 2 === 1;
          }
          e.odd = F;
          function j(V) {
            return typeof V == "string";
          }
          e.string = j;
          function w(V) {
            return !!V;
          }
          e.truthy = w;
          function C(V) {
            return V === void 0;
          }
          e.undefined = C;
          function P(V) {
            return V.toUpperCase() === V;
          }
          e.upper = P;
          function y(V) {
            return typeof Symbol < "u" ? !!V[Symbol.iterator] : Array.isArray(V) || typeof V == "string";
          }
          e.iterable = y;
          function O(V) {
            var E = V != null && typeof V == "object" && !Array.isArray(V);
            return Set ? E && !(V instanceof Set) : E;
          }
          e.mapping = O;
        },
        /* 15 */
        /***/
        function(a, e, o) {
          function l(s) {
            var v = -1;
            return {
              current: null,
              reset: function() {
                v = -1, this.current = null;
              },
              next: function() {
                return v++, v >= s.length && (v = 0), this.current = s[v], this.current;
              }
            };
          }
          function L(s) {
            s = s || ",";
            var v = !0;
            return function() {
              var b = v ? "" : s;
              return v = !1, b;
            };
          }
          function g() {
            return {
              range: function(s, v, b) {
                typeof v > "u" ? (v = s, s = 0, b = 1) : b || (b = 1);
                var m = [];
                if (b > 0)
                  for (var i = s; i < v; i += b)
                    m.push(i);
                else
                  for (var h = s; h > v; h += b)
                    m.push(h);
                return m;
              },
              cycler: function() {
                return l(Array.prototype.slice.call(arguments));
              },
              joiner: function(s) {
                return L(s);
              }
            };
          }
          a.exports = g;
        },
        /* 16 */
        /***/
        function(a, e, o) {
          var l = o(0);
          a.exports = function(L, g) {
            function s(v, b) {
              if (this.name = v, this.path = v, this.defaultEngine = b.defaultEngine, this.ext = l.extname(v), !this.ext && !this.defaultEngine)
                throw new Error("No default engine was specified and no extension was provided.");
              this.ext || (this.name += this.ext = (this.defaultEngine[0] !== "." ? "." : "") + this.defaultEngine);
            }
            return s.prototype.render = function(v, b) {
              L.render(this.name, v, b);
            }, g.set("view", s), g.set("nunjucksEnv", L), L;
          };
        },
        /* 17 */
        /***/
        function(a, e, o) {
          function l() {
            var L = this.runtime, g = this.lib, s = this.compiler.Compiler, v = this.parser.Parser;
            this.nodes, this.lexer;
            var b = L.contextOrFrameLookup, m = L.memberLookup, i, h;
            s && (i = s.prototype.assertType), v && (h = v.prototype.parseAggregate);
            function c() {
              L.contextOrFrameLookup = b, L.memberLookup = m, s && (s.prototype.assertType = i), v && (v.prototype.parseAggregate = h);
            }
            L.contextOrFrameLookup = function(k, f, F) {
              var j = b.apply(this, arguments);
              if (j !== void 0)
                return j;
              switch (F) {
                case "True":
                  return !0;
                case "False":
                  return !1;
                case "None":
                  return null;
                default:
                  return;
              }
            };
            function u(k, f, F, j) {
              k = k || [], f === null && (f = j < 0 ? k.length - 1 : 0), F === null ? F = j < 0 ? -1 : k.length : F < 0 && (F += k.length), f < 0 && (f += k.length);
              for (var w = [], C = f; !(C < 0 || C > k.length || j > 0 && C >= F || j < 0 && C <= F); C += j)
                w.push(L.memberLookup(k, C));
              return w;
            }
            function t(k, f) {
              return Object.prototype.hasOwnProperty.call(k, f);
            }
            var p = {
              pop: function(k) {
                if (k === void 0)
                  return this.pop();
                if (k >= this.length || k < 0)
                  throw new Error("KeyError");
                return this.splice(k, 1);
              },
              append: function(k) {
                return this.push(k);
              },
              remove: function(k) {
                for (var f = 0; f < this.length; f++)
                  if (this[f] === k)
                    return this.splice(f, 1);
                throw new Error("ValueError");
              },
              count: function(k) {
                for (var f = 0, F = 0; F < this.length; F++)
                  this[F] === k && f++;
                return f;
              },
              index: function(k) {
                var f;
                if ((f = this.indexOf(k)) === -1)
                  throw new Error("ValueError");
                return f;
              },
              find: function(k) {
                return this.indexOf(k);
              },
              insert: function(k, f) {
                return this.splice(k, 0, f);
              }
            }, n = {
              items: function() {
                return g._entries(this);
              },
              values: function() {
                return g._values(this);
              },
              keys: function() {
                return g.keys(this);
              },
              get: function(k, f) {
                var F = this[k];
                return F === void 0 && (F = f), F;
              },
              has_key: function(k) {
                return t(this, k);
              },
              pop: function(k, f) {
                var F = this[k];
                if (F === void 0 && f !== void 0)
                  F = f;
                else {
                  if (F === void 0)
                    throw new Error("KeyError");
                  delete this[k];
                }
                return F;
              },
              popitem: function() {
                var k = g.keys(this);
                if (!k.length)
                  throw new Error("KeyError");
                var f = k[0], F = this[f];
                return delete this[f], [f, F];
              },
              setdefault: function(k, f) {
                return f === void 0 && (f = null), k in this || (this[k] = f), this[k];
              },
              update: function(k) {
                return g._assign(this, k), null;
              }
            };
            return n.iteritems = n.items, n.itervalues = n.values, n.iterkeys = n.keys, L.memberLookup = function(k, f, F) {
              return arguments.length === 4 ? u.apply(this, arguments) : (k = k || {}, g.isArray(k) && t(p, f) ? p[f].bind(k) : g.isObject(k) && t(n, f) ? n[f].bind(k) : m.apply(this, arguments));
            }, c;
          }
          a.exports = l;
        }
        /******/
      ])
    );
  });
})(ke);
var ze = ke.exports;
const xo = /* @__PURE__ */ Ke(ze);
if (!Le)
  var Le = {
    cwd: function() {
      return "/";
    }
  };
function Oo(d) {
  if (typeof d != "string")
    throw new TypeError("Path must be a string. Received " + d);
}
function se(d, r) {
  for (var a = "", e = -1, o = 0, l, L = 0; L <= d.length; ++L) {
    if (L < d.length)
      l = d.charCodeAt(L);
    else {
      if (l === 47)
        break;
      l = 47;
    }
    if (l === 47) {
      if (!(e === L - 1 || o === 1)) if (e !== L - 1 && o === 2) {
        if (a.length < 2 || a.charCodeAt(a.length - 1) !== 46 || a.charCodeAt(a.length - 2) !== 46) {
          if (a.length > 2) {
            for (var g = a.length - 1, s = g; s >= 0 && a.charCodeAt(s) !== 47; --s)
              ;
            if (s !== g) {
              s === -1 ? a = "" : a = a.slice(0, s), e = L, o = 0;
              continue;
            }
          } else if (a.length === 2 || a.length === 1) {
            a = "", e = L, o = 0;
            continue;
          }
        }
        r && (a.length > 0 ? a += "/.." : a = "..");
      } else
        a.length > 0 ? a += "/" + d.slice(e + 1, L) : a = d.slice(e + 1, L);
      e = L, o = 0;
    } else l === 46 && o !== -1 ? ++o : o = -1;
  }
  return a;
}
function $e(d, r) {
  var a = r.dir || r.root, e = r.base || (r.name || "") + (r.ext || "");
  return a ? a === r.root ? a + e : a + d + e : e;
}
var Mo = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var d = "", r = !1, a, e = arguments.length - 1; e >= -1 && !r; e--) {
      var o;
      e >= 0 ? o = arguments[e] : (a === void 0 && (a = Le.cwd()), o = a), Oo(o), o.length !== 0 && (d = o + "/" + d, r = o.charCodeAt(0) === 47);
    }
    return d = se(d, !r), r ? d.length > 0 ? "/" + d : "/" : d.length > 0 ? d : ".";
  },
  normalize: function(d) {
    if (Oo(d), d.length === 0)
      return ".";
    var r = d.charCodeAt(0) === 47, a = d.charCodeAt(d.length - 1) === 47;
    return d = se(d, !r), d.length === 0 && !r && (d = "."), d.length > 0 && a && (d += "/"), r ? "/" + d : d;
  },
  isAbsolute: function(d) {
    return Oo(d), d.length > 0 && d.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var d, r = 0; r < arguments.length; ++r) {
      var a = arguments[r];
      Oo(a), a.length > 0 && (d === void 0 ? d = a : d += "/" + a);
    }
    return d === void 0 ? "." : Mo.normalize(d);
  },
  relative: function(d, r) {
    if (Oo(d), Oo(r), d === r || (d = Mo.resolve(d), r = Mo.resolve(r), d === r))
      return "";
    for (var a = 1; a < d.length && d.charCodeAt(a) === 47; ++a)
      ;
    for (var e = d.length, o = e - a, l = 1; l < r.length && r.charCodeAt(l) === 47; ++l)
      ;
    for (var L = r.length, g = L - l, s = o < g ? o : g, v = -1, b = 0; b <= s; ++b) {
      if (b === s) {
        if (g > s) {
          if (r.charCodeAt(l + b) === 47)
            return r.slice(l + b + 1);
          if (b === 0)
            return r.slice(l + b);
        } else o > s && (d.charCodeAt(a + b) === 47 ? v = b : b === 0 && (v = 0));
        break;
      }
      var m = d.charCodeAt(a + b), i = r.charCodeAt(l + b);
      if (m !== i)
        break;
      m === 47 && (v = b);
    }
    var h = "";
    for (b = a + v + 1; b <= e; ++b)
      (b === e || d.charCodeAt(b) === 47) && (h.length === 0 ? h += ".." : h += "/..");
    return h.length > 0 ? h + r.slice(l + v) : (l += v, r.charCodeAt(l) === 47 && ++l, r.slice(l));
  },
  _makeLong: function(d) {
    return d;
  },
  dirname: function(d) {
    if (Oo(d), d.length === 0)
      return ".";
    for (var r = d.charCodeAt(0), a = r === 47, e = -1, o = !0, l = d.length - 1; l >= 1; --l)
      if (r = d.charCodeAt(l), r === 47) {
        if (!o) {
          e = l;
          break;
        }
      } else
        o = !1;
    return e === -1 ? a ? "/" : "." : a && e === 1 ? "//" : d.slice(0, e);
  },
  basename: function(d, r) {
    if (r !== void 0 && typeof r != "string")
      throw new TypeError('"ext" argument must be a string');
    Oo(d);
    var a = 0, e = -1, o = !0, l;
    if (r !== void 0 && r.length > 0 && r.length <= d.length) {
      if (r.length === d.length && r === d)
        return "";
      var L = r.length - 1, g = -1;
      for (l = d.length - 1; l >= 0; --l) {
        var s = d.charCodeAt(l);
        if (s === 47) {
          if (!o) {
            a = l + 1;
            break;
          }
        } else
          g === -1 && (o = !1, g = l + 1), L >= 0 && (s === r.charCodeAt(L) ? --L === -1 && (e = l) : (L = -1, e = g));
      }
      return a === e ? e = g : e === -1 && (e = d.length), d.slice(a, e);
    } else {
      for (l = d.length - 1; l >= 0; --l)
        if (d.charCodeAt(l) === 47) {
          if (!o) {
            a = l + 1;
            break;
          }
        } else e === -1 && (o = !1, e = l + 1);
      return e === -1 ? "" : d.slice(a, e);
    }
  },
  extname: function(d) {
    Oo(d);
    for (var r = -1, a = 0, e = -1, o = !0, l = 0, L = d.length - 1; L >= 0; --L) {
      var g = d.charCodeAt(L);
      if (g === 47) {
        if (!o) {
          a = L + 1;
          break;
        }
        continue;
      }
      e === -1 && (o = !1, e = L + 1), g === 46 ? r === -1 ? r = L : l !== 1 && (l = 1) : r !== -1 && (l = -1);
    }
    return r === -1 || e === -1 || // We saw a non-dot character immediately before the dot
    l === 0 || // The (right-most) trimmed path component is exactly '..'
    l === 1 && r === e - 1 && r === a + 1 ? "" : d.slice(r, e);
  },
  format: function(d) {
    if (d === null || typeof d != "object")
      throw new TypeError(
        'Parameter "pathObject" must be an object, not ' + typeof d
      );
    return $e("/", d);
  },
  parse: function(d) {
    Oo(d);
    var r = { root: "", dir: "", base: "", ext: "", name: "" };
    if (d.length === 0)
      return r;
    var a = d.charCodeAt(0), e = a === 47, o;
    e ? (r.root = "/", o = 1) : o = 0;
    for (var l = -1, L = 0, g = -1, s = !0, v = d.length - 1, b = 0; v >= o; --v) {
      if (a = d.charCodeAt(v), a === 47) {
        if (!s) {
          L = v + 1;
          break;
        }
        continue;
      }
      g === -1 && (s = !1, g = v + 1), a === 46 ? l === -1 ? l = v : b !== 1 && (b = 1) : l !== -1 && (b = -1);
    }
    return l === -1 || g === -1 || // We saw a non-dot character immediately before the dot
    b === 0 || // The (right-most) trimmed path component is exactly '..'
    b === 1 && l === g - 1 && l === L + 1 ? g !== -1 && (L === 0 && e ? r.base = r.name = d.slice(1, g) : r.base = r.name = d.slice(L, g)) : (L === 0 && e ? (r.name = d.slice(1, l), r.base = d.slice(1, g)) : (r.name = d.slice(L, l), r.base = d.slice(L, g)), r.ext = d.slice(l, g)), L > 0 ? r.dir = d.slice(0, L - 1) : e && (r.dir = "/"), r;
  },
  sep: "/",
  delimiter: ":",
  posix: null
}, re = Mo;
xo.PrecompiledLoader.prototype.resolve = function(d, r) {
  return re.resolve(re.dirname(d), r).replace(/^\//, "");
};
function Ze(d) {
  return function() {
    const r = Array.from(arguments), a = r.pop();
    Promise.resolve(d(...r)).then(
      (e) => a(null, e),
      (e) => a(e, null)
    );
  };
}
const xe = new xo.PrecompiledLoader(), qe = {};
function Je(d, r) {
  const a = new xo.Environment(xe);
  for (const [e, o] of Object.entries(qe))
    a.addFilter(e, Ze(o), !0);
  return new Promise(
    (e, o) => a.render(d, r, (l, L) => {
      l ? o(l) : e(L);
    })
  );
}
function ko(d, r) {
  let a = (e) => Je(d, e);
  for (const e of r)
    a = e(a);
  return a;
}
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/accordion/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/accordion/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukAccordion"), a.setVariable("govukAccordion", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/accordion/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/accordion/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../../macros/i18n.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/accordion/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukI18nAttributes"))
                  var k = n.govukI18nAttributes;
                else {
                  l(new Error("cannot import 'govukI18nAttributes'"));
                  return;
                }
                a.setVariable("govukI18nAttributes", k);
                var f = o.makeMacro(
                  ["params", "item", "index"],
                  [],
                  function(P, y, O, V) {
                    var E = e;
                    e = new o.Frame(), V = V || {}, Object.prototype.hasOwnProperty.call(V, "caller") && e.set("caller", V.caller), e.set("params", P), e.set("item", y), e.set("index", O);
                    var S = "", T;
                    return T = o.memberLookup(P, "headingLevel") ? o.memberLookup(P, "headingLevel") : 2, e.set("headingLevel", T, !0), e.topLevel && a.setVariable("headingLevel", T), e.topLevel && a.addExport("headingLevel", T), S += `
  <div class="govuk-accordion__section`, o.memberLookup(y, "expanded") && (S += " govuk-accordion__section--expanded"), S += `">
    <div class="govuk-accordion__section-header">
      <h`, S += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), S += ` class="govuk-accordion__section-heading">
        <span class="govuk-accordion__section-button" id="`, S += o.suppressValue(o.memberLookup(P, "id"), r.opts.autoescape), S += "-heading-", S += o.suppressValue(O, r.opts.autoescape), S += `">
          `, S += o.suppressValue(o.memberLookup(o.memberLookup(y, "heading"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(y, "heading"), "html"))), 8) : o.memberLookup(o.memberLookup(y, "heading"), "text"), r.opts.autoescape), S += `
        </span>
      </h`, S += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), S += `>
      `, (o.memberLookup(o.memberLookup(y, "summary"), "html") || o.memberLookup(o.memberLookup(y, "summary"), "text")) && (S += `
      <div class="govuk-accordion__section-summary govuk-body" id="`, S += o.suppressValue(o.memberLookup(P, "id"), r.opts.autoescape), S += "-summary-", S += o.suppressValue(O, r.opts.autoescape), S += `">
        `, S += o.suppressValue(o.memberLookup(o.memberLookup(y, "summary"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(y, "summary"), "html"))), 8) : o.memberLookup(o.memberLookup(y, "summary"), "text"), r.opts.autoescape), S += `
      </div>
      `), S += `
    </div>
    <div id="`, S += o.suppressValue(o.memberLookup(P, "id"), r.opts.autoescape), S += "-content-", S += o.suppressValue(O, r.opts.autoescape), S += `" class="govuk-accordion__section-content">
    `, o.memberLookup(o.memberLookup(y, "content"), "html") ? (S += `
      `, S += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(y, "content"), "html"))), 6), r.opts.autoescape), S += `
    `) : o.memberLookup(o.memberLookup(y, "content"), "text") && (S += `
      <p class="govuk-body">
        `, S += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, o.memberLookup(o.memberLookup(y, "content"), "text")), 8), r.opts.autoescape), S += `
      </p>
    `), S += `
    </div>
  </div>
`, e = E, new o.SafeString(S);
                  }
                );
                a.setVariable("_accordionItem", f), s += '<div class="govuk-accordion', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '" data-module="govuk-accordion" id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += '"', s += o.suppressValue((L = 31, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "hide-all-sections", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hideAllSectionsText") }])), r.opts.autoescape), s += o.suppressValue((L = 36, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "hide-section", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hideSectionText") }])), r.opts.autoescape), s += o.suppressValue((L = 41, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "hide-section-aria-label", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hideSectionAriaLabelText") }])), r.opts.autoescape), s += o.suppressValue((L = 46, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "show-all-sections", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showAllSectionsText") }])), r.opts.autoescape), s += o.suppressValue((L = 51, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "show-section", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showSectionText") }])), r.opts.autoescape), s += o.suppressValue((L = 56, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "show-section-aria-label", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showSectionAriaLabelText") }])), r.opts.autoescape), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "rememberExpanded") !== o.contextOrFrameLookup(a, e, "undefined") && (s += ' data-remember-expanded="', s += o.suppressValue(r.getFilter("escape").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "rememberExpanded")), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 62, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, e = e.push();
                var F = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
                if (F) {
                  F = o.fromIterator(F);
                  for (var j = F.length, w = 0; w < F.length; w++) {
                    var C = F[w];
                    e.set("item", C), e.set("loop.index", w + 1), e.set("loop.index0", w), e.set("loop.revindex", j - w), e.set("loop.revindex0", j - w - 1), e.set("loop.first", w === 0), e.set("loop.last", w === j - 1), e.set("loop.length", j), s += `
    `, C && (s += o.suppressValue((L = 64, g = 34, o.callWrap(f, "_accordionItem", a, [o.contextOrFrameLookup(a, e, "params"), C, o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index")])), r.opts.autoescape)), s += `
  `;
                  }
                }
                e = e.pop(), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/back-link/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/back-link/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukBackLink"), a.setVariable("govukBackLink", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/back-link/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/back-link/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += '<a href="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href"), "#", !0), r.opts.autoescape), s += '" class="govuk-back-link', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html")) : r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), "Back", !0), r.opts.autoescape), s += `</a>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/breadcrumbs/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/breadcrumbs/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukBreadcrumbs"), a.setVariable("govukBreadcrumbs", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/breadcrumbs/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/breadcrumbs/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u;
            if (u = "govuk-breadcrumbs", e.set("classNames", u, !0), e.topLevel && a.setVariable("classNames", u), e.topLevel && a.addExport("classNames", u), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes")) {
              s += `
  `;
              var t;
              t = o.contextOrFrameLookup(a, e, "classNames") + " " + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), e.set("classNames", t, !0), e.topLevel && a.setVariable("classNames", t), e.topLevel && a.addExport("classNames", t), s += `
`;
            }
            if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "collapseOnMobile")) {
              s += `
  `;
              var p;
              p = o.contextOrFrameLookup(a, e, "classNames") + " govuk-breadcrumbs--collapse-on-mobile", e.set("classNames", p, !0), e.topLevel && a.setVariable("classNames", p), e.topLevel && a.addExport("classNames", p), s += `
`;
            }
            s += '<nav class="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "classNames"), r.opts.autoescape), s += '"', s += o.suppressValue((L = 13, g = 49, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += ' aria-label="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "labelText"), "Breadcrumb"), r.opts.autoescape), s += `">
  <ol class="govuk-breadcrumbs__list">
`, e = e.push();
            var n = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
            if (n) {
              n = o.fromIterator(n);
              for (var k = n.length, f = 0; f < n.length; f++) {
                var F = n[f];
                e.set("item", F), e.set("loop.index", f + 1), e.set("loop.index0", f), e.set("loop.revindex", k - f), e.set("loop.revindex0", k - f - 1), e.set("loop.first", f === 0), e.set("loop.last", f === k - 1), e.set("loop.length", k), s += `
  `, o.memberLookup(F, "href") ? (s += `
    <li class="govuk-breadcrumbs__list-item">
      <a class="govuk-breadcrumbs__link" href="`, s += o.suppressValue(o.memberLookup(F, "href"), r.opts.autoescape), s += '"', s += o.suppressValue((L = 18, g = 83, o.callWrap(c, "govukAttributes", a, [o.memberLookup(F, "attributes")])), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(F, "html") ? r.getFilter("safe").call(a, o.memberLookup(F, "html")) : o.memberLookup(F, "text"), r.opts.autoescape), s += `</a>
    </li>
  `) : (s += `
    <li class="govuk-breadcrumbs__list-item" aria-current="page">`, s += o.suppressValue(o.memberLookup(F, "html") ? r.getFilter("safe").call(a, o.memberLookup(F, "html")) : o.memberLookup(F, "text"), r.opts.autoescape), s += `</li>
  `), s += `
`;
              }
            }
            e = e.pop(), s += `
  </ol>
</nav>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/button/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/button/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukButton"), a.setVariable("govukButton", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/button/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/button/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u;
            if (u = "govuk-button", e.set("classNames", u, !0), e.topLevel && a.setVariable("classNames", u), e.topLevel && a.addExport("classNames", u), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes")) {
              s += `
  `;
              var t;
              t = o.contextOrFrameLookup(a, e, "classNames") + " " + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), e.set("classNames", t, !0), e.topLevel && a.setVariable("classNames", t), e.topLevel && a.addExport("classNames", t), s += `
`;
            }
            if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "isStartButton")) {
              s += `
  `;
              var p;
              p = o.contextOrFrameLookup(a, e, "classNames") + " govuk-button--start", e.set("classNames", p, !0), e.topLevel && a.setVariable("classNames", p), e.topLevel && a.addExport("classNames", p), s += `
`;
            }
            if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "element")) {
              s += `
  `;
              var n;
              n = r.getFilter("lower").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "element")), e.set("element", n, !0), e.topLevel && a.setVariable("element", n), e.topLevel && a.addExport("element", n), s += `
`;
            } else {
              if (s += `
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href")) {
                s += `
    `;
                var k;
                k = "a", e.set("element", k, !0), e.topLevel && a.setVariable("element", k), e.topLevel && a.addExport("element", k), s += `
  `;
              } else {
                s += `
    `;
                var f;
                f = "button", e.set("element", f, !0), e.topLevel && a.setVariable("element", f), e.topLevel && a.addExport("element", f), s += `
  `;
              }
              s += `
`;
            }
            var F = o.makeMacro(
              [],
              [],
              function(C) {
                var P = e;
                e = new o.Frame(), C = C || {}, Object.prototype.hasOwnProperty.call(C, "caller") && e.set("caller", C.caller);
                var y = "";
                return y += `
  <svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"/>
  </svg>`, e = P, new o.SafeString(y);
              }
            );
            a.setVariable("_startIcon", F);
            var j;
            j = function() {
              var C = "";
              return C += ' class="', C += o.suppressValue(o.contextOrFrameLookup(a, e, "classNames"), r.opts.autoescape), C += '" data-module="govuk-button"', C += o.suppressValue((L = 35, g = 99, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (C += ' id="', C += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), C += '"'), C;
            }(), e.set("commonAttributes", j, !0), e.topLevel && a.setVariable("commonAttributes", j), e.topLevel && a.addExport("commonAttributes", j);
            var w;
            w = function() {
              var C = "";
              return o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name") && (C += ' name="', C += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), r.opts.autoescape), C += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disabled") && (C += ' disabled aria-disabled="true"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "preventDoubleClick") !== o.contextOrFrameLookup(a, e, "undefined") && (C += ' data-prevent-double-click="', C += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "preventDoubleClick"), r.opts.autoescape), C += '"'), C;
            }(), e.set("buttonAttributes", w, !0), e.topLevel && a.setVariable("buttonAttributes", w), e.topLevel && a.addExport("buttonAttributes", w), o.contextOrFrameLookup(a, e, "element") == "a" ? (s += `
<a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href") : "#", r.opts.autoescape), s += '" role="button" draggable="false"', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += `>
  `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 2) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "isStartButton") ? r.getFilter("safe").call(a, (L = 46, g = 16, o.callWrap(F, "_startIcon", a, []))) : "", r.opts.autoescape), s += `
</a>`) : o.contextOrFrameLookup(a, e, "element") == "button" ? (s += `
<button`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value") && (s += ' value="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value"), r.opts.autoescape), s += '"'), s += ' type="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") : "submit", r.opts.autoescape), s += '"', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "buttonAttributes")), r.opts.autoescape), s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += `>
  `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 2) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "isStartButton") ? r.getFilter("safe").call(a, (L = 52, g = 16, o.callWrap(F, "_startIcon", a, []))) : "", r.opts.autoescape), s += `
</button>`) : o.contextOrFrameLookup(a, e, "element") == "input" && (s += `
<input value="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += '" type="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") : "submit", r.opts.autoescape), s += '"', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "buttonAttributes")), r.opts.autoescape), s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += ">"), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/character-count/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/character-count/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukCharacterCount"), a.setVariable("govukCharacterCount", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/character-count/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/character-count/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../../macros/i18n.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/character-count/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukI18nAttributes"))
                  var k = n.govukI18nAttributes;
                else {
                  l(new Error("cannot import 'govukI18nAttributes'"));
                  return;
                }
                a.setVariable("govukI18nAttributes", k), s += `
`, r.getTemplate("../textarea/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/character-count/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukTextarea"))
                      var C = w.govukTextarea;
                    else {
                      l(new Error("cannot import 'govukTextarea'"));
                      return;
                    }
                    a.setVariable("govukTextarea", C), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/character-count/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukHint"))
                          var E = V.govukHint;
                        else {
                          l(new Error("cannot import 'govukHint'"));
                          return;
                        }
                        a.setVariable("govukHint", E);
                        var S;
                        S = !o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "maxwords") && !o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "maxlength"), e.set("hasNoLimit", S, !0), e.topLevel && a.setVariable("hasNoLimit", S), e.topLevel && a.addExport("hasNoLimit", S);
                        var T;
                        T = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "maxwords") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "maxlength"), e.set("textareaDescriptionLength", T, !0), e.topLevel && a.setVariable("textareaDescriptionLength", T), e.topLevel && a.addExport("textareaDescriptionLength", T);
                        var H;
                        H = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "textareaDescriptionText") || "You can enter up to %{count} " + (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "maxwords") ? "words" : "characters"), e.set("textareaDescriptionText", H, !0), e.topLevel && a.setVariable("textareaDescriptionText", H), e.topLevel && a.addExport("textareaDescriptionText", H);
                        var I;
                        I = o.contextOrFrameLookup(a, e, "hasNoLimit") ? "" : r.getFilter("replace").call(a, o.contextOrFrameLookup(a, e, "textareaDescriptionText"), "%{count}", o.contextOrFrameLookup(a, e, "textareaDescriptionLength")), e.set("textareaDescriptionTextNoLimit", I, !0), e.topLevel && a.setVariable("textareaDescriptionTextNoLimit", I), e.topLevel && a.addExport("textareaDescriptionTextNoLimit", I);
                        var M;
                        M = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("id", M, !0), e.topLevel && a.setVariable("id", M), e.topLevel && a.addExport("id", M);
                        var B;
                        B = function() {
                          var K = "";
                          return K += `
`, K += o.suppressValue(r.getFilter("trim").call(a, (L = 17, g = 12, o.callWrap(E, "govukHint", a, [{ text: o.contextOrFrameLookup(a, e, "textareaDescriptionTextNoLimit"), id: o.contextOrFrameLookup(a, e, "id") + "-info", classes: "govuk-character-count__message" + (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "countMessage"), "classes") ? " " + o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "countMessage"), "classes") : "") }]))), r.opts.autoescape), K += `
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput") && (K += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html") ? r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html"))) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "text"), r.opts.autoescape), K += `
`), K;
                        }(), e.set("countMessageHtml", B, !0), e.topLevel && a.setVariable("countMessageHtml", B), e.topLevel && a.addExport("countMessageHtml", B);
                        var G;
                        G = function() {
                          var K = "";
                          return K += o.suppressValue((L = 28, g = 21, o.callWrap(c, "govukAttributes", a, [{ "data-module": "govuk-character-count", "data-maxlength": { value: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "maxlength"), optional: !0 }, "data-threshold": { value: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "threshold"), optional: !0 }, "data-maxwords": { value: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "maxwords"), optional: !0 } }])), r.opts.autoescape), o.contextOrFrameLookup(a, e, "hasNoLimit") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "textareaDescriptionText") && (K += o.suppressValue((L = 51, g = 27, o.callWrap(k, "govukI18nAttributes", a, [{ key: "textarea-description", messages: { other: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "textareaDescriptionText") } }])), r.opts.autoescape)), K += o.suppressValue((L = 57, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "characters-under-limit", messages: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "charactersUnderLimitText") }])), r.opts.autoescape), K += o.suppressValue((L = 62, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "characters-at-limit", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "charactersAtLimitText") }])), r.opts.autoescape), K += o.suppressValue((L = 67, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "characters-over-limit", messages: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "charactersOverLimitText") }])), r.opts.autoescape), K += o.suppressValue((L = 72, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "words-under-limit", messages: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "wordsUnderLimitText") }])), r.opts.autoescape), K += o.suppressValue((L = 77, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "words-at-limit", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "wordsAtLimitText") }])), r.opts.autoescape), K += o.suppressValue((L = 82, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "words-over-limit", messages: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "wordsOverLimitText") }])), r.opts.autoescape), K;
                        }(), e.set("attributesHtml", G, !0), e.topLevel && a.setVariable("attributesHtml", G), e.topLevel && a.addExport("attributesHtml", G), e = e.push();
                        var N = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes");
                        if (N) {
                          N = o.fromIterator(N);
                          var R;
                          if (o.isArray(N)) {
                            var Z = N.length;
                            for (R = 0; R < N.length; R++) {
                              var W = N[R][0];
                              e.set("[object Object]", N[R][0]);
                              var D = N[R][1];
                              e.set("[object Object]", N[R][1]), e.set("loop.index", R + 1), e.set("loop.index0", R), e.set("loop.revindex", Z - R), e.set("loop.revindex0", Z - R - 1), e.set("loop.first", R === 0), e.set("loop.last", R === Z - 1), e.set("loop.length", Z), s += `
  `;
                              var z;
                              z = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, W) + '="' + r.getFilter("escape").call(a, D) + '"', e.set("attributesHtml", z, !0), e.topLevel && a.setVariable("attributesHtml", z), e.topLevel && a.addExport("attributesHtml", z), s += `
`;
                            }
                          } else {
                            R = -1;
                            var Z = o.keys(N).length;
                            for (var J in N) {
                              R++;
                              var Q = N[J];
                              e.set("name", J), e.set("value", Q), e.set("loop.index", R + 1), e.set("loop.index0", R), e.set("loop.revindex", Z - R), e.set("loop.revindex0", Z - R - 1), e.set("loop.first", R === 0), e.set("loop.last", R === Z - 1), e.set("loop.length", Z), s += `
  `;
                              var $;
                              $ = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, J) + '="' + r.getFilter("escape").call(a, Q) + '"', e.set("attributesHtml", $, !0), e.topLevel && a.setVariable("attributesHtml", $), e.topLevel && a.addExport("attributesHtml", $), s += `
`;
                            }
                          }
                        }
                        e = e.pop(), s += o.suppressValue(r.getFilter("trim").call(a, (L = 93, g = 16, o.callWrap(C, "govukTextarea", a, [{ id: o.contextOrFrameLookup(a, e, "id"), name: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), describedBy: o.contextOrFrameLookup(a, e, "id") + "-info", rows: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "rows"), spellcheck: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "spellcheck"), value: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value"), formGroup: { classes: "govuk-character-count" + (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") ? " " + o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") : ""), attributes: o.contextOrFrameLookup(a, e, "attributesHtml"), beforeInput: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), afterInput: { html: o.contextOrFrameLookup(a, e, "countMessageHtml") } }, classes: "govuk-js-character-count" + (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") ? " " + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") : ""), label: { html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "text"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "classes"), isPageHeading: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "isPageHeading"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "attributes"), for: o.contextOrFrameLookup(a, e, "id") }, hint: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), errorMessage: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), attributes: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes") }]))), r.opts.autoescape), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/checkboxes/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/checkboxes/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukCheckboxes"), a.setVariable("govukCheckboxes", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/checkboxes/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/checkboxes/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../error-message/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/checkboxes/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukErrorMessage"))
                  var k = n.govukErrorMessage;
                else {
                  l(new Error("cannot import 'govukErrorMessage'"));
                  return;
                }
                a.setVariable("govukErrorMessage", k), s += `
`, r.getTemplate("../fieldset/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/checkboxes/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukFieldset"))
                      var C = w.govukFieldset;
                    else {
                      l(new Error("cannot import 'govukFieldset'"));
                      return;
                    }
                    a.setVariable("govukFieldset", C), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/checkboxes/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukHint"))
                          var E = V.govukHint;
                        else {
                          l(new Error("cannot import 'govukHint'"));
                          return;
                        }
                        a.setVariable("govukHint", E), s += `
`, r.getTemplate("../label/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/checkboxes/template.njk", !1, function(S, T) {
                          if (S) {
                            l(S);
                            return;
                          }
                          T.getExported(function(H, I) {
                            if (H) {
                              l(H);
                              return;
                            }
                            if (Object.prototype.hasOwnProperty.call(I, "govukLabel"))
                              var M = I.govukLabel;
                            else {
                              l(new Error("cannot import 'govukLabel'"));
                              return;
                            }
                            a.setVariable("govukLabel", M);
                            var B;
                            B = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("idPrefix", B, !0), e.topLevel && a.setVariable("idPrefix", B), e.topLevel && a.addExport("idPrefix", B);
                            var G;
                            if (G = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") : "", e.set("describedBy", G, !0), e.topLevel && a.setVariable("describedBy", G), e.topLevel && a.addExport("describedBy", G), s += `
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "describedBy")) {
                              s += `
  `;
                              var N;
                              N = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "describedBy"), e.set("describedBy", N, !0), e.topLevel && a.setVariable("describedBy", N), e.topLevel && a.addExport("describedBy", N), s += `
`;
                            }
                            var R;
                            R = !!o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), e.set("hasFieldset", R, !0), e.topLevel && a.setVariable("hasFieldset", R), e.topLevel && a.addExport("hasFieldset", R);
                            var Z = o.makeMacro(
                              ["params", "item", "index"],
                              [],
                              function(D, z, J, Q) {
                                var $ = e;
                                e = new o.Frame(), Q = Q || {}, Object.prototype.hasOwnProperty.call(Q, "caller") && e.set("caller", Q.caller), e.set("params", D), e.set("item", z), e.set("index", J);
                                var K = "", X;
                                X = o.memberLookup(z, "id") ? o.memberLookup(z, "id") : o.contextOrFrameLookup(a, e, "idPrefix") + (J > 1 ? "-" + J : ""), e.set("itemId", X, !0), e.topLevel && a.setVariable("itemId", X), e.topLevel && a.addExport("itemId", X), K += `
  `;
                                var Y;
                                Y = o.memberLookup(z, "name") ? o.memberLookup(z, "name") : o.memberLookup(D, "name"), e.set("itemName", Y, !0), e.topLevel && a.setVariable("itemName", Y), e.topLevel && a.addExport("itemName", Y), K += `
  `;
                                var ao;
                                if (ao = "conditional-" + o.contextOrFrameLookup(a, e, "itemId"), e.set("conditionalId", ao, !0), e.topLevel && a.setVariable("conditionalId", ao), e.topLevel && a.addExport("conditionalId", ao), o.memberLookup(z, "divider"))
                                  K += `
    <div class="govuk-checkboxes__divider">`, K += o.suppressValue(o.memberLookup(z, "divider"), r.opts.autoescape), K += `</div>
  `;
                                else {
                                  K += `
    `;
                                  var lo;
                                  lo = r.getFilter("default").call(a, o.memberLookup(z, "checked"), o.memberLookup(D, "values") ? o.inOperator(o.memberLookup(z, "value"), o.memberLookup(D, "values")) && o.memberLookup(z, "checked") != !1 : !1, !0), e.set("isChecked", lo, !0), e.topLevel && a.setVariable("isChecked", lo), e.topLevel && a.addExport("isChecked", lo), K += `
    `;
                                  var ro;
                                  ro = o.memberLookup(o.memberLookup(z, "hint"), "text") || o.memberLookup(o.memberLookup(z, "hint"), "html") ? !0 : "", e.set("hasHint", ro, !0), e.topLevel && a.setVariable("hasHint", ro), e.topLevel && a.addExport("hasHint", ro), K += `
    `;
                                  var io;
                                  io = o.contextOrFrameLookup(a, e, "hasHint") ? o.contextOrFrameLookup(a, e, "itemId") + "-item-hint" : "", e.set("itemHintId", io, !0), e.topLevel && a.setVariable("itemHintId", io), e.topLevel && a.addExport("itemHintId", io), K += `
    `;
                                  var A;
                                  A = o.contextOrFrameLookup(a, e, "hasFieldset") ? "" : o.contextOrFrameLookup(a, e, "describedBy"), e.set("itemDescribedBy", A, !0), e.topLevel && a.setVariable("itemDescribedBy", A), e.topLevel && a.addExport("itemDescribedBy", A), K += `
    `;
                                  var U;
                                  U = r.getFilter("trim").call(a, o.contextOrFrameLookup(a, e, "itemDescribedBy") + " " + o.contextOrFrameLookup(a, e, "itemHintId")), e.set("itemDescribedBy", U, !0), e.topLevel && a.setVariable("itemDescribedBy", U), e.topLevel && a.addExport("itemDescribedBy", U), K += `
    <div class="govuk-checkboxes__item">
      <input class="govuk-checkboxes__input" id="`, K += o.suppressValue(o.contextOrFrameLookup(a, e, "itemId"), r.opts.autoescape), K += '" name="', K += o.suppressValue(o.contextOrFrameLookup(a, e, "itemName"), r.opts.autoescape), K += '" type="checkbox" value="', K += o.suppressValue(o.memberLookup(z, "value"), r.opts.autoescape), K += '"', K += o.suppressValue(o.contextOrFrameLookup(a, e, "isChecked") ? " checked" : "", r.opts.autoescape), K += o.suppressValue(o.memberLookup(z, "disabled") ? " disabled" : "", r.opts.autoescape), o.memberLookup(o.memberLookup(z, "conditional"), "html") && (K += ' data-aria-controls="', K += o.suppressValue(o.contextOrFrameLookup(a, e, "conditionalId"), r.opts.autoescape), K += '"'), o.memberLookup(z, "behaviour") && (K += ' data-behaviour="', K += o.suppressValue(o.memberLookup(z, "behaviour"), r.opts.autoescape), K += '"'), o.contextOrFrameLookup(a, e, "itemDescribedBy") && (K += ' aria-describedby="', K += o.suppressValue(o.contextOrFrameLookup(a, e, "itemDescribedBy"), r.opts.autoescape), K += '"'), K += o.suppressValue((L = 41, g = 27, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(z, "attributes")])), r.opts.autoescape), K += `>
      `, K += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 42, g = 19, o.callWrap(o.contextOrFrameLookup(a, e, "govukLabel"), "govukLabel", a, [{ html: o.memberLookup(z, "html"), text: o.memberLookup(z, "text"), classes: "govuk-checkboxes__label" + (o.memberLookup(o.memberLookup(z, "label"), "classes") ? " " + o.memberLookup(o.memberLookup(z, "label"), "classes") : ""), attributes: o.memberLookup(o.memberLookup(z, "label"), "attributes"), for: o.contextOrFrameLookup(a, e, "itemId") }]))), 6), r.opts.autoescape), K += `
      `, o.contextOrFrameLookup(a, e, "hasHint") && (K += `
      `, K += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 50, g = 18, o.callWrap(o.contextOrFrameLookup(a, e, "govukHint"), "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "itemHintId"), classes: "govuk-checkboxes__hint" + (o.memberLookup(o.memberLookup(z, "hint"), "classes") ? " " + o.memberLookup(o.memberLookup(z, "hint"), "classes") : ""), attributes: o.memberLookup(o.memberLookup(z, "hint"), "attributes"), html: o.memberLookup(o.memberLookup(z, "hint"), "html"), text: o.memberLookup(o.memberLookup(z, "hint"), "text") }]))), 6), r.opts.autoescape), K += `
      `), K += `
    </div>
    `, o.memberLookup(o.memberLookup(z, "conditional"), "html") && (K += `
    <div class="govuk-checkboxes__conditional`, o.contextOrFrameLookup(a, e, "isChecked") || (K += " govuk-checkboxes__conditional--hidden"), K += '" id="', K += o.suppressValue(o.contextOrFrameLookup(a, e, "conditionalId"), r.opts.autoescape), K += `">
      `, K += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(z, "conditional"), "html"))), r.opts.autoescape), K += `
    </div>
    `), K += `
  `;
                                }
                                return K += `
`, e = $, new o.SafeString(K);
                              }
                            );
                            a.setVariable("_checkboxItem", Z);
                            var W;
                            W = function() {
                              var D = "";
                              if (D += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint")) {
                                D += `
  `;
                                var z;
                                z = o.contextOrFrameLookup(a, e, "idPrefix") + "-hint", e.set("hintId", z, !0), e.topLevel && a.setVariable("hintId", z), e.topLevel && a.addExport("hintId", z), D += `
  `;
                                var J;
                                J = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "hintId") : o.contextOrFrameLookup(a, e, "hintId"), e.set("describedBy", J, !0), e.topLevel && a.setVariable("describedBy", J), e.topLevel && a.addExport("describedBy", J), D += `
  `, D += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 72, g = 14, o.callWrap(E, "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "hintId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "text") }]))), 2), r.opts.autoescape), D += `
`;
                              }
                              if (D += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                                D += `
  `;
                                var Q;
                                Q = o.contextOrFrameLookup(a, e, "idPrefix") + "-error", e.set("errorId", Q, !0), e.topLevel && a.setVariable("errorId", Q), e.topLevel && a.addExport("errorId", Q), D += `
  `;
                                var $;
                                $ = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "errorId") : o.contextOrFrameLookup(a, e, "errorId"), e.set("describedBy", $, !0), e.topLevel && a.setVariable("describedBy", $), e.topLevel && a.addExport("describedBy", $), D += `
  `, D += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 83, g = 22, o.callWrap(k, "govukErrorMessage", a, [{ id: o.contextOrFrameLookup(a, e, "errorId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "text"), visuallyHiddenText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "visuallyHiddenText") }]))), 2), r.opts.autoescape), D += `
`;
                              }
                              D += `
  <div class="govuk-checkboxes`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (D += " ", D += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), D += '"', D += o.suppressValue((L = 93, g = 23, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), D += ` data-module="govuk-checkboxes">
    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs") && (D += `
    `, D += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "html"))), 4) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "text"), r.opts.autoescape), D += `
    `), D += `
    `, e = e.push();
                              var K = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
                              if (K) {
                                K = o.fromIterator(K);
                                for (var X = K.length, Y = 0; Y < K.length; Y++) {
                                  var ao = K[Y];
                                  e.set("item", ao), e.set("loop.index", Y + 1), e.set("loop.index0", Y), e.set("loop.revindex", X - Y), e.set("loop.revindex0", X - Y - 1), e.set("loop.first", Y === 0), e.set("loop.last", Y === X - 1), e.set("loop.length", X), D += `
      `, ao && (D += o.suppressValue((L = 99, g = 25, o.callWrap(Z, "_checkboxItem", a, [o.contextOrFrameLookup(a, e, "params"), ao, o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index")])), r.opts.autoescape)), D += `
    `;
                                }
                              }
                              return e = e.pop(), D += `
    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs") && (D += `
    `, D += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "html"))), 4) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "text"), r.opts.autoescape), D += `
    `), D += `
  </div>
`, D;
                            }(), e.set("innerHtml", W, !0), e.topLevel && a.setVariable("innerHtml", W), e.topLevel && a.addExport("innerHtml", W), s += '<div class="govuk-form-group', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-form-group--error"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 109, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes")])), r.opts.autoescape), s += `>
`, o.contextOrFrameLookup(a, e, "hasFieldset") ? (s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 111, g = 18, o.callWrap(C, "govukFieldset", a, [{ describedBy: o.contextOrFrameLookup(a, e, "describedBy"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "attributes"), legend: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "legend"), html: r.getFilter("trim").call(a, o.contextOrFrameLookup(a, e, "innerHtml")) }]))), 2), r.opts.autoescape), s += `
`) : (s += `
  `, s += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "innerHtml"))), r.opts.autoescape), s += `
`), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/cookie-banner/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/cookie-banner/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukCookieBanner"), a.setVariable("govukCookieBanner", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/cookie-banner/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/cookie-banner/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../button/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/cookie-banner/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukButton"))
                  var k = n.govukButton;
                else {
                  l(new Error("cannot import 'govukButton'"));
                  return;
                }
                a.setVariable("govukButton", k), s += '<div class="govuk-cookie-banner', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '" data-nosnippet role="region" aria-label="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "ariaLabel"), "Cookie banner", !0), r.opts.autoescape), s += '"', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hidden") && (s += " hidden"), s += o.suppressValue((L = 5, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, e = e.push();
                var f = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "messages");
                if (f) {
                  f = o.fromIterator(f);
                  for (var F = f.length, j = 0; j < f.length; j++) {
                    var w = f[j];
                    if (e.set("message", w), e.set("loop.index", j + 1), e.set("loop.index0", j), e.set("loop.revindex", F - j), e.set("loop.revindex0", F - j - 1), e.set("loop.first", j === 0), e.set("loop.last", j === F - 1), e.set("loop.length", F), s += `
  <div class="govuk-cookie-banner__message`, o.memberLookup(w, "classes") && (s += " ", s += o.suppressValue(o.memberLookup(w, "classes"), r.opts.autoescape)), s += ' govuk-width-container"', o.memberLookup(w, "role") && (s += ' role="', s += o.suppressValue(o.memberLookup(w, "role"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 8, g = 23, o.callWrap(c, "govukAttributes", a, [o.memberLookup(w, "attributes")])), r.opts.autoescape), o.memberLookup(w, "hidden") && (s += " hidden"), s += `>

    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        `, (o.memberLookup(w, "headingHtml") || o.memberLookup(w, "headingText")) && (s += `
        <h2 class="govuk-cookie-banner__heading govuk-heading-m">
          `, s += o.suppressValue(o.memberLookup(w, "headingHtml") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(w, "headingHtml"))), 10) : o.memberLookup(w, "headingText"), r.opts.autoescape), s += `
        </h2>
        `), s += `
        <div class="govuk-cookie-banner__content">
          `, o.memberLookup(w, "html") ? (s += `
          `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(w, "html"))), 10), r.opts.autoescape), s += `
          `) : o.memberLookup(w, "text") && (s += `
          <p class="govuk-body">`, s += o.suppressValue(o.memberLookup(w, "text"), r.opts.autoescape), s += `</p>
          `), s += `
        </div>
      </div>
    </div>

    `, o.memberLookup(w, "actions")) {
                      s += `
    <div class="govuk-button-group">
    `, e = e.push();
                      var C = o.memberLookup(w, "actions");
                      if (C) {
                        C = o.fromIterator(C);
                        for (var P = C.length, y = 0; y < C.length; y++) {
                          var O = C[y];
                          e.set("action", O), e.set("loop.index", y + 1), e.set("loop.index0", y), e.set("loop.revindex", P - y), e.set("loop.revindex0", P - y - 1), e.set("loop.first", y === 0), e.set("loop.last", y === P - 1), e.set("loop.length", P), s += `
      `;
                          var V;
                          V = function() {
                            var E = "";
                            return E += `
        `, !o.memberLookup(O, "href") || o.memberLookup(O, "type") == "button" ? (E += `
          `, E += o.suppressValue((L = 33, g = 24, o.callWrap(k, "govukButton", a, [{ text: o.memberLookup(O, "text"), type: o.memberLookup(O, "type") ? o.memberLookup(O, "type") : "button", name: o.memberLookup(O, "name"), value: o.memberLookup(O, "value"), classes: o.memberLookup(O, "classes"), href: o.memberLookup(O, "href"), attributes: o.memberLookup(O, "attributes") }])), r.opts.autoescape), E += `
        `) : (E += `
          <a class="govuk-link`, o.memberLookup(O, "classes") && (E += " ", E += o.suppressValue(o.memberLookup(O, "classes"), r.opts.autoescape)), E += '" href="', E += o.suppressValue(o.memberLookup(O, "href"), r.opts.autoescape), E += '"', E += o.suppressValue((L = 44, g = 31, o.callWrap(c, "govukAttributes", a, [o.memberLookup(O, "attributes")])), r.opts.autoescape), E += ">", E += o.suppressValue(o.memberLookup(O, "text"), r.opts.autoescape), E += `</a>
        `), E;
                          }(), e.set("buttonHtml", V, !0), e.topLevel && a.setVariable("buttonHtml", V), e.topLevel && a.addExport("buttonHtml", V), s += `
      `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "buttonHtml"))), 6), r.opts.autoescape), s += `
    `;
                        }
                      }
                      e = e.pop(), s += `
    </div>
    `;
                    }
                    s += `

  </div>
  `;
                  }
                }
                e = e.pop(), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/date-input/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/date-input/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukDateInput"), a.setVariable("govukDateInput", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/date-input/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/date-input/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../error-message/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/date-input/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukErrorMessage"))
                  var k = n.govukErrorMessage;
                else {
                  l(new Error("cannot import 'govukErrorMessage'"));
                  return;
                }
                a.setVariable("govukErrorMessage", k), s += `
`, r.getTemplate("../fieldset/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/date-input/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukFieldset"))
                      var C = w.govukFieldset;
                    else {
                      l(new Error("cannot import 'govukFieldset'"));
                      return;
                    }
                    a.setVariable("govukFieldset", C), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/date-input/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukHint"))
                          var E = V.govukHint;
                        else {
                          l(new Error("cannot import 'govukHint'"));
                          return;
                        }
                        a.setVariable("govukHint", E), s += `
`, r.getTemplate("../input/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/date-input/template.njk", !1, function(S, T) {
                          if (S) {
                            l(S);
                            return;
                          }
                          T.getExported(function(H, I) {
                            if (H) {
                              l(H);
                              return;
                            }
                            if (Object.prototype.hasOwnProperty.call(I, "govukInput"))
                              var M = I.govukInput;
                            else {
                              l(new Error("cannot import 'govukInput'"));
                              return;
                            }
                            a.setVariable("govukInput", M);
                            var B;
                            B = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "describedBy") ? o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "describedBy") : "", e.set("describedBy", B, !0), e.topLevel && a.setVariable("describedBy", B), e.topLevel && a.addExport("describedBy", B);
                            var G;
                            if (G = !!o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), e.set("hasFieldset", G, !0), e.topLevel && a.setVariable("hasFieldset", G), e.topLevel && a.addExport("hasFieldset", G), r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items"))) {
                              s += `
  `;
                              var N;
                              N = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items"), e.set("dateInputItems", N, !0), e.topLevel && a.setVariable("dateInputItems", N), e.topLevel && a.addExport("dateInputItems", N), s += `
`;
                            } else {
                              s += `
  `;
                              var R;
                              R = [{ name: "day", classes: "govuk-input--width-2" }, { name: "month", classes: "govuk-input--width-2" }, { name: "year", classes: "govuk-input--width-4" }], e.set("dateInputItems", R, !0), e.topLevel && a.setVariable("dateInputItems", R), e.topLevel && a.addExport("dateInputItems", R), s += `
`;
                            }
                            var Z;
                            Z = function() {
                              var W = "";
                              if (W += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint")) {
                                W += `
  `;
                                var D;
                                D = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") + "-hint", e.set("hintId", D, !0), e.topLevel && a.setVariable("hintId", D), e.topLevel && a.addExport("hintId", D), W += `
  `;
                                var z;
                                z = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "hintId") : o.contextOrFrameLookup(a, e, "hintId"), e.set("describedBy", z, !0), e.topLevel && a.setVariable("describedBy", z), e.topLevel && a.addExport("describedBy", z), W += `
  `, W += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 37, g = 14, o.callWrap(E, "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "hintId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "text") }]))), 2), r.opts.autoescape), W += `
`;
                              }
                              if (W += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                                W += `
  `;
                                var J;
                                J = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") + "-error", e.set("errorId", J, !0), e.topLevel && a.setVariable("errorId", J), e.topLevel && a.addExport("errorId", J), W += `
  `;
                                var Q;
                                Q = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "errorId") : o.contextOrFrameLookup(a, e, "errorId"), e.set("describedBy", Q, !0), e.topLevel && a.setVariable("describedBy", Q), e.topLevel && a.addExport("describedBy", Q), W += `
  `, W += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 48, g = 22, o.callWrap(k, "govukErrorMessage", a, [{ id: o.contextOrFrameLookup(a, e, "errorId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "text"), visuallyHiddenText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "visuallyHiddenText") }]))), 2), r.opts.autoescape), W += `
`;
                              }
                              W += `
  <div class="govuk-date-input`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (W += " ", W += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), W += '"', W += o.suppressValue((L = 58, g = 23, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (W += ' id="', W += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), W += '"'), W += `>
    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs") && (W += `
    `, W += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "html"))), 4) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "text"), r.opts.autoescape), W += `
    `), W += `
    `, e = e.push();
                              var $ = o.contextOrFrameLookup(a, e, "dateInputItems");
                              if ($) {
                                $ = o.fromIterator($);
                                for (var K = $.length, X = 0; X < $.length; X++) {
                                  var Y = $[X];
                                  e.set("item", Y), e.set("loop.index", X + 1), e.set("loop.index0", X), e.set("loop.revindex", K - X), e.set("loop.revindex0", K - X - 1), e.set("loop.first", X === 0), e.set("loop.last", X === K - 1), e.set("loop.length", K), W += `
    <div class="govuk-date-input__item">
      `, W += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 65, g = 19, o.callWrap(M, "govukInput", a, [{ label: { text: o.memberLookup(Y, "label") ? o.memberLookup(Y, "label") : r.getFilter("capitalize").call(a, o.memberLookup(Y, "name")), classes: "govuk-date-input__label" }, id: o.memberLookup(Y, "id") ? o.memberLookup(Y, "id") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") + "-" + o.memberLookup(Y, "name"), classes: "govuk-date-input__input " + (o.memberLookup(Y, "classes") ? o.memberLookup(Y, "classes") : ""), name: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "namePrefix") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "namePrefix") + "-" + o.memberLookup(Y, "name") : o.memberLookup(Y, "name"), value: o.memberLookup(Y, "value"), type: "text", inputmode: o.memberLookup(Y, "inputmode") ? o.memberLookup(Y, "inputmode") : "numeric", autocomplete: o.memberLookup(Y, "autocomplete"), pattern: o.memberLookup(Y, "pattern"), attributes: o.memberLookup(Y, "attributes") }]))), 6), r.opts.autoescape), W += `
    </div>
    `;
                                }
                              }
                              return e = e.pop(), W += `
    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs") && (W += `
    `, W += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "html"))), 4) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "text"), r.opts.autoescape), W += `
    `), W += `
  </div>
`, W;
                            }(), e.set("innerHtml", Z, !0), e.topLevel && a.setVariable("innerHtml", Z), e.topLevel && a.addExport("innerHtml", Z), s += '<div class="govuk-form-group', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-form-group--error"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 88, g = 191, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes")])), r.opts.autoescape), s += `>
`, o.contextOrFrameLookup(a, e, "hasFieldset") ? (s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 94, g = 18, o.callWrap(C, "govukFieldset", a, [{ describedBy: o.contextOrFrameLookup(a, e, "describedBy"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "classes"), role: "group", attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "attributes"), legend: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "legend"), html: r.getFilter("trim").call(a, o.contextOrFrameLookup(a, e, "innerHtml")) }]))), 2), r.opts.autoescape), s += `
`) : (s += `
  `, s += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "innerHtml"))), r.opts.autoescape), s += `
`), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/details/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/details/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukDetails"), a.setVariable("govukDetails", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/details/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/details/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += "<details", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (s += ' id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += '"'), s += ' class="govuk-details', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "open") ? " open" : "", r.opts.autoescape), s += `>
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "summaryHtml") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "summaryHtml"))), 6) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "summaryText"), r.opts.autoescape), s += `
    </span>
  </summary>
  <div class="govuk-details__text">
    `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "caller") ? (L = 11, g = 13, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, [])) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html")) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
  </div>
</details>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/error-message/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/error-message/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukErrorMessage"), a.setVariable("govukErrorMessage", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/error-message/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/error-message/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u;
            u = r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "visuallyHiddenText"), "Error"), e.set("visuallyHiddenText", u, !0), e.topLevel && a.setVariable("visuallyHiddenText", u), e.topLevel && a.addExport("visuallyHiddenText", u);
            var t;
            t = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 2) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), e.set("errorMessageText", t, !0), e.topLevel && a.setVariable("errorMessageText", t), e.topLevel && a.addExport("errorMessageText", t), s += "<p", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (s += ' id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += '"'), s += ' class="govuk-error-message', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 6, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, o.contextOrFrameLookup(a, e, "visuallyHiddenText") ? (s += `
  <span class="govuk-visually-hidden">`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "visuallyHiddenText"), r.opts.autoescape), s += ":</span> ", s += o.suppressValue(o.contextOrFrameLookup(a, e, "errorMessageText"), r.opts.autoescape), s += `
  `) : (s += `
  `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "errorMessageText"), r.opts.autoescape), s += `
  `), s += `
</p>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/error-summary/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/error-summary/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukErrorSummary"), a.setVariable("govukErrorSummary", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/error-summary/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/error-summary/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            if (a.setVariable("govukAttributes", c), s += '<div class="govuk-error-summary', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disableAutoFocus") !== o.contextOrFrameLookup(a, e, "undefined") && (s += ' data-disable-auto-focus="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disableAutoFocus"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 5, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += ' data-module="govuk-error-summary">', s += `
  <div role="alert">
    <h2 class="govuk-error-summary__title">
      `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHtml") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHtml"))), 6) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleText"), r.opts.autoescape), s += `
    </h2>
    <div class="govuk-error-summary__body">
      `, (o.contextOrFrameLookup(a, e, "caller") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "descriptionHtml") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "descriptionText")) && (s += `
      <p>
        `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "caller") ? (L = 15, g = 17, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, [])) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "descriptionHtml") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "descriptionHtml"))), 8) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "descriptionText"), r.opts.autoescape), s += `
      </p>
      `), s += `
      `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorList"))) {
              s += `
        <ul class="govuk-list govuk-error-summary__list">
        `, e = e.push();
              var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorList");
              if (u) {
                u = o.fromIterator(u);
                for (var t = u.length, p = 0; p < u.length; p++) {
                  var n = u[p];
                  e.set("item", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
          <li>
          `, o.memberLookup(n, "href") ? (s += `
            <a href="`, s += o.suppressValue(o.memberLookup(n, "href"), r.opts.autoescape), s += '"', s += o.suppressValue((L = 24, g = 33, o.callWrap(c, "govukAttributes", a, [o.memberLookup(n, "attributes")])), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(n, "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(n, "html"))), 12) : o.memberLookup(n, "text"), r.opts.autoescape), s += `</a>
          `) : (s += `
            `, s += o.suppressValue(o.memberLookup(n, "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(n, "html"))), 10) : o.memberLookup(n, "text"), r.opts.autoescape), s += `
          `), s += `
          </li>
        `;
                }
              }
              e = e.pop(), s += `
        </ul>
      `;
            }
            s += `
    </div>
  </div>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/exit-this-page/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/exit-this-page/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukExitThisPage"), a.setVariable("govukExitThisPage", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/exit-this-page/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/exit-this-page/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../button/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/exit-this-page/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukButton"))
                  var k = n.govukButton;
                else {
                  l(new Error("cannot import 'govukButton'"));
                  return;
                }
                a.setVariable("govukButton", k);
                var f;
                f = function() {
                  var F = "";
                  return F += `
  <span class="govuk-visually-hidden">Emergency</span> Exit this page
`, F;
                }(), e.set("defaultHtml", f, !0), e.topLevel && a.setVariable("defaultHtml", f), e.topLevel && a.addExport("defaultHtml", f), s += "<div", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (s += ' id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += '"'), s += ' class="govuk-exit-this-page', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '" data-module="govuk-exit-this-page"', s += o.suppressValue((L = 9, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "activatedText") && (s += ' data-i18n.activated="', s += o.suppressValue(r.getFilter("escape").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "activatedText")), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "timedOutText") && (s += ' data-i18n.timed-out="', s += o.suppressValue(r.getFilter("escape").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "timedOutText")), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pressTwoMoreTimesText") && (s += ' data-i18n.press-two-more-times="', s += o.suppressValue(r.getFilter("escape").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pressTwoMoreTimesText")), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pressOneMoreTimeText") && (s += ' data-i18n.press-one-more-time="', s += o.suppressValue(r.getFilter("escape").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pressOneMoreTimeText")), r.opts.autoescape), s += '"'), s += `
>
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 15, g = 16, o.callWrap(k, "govukButton", a, [{ html: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") : o.contextOrFrameLookup(a, e, "defaultHtml"), text: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), classes: "govuk-button--warning govuk-exit-this-page__button govuk-js-exit-this-page-button", href: r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "redirectUrl"), "https://www.bbc.co.uk/weather", !0), attributes: { rel: "nofollow noreferrer" } }]))), 2), r.opts.autoescape), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/fieldset/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/fieldset/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukFieldset"), a.setVariable("govukFieldset", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/fieldset/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/fieldset/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += '<fieldset class="govuk-fieldset', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "role") && (s += ' role="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "role"), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") && (s += ' aria-describedby="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 6, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "html") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "text")) && (s += `
  <legend class="govuk-fieldset__legend`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "classes"), r.opts.autoescape)), s += `">
  `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "isPageHeading") ? (s += `
    <h1 class="govuk-fieldset__heading">
      `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "html"))), 6) : o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "text"), r.opts.autoescape), s += `
    </h1>
  `) : (s += `
    `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "html"))), 4) : o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "legend"), "text"), r.opts.autoescape), s += `
  `), s += `
  </legend>
  `), s += `
`, o.contextOrFrameLookup(a, e, "caller") ? (s += o.suppressValue((L = 19, g = 11, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, [])), r.opts.autoescape), s += `
`) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") && (s += `
  `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html")), r.opts.autoescape), s += `
`), s += `
</fieldset>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/file-upload/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/file-upload/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukFileUpload"), a.setVariable("govukFileUpload", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/file-upload/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/file-upload/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../../macros/i18n.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/file-upload/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukI18nAttributes"))
                  var k = n.govukI18nAttributes;
                else {
                  l(new Error("cannot import 'govukI18nAttributes'"));
                  return;
                }
                a.setVariable("govukI18nAttributes", k), s += `
`, r.getTemplate("../error-message/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/file-upload/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukErrorMessage"))
                      var C = w.govukErrorMessage;
                    else {
                      l(new Error("cannot import 'govukErrorMessage'"));
                      return;
                    }
                    a.setVariable("govukErrorMessage", C), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/file-upload/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukHint"))
                          var E = V.govukHint;
                        else {
                          l(new Error("cannot import 'govukHint'"));
                          return;
                        }
                        a.setVariable("govukHint", E), s += `
`, r.getTemplate("../label/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/file-upload/template.njk", !1, function(S, T) {
                          if (S) {
                            l(S);
                            return;
                          }
                          T.getExported(function(H, I) {
                            if (H) {
                              l(H);
                              return;
                            }
                            if (Object.prototype.hasOwnProperty.call(I, "govukLabel"))
                              var M = I.govukLabel;
                            else {
                              l(new Error("cannot import 'govukLabel'"));
                              return;
                            }
                            a.setVariable("govukLabel", M);
                            var B;
                            B = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") : "", e.set("describedBy", B, !0), e.topLevel && a.setVariable("describedBy", B), e.topLevel && a.addExport("describedBy", B);
                            var G;
                            if (G = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("id", G, !0), e.topLevel && a.setVariable("id", G), e.topLevel && a.addExport("id", G), s += '<div class="govuk-form-group', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-form-group--error"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 12, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes")])), r.opts.autoescape), s += `>
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 13, g = 15, o.callWrap(M, "govukLabel", a, [{ html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "text"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "classes"), isPageHeading: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "isPageHeading"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "attributes"), for: o.contextOrFrameLookup(a, e, "id") }]))), 2), r.opts.autoescape), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint")) {
                              s += `
  `;
                              var N;
                              N = o.contextOrFrameLookup(a, e, "id") + "-hint", e.set("hintId", N, !0), e.topLevel && a.setVariable("hintId", N), e.topLevel && a.addExport("hintId", N), s += `
  `;
                              var R;
                              R = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "hintId") : o.contextOrFrameLookup(a, e, "hintId"), e.set("describedBy", R, !0), e.topLevel && a.setVariable("describedBy", R), e.topLevel && a.addExport("describedBy", R), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 24, g = 14, o.callWrap(E, "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "hintId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "text") }]))), 2), r.opts.autoescape), s += `
`;
                            }
                            if (s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                              s += `
  `;
                              var Z;
                              Z = o.contextOrFrameLookup(a, e, "id") + "-error", e.set("errorId", Z, !0), e.topLevel && a.setVariable("errorId", Z), e.topLevel && a.addExport("errorId", Z), s += `
  `;
                              var W;
                              W = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "errorId") : o.contextOrFrameLookup(a, e, "errorId"), e.set("describedBy", W, !0), e.topLevel && a.setVariable("describedBy", W), e.topLevel && a.addExport("describedBy", W), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 35, g = 22, o.callWrap(C, "govukErrorMessage", a, [{ id: o.contextOrFrameLookup(a, e, "errorId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "text"), visuallyHiddenText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "visuallyHiddenText") }]))), 2), r.opts.autoescape), s += `
`;
                            }
                            s += `
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput") && (s += `
  `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html"))), 2) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "text"), r.opts.autoescape), s += `
`), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "javascript") && (s += `
  <div
    class="govuk-drop-zone"
    data-module="govuk-file-upload"`, s += o.suppressValue((L = 51, g = 27, o.callWrap(k, "govukI18nAttributes", a, [{ key: "choose-files-button", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "chooseFilesButtonText") }])), r.opts.autoescape), s += o.suppressValue((L = 55, g = 27, o.callWrap(k, "govukI18nAttributes", a, [{ key: "no-file-chosen", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "noFileChosenText") }])), r.opts.autoescape), s += o.suppressValue((L = 59, g = 27, o.callWrap(k, "govukI18nAttributes", a, [{ key: "multiple-files-chosen", messages: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "multipleFilesChosenText") }])), r.opts.autoescape), s += o.suppressValue((L = 63, g = 27, o.callWrap(k, "govukI18nAttributes", a, [{ key: "drop-instruction", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "dropInstructionText") }])), r.opts.autoescape), s += o.suppressValue((L = 67, g = 27, o.callWrap(k, "govukI18nAttributes", a, [{ key: "entered-drop-zone", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "enteredDropZoneText") }])), r.opts.autoescape), s += o.suppressValue((L = 71, g = 27, o.callWrap(k, "govukI18nAttributes", a, [{ key: "left-drop-zone", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "leftDropZoneText") }])), r.opts.autoescape), s += `>
`), s += `
  <input class="govuk-file-upload`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-file-upload--error"), s += '" id="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "id"), r.opts.autoescape), s += '" name="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), r.opts.autoescape), s += '" type="file"', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value") && (s += ' value="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value"), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disabled") && (s += " disabled"), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "multiple") && (s += " multiple"), o.contextOrFrameLookup(a, e, "describedBy") && (s += ' aria-describedby="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "describedBy"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 82, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "javascript") && (s += `
  </div>
`), s += `
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput") && (s += `
  `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html"))), 2) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "text"), r.opts.autoescape), s += `
`), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/footer/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/footer/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukFooter"), a.setVariable("govukFooter", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/footer/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/footer/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            if (a.setVariable("govukAttributes", c), s += '<footer class="govuk-footer', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  <div class="govuk-width-container`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "containerClasses") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "containerClasses"), r.opts.autoescape)), s += `">
    `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation"))) {
              s += `
      <div class="govuk-footer__navigation">
        `, e = e.push();
              var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation");
              if (u) {
                u = o.fromIterator(u);
                for (var t = u.length, p = 0; p < u.length; p++) {
                  var n = u[p];
                  if (e.set("nav", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
          <div class="govuk-footer__section govuk-grid-column-`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(n, "width"), "full", !0), r.opts.autoescape), s += `">
            <h2 class="govuk-footer__heading govuk-heading-m">`, s += o.suppressValue(o.memberLookup(n, "title"), r.opts.autoescape), s += `</h2>
            `, r.getFilter("length").call(a, o.memberLookup(n, "items"))) {
                    s += `
              `;
                    var k;
                    k = o.memberLookup(n, "columns") ? "govuk-footer__list--columns-" + o.memberLookup(n, "columns") : "", e.set("listClasses", k, !0), e.topLevel && a.setVariable("listClasses", k), e.topLevel && a.addExport("listClasses", k), s += `
              <ul class="govuk-footer__list`, o.contextOrFrameLookup(a, e, "listClasses") && (s += " ", s += o.suppressValue(o.contextOrFrameLookup(a, e, "listClasses"), r.opts.autoescape)), s += `">
                `, e = e.push();
                    var f = o.memberLookup(n, "items");
                    if (f) {
                      f = o.fromIterator(f);
                      for (var F = f.length, j = 0; j < f.length; j++) {
                        var w = f[j];
                        e.set("item", w), e.set("loop.index", j + 1), e.set("loop.index0", j), e.set("loop.revindex", F - j), e.set("loop.revindex0", F - j - 1), e.set("loop.first", j === 0), e.set("loop.last", j === F - 1), e.set("loop.length", F), s += `
                  `, o.memberLookup(w, "href") && o.memberLookup(w, "text") && (s += `
                    <li class="govuk-footer__list-item">
                      <a class="govuk-footer__link" href="`, s += o.suppressValue(o.memberLookup(w, "href"), r.opts.autoescape), s += '"', s += o.suppressValue((L = 17, g = 43, o.callWrap(c, "govukAttributes", a, [o.memberLookup(w, "attributes")])), r.opts.autoescape), s += `>
                        `, s += o.suppressValue(o.memberLookup(w, "text"), r.opts.autoescape), s += `
                      </a>
                    </li>
                  `), s += `
                `;
                      }
                    }
                    e = e.pop(), s += `
              </ul>
            `;
                  }
                  s += `
          </div>
        `;
                }
              }
              e = e.pop(), s += `
      </div>
      <hr class="govuk-footer__section-break">
    `;
            }
            if (s += `
    <div class="govuk-footer__meta">
      <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
        `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta")) {
              if (s += `
        <h2 class="govuk-visually-hidden">`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "visuallyHiddenTitle"), "Support links", !0), r.opts.autoescape), s += `</h2>
        `, r.getFilter("length").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "items"))) {
                s += `
        <ul class="govuk-footer__inline-list">
        `, e = e.push();
                var C = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "items");
                if (C) {
                  C = o.fromIterator(C);
                  for (var P = C.length, y = 0; y < C.length; y++) {
                    var O = C[y];
                    e.set("item", O), e.set("loop.index", y + 1), e.set("loop.index0", y), e.set("loop.revindex", P - y), e.set("loop.revindex0", P - y - 1), e.set("loop.first", y === 0), e.set("loop.last", y === P - 1), e.set("loop.length", P), s += `
          <li class="govuk-footer__inline-list-item">
            <a class="govuk-footer__link" href="`, s += o.suppressValue(o.memberLookup(O, "href"), r.opts.autoescape), s += '"', s += o.suppressValue((L = 39, g = 33, o.callWrap(c, "govukAttributes", a, [o.memberLookup(O, "attributes")])), r.opts.autoescape), s += `>
              `, s += o.suppressValue(o.memberLookup(O, "text"), r.opts.autoescape), s += `
            </a>
          </li>
        `;
                  }
                }
                e = e.pop(), s += `
        </ul>
        `;
              }
              s += `
        `, (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "text") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "html")) && (s += `
        <div class="govuk-footer__meta-custom">
          `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "html"))), 10) : o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "meta"), "text"), r.opts.autoescape), s += `
        </div>
        `), s += `
        `;
            }
            s += `
        `, s += `<svg
          aria-hidden="true"
          focusable="false"
          class="govuk-footer__licence-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 483.2 195.7"
          height="17"
          width="41"
        >
          <path
            fill="currentColor"
            d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
          />
        </svg>
        <span class="govuk-footer__licence-description">
        `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "contentLicence"), "html") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "contentLicence"), "text") ? (s += `
          `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "contentLicence"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "contentLicence"), "html"))), 10) : o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "contentLicence"), "text"), r.opts.autoescape), s += `
        `) : s += `
          All content is available under the
          <a
            class="govuk-footer__link"
            href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
            rel="license"
          >Open Government Licence v3.0</a>, except where otherwise stated
        `, s += `
        </span>
      </div>
      <div class="govuk-footer__meta-item">
        <a
          class="govuk-footer__link govuk-footer__copyright-logo"
          href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
        >
        `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "copyright"), "html") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "copyright"), "text") ? (s += `
          `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "copyright"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "copyright"), "html"))), 10) : o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "copyright"), "text"), r.opts.autoescape), s += `
        `) : s += `
          © Crown copyright
        `, s += `
        </a>
      </div>
    </div>
  </div>
</footer>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/header/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/header/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukHeader"), a.setVariable("govukHeader", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/header/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/header/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u;
            u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonText") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonText") : "Menu", e.set("menuButtonText", u, !0), e.topLevel && a.setVariable("menuButtonText", u), e.topLevel && a.addExport("menuButtonText", u);
            var t;
            t = function() {
              var j = "";
              return j += `
<svg
  focusable="false"
  role="img"
  class="govuk-header__logotype"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 152 30"
  height="30"
  width="152"
  aria-label="GOV.UK"
>
  <title>GOV.UK</title>
  <path d="M6.7 12.2c1 .4 2.1-.1 2.5-1s-.1-2.1-1-2.5c-1-.4-2.1.1-2.5 1-.4 1 0 2.1 1 2.5m-4.3 2.5c1 .4 2.1-.1 2.5-1s-.1-2.1-1-2.5c-1-.4-2.1.1-2.5 1-.5 1 0 2.1 1 2.5m-1.3 4.8c1 .4 2.1-.1 2.5-1 .4-1-.1-2.1-1-2.5-1-.4-2.1.1-2.5 1-.4 1 0 2.1 1 2.5m10.4-5.8c1 .4 2.1-.1 2.5-1s-.1-2.1-1-2.5c-1-.4-2.1.1-2.5 1s0 2.1 1 2.5m17.4-1.5c-1 .4-2.1-.1-2.5-1s.1-2.1 1-2.5c1-.4 2.1.1 2.5 1 .5 1 0 2.1-1 2.5m4.3 2.5c-1 .4-2.1-.1-2.5-1s.1-2.1 1-2.5c1-.4 2.1.1 2.5 1 .5 1 0 2.1-1 2.5m1.3 4.8c-1 .4-2.1-.1-2.5-1-.4-1 .1-2.1 1-2.5 1-.4 2.1.1 2.5 1 .4 1 0 2.1-1 2.5m-10.4-5.8c-1 .4-2.1-.1-2.5-1s.1-2.1 1-2.5c1-.4 2.1.1 2.5 1s0 2.1-1 2.5m-5.3-4.9 2.4 1.3V6.5l-2.4.8c-.1-.1-.1-.2-.2-.2s1-3 1-3h-3.4l1 3c-.1.1-.2.1-.2.2-.1.1-2.4-.7-2.4-.7v3.5L17 8.8c-.1.1 0 .2.1.3l-1.4 4.2c-.1.2-.1.4-.1.7 0 1.1.8 2.1 1.9 2.2h.6C19.2 16 20 15.1 20 14c0-.2 0-.4-.1-.7l-1.4-4.2c.2-.1.3-.2.3-.3m-1 20.3c4.6 0 8.9.3 12.8.9 1.1-4.6 2.4-7.2 3.8-9.1l-2.6-.9c.3 1.3.3 1.9 0 2.8-.4-.4-.8-1.2-1.1-2.4l-1.2 4.2c.8-.5 1.4-.9 2-.9-1.2 2.6-2.7 3.2-3.6 3-1.2-.2-1.7-1.3-1.5-2.2.3-1.3 1.6-1.6 2.2-.1 1.2-2.4-.8-3.1-2.1-2.4 1.9-1.9 2.2-3.6.6-5.7-2.2 1.7-2.2 3.3-1.2 5.6-1.3-1.5-3.3-.7-2.5 1.7.9-1.4 2.1-.5 2 .8-.2 1.2-1.7 2.1-3.7 2-2.8-.2-3-2.2-3-3.7.7-.1 1.9.5 3 2l.4-4.4c-1.1 1.2-2.2 1.4-3.3 1.4.4-1.2 2.1-3.1 2.1-3.1h-5.5s1.8 2 2.1 3.1c-1.1 0-2.2-.3-3.3-1.4l.4 4.4c1.1-1.5 2.3-2.1 3-2-.1 1.6-.2 3.5-3 3.7-1.9.2-3.5-.8-3.7-2-.2-1.3 1-2.2 1.9-.8.7-2.4-1.3-3.1-2.6-1.7 1-2.3 1-4-1.2-5.6-1.6 2.1-1.3 3.8.6 5.7-1.3-.7-3.2 0-2.1 2.4.6-1.5 1.9-1.1 2.2.1.2.9-.4 1.9-1.5 2.2-1 .2-2.5-.5-3.7-3 .7 0 1.3.4 2 .9L5 20.4c-.3 1.2-.7 1.9-1.2 2.4-.3-.8-.2-1.5 0-2.8l-2.6.9C2.7 22.8 4 25.4 5.1 30c3.8-.5 8.2-.9 12.7-.9m30.5-11.5c0 .9.1 1.7.3 2.5.2.8.6 1.5 1 2.2.5.6 1 1.1 1.7 1.5.7.4 1.5.6 2.5.6.9 0 1.7-.1 2.3-.4s1.1-.7 1.5-1.1c.4-.4.6-.9.8-1.5.1-.5.2-1 .2-1.5v-.2h-5.3v-3.2h9.4V28H59v-2.5c-.3.4-.6.8-1 1.1-.4.3-.8.6-1.3.9-.5.2-1 .4-1.6.6s-1.2.2-1.8.2c-1.5 0-2.9-.3-4-.8-1.2-.6-2.2-1.3-3-2.3-.8-1-1.4-2.1-1.8-3.4-.3-1.4-.5-2.8-.5-4.3s.2-2.9.7-4.2c.5-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.6 2.6-.8 4.1-.8 1 0 1.9.1 2.8.3.9.2 1.7.6 2.4 1s1.4.9 1.9 1.5c.6.6 1 1.3 1.4 2l-3.7 2.1c-.2-.4-.5-.9-.8-1.2-.3-.4-.6-.7-1-1-.4-.3-.8-.5-1.3-.7-.5-.2-1.1-.2-1.7-.2-1 0-1.8.2-2.5.6-.7.4-1.3.9-1.7 1.5-.5.6-.8 1.4-1 2.2-.3.8-.4 1.9-.4 2.7zm36.4-4.3c-.4-1.3-1.1-2.4-2-3.4-.9-1-1.9-1.7-3.1-2.3-1.2-.6-2.6-.8-4.2-.8s-2.9.3-4.2.8c-1.1.6-2.2 1.4-3 2.3-.9 1-1.5 2.1-2 3.4-.4 1.3-.7 2.7-.7 4.2s.2 2.9.7 4.2c.4 1.3 1.1 2.4 2 3.4.9 1 1.9 1.7 3.1 2.3 1.2.6 2.6.8 4.2.8 1.5 0 2.9-.3 4.2-.8 1.2-.6 2.3-1.3 3.1-2.3.9-1 1.5-2.1 2-3.4.4-1.3.7-2.7.7-4.2-.1-1.5-.3-2.9-.8-4.2zM81 17.6c0 1-.1 1.9-.4 2.7-.2.8-.6 1.6-1.1 2.2-.5.6-1.1 1.1-1.7 1.4-.7.3-1.5.5-2.4.5-.9 0-1.7-.2-2.4-.5s-1.3-.8-1.7-1.4c-.5-.6-.8-1.3-1.1-2.2-.2-.8-.4-1.7-.4-2.7v-.1c0-1 .1-1.9.4-2.7.2-.8.6-1.6 1.1-2.2.5-.6 1.1-1.1 1.7-1.4.7-.3 1.5-.5 2.4-.5.9 0 1.7.2 2.4.5s1.3.8 1.7 1.4c.5.6.8 1.3 1.1 2.2.2.8.4 1.7.4 2.7v.1zM92.9 28 87 7h4.7l4 15.7h.1l4-15.7h4.7l-5.9 21h-5.7zm28.8-3.6c.6 0 1.2-.1 1.7-.3.5-.2 1-.4 1.4-.8.4-.4.7-.8.9-1.4.2-.6.3-1.2.3-2v-13h4.1v13.6c0 1.2-.2 2.2-.6 3.1s-1 1.7-1.8 2.4c-.7.7-1.6 1.2-2.7 1.5-1 .4-2.2.5-3.4.5-1.2 0-2.4-.2-3.4-.5-1-.4-1.9-.9-2.7-1.5-.8-.7-1.3-1.5-1.8-2.4-.4-.9-.6-2-.6-3.1V6.9h4.2v13c0 .8.1 1.4.3 2 .2.6.5 1 .9 1.4.4.4.8.6 1.4.8.6.2 1.1.3 1.8.3zm13-17.4h4.2v9.1l7.4-9.1h5.2l-7.2 8.4L152 28h-4.9l-5.5-9.4-2.7 3V28h-4.2V7zm-27.6 16.1c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z"></path>
</svg>
`, j;
            }(), e.set("_stEdwardsCrown", t, !0), e.topLevel && a.setVariable("_stEdwardsCrown", t);
            var p;
            if (p = function() {
              var j = "";
              return j += `
<svg
  focusable="false"
  role="img"
  class="govuk-header__logotype"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 148 30"
  height="30"
  width="148"
  aria-label="GOV.UK"
>
  <title>GOV.UK</title>
  <path d="M22.6 10.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m-5.9 6.7c-.9.4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m10.8-3.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m3.3 4.8c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4M17 4.7l2.3 1.2V2.5l-2.3.7-.2-.2.9-3h-3.4l.9 3-.2.2c-.1.1-2.3-.7-2.3-.7v3.4L15 4.7c.1.1.1.2.2.2l-1.3 4c-.1.2-.1.4-.1.6 0 1.1.8 2 1.9 2.2h.7c1-.2 1.9-1.1 1.9-2.1 0-.2 0-.4-.1-.6l-1.3-4c-.1-.2 0-.2.1-.3m-7.6 5.7c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m-5 3c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s.1 2 1 2.4m-3.2 4.8c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m14.8 11c4.4 0 8.6.3 12.3.8 1.1-4.5 2.4-7 3.7-8.8l-2.5-.9c.2 1.3.3 1.9 0 2.7-.4-.4-.8-1.1-1.1-2.3l-1.2 4c.7-.5 1.3-.8 2-.9-1.1 2.5-2.6 3.1-3.5 3-1.1-.2-1.7-1.2-1.5-2.1.3-1.2 1.5-1.5 2.1-.1 1.1-2.3-.8-3-2-2.3 1.9-1.9 2.1-3.5.6-5.6-2.1 1.6-2.1 3.2-1.2 5.5-1.2-1.4-3.2-.6-2.5 1.6.9-1.4 2.1-.5 1.9.8-.2 1.1-1.7 2.1-3.5 1.9-2.7-.2-2.9-2.1-2.9-3.6.7-.1 1.9.5 2.9 1.9l.4-4.3c-1.1 1.1-2.1 1.4-3.2 1.4.4-1.2 2.1-3 2.1-3h-5.4s1.7 1.9 2.1 3c-1.1 0-2.1-.2-3.2-1.4l.4 4.3c1-1.4 2.2-2 2.9-1.9-.1 1.5-.2 3.4-2.9 3.6-1.9.2-3.4-.8-3.5-1.9-.2-1.3 1-2.2 1.9-.8.7-2.3-1.2-3-2.5-1.6.9-2.2.9-3.9-1.2-5.5-1.5 2-1.3 3.7.6 5.6-1.2-.7-3.1 0-2 2.3.6-1.4 1.8-1.1 2.1.1.2.9-.3 1.9-1.5 2.1-.9.2-2.4-.5-3.5-3 .6 0 1.2.3 2 .9l-1.2-4c-.3 1.1-.7 1.9-1.1 2.3-.3-.8-.2-1.4 0-2.7l-2.9.9C1.3 23 2.6 25.5 3.7 30c3.7-.5 7.9-.8 12.3-.8m28.3-11.6c0 .9.1 1.7.3 2.5.2.8.6 1.5 1 2.2.5.6 1 1.1 1.7 1.5.7.4 1.5.6 2.5.6.9 0 1.7-.1 2.3-.4s1.1-.7 1.5-1.1c.4-.4.6-.9.8-1.5.1-.5.2-1 .2-1.5v-.2h-5.3v-3.2h9.4V28H55v-2.5c-.3.4-.6.8-1 1.1-.4.3-.8.6-1.3.9-.5.2-1 .4-1.6.6s-1.2.2-1.8.2c-1.5 0-2.9-.3-4-.8-1.2-.6-2.2-1.3-3-2.3-.8-1-1.4-2.1-1.8-3.4-.3-1.4-.5-2.8-.5-4.3s.2-2.9.7-4.2c.5-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.6 2.6-.8 4.1-.8 1 0 1.9.1 2.8.3.9.2 1.7.6 2.4 1s1.4.9 1.9 1.5c.6.6 1 1.3 1.4 2l-3.7 2.1c-.2-.4-.5-.9-.8-1.2-.3-.4-.6-.7-1-1-.4-.3-.8-.5-1.3-.7-.5-.2-1.1-.2-1.7-.2-1 0-1.8.2-2.5.6-.7.4-1.3.9-1.7 1.5-.5.6-.8 1.4-1 2.2-.3.8-.4 1.9-.4 2.7zM71.5 6.8c1.5 0 2.9.3 4.2.8 1.2.6 2.3 1.3 3.1 2.3.9 1 1.5 2.1 2 3.4s.7 2.7.7 4.2-.2 2.9-.7 4.2c-.4 1.3-1.1 2.4-2 3.4-.9 1-1.9 1.7-3.1 2.3-1.2.6-2.6.8-4.2.8s-2.9-.3-4.2-.8c-1.2-.6-2.3-1.3-3.1-2.3-.9-1-1.5-2.1-2-3.4-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2c.4-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.5 2.6-.8 4.2-.8zm0 17.6c.9 0 1.7-.2 2.4-.5s1.3-.8 1.7-1.4c.5-.6.8-1.3 1.1-2.2.2-.8.4-1.7.4-2.7v-.1c0-1-.1-1.9-.4-2.7-.2-.8-.6-1.6-1.1-2.2-.5-.6-1.1-1.1-1.7-1.4-.7-.3-1.5-.5-2.4-.5s-1.7.2-2.4.5-1.3.8-1.7 1.4c-.5.6-.8 1.3-1.1 2.2-.2.8-.4 1.7-.4 2.7v.1c0 1 .1 1.9.4 2.7.2.8.6 1.6 1.1 2.2.5.6 1.1 1.1 1.7 1.4.6.3 1.4.5 2.4.5zM88.9 28 83 7h4.7l4 15.7h.1l4-15.7h4.7l-5.9 21h-5.7zm28.8-3.6c.6 0 1.2-.1 1.7-.3.5-.2 1-.4 1.4-.8.4-.4.7-.8.9-1.4.2-.6.3-1.2.3-2v-13h4.1v13.6c0 1.2-.2 2.2-.6 3.1s-1 1.7-1.8 2.4c-.7.7-1.6 1.2-2.7 1.5-1 .4-2.2.5-3.4.5-1.2 0-2.4-.2-3.4-.5-1-.4-1.9-.9-2.7-1.5-.8-.7-1.3-1.5-1.8-2.4-.4-.9-.6-2-.6-3.1V6.9h4.2v13c0 .8.1 1.4.3 2 .2.6.5 1 .9 1.4.4.4.8.6 1.4.8.6.2 1.1.3 1.8.3zm13-17.4h4.2v9.1l7.4-9.1h5.2l-7.2 8.4L148 28h-4.9l-5.5-9.4-2.7 3V28h-4.2V7zm-27.6 16.1c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z"></path>
</svg>
`, j;
            }(), e.set("_tudorCrown", p, !0), e.topLevel && a.setVariable("_tudorCrown", p), s += '<header class="govuk-header', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '" data-module="govuk-header"', s += o.suppressValue((L = 37, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  <div class="govuk-header__container `, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "containerClasses"), "govuk-width-container", !0), r.opts.autoescape), s += `">
    <div class="govuk-header__logo">
      <a href="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "homepageUrl"), "/", !0), r.opts.autoescape), s += '" class="govuk-header__link govuk-header__link--homepage">', s += `
        `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "useTudorCrown") !== o.contextOrFrameLookup(a, e, "undefined") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "useTudorCrown") === !1 ? o.contextOrFrameLookup(a, e, "_stEdwardsCrown") : o.contextOrFrameLookup(a, e, "_tudorCrown"))), 8), r.opts.autoescape), s += `
        `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "productName") && (s += `
        <span class="govuk-header__product-name">
          `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "productName"), r.opts.autoescape), s += `
        </span>
        `), s += `
      </a>
    </div>
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName") || r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation"))) {
              if (s += `
    <div class="govuk-header__content">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName") && (s += `
      `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceUrl") ? (s += `
      <a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceUrl"), r.opts.autoescape), s += `" class="govuk-header__link govuk-header__service-name">
        `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName"), r.opts.autoescape), s += `
      </a>
      `) : (s += `
      <span class="govuk-header__service-name">
        `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName"), r.opts.autoescape), s += `
      </span>
      `), s += `
    `), s += `
    `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation"))) {
                s += `
      <nav aria-label="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationLabel"), o.contextOrFrameLookup(a, e, "menuButtonText"), !0), r.opts.autoescape), s += '" class="govuk-header__navigation', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationClasses") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationClasses"), r.opts.autoescape)), s += `">
        <button type="button" class="govuk-header__menu-button govuk-js-header-toggle" aria-controls="navigation"`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonLabel") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonLabel") != o.contextOrFrameLookup(a, e, "menuButtonText") && (s += ' aria-label="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonLabel"), r.opts.autoescape), s += '"'), s += ` hidden>
          `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "menuButtonText"), r.opts.autoescape), s += `
        </button>

        <ul id="navigation" class="govuk-header__navigation-list">
        `, e = e.push();
                var n = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation");
                if (n) {
                  n = o.fromIterator(n);
                  for (var k = n.length, f = 0; f < n.length; f++) {
                    var F = n[f];
                    e.set("item", F), e.set("loop.index", f + 1), e.set("loop.index0", f), e.set("loop.revindex", k - f), e.set("loop.revindex0", k - f - 1), e.set("loop.first", f === 0), e.set("loop.last", f === k - 1), e.set("loop.length", k), s += `
          `, (o.memberLookup(F, "text") || o.memberLookup(F, "html")) && (s += `
          <li class="govuk-header__navigation-item`, o.memberLookup(F, "active") && (s += " govuk-header__navigation-item--active"), s += `">
            `, o.memberLookup(F, "href") && (s += `
            <a class="govuk-header__link" href="`, s += o.suppressValue(o.memberLookup(F, "href"), r.opts.autoescape), s += '"', s += o.suppressValue((L = 80, g = 33, o.callWrap(c, "govukAttributes", a, [o.memberLookup(F, "attributes")])), r.opts.autoescape), s += `>
            `), s += `
              `, s += o.suppressValue(o.memberLookup(F, "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(F, "html"))), 14) : o.memberLookup(F, "text"), r.opts.autoescape), s += `
            `, o.memberLookup(F, "href") && (s += `
            </a>
            `), s += `
          </li>
          `), s += `
        `;
                  }
                }
                e = e.pop(), s += `
        </ul>
      </nav>
    `;
              }
              s += `
    </div>
  `;
            }
            s += `
  </div>
</header>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/hint/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/hint/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukHint"), a.setVariable("govukHint", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/hint/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/hint/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += "<div", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (s += ' id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += '"'), s += ' class="govuk-hint', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 2) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/input/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/input/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukInput"), a.setVariable("govukInput", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/input/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/input/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../error-message/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/input/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukErrorMessage"))
                  var k = n.govukErrorMessage;
                else {
                  l(new Error("cannot import 'govukErrorMessage'"));
                  return;
                }
                a.setVariable("govukErrorMessage", k), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/input/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukHint"))
                      var C = w.govukHint;
                    else {
                      l(new Error("cannot import 'govukHint'"));
                      return;
                    }
                    a.setVariable("govukHint", C), s += `
`, r.getTemplate("../label/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/input/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukLabel"))
                          var E = V.govukLabel;
                        else {
                          l(new Error("cannot import 'govukLabel'"));
                          return;
                        }
                        a.setVariable("govukLabel", E);
                        var S;
                        if (S = "govuk-input", e.set("classNames", S, !0), e.topLevel && a.setVariable("classNames", S), e.topLevel && a.addExport("classNames", S), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes")) {
                          s += `
  `;
                          var T;
                          T = o.contextOrFrameLookup(a, e, "classNames") + " " + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), e.set("classNames", T, !0), e.topLevel && a.setVariable("classNames", T), e.topLevel && a.addExport("classNames", T), s += `
`;
                        }
                        if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                          s += `
  `;
                          var H;
                          H = o.contextOrFrameLookup(a, e, "classNames") + " govuk-input--error", e.set("classNames", H, !0), e.topLevel && a.setVariable("classNames", H), e.topLevel && a.addExport("classNames", H), s += `
`;
                        }
                        var I;
                        I = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") : o.contextOrFrameLookup(a, e, "undefined"), e.set("describedBy", I, !0), e.topLevel && a.setVariable("describedBy", I), e.topLevel && a.addExport("describedBy", I);
                        var M;
                        M = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("id", M, !0), e.topLevel && a.setVariable("id", M), e.topLevel && a.addExport("id", M);
                        var B;
                        B = !!(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "prefix") && (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "prefix"), "text") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "prefix"), "html"))), e.set("hasPrefix", B, !0), e.topLevel && a.setVariable("hasPrefix", B), e.topLevel && a.addExport("hasPrefix", B);
                        var G;
                        G = !!(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "suffix") && (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "suffix"), "text") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "suffix"), "html"))), e.set("hasSuffix", G, !0), e.topLevel && a.setVariable("hasSuffix", G), e.topLevel && a.addExport("hasSuffix", G);
                        var N;
                        N = !!(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput") && (o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "text") || o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html"))), e.set("hasBeforeInput", N, !0), e.topLevel && a.setVariable("hasBeforeInput", N), e.topLevel && a.addExport("hasBeforeInput", N);
                        var R;
                        R = !!(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput") && (o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "text") || o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html"))), e.set("hasAfterInput", R, !0), e.topLevel && a.setVariable("hasAfterInput", R), e.topLevel && a.addExport("hasAfterInput", R);
                        var Z = o.makeMacro(
                          ["params"],
                          [],
                          function($, K) {
                            var X = e;
                            e = new o.Frame(), K = K || {}, Object.prototype.hasOwnProperty.call(K, "caller") && e.set("caller", K.caller), e.set("params", $);
                            var Y = "";
                            return Y += "<input", Y += o.suppressValue((L = 28, g = 23, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [{ class: o.contextOrFrameLookup(a, e, "classNames"), id: o.contextOrFrameLookup(a, e, "id"), name: o.memberLookup($, "name"), type: r.getFilter("default").call(a, o.memberLookup($, "type"), "text", !0), spellcheck: { value: (L = 35, g = 35, o.callWrap(o.memberLookup([!0, !1], "includes"), '--expression--["includes"]', a, [o.memberLookup($, "spellcheck")]) ? r.getFilter("string").call(a, o.memberLookup($, "spellcheck")) : !1), optional: !0 }, value: { value: o.memberLookup($, "value"), optional: !0 }, disabled: { value: o.memberLookup($, "disabled"), optional: !0 }, "aria-describedby": { value: o.contextOrFrameLookup(a, e, "describedBy"), optional: !0 }, autocomplete: { value: o.memberLookup($, "autocomplete"), optional: !0 }, autocapitalize: { value: o.memberLookup($, "autocapitalize"), optional: !0 }, pattern: { value: o.memberLookup($, "pattern"), optional: !0 }, inputmode: { value: o.memberLookup($, "inputmode"), optional: !0 } }])), r.opts.autoescape), Y += o.suppressValue((L = 69, g = 23, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup($, "attributes")])), r.opts.autoescape), Y += ">", e = X, new o.SafeString(Y);
                          }
                        );
                        a.setVariable("_inputElement", Z);
                        var W = o.makeMacro(
                          ["affix", "type"],
                          [],
                          function($, K, X) {
                            var Y = e;
                            e = new o.Frame(), X = X || {}, Object.prototype.hasOwnProperty.call(X, "caller") && e.set("caller", X.caller), e.set("affix", $), e.set("type", K);
                            var ao = "";
                            return ao += `
  <div class="govuk-input__`, ao += o.suppressValue(K, r.opts.autoescape), o.memberLookup($, "classes") && (ao += " ", ao += o.suppressValue(o.memberLookup($, "classes"), r.opts.autoescape)), ao += '" aria-hidden="true"', ao += o.suppressValue((L = 73, g = 132, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup($, "attributes")])), r.opts.autoescape), ao += ">", ao += o.suppressValue(o.memberLookup($, "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup($, "html"))), 4) : o.memberLookup($, "text"), r.opts.autoescape), ao += "</div>", e = Y, new o.SafeString(ao);
                          }
                        );
                        if (a.setVariable("_affixItem", W), s += '<div class="govuk-form-group', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-form-group--error"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 79, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes")])), r.opts.autoescape), s += `>
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 80, g = 15, o.callWrap(E, "govukLabel", a, [{ html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "text"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "classes"), isPageHeading: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "isPageHeading"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "attributes"), for: o.contextOrFrameLookup(a, e, "id") }]))), 2), r.opts.autoescape), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint")) {
                          s += `
  `;
                          var D;
                          D = o.contextOrFrameLookup(a, e, "id") + "-hint", e.set("hintId", D, !0), e.topLevel && a.setVariable("hintId", D), e.topLevel && a.addExport("hintId", D), s += `
  `;
                          var z;
                          z = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "hintId") : o.contextOrFrameLookup(a, e, "hintId"), e.set("describedBy", z, !0), e.topLevel && a.setVariable("describedBy", z), e.topLevel && a.addExport("describedBy", z), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 91, g = 14, o.callWrap(C, "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "hintId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "text") }]))), 2), r.opts.autoescape), s += `
`;
                        }
                        if (s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                          s += `
  `;
                          var J;
                          J = o.contextOrFrameLookup(a, e, "id") + "-error", e.set("errorId", J, !0), e.topLevel && a.setVariable("errorId", J), e.topLevel && a.addExport("errorId", J), s += `
  `;
                          var Q;
                          Q = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "errorId") : o.contextOrFrameLookup(a, e, "errorId"), e.set("describedBy", Q, !0), e.topLevel && a.setVariable("describedBy", Q), e.topLevel && a.addExport("describedBy", Q), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 102, g = 22, o.callWrap(k, "govukErrorMessage", a, [{ id: o.contextOrFrameLookup(a, e, "errorId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "text"), visuallyHiddenText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "visuallyHiddenText") }]))), 2), r.opts.autoescape), s += `
`;
                        }
                        o.contextOrFrameLookup(a, e, "hasPrefix") || o.contextOrFrameLookup(a, e, "hasSuffix") || o.contextOrFrameLookup(a, e, "hasBeforeInput") || o.contextOrFrameLookup(a, e, "hasAfterInput") ? (s += `
  <div class="govuk-input__wrapper`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "inputWrapper"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "inputWrapper"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 114, g = 23, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "inputWrapper"), "attributes")])), r.opts.autoescape), s += `>
    `, o.contextOrFrameLookup(a, e, "hasBeforeInput") && (s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html"))), 4, !0) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "text"), r.opts.autoescape), s += `
    `), s += `
    `, o.contextOrFrameLookup(a, e, "hasPrefix") && (s += o.suppressValue(r.getFilter("indent").call(a, (L = 119, g = 20, o.callWrap(W, "_affixItem", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "prefix"), "prefix"])), 2, !0), r.opts.autoescape), s += `
    `), s += `
    `, s += o.suppressValue((L = 121, g = 20, o.callWrap(Z, "_inputElement", a, [o.contextOrFrameLookup(a, e, "params")])), r.opts.autoescape), s += `
    `, o.contextOrFrameLookup(a, e, "hasSuffix") && (s += o.suppressValue(r.getFilter("indent").call(a, (L = 123, g = 20, o.callWrap(W, "_affixItem", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "suffix"), "suffix"])), 2, !0), r.opts.autoescape), s += `
    `), s += `
    `, o.contextOrFrameLookup(a, e, "hasAfterInput") && (s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html"))), 4, !0) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "text"), r.opts.autoescape), s += `
    `), s += `
  </div>
`) : (s += `
  `, s += o.suppressValue((L = 130, g = 18, o.callWrap(Z, "_inputElement", a, [o.contextOrFrameLookup(a, e, "params")])), r.opts.autoescape), s += `
`), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/inset-text/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/inset-text/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukInsetText"), a.setVariable("govukInsetText", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/inset-text/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/inset-text/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += "<div", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (s += ' id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += '"'), s += ' class="govuk-inset-text', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "caller") ? (L = 4, g = 11, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, [])) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 2) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/label/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/label/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukLabel"), a.setVariable("govukLabel", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/label/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/label/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            if (a.setVariable("govukAttributes", c), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text")) {
              s += `
`;
              var u;
              u = function() {
                var t = "";
                return t += `
<label class="govuk-label`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (t += " ", t += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), t += '"', t += o.suppressValue((L = 5, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "for") && (t += ' for="', t += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "for"), r.opts.autoescape), t += '"'), t += `>
  `, t += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 2) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), t += `
</label>
`, t;
              }(), e.set("labelHtml", u, !0), e.topLevel && a.setVariable("labelHtml", u), e.topLevel && a.addExport("labelHtml", u), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "isPageHeading") ? (s += `
<h1 class="govuk-label-wrapper">
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "labelHtml"))), 2), r.opts.autoescape), s += `
</h1>
`) : (s += `
`, s += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "labelHtml"))), r.opts.autoescape), s += `
`), s += `
`;
            }
            s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/notification-banner/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/notification-banner/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukNotificationBanner"), a.setVariable("govukNotificationBanner", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/notification-banner/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/notification-banner/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            if (a.setVariable("govukAttributes", c), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") == "success") {
              s += `
  `;
              var u;
              u = !0, e.set("successBanner", u, !0), e.topLevel && a.setVariable("successBanner", u), e.topLevel && a.addExport("successBanner", u), s += `
`;
            }
            if (o.contextOrFrameLookup(a, e, "successBanner")) {
              s += `
  `;
              var t;
              t = "govuk-notification-banner--" + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type"), e.set("typeClass", t, !0), e.topLevel && a.setVariable("typeClass", t), e.topLevel && a.addExport("typeClass", t), s += `
`;
            }
            if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "role")) {
              s += `
  `;
              var p;
              p = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "role"), e.set("role", p, !0), e.topLevel && a.setVariable("role", p), e.topLevel && a.addExport("role", p), s += `
`;
            } else if (o.contextOrFrameLookup(a, e, "successBanner")) {
              var n;
              n = "alert", e.set("role", n, !0), e.topLevel && a.setVariable("role", n), e.topLevel && a.addExport("role", n), s += `
`;
            } else {
              var k;
              k = "region", e.set("role", k, !0), e.topLevel && a.setVariable("role", k), e.topLevel && a.addExport("role", k), s += `
`;
            }
            if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHtml")) {
              s += `
  `;
              var f;
              f = r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHtml")), e.set("title", f, !0), e.topLevel && a.setVariable("title", f), e.topLevel && a.addExport("title", f);
            } else if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleText")) {
              s += `
  `;
              var F;
              F = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleText"), e.set("title", F, !0), e.topLevel && a.setVariable("title", F), e.topLevel && a.addExport("title", F);
            } else if (o.contextOrFrameLookup(a, e, "successBanner")) {
              s += `
  `;
              var j;
              j = "Success", e.set("title", j, !0), e.topLevel && a.setVariable("title", j), e.topLevel && a.addExport("title", j);
            } else {
              s += `
  `;
              var w;
              w = "Important", e.set("title", w, !0), e.topLevel && a.setVariable("title", w), e.topLevel && a.addExport("title", w);
            }
            s += '<div class="govuk-notification-banner', o.contextOrFrameLookup(a, e, "typeClass") && (s += " ", s += o.suppressValue(o.contextOrFrameLookup(a, e, "typeClass"), r.opts.autoescape)), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '" role="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "role"), r.opts.autoescape), s += '" aria-labelledby="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleId"), "govuk-notification-banner-title", !0), r.opts.autoescape), s += '" data-module="govuk-notification-banner"', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disableAutoFocus") !== o.contextOrFrameLookup(a, e, "undefined") && (s += ' data-disable-auto-focus="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disableAutoFocus"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 32, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  <div class="govuk-notification-banner__header">
    <h`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHeadingLevel"), 2, !0), r.opts.autoescape), s += ' class="govuk-notification-banner__title" id="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleId"), "govuk-notification-banner-title", !0), r.opts.autoescape), s += `">
      `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "title"), r.opts.autoescape), s += `
    </h`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHeadingLevel"), 2, !0), r.opts.autoescape), s += `>
  </div>
  <div class="govuk-notification-banner__content">
  `, o.contextOrFrameLookup(a, e, "caller") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? (s += `
    `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "caller") ? (L = 40, g = 13, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, [])) : r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 4), r.opts.autoescape), s += `
  `) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text") && (s += `
    `, s += `<p class="govuk-notification-banner__heading">
      `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text")), 6), r.opts.autoescape), s += `
    </p>
  `), s += `
  </div>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/pagination/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/pagination/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukPagination"), a.setVariable("govukPagination", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/pagination/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/pagination/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u;
            u = !o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items") && (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "next") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "previous")), e.set("blockLevel", u, !0), e.topLevel && a.setVariable("blockLevel", u), e.topLevel && a.addExport("blockLevel", u);
            var t;
            t = function() {
              var y = "";
              return y += `
  <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
    <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
  </svg>`, y;
            }(), e.set("arrowPrevious", t, !0), e.topLevel && a.setVariable("arrowPrevious", t), e.topLevel && a.addExport("arrowPrevious", t);
            var p;
            p = function() {
              var y = "";
              return y += `
  <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
    <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
  </svg>`, y;
            }(), e.set("arrowNext", p, !0), e.topLevel && a.setVariable("arrowNext", p), e.topLevel && a.addExport("arrowNext", p);
            var n = o.makeMacro(
              ["link"],
              ["type"],
              function(y, O) {
                var V = e;
                e = new o.Frame(), O = O || {}, Object.prototype.hasOwnProperty.call(O, "caller") && e.set("caller", O.caller), e.set("link", y), e.set("type", Object.prototype.hasOwnProperty.call(O, "type") ? O.type : "next");
                var E = "";
                E += `
  `;
                var S;
                return S = o.contextOrFrameLookup(a, e, "type") == "prev" ? o.contextOrFrameLookup(a, e, "arrowPrevious") : o.contextOrFrameLookup(a, e, "arrowNext"), e.set("arrowType", S, !0), e.topLevel && a.setVariable("arrowType", S), e.topLevel && a.addExport("arrowType", S), E += `
  <div class="govuk-pagination__`, E += o.suppressValue(o.contextOrFrameLookup(a, e, "type"), r.opts.autoescape), E += `">
    <a class="govuk-link govuk-pagination__link" href="`, E += o.suppressValue(o.memberLookup(y, "href"), r.opts.autoescape), E += '" rel="', E += o.suppressValue(o.contextOrFrameLookup(a, e, "type"), r.opts.autoescape), E += '"', E += o.suppressValue((L = 20, g = 25, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(y, "attributes")])), r.opts.autoescape), E += `>
      `, (o.contextOrFrameLookup(a, e, "blockLevel") || o.contextOrFrameLookup(a, e, "type") == "prev") && (E += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "arrowType")), 4, !0), r.opts.autoescape), E += `
      `), E += `
      <span class="govuk-pagination__link-title`, o.contextOrFrameLookup(a, e, "blockLevel") && !o.memberLookup(y, "labelText") && (E += " govuk-pagination__link-title--decorated"), E += `">
        `, E += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, (L = 25, g = 17, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, [])))), r.opts.autoescape), E += `
      </span>
      `, o.memberLookup(y, "labelText") && o.contextOrFrameLookup(a, e, "blockLevel") && (E += `
      <span class="govuk-visually-hidden">:</span>
      <span class="govuk-pagination__link-label">`, E += o.suppressValue(o.memberLookup(y, "labelText"), r.opts.autoescape), E += `</span>
      `), E += `
      `, !o.contextOrFrameLookup(a, e, "blockLevel") && o.contextOrFrameLookup(a, e, "type") == "next" && (E += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "arrowType")), 4, !0), r.opts.autoescape), E += `
      `), E += `
    </a>
  </div>
`, e = V, new o.SafeString(E);
              }
            );
            a.setVariable("_arrowLink", n);
            var k = o.makeMacro(
              ["item"],
              [],
              function(y, O) {
                var V = e;
                e = new o.Frame(), O = O || {}, Object.prototype.hasOwnProperty.call(O, "caller") && e.set("caller", O.caller), e.set("item", y);
                var E = "";
                return E += '<li class="govuk-pagination__item', o.memberLookup(y, "current") && (E += " govuk-pagination__item--current"), o.memberLookup(y, "ellipsis") && (E += " govuk-pagination__item--ellipses"), E += `">
  `, o.memberLookup(y, "ellipsis") ? E += `
    &ctdot;
  ` : (E += `
    <a class="govuk-link govuk-pagination__link" href="`, E += o.suppressValue(o.memberLookup(y, "href"), r.opts.autoescape), E += '" aria-label="', E += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(y, "visuallyHiddenText"), "Page " + o.memberLookup(y, "number")), r.opts.autoescape), E += '"', o.memberLookup(y, "current") && (E += ' aria-current="page"'), E += o.suppressValue((L = 45, g = 25, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(y, "attributes")])), r.opts.autoescape), E += `>
      `, E += o.suppressValue(o.memberLookup(y, "number"), r.opts.autoescape), E += `
    </a>
  `), E += `
  </li>`, e = V, new o.SafeString(E);
              }
            );
            a.setVariable("_pageItem", k), s += '<nav class="govuk-pagination', o.contextOrFrameLookup(a, e, "blockLevel") && (s += " govuk-pagination--block"), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '" aria-label="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "landmarkLabel"), "Pagination", !0), r.opts.autoescape), s += '"', s += o.suppressValue((L = 53, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `;
            var f;
            f = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "previous"), e.set("previous", f, !0), e.topLevel && a.setVariable("previous", f), e.topLevel && a.addExport("previous", f), s += `
  `;
            var F;
            if (F = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "next"), e.set("next", F, !0), e.topLevel && a.setVariable("next", F), e.topLevel && a.addExport("next", F), o.contextOrFrameLookup(a, e, "previous") && o.memberLookup(o.contextOrFrameLookup(a, e, "previous"), "href") && (s += `
    `, s += o.suppressValue((L = 58, g = 22, o.callWrap(n, "_arrowLink", a, [o.contextOrFrameLookup(a, e, "previous"), "prev", o.makeKeywordArgs({ caller: function() {
              var y = o.makeMacro(
                [],
                [],
                function(O) {
                  var V = e;
                  e = e.push(!0), O = O || {}, Object.prototype.hasOwnProperty.call(O, "caller") && e.set("caller", O.caller);
                  var E = "";
                  return E += `
      `, o.memberLookup(o.contextOrFrameLookup(a, e, "previous"), "html") || o.memberLookup(o.contextOrFrameLookup(a, e, "previous"), "text") ? (E += `
        `, E += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "previous"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "previous"), "html"))), 8) : o.memberLookup(o.contextOrFrameLookup(a, e, "previous"), "text"), r.opts.autoescape), E += `
      `) : E += `
        Previous<span class="govuk-visually-hidden"> page</span>
      `, E += `
    `, e = e.pop(), new o.SafeString(E);
                }
              );
              return y;
            }() })])), r.opts.autoescape)), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items")) {
              s += `
  <ul class="govuk-pagination__list">
  `, e = e.push();
              var j = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
              if (j) {
                j = o.fromIterator(j);
                for (var w = j.length, C = 0; C < j.length; C++) {
                  var P = j[C];
                  e.set("item", P), e.set("loop.index", C + 1), e.set("loop.index0", C), e.set("loop.revindex", w - C), e.set("loop.revindex0", w - C - 1), e.set("loop.first", C === 0), e.set("loop.last", C === w - 1), e.set("loop.length", w), s += `
    `, s += o.suppressValue(r.getFilter("indent").call(a, (L = 70, g = 16, o.callWrap(k, "_pageItem", a, [P])), 2), r.opts.autoescape), s += `
  `;
                }
              }
              e = e.pop(), s += `
  </ul>
  `;
            }
            o.contextOrFrameLookup(a, e, "next") && o.memberLookup(o.contextOrFrameLookup(a, e, "next"), "href") && (s += `
    `, s += o.suppressValue((L = 76, g = 22, o.callWrap(n, "_arrowLink", a, [o.contextOrFrameLookup(a, e, "next"), "next", o.makeKeywordArgs({ caller: function() {
              var y = o.makeMacro(
                [],
                [],
                function(O) {
                  var V = e;
                  e = e.push(!0), O = O || {}, Object.prototype.hasOwnProperty.call(O, "caller") && e.set("caller", O.caller);
                  var E = "";
                  return E += `
      `, o.memberLookup(o.contextOrFrameLookup(a, e, "next"), "html") || o.memberLookup(o.contextOrFrameLookup(a, e, "next"), "text") ? (E += `
        `, E += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "next"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "next"), "html"))), 8) : o.memberLookup(o.contextOrFrameLookup(a, e, "next"), "text"), r.opts.autoescape), E += `
      `) : E += `
        Next<span class="govuk-visually-hidden"> page</span>
      `, E += `
    `, e = e.pop(), new o.SafeString(E);
                }
              );
              return y;
            }() })])), r.opts.autoescape), s += `
  `), s += `
</nav>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/panel/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/panel/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukPanel"), a.setVariable("govukPanel", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/panel/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/panel/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u;
            u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "headingLevel") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "headingLevel") : 1, e.set("headingLevel", u, !0), e.topLevel && a.setVariable("headingLevel", u), e.topLevel && a.addExport("headingLevel", u), s += '<div class="govuk-panel govuk-panel--confirmation', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 6, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  <h`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), s += ` class="govuk-panel__title">
    `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHtml") ? r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleHtml")) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "titleText"), r.opts.autoescape), s += `
  </h`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), s += `>
  `, (o.contextOrFrameLookup(a, e, "caller") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text")) && (s += `
  <div class="govuk-panel__body">
    `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "caller") ? (L = 12, g = 13, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, [])) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 4) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
  </div>
  `), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/password-input/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/password-input/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukPasswordInput"), a.setVariable("govukPasswordInput", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/password-input/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/password-input/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), r.getTemplate("../../macros/i18n.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/password-input/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukI18nAttributes"))
                  var k = n.govukI18nAttributes;
                else {
                  l(new Error("cannot import 'govukI18nAttributes'"));
                  return;
                }
                a.setVariable("govukI18nAttributes", k), r.getTemplate("../button/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/password-input/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukButton"))
                      var C = w.govukButton;
                    else {
                      l(new Error("cannot import 'govukButton'"));
                      return;
                    }
                    a.setVariable("govukButton", C), r.getTemplate("../input/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/password-input/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukInput"))
                          var E = V.govukInput;
                        else {
                          l(new Error("cannot import 'govukInput'"));
                          return;
                        }
                        a.setVariable("govukInput", E);
                        var S;
                        S = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("id", S, !0), e.topLevel && a.setVariable("id", S), e.topLevel && a.addExport("id", S);
                        var T;
                        T = function() {
                          var z = "";
                          return z += o.suppressValue(r.getFilter("safe").call(a, ' data-module="govuk-password-input"'), r.opts.autoescape), z += o.suppressValue((L = 11, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "show-password", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showPasswordText") }])), r.opts.autoescape), z += o.suppressValue((L = 16, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "hide-password", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hidePasswordText") }])), r.opts.autoescape), z += o.suppressValue((L = 21, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "show-password-aria-label", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showPasswordAriaLabelText") }])), r.opts.autoescape), z += o.suppressValue((L = 26, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "hide-password-aria-label", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hidePasswordAriaLabelText") }])), r.opts.autoescape), z += o.suppressValue((L = 31, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "password-shown-announcement", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "passwordShownAnnouncementText") }])), r.opts.autoescape), z += o.suppressValue((L = 36, g = 25, o.callWrap(k, "govukI18nAttributes", a, [{ key: "password-hidden-announcement", message: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "passwordHiddenAnnouncementText") }])), r.opts.autoescape), z;
                        }(), e.set("attributesHtml", T, !0), e.topLevel && a.setVariable("attributesHtml", T), e.topLevel && a.addExport("attributesHtml", T), e = e.push();
                        var H = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes");
                        if (H) {
                          H = o.fromIterator(H);
                          var I;
                          if (o.isArray(H)) {
                            var M = H.length;
                            for (I = 0; I < H.length; I++) {
                              var B = H[I][0];
                              e.set("[object Object]", H[I][0]);
                              var G = H[I][1];
                              e.set("[object Object]", H[I][1]), e.set("loop.index", I + 1), e.set("loop.index0", I), e.set("loop.revindex", M - I), e.set("loop.revindex0", M - I - 1), e.set("loop.first", I === 0), e.set("loop.last", I === M - 1), e.set("loop.length", M), s += `
  `;
                              var N;
                              N = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, B) + '="' + r.getFilter("escape").call(a, G) + '"', e.set("attributesHtml", N, !0), e.topLevel && a.setVariable("attributesHtml", N), e.topLevel && a.addExport("attributesHtml", N), s += `
`;
                            }
                          } else {
                            I = -1;
                            var M = o.keys(H).length;
                            for (var R in H) {
                              I++;
                              var Z = H[R];
                              e.set("name", R), e.set("value", Z), e.set("loop.index", I + 1), e.set("loop.index0", I), e.set("loop.revindex", M - I), e.set("loop.revindex0", M - I - 1), e.set("loop.first", I === 0), e.set("loop.last", I === M - 1), e.set("loop.length", M), s += `
  `;
                              var W;
                              W = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, R) + '="' + r.getFilter("escape").call(a, Z) + '"', e.set("attributesHtml", W, !0), e.topLevel && a.setVariable("attributesHtml", W), e.topLevel && a.addExport("attributesHtml", W), s += `
`;
                            }
                          }
                        }
                        e = e.pop();
                        var D;
                        D = function() {
                          var z = "";
                          return z += `
`, z += o.suppressValue(r.getFilter("trim").call(a, (L = 48, g = 14, o.callWrap(C, "govukButton", a, [{ type: "button", classes: "govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle" + (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "button"), "classes") ? " " + o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "button"), "classes") : ""), text: r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showPasswordText"), "Show"), attributes: { "aria-controls": o.contextOrFrameLookup(a, e, "id"), "aria-label": r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showPasswordAriaLabelText"), "Show password"), hidden: { value: !0, optional: !0 } } }]))), r.opts.autoescape), z += `
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput") && (z += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html") ? r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html"))) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "text"), r.opts.autoescape), z += `
`), z;
                        }(), e.set("buttonHtml", D, !0), e.topLevel && a.setVariable("buttonHtml", D), e.topLevel && a.addExport("buttonHtml", D), s += o.suppressValue(r.getFilter("trim").call(a, (L = 66, g = 13, o.callWrap(E, "govukInput", a, [{ formGroup: { classes: "govuk-password-input" + (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") ? " " + o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") : ""), attributes: o.contextOrFrameLookup(a, e, "attributesHtml"), beforeInput: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), afterInput: { html: o.contextOrFrameLookup(a, e, "buttonHtml") } }, inputWrapper: { classes: "govuk-password-input__wrapper" }, label: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), hint: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), classes: "govuk-password-input__input govuk-js-password-input-input" + (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") ? " " + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") : ""), errorMessage: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), id: o.contextOrFrameLookup(a, e, "id"), name: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), type: "password", spellcheck: !1, autocapitalize: "none", autocomplete: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "autocomplete") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "autocomplete") : "current-password", value: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value"), disabled: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disabled"), describedBy: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy"), attributes: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes") }]))), r.opts.autoescape), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/phase-banner/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/phase-banner/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukPhaseBanner"), a.setVariable("govukPhaseBanner", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/phase-banner/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/phase-banner/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../tag/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/phase-banner/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukTag"))
                  var k = n.govukTag;
                else {
                  l(new Error("cannot import 'govukTag'"));
                  return;
                }
                a.setVariable("govukTag", k), s += '<div class="govuk-phase-banner', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 5, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  <p class="govuk-phase-banner__content">
    `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 7, g = 15, o.callWrap(k, "govukTag", a, [{ text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "tag"), "text"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "tag"), "html"), classes: "govuk-phase-banner__content__tag" + (o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "tag"), "classes") ? " " + o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "tag"), "classes") : "") }]))), 4), r.opts.autoescape), s += `
    <span class="govuk-phase-banner__text">
      `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 6) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
    </span>
  </p>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/radios/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/radios/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukRadios"), a.setVariable("govukRadios", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/radios/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/radios/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../error-message/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/radios/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukErrorMessage"))
                  var k = n.govukErrorMessage;
                else {
                  l(new Error("cannot import 'govukErrorMessage'"));
                  return;
                }
                a.setVariable("govukErrorMessage", k), s += `
`, r.getTemplate("../fieldset/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/radios/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukFieldset"))
                      var C = w.govukFieldset;
                    else {
                      l(new Error("cannot import 'govukFieldset'"));
                      return;
                    }
                    a.setVariable("govukFieldset", C), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/radios/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukHint"))
                          var E = V.govukHint;
                        else {
                          l(new Error("cannot import 'govukHint'"));
                          return;
                        }
                        a.setVariable("govukHint", E), s += `
`, r.getTemplate("../label/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/radios/template.njk", !1, function(S, T) {
                          if (S) {
                            l(S);
                            return;
                          }
                          T.getExported(function(H, I) {
                            if (H) {
                              l(H);
                              return;
                            }
                            if (Object.prototype.hasOwnProperty.call(I, "govukLabel"))
                              var M = I.govukLabel;
                            else {
                              l(new Error("cannot import 'govukLabel'"));
                              return;
                            }
                            a.setVariable("govukLabel", M);
                            var B;
                            B = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("idPrefix", B, !0), e.topLevel && a.setVariable("idPrefix", B), e.topLevel && a.addExport("idPrefix", B);
                            var G;
                            G = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "describedBy") ? o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "describedBy") : "", e.set("describedBy", G, !0), e.topLevel && a.setVariable("describedBy", G), e.topLevel && a.addExport("describedBy", G);
                            var N;
                            N = !!o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), e.set("hasFieldset", N, !0), e.topLevel && a.setVariable("hasFieldset", N), e.topLevel && a.addExport("hasFieldset", N);
                            var R = o.makeMacro(
                              ["params", "item", "index"],
                              [],
                              function(W, D, z, J) {
                                var Q = e;
                                e = new o.Frame(), J = J || {}, Object.prototype.hasOwnProperty.call(J, "caller") && e.set("caller", J.caller), e.set("params", W), e.set("item", D), e.set("index", z);
                                var $ = "", K;
                                K = o.memberLookup(D, "id") ? o.memberLookup(D, "id") : o.contextOrFrameLookup(a, e, "idPrefix") + (z > 1 ? "-" + z : ""), e.set("itemId", K, !0), e.topLevel && a.setVariable("itemId", K), e.topLevel && a.addExport("itemId", K), $ += `
  `;
                                var X;
                                if (X = "conditional-" + o.contextOrFrameLookup(a, e, "itemId"), e.set("conditionalId", X, !0), e.topLevel && a.setVariable("conditionalId", X), e.topLevel && a.addExport("conditionalId", X), o.memberLookup(D, "divider"))
                                  $ += `
    <div class="govuk-radios__divider">`, $ += o.suppressValue(o.memberLookup(D, "divider"), r.opts.autoescape), $ += `</div>
  `;
                                else {
                                  $ += `
    `;
                                  var Y;
                                  Y = r.getFilter("default").call(a, o.memberLookup(D, "checked"), o.memberLookup(W, "value") ? o.memberLookup(D, "value") == o.memberLookup(W, "value") && o.memberLookup(D, "checked") != !1 : !1, !0), e.set("isChecked", Y, !0), e.topLevel && a.setVariable("isChecked", Y), e.topLevel && a.addExport("isChecked", Y), $ += `
    `;
                                  var ao;
                                  ao = o.memberLookup(o.memberLookup(D, "hint"), "text") || o.memberLookup(o.memberLookup(D, "hint"), "html") ? !0 : "", e.set("hasHint", ao, !0), e.topLevel && a.setVariable("hasHint", ao), e.topLevel && a.addExport("hasHint", ao), $ += `
    `;
                                  var lo;
                                  lo = o.contextOrFrameLookup(a, e, "itemId") + "-item-hint", e.set("itemHintId", lo, !0), e.topLevel && a.setVariable("itemHintId", lo), e.topLevel && a.addExport("itemHintId", lo), $ += `
    <div class="govuk-radios__item">
      <input class="govuk-radios__input" id="`, $ += o.suppressValue(o.contextOrFrameLookup(a, e, "itemId"), r.opts.autoescape), $ += '" name="', $ += o.suppressValue(o.memberLookup(W, "name"), r.opts.autoescape), $ += '" type="radio" value="', $ += o.suppressValue(o.memberLookup(D, "value"), r.opts.autoescape), $ += '"', $ += o.suppressValue(o.contextOrFrameLookup(a, e, "isChecked") ? " checked" : "", r.opts.autoescape), $ += o.suppressValue(o.memberLookup(D, "disabled") ? " disabled" : "", r.opts.autoescape), o.memberLookup(o.memberLookup(D, "conditional"), "html") && ($ += ' data-aria-controls="', $ += o.suppressValue(o.contextOrFrameLookup(a, e, "conditionalId"), r.opts.autoescape), $ += '"'), o.contextOrFrameLookup(a, e, "hasHint") && ($ += ' aria-describedby="', $ += o.suppressValue(o.contextOrFrameLookup(a, e, "itemHintId"), r.opts.autoescape), $ += '"'), $ += o.suppressValue((L = 34, g = 27, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(D, "attributes")])), r.opts.autoescape), $ += `>
      `, $ += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 35, g = 19, o.callWrap(o.contextOrFrameLookup(a, e, "govukLabel"), "govukLabel", a, [{ html: o.memberLookup(D, "html"), text: o.memberLookup(D, "text"), classes: "govuk-radios__label" + (o.memberLookup(o.memberLookup(D, "label"), "classes") ? " " + o.memberLookup(o.memberLookup(D, "label"), "classes") : ""), attributes: o.memberLookup(o.memberLookup(D, "label"), "attributes"), for: o.contextOrFrameLookup(a, e, "itemId") }]))), 6), r.opts.autoescape), $ += `
      `, o.contextOrFrameLookup(a, e, "hasHint") && ($ += `
      `, $ += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 43, g = 18, o.callWrap(o.contextOrFrameLookup(a, e, "govukHint"), "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "itemHintId"), classes: "govuk-radios__hint" + (o.memberLookup(o.memberLookup(D, "hint"), "classes") ? " " + o.memberLookup(o.memberLookup(D, "hint"), "classes") : ""), attributes: o.memberLookup(o.memberLookup(D, "hint"), "attributes"), html: o.memberLookup(o.memberLookup(D, "hint"), "html"), text: o.memberLookup(o.memberLookup(D, "hint"), "text") }]))), 6), r.opts.autoescape), $ += `
      `), $ += `
    </div>
    `, o.memberLookup(o.memberLookup(D, "conditional"), "html") && ($ += `
    <div class="govuk-radios__conditional`, o.contextOrFrameLookup(a, e, "isChecked") || ($ += " govuk-radios__conditional--hidden"), $ += '" id="', $ += o.suppressValue(o.contextOrFrameLookup(a, e, "conditionalId"), r.opts.autoescape), $ += `">
      `, $ += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(D, "conditional"), "html"))), r.opts.autoescape), $ += `
    </div>
    `), $ += `
  `;
                                }
                                return e = Q, new o.SafeString($);
                              }
                            );
                            a.setVariable("_radioItem", R);
                            var Z;
                            Z = function() {
                              var W = "";
                              if (W += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint")) {
                                W += `
  `;
                                var D;
                                D = o.contextOrFrameLookup(a, e, "idPrefix") + "-hint", e.set("hintId", D, !0), e.topLevel && a.setVariable("hintId", D), e.topLevel && a.addExport("hintId", D), W += `
  `;
                                var z;
                                z = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "hintId") : o.contextOrFrameLookup(a, e, "hintId"), e.set("describedBy", z, !0), e.topLevel && a.setVariable("describedBy", z), e.topLevel && a.addExport("describedBy", z), W += `
  `, W += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 65, g = 14, o.callWrap(E, "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "hintId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "text") }]))), 2), r.opts.autoescape), W += `
`;
                              }
                              if (W += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                                W += `
  `;
                                var J;
                                J = o.contextOrFrameLookup(a, e, "idPrefix") + "-error", e.set("errorId", J, !0), e.topLevel && a.setVariable("errorId", J), e.topLevel && a.addExport("errorId", J), W += `
  `;
                                var Q;
                                Q = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "errorId") : o.contextOrFrameLookup(a, e, "errorId"), e.set("describedBy", Q, !0), e.topLevel && a.setVariable("describedBy", Q), e.topLevel && a.addExport("describedBy", Q), W += `
  `, W += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 76, g = 22, o.callWrap(k, "govukErrorMessage", a, [{ id: o.contextOrFrameLookup(a, e, "errorId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "text"), visuallyHiddenText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "visuallyHiddenText") }]))), 2), r.opts.autoescape), W += `
`;
                              }
                              W += `
  <div class="govuk-radios`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (W += " ", W += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), W += '"', W += o.suppressValue((L = 86, g = 23, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), W += ` data-module="govuk-radios">
    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs") && (W += `
    `, W += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "html"))), 4) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInputs"), "text"), r.opts.autoescape), W += `
    `), W += `
    `, e = e.push();
                              var $ = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
                              if ($) {
                                $ = o.fromIterator($);
                                for (var K = $.length, X = 0; X < $.length; X++) {
                                  var Y = $[X];
                                  e.set("item", Y), e.set("loop.index", X + 1), e.set("loop.index0", X), e.set("loop.revindex", K - X), e.set("loop.revindex0", K - X - 1), e.set("loop.first", X === 0), e.set("loop.last", X === K - 1), e.set("loop.length", K), W += `
      `, Y && (W += o.suppressValue((L = 92, g = 22, o.callWrap(R, "_radioItem", a, [o.contextOrFrameLookup(a, e, "params"), Y, o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index")])), r.opts.autoescape)), W += `
    `;
                                }
                              }
                              return e = e.pop(), W += `
    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs") && (W += `
    `, W += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "html"))), 4) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInputs"), "text"), r.opts.autoescape), W += `
    `), W += `
  </div>
`, W;
                            }(), e.set("innerHtml", Z, !0), e.topLevel && a.setVariable("innerHtml", Z), e.topLevel && a.addExport("innerHtml", Z), s += '<div class="govuk-form-group', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-form-group--error"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 102, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes")])), r.opts.autoescape), s += `>
`, o.contextOrFrameLookup(a, e, "hasFieldset") ? (s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 104, g = 18, o.callWrap(C, "govukFieldset", a, [{ describedBy: o.contextOrFrameLookup(a, e, "describedBy"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "attributes"), legend: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fieldset"), "legend"), html: r.getFilter("trim").call(a, o.contextOrFrameLookup(a, e, "innerHtml")) }]))), 2), r.opts.autoescape), s += `
`) : (s += `
  `, s += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "innerHtml"))), r.opts.autoescape), s += `
`), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/select/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/select/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukSelect"), a.setVariable("govukSelect", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/select/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/select/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../error-message/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/select/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukErrorMessage"))
                  var k = n.govukErrorMessage;
                else {
                  l(new Error("cannot import 'govukErrorMessage'"));
                  return;
                }
                a.setVariable("govukErrorMessage", k), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/select/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukHint"))
                      var C = w.govukHint;
                    else {
                      l(new Error("cannot import 'govukHint'"));
                      return;
                    }
                    a.setVariable("govukHint", C), s += `
`, r.getTemplate("../label/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/select/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukLabel"))
                          var E = V.govukLabel;
                        else {
                          l(new Error("cannot import 'govukLabel'"));
                          return;
                        }
                        a.setVariable("govukLabel", E);
                        var S;
                        S = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") : "", e.set("describedBy", S, !0), e.topLevel && a.setVariable("describedBy", S), e.topLevel && a.addExport("describedBy", S);
                        var T;
                        if (T = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("id", T, !0), e.topLevel && a.setVariable("id", T), e.topLevel && a.addExport("id", T), s += '<div class="govuk-form-group', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-form-group--error"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 11, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes")])), r.opts.autoescape), s += `>
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 12, g = 15, o.callWrap(E, "govukLabel", a, [{ html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "text"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "classes"), isPageHeading: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "isPageHeading"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "attributes"), for: o.contextOrFrameLookup(a, e, "id") }]))), 2), r.opts.autoescape), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint")) {
                          s += `
  `;
                          var H;
                          H = o.contextOrFrameLookup(a, e, "id") + "-hint", e.set("hintId", H, !0), e.topLevel && a.setVariable("hintId", H), e.topLevel && a.addExport("hintId", H), s += `
  `;
                          var I;
                          I = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "hintId") : o.contextOrFrameLookup(a, e, "hintId"), e.set("describedBy", I, !0), e.topLevel && a.setVariable("describedBy", I), e.topLevel && a.addExport("describedBy", I), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 23, g = 14, o.callWrap(C, "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "hintId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "text") }]))), 2), r.opts.autoescape), s += `
`;
                        }
                        if (s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                          s += `
  `;
                          var M;
                          M = o.contextOrFrameLookup(a, e, "id") + "-error", e.set("errorId", M, !0), e.topLevel && a.setVariable("errorId", M), e.topLevel && a.addExport("errorId", M), s += `
  `;
                          var B;
                          B = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "errorId") : o.contextOrFrameLookup(a, e, "errorId"), e.set("describedBy", B, !0), e.topLevel && a.setVariable("describedBy", B), e.topLevel && a.addExport("describedBy", B), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 34, g = 22, o.callWrap(k, "govukErrorMessage", a, [{ id: o.contextOrFrameLookup(a, e, "errorId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "text"), visuallyHiddenText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "visuallyHiddenText") }]))), 2), r.opts.autoescape), s += `
`;
                        }
                        s += `
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput") && (s += `
  `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html"))), 2) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "text"), r.opts.autoescape), s += `
`), s += `
  <select class="govuk-select`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-select--error"), s += '" id="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "id"), r.opts.autoescape), s += '" name="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), r.opts.autoescape), s += '"', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disabled") && (s += " disabled"), o.contextOrFrameLookup(a, e, "describedBy") && (s += ' aria-describedby="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "describedBy"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 50, g = 23, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, e = e.push();
                        var G = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
                        if (G) {
                          G = o.fromIterator(G);
                          for (var N = G.length, R = 0; R < G.length; R++) {
                            var Z = G[R];
                            if (e.set("item", Z), e.set("loop.index", R + 1), e.set("loop.index0", R), e.set("loop.revindex", N - R), e.set("loop.revindex0", N - R - 1), e.set("loop.first", R === 0), e.set("loop.last", R === N - 1), e.set("loop.length", N), s += `
    `, Z) {
                              var W;
                              W = r.getFilter("default").call(a, o.memberLookup(Z, "value"), o.memberLookup(Z, "text")), e.set("effectiveValue", W, !0), e.topLevel && a.setVariable("effectiveValue", W), e.topLevel && a.addExport("effectiveValue", W), s += `
    <option`, o.memberLookup(Z, "value") !== o.contextOrFrameLookup(a, e, "undefined") && (s += ' value="', s += o.suppressValue(o.memberLookup(Z, "value"), r.opts.autoescape), s += '"'), s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(Z, "selected"), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value") ? o.contextOrFrameLookup(a, e, "effectiveValue") == o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value") && o.memberLookup(Z, "selected") != !1 : !1, !0) ? " selected" : "", r.opts.autoescape), s += o.suppressValue(o.memberLookup(Z, "disabled") ? " disabled" : "", r.opts.autoescape), s += o.suppressValue((L = 58, g = 25, o.callWrap(c, "govukAttributes", a, [o.memberLookup(Z, "attributes")])), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(Z, "text"), r.opts.autoescape), s += `</option>
    `;
                            }
                            s += `
  `;
                          }
                        }
                        e = e.pop(), s += `
  </select>
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput") && (s += `
  `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html"))), 2) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "text"), r.opts.autoescape), s += `
`), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/service-navigation/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/service-navigation/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukServiceNavigation"), a.setVariable("govukServiceNavigation", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/service-navigation/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/service-navigation/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u;
            u = r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonText"), "Menu", !0), e.set("menuButtonText", u, !0), e.topLevel && a.setVariable("menuButtonText", u), e.topLevel && a.addExport("menuButtonText", u);
            var t;
            t = r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationId"), "navigation", !0), e.set("navigationId", t, !0), e.topLevel && a.setVariable("navigationId", t), e.topLevel && a.addExport("navigationId", t);
            var p;
            p = function() {
              var k = "";
              return k += `
class="govuk-service-navigation`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (k += " ", k += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), k += `"
data-module="govuk-service-navigation"`, k += o.suppressValue((L = 8, g = 19, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), k += `
`, k;
            }(), e.set("commonAttributes", p, !0), e.topLevel && a.setVariable("commonAttributes", p), e.topLevel && a.addExport("commonAttributes", p);
            var n;
            n = function() {
              var k = "";
              if (k += `
  <div class="govuk-width-container">

    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "start") && (k += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "start")), r.opts.autoescape)), k += `<div class="govuk-service-navigation__container">
      `, k += `
      `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName") && (k += `
        <span class="govuk-service-navigation__service-name">
          `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceUrl") ? (k += `
            <a href="`, k += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceUrl"), r.opts.autoescape), k += `" class="govuk-service-navigation__link">
              `, k += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName"), r.opts.autoescape), k += `
            </a>
          `) : (k += `
            <span class="govuk-service-navigation__text">`, k += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName"), r.opts.autoescape), k += `</span>
          `), k += `
        </span>
      `), k += `

      `, k += `
      `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation")) || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "navigationStart") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "navigationEnd")) {
                k += `
        <nav aria-label="`, k += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationLabel"), o.contextOrFrameLookup(a, e, "menuButtonText"), !0), r.opts.autoescape), k += '" class="govuk-service-navigation__wrapper', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationClasses") && (k += " ", k += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationClasses"), r.opts.autoescape)), k += `">
          <button type="button" class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle" aria-controls="`, k += o.suppressValue(o.contextOrFrameLookup(a, e, "navigationId"), r.opts.autoescape), k += '"', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonLabel") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonLabel") != o.contextOrFrameLookup(a, e, "menuButtonText") && (k += ' aria-label="', k += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "menuButtonLabel"), r.opts.autoescape), k += '"'), k += ` hidden>
            `, k += o.suppressValue(o.contextOrFrameLookup(a, e, "menuButtonText"), r.opts.autoescape), k += `
          </button>

          <ul class="govuk-service-navigation__list" id="`, k += o.suppressValue(o.contextOrFrameLookup(a, e, "navigationId"), r.opts.autoescape), k += `" >

            `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "navigationStart") && (k += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "navigationStart")), r.opts.autoescape)), e = e.push();
                var f = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation");
                if (f) {
                  f = o.fromIterator(f);
                  for (var F = f.length, j = 0; j < f.length; j++) {
                    var w = f[j];
                    e.set("item", w), e.set("loop.index", j + 1), e.set("loop.index0", j), e.set("loop.revindex", F - j), e.set("loop.revindex0", F - j - 1), e.set("loop.first", j === 0), e.set("loop.last", j === F - 1), e.set("loop.length", F), k += `
              `;
                    var C;
                    C = function() {
                      var P = "";
                      return P += `
                `, P += `
                `, o.memberLookup(w, "active") || o.memberLookup(w, "current") ? (P += `
                  <strong class="govuk-service-navigation__active-fallback">`, P += o.suppressValue(o.memberLookup(w, "html") ? r.getFilter("safe").call(a, o.memberLookup(w, "html")) : o.memberLookup(w, "text"), r.opts.autoescape), P += `</strong>
                `) : P += o.suppressValue(o.memberLookup(w, "html") ? r.getFilter("safe").call(a, o.memberLookup(w, "html")) : o.memberLookup(w, "text"), r.opts.autoescape), P += `
              `, P;
                    }(), e.set("linkInnerContent", C, !0), e.topLevel && a.setVariable("linkInnerContent", C), e.topLevel && a.addExport("linkInnerContent", C), k += `

              `, k += `
              <li class="govuk-service-navigation__item`, (o.memberLookup(w, "active") || o.memberLookup(w, "current")) && (k += " govuk-service-navigation__item--active"), k += `">
                `, o.memberLookup(w, "href") ? (k += `
                  <a class="govuk-service-navigation__link" href="`, k += o.suppressValue(o.memberLookup(w, "href"), r.opts.autoescape), k += '"', (o.memberLookup(w, "active") || o.memberLookup(w, "current")) && (k += ' aria-current="', k += o.suppressValue(o.memberLookup(w, "current") ? "page" : "true", r.opts.autoescape), k += '"'), k += o.suppressValue((L = 65, g = 39, o.callWrap(c, "govukAttributes", a, [o.memberLookup(w, "attributes")])), r.opts.autoescape), k += `>
                    `, k += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "linkInnerContent")), r.opts.autoescape), k += `
                  </a>
                `) : (o.memberLookup(w, "html") || o.memberLookup(w, "text")) && (k += `
                  <span class="govuk-service-navigation__text"`, (o.memberLookup(w, "active") || o.memberLookup(w, "current")) && (k += ' aria-current="', k += o.suppressValue(o.memberLookup(w, "current") ? "page" : "true", r.opts.autoescape), k += '"'), k += `>
                    `, k += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "linkInnerContent")), r.opts.autoescape), k += `
                  </span>
                `), k += `
              </li>
            `;
                  }
                }
                e = e.pop(), k += `

            `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "navigationEnd") && (k += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "navigationEnd")), r.opts.autoescape)), k += `</ul>
        </nav>
      `;
              }
              return k += `
    </div>

    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "end") && (k += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "end")), r.opts.autoescape)), k += `</div>
`, k;
            }(), e.set("innerContent", n, !0), e.topLevel && a.setVariable("innerContent", n), e.topLevel && a.addExport("innerContent", n), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "serviceName") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "start") || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "slots"), "end") ? (s += `
  <section aria-label="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "ariaLabel"), "Service information"), r.opts.autoescape), s += '" ', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += `>
    `, s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "innerContent")), r.opts.autoescape), s += `
  </section>
`) : (s += `
  <div `, s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += `>
    `, s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "innerContent")), r.opts.autoescape), s += `
  </div>
`), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/skip-link/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/skip-link/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukSkipLink"), a.setVariable("govukSkipLink", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/skip-link/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/skip-link/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += '<a href="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href"), "#content", !0), r.opts.autoescape), s += '" class="govuk-skip-link', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += ' data-module="govuk-skip-link">', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html")) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `</a>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/summary-list/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/summary-list/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukSummaryList"), a.setVariable("govukSummaryList", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/summary-list/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/summary-list/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u = o.makeMacro(
              ["action", "cardTitle"],
              [],
              function(C, P, y) {
                var O = e;
                e = new o.Frame(), y = y || {}, Object.prototype.hasOwnProperty.call(y, "caller") && e.set("caller", y.caller), e.set("action", C), e.set("cardTitle", P);
                var V = "";
                return V += `
  <a class="govuk-link`, o.memberLookup(C, "classes") && (V += " ", V += o.suppressValue(o.memberLookup(C, "classes"), r.opts.autoescape)), V += '" href="', V += o.suppressValue(o.memberLookup(C, "href"), r.opts.autoescape), V += '"', V += o.suppressValue((L = 4, g = 23, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(C, "attributes")])), r.opts.autoescape), V += ">", V += o.suppressValue(o.memberLookup(C, "html") ? r.getFilter("indent").call(a, r.getFilter("safe").call(a, o.memberLookup(C, "html")), 4) : o.memberLookup(C, "text"), r.opts.autoescape), (o.memberLookup(C, "visuallyHiddenText") || P) && (V += '<span class="govuk-visually-hidden">', o.memberLookup(C, "visuallyHiddenText") && (V += " ", V += o.suppressValue(o.memberLookup(C, "visuallyHiddenText"), r.opts.autoescape)), P && (V += " (", V += o.suppressValue(o.memberLookup(P, "html") ? r.getFilter("safe").call(a, r.getFilter("indent").call(a, o.memberLookup(P, "html"), 6)) : o.memberLookup(P, "text"), r.opts.autoescape), V += ")"), V += "</span>"), V += `</a>
`, e = O, new o.SafeString(V);
              }
            );
            a.setVariable("_actionLink", u);
            var t = o.makeMacro(
              ["params"],
              [],
              function(C, P) {
                var y = e;
                e = new o.Frame(), P = P || {}, Object.prototype.hasOwnProperty.call(P, "caller") && e.set("caller", P.caller), e.set("params", C);
                var O = "", V;
                if (V = o.memberLookup(o.memberLookup(C, "title"), "headingLevel") ? o.memberLookup(o.memberLookup(C, "title"), "headingLevel") : 2, e.set("headingLevel", V, !0), e.topLevel && a.setVariable("headingLevel", V), e.topLevel && a.addExport("headingLevel", V), O += '<div class="govuk-summary-card', o.memberLookup(C, "classes") && (O += " ", O += o.suppressValue(o.memberLookup(C, "classes"), r.opts.autoescape)), O += '"', O += o.suppressValue((L = 19, g = 21, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(C, "attributes")])), r.opts.autoescape), O += `>
  <div class="govuk-summary-card__title-wrapper">
  `, o.memberLookup(C, "title") && (O += `
    <h`, O += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), O += ' class="govuk-summary-card__title', o.memberLookup(o.memberLookup(C, "title"), "classes") && (O += " ", O += o.suppressValue(o.memberLookup(o.memberLookup(C, "title"), "classes"), r.opts.autoescape)), O += `">
      `, O += o.suppressValue(o.memberLookup(o.memberLookup(C, "title"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(C, "title"), "html"))), 6) : o.memberLookup(o.memberLookup(C, "title"), "text"), r.opts.autoescape), O += `
    </h`, O += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), O += `>
  `), O += `
  `, o.memberLookup(o.memberLookup(o.memberLookup(C, "actions"), "items"), "length")) {
                  if (O += `
    `, o.memberLookup(o.memberLookup(o.memberLookup(C, "actions"), "items"), "length") == 1)
                    O += `
    <div class="govuk-summary-card__actions`, o.memberLookup(o.memberLookup(C, "actions"), "classes") && (O += " ", O += o.suppressValue(o.memberLookup(o.memberLookup(C, "actions"), "classes"), r.opts.autoescape)), O += `">
      `, O += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 29, g = 20, o.callWrap(o.contextOrFrameLookup(a, e, "_actionLink"), "_actionLink", a, [o.memberLookup(o.memberLookup(o.memberLookup(C, "actions"), "items"), 0), o.memberLookup(C, "title")]))), 4), r.opts.autoescape), O += `
    </div>
    `;
                  else {
                    O += `
    <ul class="govuk-summary-card__actions`, o.memberLookup(o.memberLookup(C, "actions"), "classes") && (O += " ", O += o.suppressValue(o.memberLookup(o.memberLookup(C, "actions"), "classes"), r.opts.autoescape)), O += `">
      `, e = e.push();
                    var E = o.memberLookup(o.memberLookup(C, "actions"), "items");
                    if (E) {
                      E = o.fromIterator(E);
                      for (var S = E.length, T = 0; T < E.length; T++) {
                        var H = E[T];
                        e.set("action", H), e.set("loop.index", T + 1), e.set("loop.index0", T), e.set("loop.revindex", S - T), e.set("loop.revindex0", S - T - 1), e.set("loop.first", T === 0), e.set("loop.last", T === S - 1), e.set("loop.length", S), O += `
      <li class="govuk-summary-card__action">
        `, O += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 35, g = 22, o.callWrap(o.contextOrFrameLookup(a, e, "_actionLink"), "_actionLink", a, [H, o.memberLookup(C, "title")]))), 8), r.opts.autoescape), O += `
      </li>
      `;
                      }
                    }
                    e = e.pop(), O += `
    </ul>
    `;
                  }
                  O += `
  `;
                }
                return O += `
  </div>

  <div class="govuk-summary-card__content">
    `, O += o.suppressValue(r.getFilter("trim").call(a, (L = 44, g = 13, o.callWrap(o.contextOrFrameLookup(a, e, "caller"), "caller", a, []))), r.opts.autoescape), O += `
  </div>
</div>
`, e = y, new o.SafeString(O);
              }
            );
            a.setVariable("_summaryCard", t);
            var p;
            p = !1, e.set("anyRowHasActions", p, !0), e.topLevel && a.setVariable("anyRowHasActions", p), e.topLevel && a.addExport("anyRowHasActions", p), s += `
`, e = e.push();
            var n = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "rows");
            if (n) {
              n = o.fromIterator(n);
              for (var k = n.length, f = 0; f < n.length; f++) {
                var F = n[f];
                e.set("row", F), e.set("loop.index", f + 1), e.set("loop.index0", f), e.set("loop.revindex", k - f), e.set("loop.revindex0", k - f - 1), e.set("loop.first", f === 0), e.set("loop.last", f === k - 1), e.set("loop.length", k), s += `
  `;
                var j;
                j = r.getFilter("length").call(a, o.memberLookup(o.memberLookup(F, "actions"), "items")) ? !0 : o.contextOrFrameLookup(a, e, "anyRowHasActions"), e.set("anyRowHasActions", j, !0), e.topLevel && a.setVariable("anyRowHasActions", j), e.topLevel && a.addExport("anyRowHasActions", j), s += `
`;
              }
            }
            e = e.pop();
            var w;
            w = function() {
              var C = "";
              C += `
<dl class="govuk-summary-list`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (C += " ", C += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), C += '"', C += o.suppressValue((L = 56, g = 107, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), C += `>
`, e = e.push();
              var P = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "rows");
              if (P) {
                P = o.fromIterator(P);
                for (var y = P.length, O = 0; O < P.length; O++) {
                  var V = P[O];
                  if (e.set("row", V), e.set("loop.index", O + 1), e.set("loop.index0", O), e.set("loop.revindex", y - O), e.set("loop.revindex0", y - O - 1), e.set("loop.first", O === 0), e.set("loop.last", O === y - 1), e.set("loop.length", y), C += `
  `, V) {
                    if (C += `
  <div class="govuk-summary-list__row`, o.contextOrFrameLookup(a, e, "anyRowHasActions") && !o.memberLookup(o.memberLookup(V, "actions"), "items") && (C += " govuk-summary-list__row--no-actions"), o.memberLookup(V, "classes") && (C += " ", C += o.suppressValue(o.memberLookup(V, "classes"), r.opts.autoescape)), C += `">
    <dt class="govuk-summary-list__key`, o.memberLookup(o.memberLookup(V, "key"), "classes") && (C += " ", C += o.suppressValue(o.memberLookup(o.memberLookup(V, "key"), "classes"), r.opts.autoescape)), C += `">
      `, C += o.suppressValue(o.memberLookup(o.memberLookup(V, "key"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(V, "key"), "html"))), 6) : o.memberLookup(o.memberLookup(V, "key"), "text"), r.opts.autoescape), C += `
    </dt>
    <dd class="govuk-summary-list__value`, o.memberLookup(o.memberLookup(V, "value"), "classes") && (C += " ", C += o.suppressValue(o.memberLookup(o.memberLookup(V, "value"), "classes"), r.opts.autoescape)), C += `">
      `, C += o.suppressValue(o.memberLookup(o.memberLookup(V, "value"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(V, "value"), "html"))), 6) : o.memberLookup(o.memberLookup(V, "value"), "text"), r.opts.autoescape), C += `
    </dd>
    `, o.memberLookup(o.memberLookup(o.memberLookup(V, "actions"), "items"), "length")) {
                      if (C += `
    <dd class="govuk-summary-list__actions`, o.memberLookup(o.memberLookup(V, "actions"), "classes") && (C += " ", C += o.suppressValue(o.memberLookup(o.memberLookup(V, "actions"), "classes"), r.opts.autoescape)), C += `">
      `, o.memberLookup(o.memberLookup(o.memberLookup(V, "actions"), "items"), "length") == 1)
                        C += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 69, g = 23, o.callWrap(u, "_actionLink", a, [o.memberLookup(o.memberLookup(o.memberLookup(V, "actions"), "items"), 0), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "card"), "title")]))), 6, !0), r.opts.autoescape), C += `
      `;
                      else {
                        C += `
      <ul class="govuk-summary-list__actions-list">
        `, e = e.push();
                        var E = o.memberLookup(o.memberLookup(V, "actions"), "items");
                        if (E) {
                          E = o.fromIterator(E);
                          for (var S = E.length, T = 0; T < E.length; T++) {
                            var H = E[T];
                            e.set("action", H), e.set("loop.index", T + 1), e.set("loop.index0", T), e.set("loop.revindex", S - T), e.set("loop.revindex0", S - T - 1), e.set("loop.first", T === 0), e.set("loop.last", T === S - 1), e.set("loop.length", S), C += `
        <li class="govuk-summary-list__actions-list-item">
          `, C += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 74, g = 24, o.callWrap(u, "_actionLink", a, [H, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "card"), "title")]))), 8), r.opts.autoescape), C += `
        </li>
        `;
                          }
                        }
                        e = e.pop(), C += `
      </ul>
      `;
                      }
                      C += `
    </dd>
    `;
                    }
                    C += `
  </div>
  `;
                  }
                  C += `
`;
                }
              }
              return e = e.pop(), C += `
</dl>`, C;
            }(), e.set("summaryList", w, !0), e.topLevel && a.setVariable("summaryList", w), e.topLevel && a.addExport("summaryList", w), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "card") ? s += o.suppressValue((L = 88, g = 22, o.callWrap(t, "_summaryCard", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "card"), o.makeKeywordArgs({ caller: function() {
              var C = o.makeMacro(
                [],
                [],
                function(P) {
                  var y = e;
                  e = e.push(!0), P = P || {}, Object.prototype.hasOwnProperty.call(P, "caller") && e.set("caller", P.caller);
                  var O = "";
                  return O += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "summaryList"))), 4), r.opts.autoescape), e = e.pop(), new o.SafeString(O);
                }
              );
              return C;
            }() })])), r.opts.autoescape) : s += o.suppressValue(r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "summaryList"))), r.opts.autoescape), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/table/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/table/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukTable"), a.setVariable("govukTable", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/table/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/table/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            if (a.setVariable("govukAttributes", c), s += '<table class="govuk-table', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 4, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "caption") && (s += `
  <caption class="govuk-table__caption`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "captionClasses") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "captionClasses"), r.opts.autoescape)), s += '">', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "caption"), r.opts.autoescape), s += `</caption>
`), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "head")) {
              s += `
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
    `, e = e.push();
              var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "head");
              if (u) {
                u = o.fromIterator(u);
                for (var t = u.length, p = 0; p < u.length; p++) {
                  var n = u[p];
                  e.set("item", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
      <th scope="col" class="govuk-table__header`, o.memberLookup(n, "format") && (s += " govuk-table__header--", s += o.suppressValue(o.memberLookup(n, "format"), r.opts.autoescape)), o.memberLookup(n, "classes") && (s += " ", s += o.suppressValue(o.memberLookup(n, "classes"), r.opts.autoescape)), s += '"', o.memberLookup(n, "colspan") && (s += ' colspan="', s += o.suppressValue(o.memberLookup(n, "colspan"), r.opts.autoescape), s += '"'), o.memberLookup(n, "rowspan") && (s += ' rowspan="', s += o.suppressValue(o.memberLookup(n, "rowspan"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 20, g = 27, o.callWrap(c, "govukAttributes", a, [o.memberLookup(n, "attributes")])), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(n, "html") ? r.getFilter("safe").call(a, o.memberLookup(n, "html")) : o.memberLookup(n, "text"), r.opts.autoescape), s += `</th>
    `;
                }
              }
              e = e.pop(), s += `
    </tr>
  </thead>
`;
            }
            s += `
  <tbody class="govuk-table__body">
`, e = e.push();
            var k = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "rows");
            if (k) {
              k = o.fromIterator(k);
              for (var f = k.length, F = 0; F < k.length; F++) {
                var j = k[F];
                if (e.set("row", j), e.set("loop.index", F + 1), e.set("loop.index0", F), e.set("loop.revindex", f - F), e.set("loop.revindex0", f - F - 1), e.set("loop.first", F === 0), e.set("loop.last", F === f - 1), e.set("loop.length", f), s += `
  `, j) {
                  s += `
    <tr class="govuk-table__row">
    `, e = e.push();
                  var w = j;
                  if (w) {
                    w = o.fromIterator(w);
                    for (var C = w.length, P = 0; P < w.length; P++) {
                      var y = w[P];
                      e.set("cell", y), e.set("loop.index", P + 1), e.set("loop.index0", P), e.set("loop.revindex", C - P), e.set("loop.revindex0", C - P - 1), e.set("loop.first", P === 0), e.set("loop.last", P === C - 1), e.set("loop.length", C), s += `
      `;
                      var O;
                      O = function() {
                        var V = "";
                        return o.memberLookup(y, "colspan") && (V += ' colspan="', V += o.suppressValue(o.memberLookup(y, "colspan"), r.opts.autoescape), V += '"'), o.memberLookup(y, "rowspan") && (V += ' rowspan="', V += o.suppressValue(o.memberLookup(y, "rowspan"), r.opts.autoescape), V += '"'), V += o.suppressValue((L = 35, g = 27, o.callWrap(c, "govukAttributes", a, [o.memberLookup(y, "attributes")])), r.opts.autoescape), V;
                      }(), e.set("commonAttributes", O, !0), e.topLevel && a.setVariable("commonAttributes", O), e.topLevel && a.addExport("commonAttributes", O), s += `
      `, o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "first") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "firstCellIsHeader") ? (s += `
      <th scope="row" class="govuk-table__header`, o.memberLookup(y, "classes") && (s += " ", s += o.suppressValue(o.memberLookup(y, "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(y, "html") ? r.getFilter("safe").call(a, o.memberLookup(y, "html")) : o.memberLookup(y, "text"), r.opts.autoescape), s += `</th>
      `) : (s += `
      <td class="govuk-table__cell`, o.memberLookup(y, "format") && (s += " govuk-table__cell--", s += o.suppressValue(o.memberLookup(y, "format"), r.opts.autoescape)), o.memberLookup(y, "classes") && (s += " ", s += o.suppressValue(o.memberLookup(y, "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(y, "html") ? r.getFilter("safe").call(a, o.memberLookup(y, "html")) : o.memberLookup(y, "text"), r.opts.autoescape), s += `</td>
      `), s += `
    `;
                    }
                  }
                  e = e.pop(), s += `
    </tr>
  `;
                }
                s += `
`;
              }
            }
            e = e.pop(), s += `
  </tbody>
</table>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/tabs/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/tabs/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukTabs"), a.setVariable("govukTabs", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/tabs/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/tabs/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c);
            var u = o.makeMacro(
              ["params", "item", "index"],
              [],
              function(y, O, V, E) {
                var S = e;
                e = new o.Frame(), E = E || {}, Object.prototype.hasOwnProperty.call(E, "caller") && e.set("caller", E.caller), e.set("params", y), e.set("item", O), e.set("index", V);
                var T = "";
                T += `
`;
                var H;
                return H = o.memberLookup(O, "id") ? o.memberLookup(O, "id") : o.contextOrFrameLookup(a, e, "idPrefix") + "-" + V, e.set("tabPanelId", H, !0), e.topLevel && a.setVariable("tabPanelId", H), e.topLevel && a.addExport("tabPanelId", H), T += '<li class="govuk-tabs__list-item', V == 1 && (T += " govuk-tabs__list-item--selected"), T += `">
  <a class="govuk-tabs__tab" href="#`, T += o.suppressValue(o.contextOrFrameLookup(a, e, "tabPanelId"), r.opts.autoescape), T += '"', T += o.suppressValue((L = 6, g = 23, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(O, "attributes")])), r.opts.autoescape), T += `>
    `, T += o.suppressValue(o.memberLookup(O, "label"), r.opts.autoescape), T += `
  </a>
</li>
`, e = S, new o.SafeString(T);
              }
            );
            a.setVariable("_tabListItem", u);
            var t = o.makeMacro(
              ["params", "item", "index"],
              [],
              function(y, O, V, E) {
                var S = e;
                e = new o.Frame(), E = E || {}, Object.prototype.hasOwnProperty.call(E, "caller") && e.set("caller", E.caller), e.set("params", y), e.set("item", O), e.set("index", V);
                var T = "";
                T += `
`;
                var H;
                return H = o.memberLookup(O, "id") ? o.memberLookup(O, "id") : o.contextOrFrameLookup(a, e, "idPrefix") + "-" + V, e.set("tabPanelId", H, !0), e.topLevel && a.setVariable("tabPanelId", H), e.topLevel && a.addExport("tabPanelId", H), T += '<div class="govuk-tabs__panel', V > 1 && (T += " govuk-tabs__panel--hidden"), T += '" id="', T += o.suppressValue(o.contextOrFrameLookup(a, e, "tabPanelId"), r.opts.autoescape), T += '"', T += o.suppressValue((L = 15, g = 21, o.callWrap(o.contextOrFrameLookup(a, e, "govukAttributes"), "govukAttributes", a, [o.memberLookup(o.memberLookup(O, "panel"), "attributes")])), r.opts.autoescape), T += `>
`, o.memberLookup(o.memberLookup(O, "panel"), "html") ? (T += `
  `, T += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(O, "panel"), "html"))), 2), r.opts.autoescape), T += `
`) : o.memberLookup(o.memberLookup(O, "panel"), "text") && (T += `
  <p class="govuk-body">`, T += o.suppressValue(o.memberLookup(o.memberLookup(O, "panel"), "text"), r.opts.autoescape), T += `</p>
`), T += `
</div>
`, e = S, new o.SafeString(T);
              }
            );
            a.setVariable("_tabPanel", t);
            var p;
            if (p = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") : "", e.set("idPrefix", p, !0), e.topLevel && a.setVariable("idPrefix", p), e.topLevel && a.addExport("idPrefix", p), s += "<div", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") && (s += ' id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += '"'), s += ' class="govuk-tabs', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 29, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += ` data-module="govuk-tabs">
  <h2 class="govuk-tabs__title">
    `, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "title"), "Contents"), r.opts.autoescape), s += `
  </h2>
`, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items"))) {
              s += `
  <ul class="govuk-tabs__list">
    `, e = e.push();
              var n = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
              if (n) {
                n = o.fromIterator(n);
                for (var k = n.length, f = 0; f < n.length; f++) {
                  var F = n[f];
                  e.set("item", F), e.set("loop.index", f + 1), e.set("loop.index0", f), e.set("loop.revindex", k - f), e.set("loop.revindex0", k - f - 1), e.set("loop.first", f === 0), e.set("loop.last", f === k - 1), e.set("loop.length", k), s += `
      `, F && (s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 37, g = 24, o.callWrap(u, "_tabListItem", a, [o.contextOrFrameLookup(a, e, "params"), F, o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index")]))), 4, !0), r.opts.autoescape), s += `
      `), s += `
    `;
                }
              }
              e = e.pop(), s += `
  </ul>
  `, e = e.push();
              var j = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
              if (j) {
                j = o.fromIterator(j);
                for (var w = j.length, C = 0; C < j.length; C++) {
                  var P = j[C];
                  e.set("item", P), e.set("loop.index", C + 1), e.set("loop.index0", C), e.set("loop.revindex", w - C), e.set("loop.revindex0", w - C - 1), e.set("loop.first", C === 0), e.set("loop.last", C === w - 1), e.set("loop.length", w), s += `
    `, P && (s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 43, g = 19, o.callWrap(t, "_tabPanel", a, [o.contextOrFrameLookup(a, e, "params"), P, o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index")]))), 2, !0), r.opts.autoescape), s += `
    `), s += `
  `;
                }
              }
              e = e.pop(), s += `
`;
            }
            s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/tag/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/tag/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukTag"), a.setVariable("govukTag", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/tag/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/tag/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += '<strong class="govuk-tag', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html"))), 2) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
</strong>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/task-list/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/task-list/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukTaskList"), a.setVariable("govukTaskList", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/task-list/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/task-list/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../tag/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/task-list/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukTag"))
                  var k = n.govukTag;
                else {
                  l(new Error("cannot import 'govukTag'"));
                  return;
                }
                a.setVariable("govukTag", k);
                var f;
                f = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "idPrefix") : "task-list", e.set("idPrefix", f, !0), e.topLevel && a.setVariable("idPrefix", f), e.topLevel && a.addExport("idPrefix", f);
                var F = o.makeMacro(
                  ["params", "item", "index"],
                  [],
                  function(y, O, V, E) {
                    var S = e;
                    e = new o.Frame(), E = E || {}, Object.prototype.hasOwnProperty.call(E, "caller") && e.set("caller", E.caller), e.set("params", y), e.set("item", O), e.set("index", V);
                    var T = "", H;
                    H = o.contextOrFrameLookup(a, e, "idPrefix") + "-" + V + "-hint", e.set("hintId", H, !0), e.topLevel && a.setVariable("hintId", H), e.topLevel && a.addExport("hintId", H);
                    var I;
                    return I = o.contextOrFrameLookup(a, e, "idPrefix") + "-" + V + "-status", e.set("statusId", I, !0), e.topLevel && a.setVariable("statusId", I), e.topLevel && a.addExport("statusId", I), T += `
  <li class="govuk-task-list__item`, o.memberLookup(O, "href") && (T += " govuk-task-list__item--with-link"), o.memberLookup(O, "classes") && (T += " ", T += o.suppressValue(o.memberLookup(O, "classes"), r.opts.autoescape)), T += `">
    <div class="govuk-task-list__name-and-hint">
    `, o.memberLookup(O, "href") ? (T += `
      <a class="govuk-link govuk-task-list__link`, o.memberLookup(o.memberLookup(O, "title"), "classes") && (T += " ", T += o.suppressValue(o.memberLookup(o.memberLookup(O, "title"), "classes"), r.opts.autoescape)), T += '" href="', T += o.suppressValue(o.memberLookup(O, "href"), r.opts.autoescape), T += '" aria-describedby="', T += o.suppressValue(o.memberLookup(O, "hint") ? o.contextOrFrameLookup(a, e, "hintId") + " " : "", r.opts.autoescape), T += o.suppressValue(o.contextOrFrameLookup(a, e, "statusId"), r.opts.autoescape), T += `">
        `, T += o.suppressValue(o.memberLookup(o.memberLookup(O, "title"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(O, "title"), "html"))), 8) : o.memberLookup(o.memberLookup(O, "title"), "text"), r.opts.autoescape), T += `
      </a>
    `) : (T += `
      <div`, o.memberLookup(o.memberLookup(O, "title"), "classes") && (T += ' class="', T += o.suppressValue(o.memberLookup(o.memberLookup(O, "title"), "classes"), r.opts.autoescape), T += '"'), T += `>
        `, T += o.suppressValue(o.memberLookup(o.memberLookup(O, "title"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(O, "title"), "html"))), 8) : o.memberLookup(o.memberLookup(O, "title"), "text"), r.opts.autoescape), T += `
      </div>
    `), T += `
    `, o.memberLookup(O, "hint") && (T += `
      <div id="`, T += o.suppressValue(o.contextOrFrameLookup(a, e, "hintId"), r.opts.autoescape), T += `" class="govuk-task-list__hint">
        `, T += o.suppressValue(o.memberLookup(o.memberLookup(O, "hint"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(O, "hint"), "html"))), 8) : o.memberLookup(o.memberLookup(O, "hint"), "text"), r.opts.autoescape), T += `
      </div>
    `), T += `
    </div>
    <div class="govuk-task-list__status`, o.memberLookup(o.memberLookup(O, "status"), "classes") && (T += " ", T += o.suppressValue(o.memberLookup(o.memberLookup(O, "status"), "classes"), r.opts.autoescape)), T += '" id="', T += o.suppressValue(o.contextOrFrameLookup(a, e, "statusId"), r.opts.autoescape), T += `">
    `, o.memberLookup(o.memberLookup(O, "status"), "tag") ? (T += `
      `, T += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 27, g = 17, o.callWrap(o.contextOrFrameLookup(a, e, "govukTag"), "govukTag", a, [o.memberLookup(o.memberLookup(O, "status"), "tag")]))), 6), r.opts.autoescape), T += `
    `) : (T += `
      `, T += o.suppressValue(o.memberLookup(o.memberLookup(O, "status"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(O, "status"), "html"))), 6) : o.memberLookup(o.memberLookup(O, "status"), "text"), r.opts.autoescape), T += `
    `), T += `
    </div>
  </li>`, e = S, new o.SafeString(T);
                  }
                );
                a.setVariable("_taskListItem", F), s += `

<ul class="govuk-task-list`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 36, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  `, e = e.push();
                var j = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
                if (j) {
                  j = o.fromIterator(j);
                  for (var w = j.length, C = 0; C < j.length; C++) {
                    var P = j[C];
                    e.set("item", P), e.set("loop.index", C + 1), e.set("loop.index0", C), e.set("loop.revindex", w - C), e.set("loop.revindex0", w - C - 1), e.set("loop.first", C === 0), e.set("loop.last", C === w - 1), e.set("loop.length", w), s += o.suppressValue(P ? (L = 38, g = 21, o.callWrap(F, "_taskListItem", a, [o.contextOrFrameLookup(a, e, "params"), P, o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index")])) : "", r.opts.autoescape), s += `
  `;
                  }
                }
                e = e.pop(), s += `
</ul>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/textarea/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/textarea/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukTextarea"), a.setVariable("govukTextarea", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/textarea/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/textarea/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += `
`, r.getTemplate("../error-message/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/textarea/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "govukErrorMessage"))
                  var k = n.govukErrorMessage;
                else {
                  l(new Error("cannot import 'govukErrorMessage'"));
                  return;
                }
                a.setVariable("govukErrorMessage", k), s += `
`, r.getTemplate("../hint/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/textarea/template.njk", !1, function(f, F) {
                  if (f) {
                    l(f);
                    return;
                  }
                  F.getExported(function(j, w) {
                    if (j) {
                      l(j);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(w, "govukHint"))
                      var C = w.govukHint;
                    else {
                      l(new Error("cannot import 'govukHint'"));
                      return;
                    }
                    a.setVariable("govukHint", C), s += `
`, r.getTemplate("../label/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/textarea/template.njk", !1, function(P, y) {
                      if (P) {
                        l(P);
                        return;
                      }
                      y.getExported(function(O, V) {
                        if (O) {
                          l(O);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(V, "govukLabel"))
                          var E = V.govukLabel;
                        else {
                          l(new Error("cannot import 'govukLabel'"));
                          return;
                        }
                        a.setVariable("govukLabel", E);
                        var S;
                        S = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "describedBy") : "", e.set("describedBy", S, !0), e.topLevel && a.setVariable("describedBy", S), e.topLevel && a.addExport("describedBy", S);
                        var T;
                        if (T = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id") : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), e.set("id", T, !0), e.topLevel && a.setVariable("id", T), e.topLevel && a.addExport("id", T), s += '<div class="govuk-form-group', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-form-group--error"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 11, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "attributes")])), r.opts.autoescape), s += `>
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 12, g = 15, o.callWrap(E, "govukLabel", a, [{ html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "text"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "classes"), isPageHeading: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "isPageHeading"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "label"), "attributes"), for: o.contextOrFrameLookup(a, e, "id") }]))), 2), r.opts.autoescape), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint")) {
                          s += `
  `;
                          var H;
                          H = o.contextOrFrameLookup(a, e, "id") + "-hint", e.set("hintId", H, !0), e.topLevel && a.setVariable("hintId", H), e.topLevel && a.addExport("hintId", H), s += `
  `;
                          var I;
                          I = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "hintId") : o.contextOrFrameLookup(a, e, "hintId"), e.set("describedBy", I, !0), e.topLevel && a.setVariable("describedBy", I), e.topLevel && a.addExport("describedBy", I), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 23, g = 14, o.callWrap(C, "govukHint", a, [{ id: o.contextOrFrameLookup(a, e, "hintId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "hint"), "text") }]))), 2), r.opts.autoescape), s += `
`;
                        }
                        if (s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage")) {
                          s += `
  `;
                          var M;
                          M = o.contextOrFrameLookup(a, e, "id") + "-error", e.set("errorId", M, !0), e.topLevel && a.setVariable("errorId", M), e.topLevel && a.addExport("errorId", M), s += `
  `;
                          var B;
                          B = o.contextOrFrameLookup(a, e, "describedBy") ? o.contextOrFrameLookup(a, e, "describedBy") + " " + o.contextOrFrameLookup(a, e, "errorId") : o.contextOrFrameLookup(a, e, "errorId"), e.set("describedBy", B, !0), e.topLevel && a.setVariable("describedBy", B), e.topLevel && a.addExport("describedBy", B), s += `
  `, s += o.suppressValue(r.getFilter("indent").call(a, r.getFilter("trim").call(a, (L = 34, g = 22, o.callWrap(k, "govukErrorMessage", a, [{ id: o.contextOrFrameLookup(a, e, "errorId"), classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "classes"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "attributes"), html: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "html"), text: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "text"), visuallyHiddenText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage"), "visuallyHiddenText") }]))), 2), r.opts.autoescape), s += `
`;
                        }
                        s += `
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput") && (s += `
  `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "html"))), 2) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "beforeInput"), "text"), r.opts.autoescape), s += `
`), s += `
  <textarea class="govuk-textarea`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "errorMessage") && (s += " govuk-textarea--error"), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '" id="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "id"), r.opts.autoescape), s += '" name="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), r.opts.autoescape), s += '" rows="', s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "rows"), 5, !0), r.opts.autoescape), s += '"', (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "spellcheck") === !1 || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "spellcheck") === !0) && (s += ' spellcheck="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "spellcheck"), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disabled") && (s += " disabled"), o.contextOrFrameLookup(a, e, "describedBy") && (s += ' aria-describedby="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "describedBy"), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "autocomplete") && (s += ' autocomplete="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "autocomplete"), r.opts.autoescape), s += '"'), s += o.suppressValue((L = 51, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += ">", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value"), r.opts.autoescape), s += `</textarea>
`, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput") && (s += `
  `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "html"))), 2) : o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "formGroup"), "afterInput"), "text"), r.opts.autoescape), s += `
`), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/warning-text/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/warning-text/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukWarningText"), a.setVariable("govukWarningText", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/components/warning-text/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/components/warning-text/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "govukAttributes"))
              var c = h.govukAttributes;
            else {
              l(new Error("cannot import 'govukAttributes'"));
              return;
            }
            a.setVariable("govukAttributes", c), s += '<div class="govuk-warning-text', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += '"', s += o.suppressValue((L = 3, g = 21, o.callWrap(c, "govukAttributes", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes")])), r.opts.autoescape), s += `>
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "iconFallbackText"), "Warning", !0), r.opts.autoescape), s += `</span>
    `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html")) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
  </strong>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/macros/attributes.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += `
`;
        var b = o.makeMacro(
          ["attributes"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("attributes", m);
            var c = "", u;
            if (u = r.getTest("string").call(a, m) === !0 ? m : "", e.set("attributesHtml", u, !0), e.topLevel && a.setVariable("attributesHtml", u), e.topLevel && a.addExport("attributesHtml", u), r.getTest("mapping").call(a, m) === !0) {
              c += `
    `, e = e.push();
              var t = m;
              if (t) {
                t = o.fromIterator(t);
                var p;
                if (o.isArray(t)) {
                  var n = t.length;
                  for (p = 0; p < t.length; p++) {
                    var k = t[p][0];
                    e.set("[object Object]", t[p][0]);
                    var f = t[p][1];
                    e.set("[object Object]", t[p][1]), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", n - p), e.set("loop.revindex0", n - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === n - 1), e.set("loop.length", n), r.getTest("mapping").call(a, f) === !0 && (L = 72, g = 63, !o.callWrap(o.memberLookup([o.contextOrFrameLookup(a, e, "undefined"), null], "includes"), '--expression--["includes"]', a, [o.memberLookup(f, "val")])) && o.memberLookup(f, "length") && (c += `
        `, f = o.memberLookup(f, "val"), e.set("value", f, !0), e.topLevel && a.setVariable("value", f), e.topLevel && a.addExport("value", f), c += `
      `);
                    var F;
                    if (F = r.getTest("mapping").call(a, f) === !0 ? f : { value: f, optional: !1 }, e.set("options", F, !0), e.topLevel && a.setVariable("options", F), e.topLevel && a.addExport("options", F), o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "optional") === !0 && o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "value") === !0) {
                      c += `
        `;
                      var j;
                      j = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, k), e.set("attributesHtml", j, !0), e.topLevel && a.setVariable("attributesHtml", j), e.topLevel && a.addExport("attributesHtml", j);
                    } else if (o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "optional") === !0 && (L = 86, g = 82, !o.callWrap(o.memberLookup([o.contextOrFrameLookup(a, e, "undefined"), null, !1], "includes"), '--expression--["includes"]', a, [o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "value")])) || o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "optional") !== !0) {
                      c += `
        `;
                      var w;
                      w = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, k) + '="' + r.getFilter("escape").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "value")) + '"', e.set("attributesHtml", w, !0), e.topLevel && a.setVariable("attributesHtml", w), e.topLevel && a.addExport("attributesHtml", w), c += `
      `;
                    }
                    c += `
    `;
                  }
                } else {
                  p = -1;
                  var n = o.keys(t).length;
                  for (var C in t) {
                    p++;
                    var P = t[C];
                    e.set("name", C), e.set("value", P), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", n - p), e.set("loop.revindex0", n - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === n - 1), e.set("loop.length", n), r.getTest("mapping").call(a, P) === !0 && (L = 72, g = 63, !o.callWrap(o.memberLookup([o.contextOrFrameLookup(a, e, "undefined"), null], "includes"), '--expression--["includes"]', a, [o.memberLookup(P, "val")])) && o.memberLookup(P, "length") && (c += `
        `, P = o.memberLookup(P, "val"), e.set("value", P, !0), e.topLevel && a.setVariable("value", P), e.topLevel && a.addExport("value", P), c += `
      `);
                    var y;
                    if (y = r.getTest("mapping").call(a, P) === !0 ? P : { value: P, optional: !1 }, e.set("options", y, !0), e.topLevel && a.setVariable("options", y), e.topLevel && a.addExport("options", y), o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "optional") === !0 && o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "value") === !0) {
                      c += `
        `;
                      var O;
                      O = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, C), e.set("attributesHtml", O, !0), e.topLevel && a.setVariable("attributesHtml", O), e.topLevel && a.addExport("attributesHtml", O);
                    } else if (o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "optional") === !0 && (L = 86, g = 82, !o.callWrap(o.memberLookup([o.contextOrFrameLookup(a, e, "undefined"), null, !1], "includes"), '--expression--["includes"]', a, [o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "value")])) || o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "optional") !== !0) {
                      c += `
        `;
                      var V;
                      V = o.contextOrFrameLookup(a, e, "attributesHtml") + " " + r.getFilter("escape").call(a, C) + '="' + r.getFilter("escape").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "options"), "value")) + '"', e.set("attributesHtml", V, !0), e.topLevel && a.setVariable("attributesHtml", V), e.topLevel && a.addExport("attributesHtml", V), c += `
      `;
                    }
                    c += `
    `;
                  }
                }
              }
              e = e.pop(), c += `
  `;
            }
            return c += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "attributesHtml")), r.opts.autoescape), e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukAttributes"), a.setVariable("govukAttributes", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/macros/i18n.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += `
`;
        var b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "";
            if (o.memberLookup(m, "messages")) {
              e = e.push();
              var u = o.memberLookup(m, "messages");
              if (u) {
                u = o.fromIterator(u);
                var t;
                if (o.isArray(u)) {
                  var p = u.length;
                  for (t = 0; t < u.length; t++) {
                    var n = u[t][0];
                    e.set("[object Object]", u[t][0]);
                    var k = u[t][1];
                    e.set("[object Object]", u[t][1]), e.set("loop.index", t + 1), e.set("loop.index0", t), e.set("loop.revindex", p - t), e.set("loop.revindex0", p - t - 1), e.set("loop.first", t === 0), e.set("loop.last", t === p - 1), e.set("loop.length", p), c += " data-i18n.", c += o.suppressValue(o.memberLookup(m, "key"), r.opts.autoescape), c += ".", c += o.suppressValue(n, r.opts.autoescape), c += '="', c += o.suppressValue(r.getFilter("escape").call(a, k), r.opts.autoescape), c += '"';
                  }
                } else {
                  t = -1;
                  var p = o.keys(u).length;
                  for (var f in u) {
                    t++;
                    var F = u[f];
                    e.set("pluralRule", f), e.set("message", F), e.set("loop.index", t + 1), e.set("loop.index0", t), e.set("loop.revindex", p - t), e.set("loop.revindex0", p - t - 1), e.set("loop.first", t === 0), e.set("loop.last", t === p - 1), e.set("loop.length", p), c += " data-i18n.", c += o.suppressValue(o.memberLookup(m, "key"), r.opts.autoescape), c += ".", c += o.suppressValue(f, r.opts.autoescape), c += '="', c += o.suppressValue(r.getFilter("escape").call(a, F), r.opts.autoescape), c += '"';
                  }
                }
              }
              e = e.pop(), c += `
  `;
            } else
              o.memberLookup(m, "message") && (c += " data-i18n.", c += o.suppressValue(o.memberLookup(m, "key"), r.opts.autoescape), c += '="', c += o.suppressValue(r.getFilter("escape").call(a, o.memberLookup(m, "message")), r.opts.autoescape), c += '"');
            return e = h, new o.SafeString(c);
          }
        );
        a.addExport("govukI18nAttributes"), a.setVariable("govukI18nAttributes", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/govuk-frontend/dist/govuk/template.njk"] = /* @__PURE__ */ function() {
    function d(i, h, c, u, t) {
      var p = 0, n = 0, k = "";
      try {
        var f = null;
        i.getTemplate("./macros/attributes.njk", !1, "node_modules/govuk-frontend/dist/govuk/template.njk", !1, function(F, j) {
          if (F) {
            t(F);
            return;
          }
          j.getExported(function(w, C) {
            if (w) {
              t(w);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(C, "govukAttributes"))
              var P = C.govukAttributes;
            else {
              t(new Error("cannot import 'govukAttributes'"));
              return;
            }
            h.setVariable("govukAttributes", P), i.getTemplate("./components/skip-link/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/template.njk", !1, function(y, O) {
              if (y) {
                t(y);
                return;
              }
              O.getExported(function(V, E) {
                if (V) {
                  t(V);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(E, "govukSkipLink"))
                  var S = E.govukSkipLink;
                else {
                  t(new Error("cannot import 'govukSkipLink'"));
                  return;
                }
                h.setVariable("govukSkipLink", S), i.getTemplate("./components/header/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/template.njk", !1, function(T, H) {
                  if (T) {
                    t(T);
                    return;
                  }
                  H.getExported(function(I, M) {
                    if (I) {
                      t(I);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(M, "govukHeader"))
                      var B = M.govukHeader;
                    else {
                      t(new Error("cannot import 'govukHeader'"));
                      return;
                    }
                    h.setVariable("govukHeader", B), i.getTemplate("./components/footer/macro.njk", !1, "node_modules/govuk-frontend/dist/govuk/template.njk", !1, function(G, N) {
                      if (G) {
                        t(G);
                        return;
                      }
                      N.getExported(function(R, Z) {
                        if (R) {
                          t(R);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(Z, "govukFooter"))
                          var W = Z.govukFooter;
                        else {
                          t(new Error("cannot import 'govukFooter'"));
                          return;
                        }
                        h.setVariable("govukFooter", W), k += `<!DOCTYPE html>
<html lang="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "htmlLang"), "en", !0), i.opts.autoescape), k += '" class="govuk-template', u.contextOrFrameLookup(h, c, "htmlClasses") && (k += " ", k += u.suppressValue(u.contextOrFrameLookup(h, c, "htmlClasses"), i.opts.autoescape)), k += `">
  <head>
    <meta charset="utf-8">
    <title`, u.contextOrFrameLookup(h, c, "pageTitleLang") && (k += ' lang="', k += u.suppressValue(u.contextOrFrameLookup(h, c, "pageTitleLang"), i.opts.autoescape), k += '"'), k += ">", (f ? function(D, z, J, Q, $) {
                          $("");
                        } : h.getBlock("pageTitle"))(i, h, c, u, function(D, z) {
                          if (D) {
                            t(D);
                            return;
                          }
                          k += z, k += `</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "themeColor"), "#0b0c0c", !0), i.opts.autoescape), k += '">', k += `

    `, (f ? function(J, Q, $, K, X) {
                            X("");
                          } : h.getBlock("headIcons"))(i, h, c, u, function(J, Q) {
                            if (J) {
                              t(J);
                              return;
                            }
                            k += Q, k += `

    `, (f ? function($, K, X, Y, ao) {
                              ao("");
                            } : h.getBlock("head"))(i, h, c, u, function($, K) {
                              if ($) {
                                t($);
                                return;
                              }
                              k += K, k += `
    `, (u.contextOrFrameLookup(h, c, "opengraphImageUrl") || u.contextOrFrameLookup(h, c, "assetUrl")) && (k += `
    <meta property="og:image" content="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "opengraphImageUrl"), u.contextOrFrameLookup(h, c, "assetUrl") + "/images/govuk-opengraph-image.png", !0), i.opts.autoescape), k += `">
    `), k += `
  </head>
  <body class="govuk-template__body`, u.contextOrFrameLookup(h, c, "bodyClasses") && (k += " ", k += u.suppressValue(u.contextOrFrameLookup(h, c, "bodyClasses"), i.opts.autoescape)), k += '"', k += u.suppressValue((p = 27, n = 107, u.callWrap(P, "govukAttributes", h, [u.contextOrFrameLookup(h, c, "bodyAttributes")])), i.opts.autoescape), k += `>
    <script`, u.contextOrFrameLookup(h, c, "cspNonce") && (k += ' nonce="', k += u.suppressValue(u.contextOrFrameLookup(h, c, "cspNonce"), i.opts.autoescape), k += '"'), k += `>document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');<\/script>
    `, (f ? function(X, Y, ao, lo, ro) {
                                ro("");
                              } : h.getBlock("bodyStart"))(i, h, c, u, function(X, Y) {
                                if (X) {
                                  t(X);
                                  return;
                                }
                                k += Y, k += `

    `, (f ? function(ao, lo, ro, io, A) {
                                  A("");
                                } : h.getBlock("skipLink"))(i, h, c, u, function(ao, lo) {
                                  if (ao) {
                                    t(ao);
                                    return;
                                  }
                                  k += lo, k += `

    `, (f ? function(ro, io, A, U, x) {
                                    x("");
                                  } : h.getBlock("header"))(i, h, c, u, function(ro, io) {
                                    if (ro) {
                                      t(ro);
                                      return;
                                    }
                                    k += io, k += `

    `, (f ? function(A, U, x, q, oo) {
                                      oo("");
                                    } : h.getBlock("main"))(i, h, c, u, function(A, U) {
                                      if (A) {
                                        t(A);
                                        return;
                                      }
                                      k += U, k += `

    `, (f ? function(x, q, oo, eo, po) {
                                        po("");
                                      } : h.getBlock("footer"))(i, h, c, u, function(x, q) {
                                        if (x) {
                                          t(x);
                                          return;
                                        }
                                        k += q, k += `

    `, (f ? function(oo, eo, po, so, uo) {
                                          uo("");
                                        } : h.getBlock("bodyEnd"))(i, h, c, u, function(oo, eo) {
                                          if (oo) {
                                            t(oo);
                                            return;
                                          }
                                          k += eo, k += `
  </body>
</html>
`, f ? f.rootRenderFunc(i, h, c, u, t) : t(null, k);
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (F) {
        t(u.handleError(F, p, n));
      }
    }
    function r(i, h, c, u, t) {
      var p = 8, n = 76, k = "";
      try {
        var c = c.push(!0);
        k += "GOV.UK - The best place to find government services and information", t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function a(i, h, c, u, t) {
      var p = 12, n = 7, k = "";
      try {
        var c = c.push(!0);
        k += `
      <link rel="icon" sizes="48x48" href="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "assetPath"), "/assets", !0), i.opts.autoescape), k += `/images/favicon.ico">
      <link rel="icon" sizes="any" href="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "assetPath"), "/assets", !0), i.opts.autoescape), k += `/images/favicon.svg" type="image/svg+xml">
      <link rel="mask-icon" href="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "assetPath"), "/assets", !0), i.opts.autoescape), k += '/images/govuk-icon-mask.svg" color="', k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "themeColor"), "#0b0c0c"), i.opts.autoescape), k += '">', k += `
      <link rel="apple-touch-icon" href="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "assetPath"), "/assets", !0), i.opts.autoescape), k += `/images/govuk-icon-180.png">
      <link rel="manifest" href="`, k += u.suppressValue(i.getFilter("default").call(h, u.contextOrFrameLookup(h, c, "assetPath"), "/assets", !0), i.opts.autoescape), k += `/manifest.json">
    `, t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function e(i, h, c, u, t) {
      var p = 20, n = 7, k = "";
      try {
        var c = c.push(!0);
        t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function o(i, h, c, u, t) {
      var p = 29, n = 7, k = "";
      try {
        var c = c.push(!0);
        t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function l(i, h, c, u, t) {
      var p = 31, n = 7, k = "";
      try {
        var c = c.push(!0);
        k += `
      `, k += u.suppressValue((p = 32, n = 22, u.callWrap(u.contextOrFrameLookup(h, c, "govukSkipLink"), "govukSkipLink", h, [{ href: "#main-content", text: "Skip to main content" }])), i.opts.autoescape), k += `
    `, t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function L(i, h, c, u, t) {
      var p = 38, n = 7, k = "";
      try {
        var c = c.push(!0);
        k += `
      `, k += u.suppressValue((p = 39, n = 20, u.callWrap(u.contextOrFrameLookup(h, c, "govukHeader"), "govukHeader", h, [{}])), i.opts.autoescape), k += `
    `, t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function g(i, h, c, u, t) {
      var p = 42, n = 7, k = "";
      try {
        var c = c.push(!0);
        k += `
      <div class="govuk-width-container`, u.contextOrFrameLookup(h, c, "containerClasses") && (k += " ", k += u.suppressValue(u.contextOrFrameLookup(h, c, "containerClasses"), i.opts.autoescape)), k += `">
        `, h.getBlock("beforeContent")(i, h, c, u, function(F, j) {
          if (F) {
            t(F);
            return;
          }
          k += j, k += `
        <main class="govuk-main-wrapper`, u.contextOrFrameLookup(h, c, "mainClasses") && (k += " ", k += u.suppressValue(u.contextOrFrameLookup(h, c, "mainClasses"), i.opts.autoescape)), k += '" id="main-content"', u.contextOrFrameLookup(h, c, "mainLang") && (k += ' lang="', k += u.suppressValue(u.contextOrFrameLookup(h, c, "mainLang"), i.opts.autoescape), k += '"'), k += `>
          `, h.getBlock("content")(i, h, c, u, function(w, C) {
            if (w) {
              t(w);
              return;
            }
            k += C, k += `
        </main>
      </div>
    `, t(null, k);
          });
        });
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function s(i, h, c, u, t) {
      var p = 44, n = 11, k = "";
      try {
        var c = c.push(!0);
        t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function v(i, h, c, u, t) {
      var p = 46, n = 13, k = "";
      try {
        var c = c.push(!0);
        t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function b(i, h, c, u, t) {
      var p = 51, n = 7, k = "";
      try {
        var c = c.push(!0);
        k += `
      `, k += u.suppressValue((p = 52, n = 20, u.callWrap(u.contextOrFrameLookup(h, c, "govukFooter"), "govukFooter", h, [{}])), i.opts.autoescape), k += `
    `, t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    function m(i, h, c, u, t) {
      var p = 55, n = 7, k = "";
      try {
        var c = c.push(!0);
        t(null, k);
      } catch (f) {
        t(u.handleError(f, p, n));
      }
    }
    return {
      b_pageTitle: r,
      b_headIcons: a,
      b_head: e,
      b_bodyStart: o,
      b_skipLink: l,
      b_header: L,
      b_main: g,
      b_beforeContent: s,
      b_content: v,
      b_footer: b,
      b_bodyEnd: m,
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/button/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/button/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenButton"), a.setVariable("LBCamdenButton", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/button/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b;
        if (b = "lbcamden-button", e.set("classNames", b, !0), e.topLevel && a.setVariable("classNames", b), e.topLevel && a.addExport("classNames", b), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes")) {
          s += `
  `;
          var m;
          m = o.contextOrFrameLookup(a, e, "classNames") + " " + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), e.set("classNames", m, !0), e.topLevel && a.setVariable("classNames", m), e.topLevel && a.addExport("classNames", m), s += `
`;
        }
        if (s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disabled")) {
          s += `
  `;
          var i;
          i = o.contextOrFrameLookup(a, e, "classNames") + " lbcamden-button--disabled", e.set("classNames", i, !0), e.topLevel && a.setVariable("classNames", i), e.topLevel && a.addExport("classNames", i), s += `
`;
        }
        if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "largeButton")) {
          s += `
  `;
          var h;
          h = o.contextOrFrameLookup(a, e, "classNames") + " lbcamden-button--large", e.set("classNames", h, !0), e.topLevel && a.setVariable("classNames", h), e.topLevel && a.addExport("classNames", h), s += `
`;
        }
        if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "element")) {
          s += `
  `;
          var c;
          c = r.getFilter("lower").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "element")), e.set("element", c, !0), e.topLevel && a.setVariable("element", c), e.topLevel && a.addExport("element", c), s += `
`;
        } else {
          if (s += `
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href")) {
            s += `
    `;
            var u;
            u = "a", e.set("element", u, !0), e.topLevel && a.setVariable("element", u), e.topLevel && a.addExport("element", u), s += `
  `;
          } else {
            s += `
    `;
            var t;
            t = "button", e.set("element", t, !0), e.topLevel && a.setVariable("element", t), e.topLevel && a.addExport("element", t), s += `
  `;
          }
          s += `
`;
        }
        if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "isStartButton")) {
          s += `
  `;
          var p;
          p = function() {
            var F = "";
            return F += `
`, F += `
`, F += `
`, F += `
  <svg class="lbcamden-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" aria-hidden="true" focusable="false">
    <path d="M4.48116 7L0.409421 11.3565H0.409258C0.05163 11.7527 -0.0842445 12.3214 0.0519564 12.8525C0.188157 13.3837 0.576033 13.7987 1.07245 13.9444C1.56887 14.0901 2.10045 13.9448 2.47074 13.5621L7.57322 8.10283C7.84641 7.81019 8 7.41361 8 7C8 6.58638 7.8464 6.1898 7.57322 5.89718L2.47074 0.437877C2.10042 0.0552407 1.56887 -0.0901382 1.07245 0.0555872C0.576033 0.201313 0.188161 0.616313 0.0519564 1.14745C-0.0842487 1.67858 0.0516291 2.24733 0.409258 2.64352L4.48116 7Z" fill="currentColor"/>
  </svg>

  `, F;
          }(), e.set("iconHtml", p, !0), e.topLevel && a.setVariable("iconHtml", p), e.topLevel && a.addExport("iconHtml", p), s += `
  `;
          var n;
          n = o.contextOrFrameLookup(a, e, "classNames") + " lbcamden-button--start", e.set("classNames", n, !0), e.topLevel && a.setVariable("classNames", n), e.topLevel && a.addExport("classNames", n), s += `
`;
        }
        var k;
        k = function() {
          var F = "";
          F += ' class="', F += o.suppressValue(o.contextOrFrameLookup(a, e, "classNames"), r.opts.autoescape), F += '" data-module="lbcamden-button"', e = e.push();
          var j = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes");
          if (j) {
            j = o.fromIterator(j);
            var w;
            if (o.isArray(j)) {
              var C = j.length;
              for (w = 0; w < j.length; w++) {
                var P = j[w][0];
                e.set("[object Object]", j[w][0]);
                var y = j[w][1];
                e.set("[object Object]", j[w][1]), e.set("loop.index", w + 1), e.set("loop.index0", w), e.set("loop.revindex", C - w), e.set("loop.revindex0", C - w - 1), e.set("loop.first", w === 0), e.set("loop.last", w === C - 1), e.set("loop.length", C), F += " ", F += o.suppressValue(P, r.opts.autoescape), F += '="', F += o.suppressValue(y, r.opts.autoescape), F += '"';
              }
            } else {
              w = -1;
              var C = o.keys(j).length;
              for (var O in j) {
                w++;
                var V = j[O];
                e.set("attribute", O), e.set("value", V), e.set("loop.index", w + 1), e.set("loop.index0", w), e.set("loop.revindex", C - w), e.set("loop.revindex0", C - w - 1), e.set("loop.first", w === 0), e.set("loop.last", w === C - 1), e.set("loop.length", C), F += " ", F += o.suppressValue(O, r.opts.autoescape), F += '="', F += o.suppressValue(V, r.opts.autoescape), F += '"';
              }
            }
          }
          return e = e.pop(), F;
        }(), e.set("commonAttributes", k, !0), e.topLevel && a.setVariable("commonAttributes", k), e.topLevel && a.addExport("commonAttributes", k);
        var f;
        f = function() {
          var F = "";
          return o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name") && (F += ' name="', F += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), r.opts.autoescape), F += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "disabled") && (F += ' disabled="disabled" aria-disabled="true"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "preventDoubleClick") && (F += ' data-prevent-double-click="true"'), F;
        }(), e.set("buttonAttributes", f, !0), e.topLevel && a.setVariable("buttonAttributes", f), e.topLevel && a.addExport("buttonAttributes", f), o.contextOrFrameLookup(a, e, "element") == "a" ? (s += `
<a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "href") : "#", r.opts.autoescape), s += '" role="button" draggable="false"', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += `>
  `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html")) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "iconHtml") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "iconHtml"))), 2, !0) : "", r.opts.autoescape), s += "</a>") : o.contextOrFrameLookup(a, e, "element") == "button" ? (s += `
<button`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value") && (s += ' value="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value"), r.opts.autoescape), s += '"'), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") && (s += ' type="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type"), r.opts.autoescape), s += '"'), s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "buttonAttributes")), r.opts.autoescape), s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += `>
  `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html") ? r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "html")) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `
`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "iconHtml") ? r.getFilter("indent").call(a, r.getFilter("trim").call(a, r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "iconHtml"))), 2, !0) : "", r.opts.autoescape), s += "</button>") : o.contextOrFrameLookup(a, e, "element") == "input" && (s += `
<input value="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += '" type="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") : "submit", r.opts.autoescape), s += '"', s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "buttonAttributes")), r.opts.autoescape), s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "commonAttributes")), r.opts.autoescape), s += ">"), v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (F) {
        l(o.handleError(F, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/campaign-engagement-banner/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/campaign-engagement-banner/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenCampaignEngagementBanner"), a.setVariable("LBCamdenCampaignEngagementBanner", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/campaign-engagement-banner/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/campaign-engagement-banner/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            a.setVariable("LBCamdenImage", c), s += `
<section role="banner"
         class="lbcamden-campaign-engagement-banner lbcamden-campaign-engagement-banner--`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "orientation"), r.opts.autoescape), s += `">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "orientation") == "text-right" && (s += o.suppressValue((L = 3, g = 63, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image")])), r.opts.autoescape)), s += `
    <div class="lbcamden-campaign-engagement-banner__content">
        <h2>
            <a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "link"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</a>
        </h2>
        `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription")), r.opts.autoescape), s += `
    </div>
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "orientation") == "text-left" && (s += o.suppressValue((L = 10, g = 62, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image")])), r.opts.autoescape)), s += `
</section>

`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/campaign-hero/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/campaign-hero/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenCampaignHero"), a.setVariable("LBCamdenCampaignHero", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/campaign-hero/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/campaign-hero/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            a.setVariable("LBCamdenImage", c), s += `
<div class="lbcamden-campaign-hero">
    <div class="lbcamden-campaign-hero__content">
        <h1>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "title"), r.opts.autoescape), s += `</h1>
        `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "extract")), r.opts.autoescape), s += `
    </div>
    `, s += o.suppressValue((L = 6, g = 20, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image")])), r.opts.autoescape), s += `
</div>`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/campaign-promo-gallery/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/campaign-promo-gallery/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenCampaignPromoGallery"), a.setVariable("LBCamdenCampaignPromoGallery", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/campaign-promo-gallery/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/campaign-promo-gallery/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            a.setVariable("LBCamdenImage", c), s += `
<div class="lbcamden-campaign-promo-gallery">
  <h2>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>
  <ul class="lbcamden-campaign-promo-gallery__card-grid">
    `, e = e.push();
            var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
            if (u) {
              u = o.fromIterator(u);
              for (var t = u.length, p = 0; p < u.length; p++) {
                var n = u[p];
                e.set("item", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
      <li class="lbcamden-card lbcamden-card--clickable lbcamden-campaign-promo-gallery__card"
        data-module="lbcamden-card">
        `, s += o.suppressValue((L = 7, g = 24, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(n, "icon")])), r.opts.autoescape), s += `
        <span class="lbcamden-campaign-promo-gallery__label">
          <a class="lbcamden-campaign-promo-gallery__link" href="`, s += o.suppressValue(o.memberLookup(n, "href"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(n, "title"), r.opts.autoescape), s += `</a>
        </span>
      </li>
    `;
              }
            }
            e = e.pop(), s += `
  </ul>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/card/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/card/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenCard"), a.setVariable("LBCamdenCard", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/card/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/card/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            a.setVariable("LBCamdenImage", c), s += `

`;
            var u;
            u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "element") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "element") : "div", e.set("containerElement", u, !0), e.topLevel && a.setVariable("containerElement", u), e.topLevel && a.addExport("containerElement", u), s += `
`;
            var t;
            t = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), "headingLevel") ? o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), "headingLevel") : 2, e.set("headingLevel", t, !0), e.topLevel && a.setVariable("headingLevel", t), e.topLevel && a.addExport("headingLevel", t), s += `
<`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "containerElement"), r.opts.autoescape), s += `
  class="lbcamden-card `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") : "", r.opts.autoescape), s += `
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type") && (s += `
  lbcamden-card--`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "type"), r.opts.autoescape), s += `
  `), s += `
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "clickable") && (s += " lbcamden-card--clickable"), s += `
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "topBorder") && (s += " lbcamden-card--top-border"), s += `
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image") && (s += " lbcamden-card--image"), s += `"
  data-module="lbcamden-card"`, e = e.push();
            var p = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes");
            if (p) {
              p = o.fromIterator(p);
              var n;
              if (o.isArray(p)) {
                var k = p.length;
                for (n = 0; n < p.length; n++) {
                  var f = p[n][0];
                  e.set("[object Object]", p[n][0]);
                  var F = p[n][1];
                  e.set("[object Object]", p[n][1]), e.set("loop.index", n + 1), e.set("loop.index0", n), e.set("loop.revindex", k - n), e.set("loop.revindex0", k - n - 1), e.set("loop.first", n === 0), e.set("loop.last", n === k - 1), e.set("loop.length", k), s += " ", s += o.suppressValue(f, r.opts.autoescape), s += '="', s += o.suppressValue(F, r.opts.autoescape), s += '"';
                }
              } else {
                n = -1;
                var k = o.keys(p).length;
                for (var j in p) {
                  n++;
                  var w = p[j];
                  e.set("attribute", j), e.set("value", w), e.set("loop.index", n + 1), e.set("loop.index0", n), e.set("loop.revindex", k - n), e.set("loop.revindex0", k - n - 1), e.set("loop.first", n === 0), e.set("loop.last", n === k - 1), e.set("loop.length", k), s += " ", s += o.suppressValue(j, r.opts.autoescape), s += '="', s += o.suppressValue(w, r.opts.autoescape), s += '"';
                }
              }
            }
            e = e.pop(), s += `>
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image") && (s += `
  `, s += o.suppressValue((L = 15, g = 18, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image")])), r.opts.autoescape), s += `
  <div class="lbcamden-card__content_wrapper">
`), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading") && (s += `
<h`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), s += `
  class="govuk-heading-m">
  `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), "href") ? (s += `
    <a href="`, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), "href"), r.opts.autoescape), s += `">
      `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), "title"), r.opts.autoescape), s += `
    </a>
  `) : (s += `
    `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), "title"), r.opts.autoescape), s += `
  `), s += `
</h`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "headingLevel"), r.opts.autoescape), s += `>
`), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "content") && (s += `
  <div class="lbcamden-card__content">
    `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "content"), "text") ? (s += `
      <p>`, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "content"), "text"), r.opts.autoescape), s += `</p>
    `) : (s += `
      <div>`, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "content"), "html")), r.opts.autoescape), s += `</div>
    `), s += `
  </div>`), s += `
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image") && (s += `
  </div>
`), s += `
</`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "containerElement"), r.opts.autoescape), s += `>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/card-gallery/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/card-gallery/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenCardGallery"), a.setVariable("LBCamdenCardGallery", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/card-gallery/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../card/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/card-gallery/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenCard"))
              var c = h.LBCamdenCard;
            else {
              l(new Error("cannot import 'LBCamdenCard'"));
              return;
            }
            a.setVariable("LBCamdenCard", c), s += `

<div class="lbcamden-card-gallery `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "surround") && (s += "lbcamden-surround "), s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading") && (s += `
      <h2>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>
    `), s += `

    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription") && (s += `
      <p class="lbcamden-card-gallery__description">
        `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription"), r.opts.autoescape), s += `
      </p>
    `), s += `

    <ul class="lbcamden-card-grid">
        `, e = e.push();
            var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
            if (u) {
              u = o.fromIterator(u);
              for (var t = u.length, p = 0; p < u.length; p++) {
                var n = u[p];
                e.set("item", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
            <li class="lbcamden-card-grid--link-wrapper">
              `, s += o.suppressValue((L = 16, g = 29, o.callWrap(c, "LBCamdenCard", a, [{ heading: { title: o.memberLookup(n, "title"), href: o.memberLookup(n, "href"), headingLevel: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "cardHeadingLevel") }, content: o.memberLookup(n, "shortDescription") ? { text: o.memberLookup(n, "shortDescription") } : null, classes: "lbcamden-card--image-3x2", image: o.memberLookup(n, "image"), type: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "cardType") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "cardType") : "naked" }])), r.opts.autoescape), s += `
            </li>
        `;
              }
            }
            e = e.pop(), s += `
    </ul>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/directory-record/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/directory-record/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenDirectoryRecord"), a.setVariable("LBCamdenDirectoryRecord", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/directory-record/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += `<article class="lbcamden-directory-record">
  <h2`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "recordId") && (s += ' id="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "recordId"), r.opts.autoescape), s += '"'), s += ">", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "title"), r.opts.autoescape), s += `</h2>
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "alias") && (s += "<p>", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "alias"), r.opts.autoescape), s += "</p>"), s += `
  <dl>
    `, e = e.push();
        var b = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
        if (b) {
          b = o.fromIterator(b);
          for (var m = b.length, i = 0; i < b.length; i++) {
            var h = b[i];
            e.set("item", h), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", m - i), e.set("loop.revindex0", m - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === m - 1), e.set("loop.length", m), s += `
    <dt>`, s += o.suppressValue(o.memberLookup(h, "label"), r.opts.autoescape), s += `</dt>
    <dd class="govuk-body">`, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(h, "value")), r.opts.autoescape), s += `</dd>
    `;
          }
        }
        e = e.pop(), s += `
  </dl>
</article>`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (c) {
        l(o.handleError(c, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/emergency-banner/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/emergency-banner/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenEmergencyBanner"), a.setVariable("LBCamdenEmergencyBanner", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/emergency-banner/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += '<div class="lbcamden-emergency-banner lbcamden-emergency-banner--', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "campaignClass"), r.opts.autoescape), s += " ", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "homepage") && (s += "lbcamden-emergency-banner--homepage"), s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `">
  <div class="govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds lbcamden-emergency-banner__content">
        <h2 class="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "headingClasses"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>

        `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription") && (s += `
          `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription")), r.opts.autoescape), s += `
        `), s += `

        `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "link") && (s += `
          <a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "link"), r.opts.autoescape), s += `">
            `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkText"), r.opts.autoescape), s += `
          </a>
        `), s += `
      </div>
    </div>
  </div>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/engagement-banner/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/engagement-banner/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenEngagementBanner"), a.setVariable("LBCamdenEngagementBanner", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/engagement-banner/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/engagement-banner/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            a.setVariable("LBCamdenImage", c), s += `

<section role="banner" class="lbcamden-engagement-banner `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `">
  <h2 class="lbcamden-engagement-banner__heading--mobile">`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>
  `, s += o.suppressValue((L = 4, g = 18, o.callWrap(c, "LBCamdenImage", a, [{ classes: "lbcamden-engagement-banner__image", sources: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "sources"), alt: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "alt"), lazy: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "lazy"), src: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "src"), widths: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "widths") }])), r.opts.autoescape), s += `

  <div class="lbcamden-engagement-banner__content">
    <h2>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>
    `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription")), r.opts.autoescape), s += `

    <a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "link"), r.opts.autoescape), s += `">
      `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkText"), r.opts.autoescape), s += `
    </a>
  </div>
</section>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/footer/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/footer/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenFooter"), a.setVariable("LBCamdenFooter", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/footer/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../logo/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/footer/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenLogo"))
              var c = h.LBCamdenLogo;
            else {
              l(new Error("cannot import 'LBCamdenLogo'"));
              return;
            }
            a.setVariable("LBCamdenLogo", c), s += `
`, r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/footer/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "LBCamdenImage"))
                  var k = n.LBCamdenImage;
                else {
                  l(new Error("cannot import 'LBCamdenImage'"));
                  return;
                }
                a.setVariable("LBCamdenImage", k), s += `

<footer class="lbcamden-footer `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += '" role="contentinfo"', e = e.push();
                var f = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes");
                if (f) {
                  f = o.fromIterator(f);
                  var F;
                  if (o.isArray(f)) {
                    var j = f.length;
                    for (F = 0; F < f.length; F++) {
                      var w = f[F][0];
                      e.set("[object Object]", f[F][0]);
                      var C = f[F][1];
                      e.set("[object Object]", f[F][1]), e.set("loop.index", F + 1), e.set("loop.index0", F), e.set("loop.revindex", j - F), e.set("loop.revindex0", j - F - 1), e.set("loop.first", F === 0), e.set("loop.last", F === j - 1), e.set("loop.length", j), s += " ", s += o.suppressValue(w, r.opts.autoescape), s += '="', s += o.suppressValue(C, r.opts.autoescape), s += '"';
                    }
                  } else {
                    F = -1;
                    var j = o.keys(f).length;
                    for (var P in f) {
                      F++;
                      var y = f[P];
                      e.set("attribute", P), e.set("value", y), e.set("loop.index", F + 1), e.set("loop.index0", F), e.set("loop.revindex", j - F), e.set("loop.revindex0", j - F - 1), e.set("loop.first", F === 0), e.set("loop.last", F === j - 1), e.set("loop.length", j), s += " ", s += o.suppressValue(P, r.opts.autoescape), s += '="', s += o.suppressValue(y, r.opts.autoescape), s += '"';
                    }
                  }
                }
                if (e = e.pop(), s += `>
  <div class="govuk-width-container">
    `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation")) || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationSocial"), "length") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationSocial")) {
                  s += `
    <h2 class="govuk-visually-hidden">Site navigation</h2>
    <div class="govuk-row lbcamden-footer__navigation">
      <ul class="lbcamden-footer__list lbcamden-footer__list--primary govuk-grid-column-two-thirds-from-desktop">
        `, e = e.push();
                  var O = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation");
                  if (O) {
                    O = o.fromIterator(O);
                    for (var V = O.length, E = 0; E < O.length; E++) {
                      var S = O[E];
                      e.set("item", S), e.set("loop.index", E + 1), e.set("loop.index0", E), e.set("loop.revindex", V - E), e.set("loop.revindex0", V - E - 1), e.set("loop.first", E === 0), e.set("loop.last", E === V - 1), e.set("loop.length", V), s += `
          <li class="lbcamden-footer__list-item">
            <a href="`, s += o.suppressValue(o.memberLookup(S, "href"), r.opts.autoescape), s += '"', e = e.push();
                      var T = o.memberLookup(S, "attributes");
                      if (T) {
                        T = o.fromIterator(T);
                        var H;
                        if (o.isArray(T)) {
                          var I = T.length;
                          for (H = 0; H < T.length; H++) {
                            var M = T[H][0];
                            e.set("[object Object]", T[H][0]);
                            var B = T[H][1];
                            e.set("[object Object]", T[H][1]), e.set("loop.index", H + 1), e.set("loop.index0", H), e.set("loop.revindex", I - H), e.set("loop.revindex0", I - H - 1), e.set("loop.first", H === 0), e.set("loop.last", H === I - 1), e.set("loop.length", I), s += " ", s += o.suppressValue(M, r.opts.autoescape), s += '="', s += o.suppressValue(B, r.opts.autoescape), s += '"';
                          }
                        } else {
                          H = -1;
                          var I = o.keys(T).length;
                          for (var G in T) {
                            H++;
                            var N = T[G];
                            e.set("attribute", G), e.set("value", N), e.set("loop.index", H + 1), e.set("loop.index0", H), e.set("loop.revindex", I - H), e.set("loop.revindex0", I - H - 1), e.set("loop.first", H === 0), e.set("loop.last", H === I - 1), e.set("loop.length", I), s += " ", s += o.suppressValue(G, r.opts.autoescape), s += '="', s += o.suppressValue(N, r.opts.autoescape), s += '"';
                          }
                        }
                      }
                      e = e.pop(), s += ">", s += o.suppressValue(o.memberLookup(S, "text"), r.opts.autoescape), s += `</a>
          </li>
        `;
                    }
                  }
                  if (e = e.pop(), s += `
      </ul>
      <div class="lbcamden-footer__section lbcamden-footer__socials govuk-grid-column-full govuk-grid-column-one-third-from-desktop">
        <div>
          `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationSecondary"))) {
                    s += `
            <ul class="lbcamden-footer__list lbcamden-footer__list--utility">
              `, e = e.push();
                    var R = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationSecondary");
                    if (R) {
                      R = o.fromIterator(R);
                      for (var Z = R.length, W = 0; W < R.length; W++) {
                        var D = R[W];
                        e.set("item", D), e.set("loop.index", W + 1), e.set("loop.index0", W), e.set("loop.revindex", Z - W), e.set("loop.revindex0", Z - W - 1), e.set("loop.first", W === 0), e.set("loop.last", W === Z - 1), e.set("loop.length", Z), s += `
                <li class="lbcamden-footer__list-item">
                  <a href="`, s += o.suppressValue(o.memberLookup(D, "href"), r.opts.autoescape), s += '"', e = e.push();
                        var z = o.memberLookup(D, "attributes");
                        if (z) {
                          z = o.fromIterator(z);
                          var J;
                          if (o.isArray(z)) {
                            var Q = z.length;
                            for (J = 0; J < z.length; J++) {
                              var $ = z[J][0];
                              e.set("[object Object]", z[J][0]);
                              var K = z[J][1];
                              e.set("[object Object]", z[J][1]), e.set("loop.index", J + 1), e.set("loop.index0", J), e.set("loop.revindex", Q - J), e.set("loop.revindex0", Q - J - 1), e.set("loop.first", J === 0), e.set("loop.last", J === Q - 1), e.set("loop.length", Q), s += " ", s += o.suppressValue($, r.opts.autoescape), s += '="', s += o.suppressValue(K, r.opts.autoescape), s += '"';
                            }
                          } else {
                            J = -1;
                            var Q = o.keys(z).length;
                            for (var X in z) {
                              J++;
                              var Y = z[X];
                              e.set("attribute", X), e.set("value", Y), e.set("loop.index", J + 1), e.set("loop.index0", J), e.set("loop.revindex", Q - J), e.set("loop.revindex0", Q - J - 1), e.set("loop.first", J === 0), e.set("loop.last", J === Q - 1), e.set("loop.length", Q), s += " ", s += o.suppressValue(X, r.opts.autoescape), s += '="', s += o.suppressValue(Y, r.opts.autoescape), s += '"';
                            }
                          }
                        }
                        e = e.pop(), s += ">", s += o.suppressValue(o.memberLookup(D, "text"), r.opts.autoescape), s += `</a>
                </li>
              `;
                      }
                    }
                    e = e.pop(), s += `
            </ul>
          `;
                  }
                  if (s += `

          `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationSocial"))) {
                    s += `
          <h3>Follow us on social media</h3>
          <ul class="lbcamden-footer__list lbcamden-footer__list--social">
            `, e = e.push();
                    var ao = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationSocial");
                    if (ao) {
                      ao = o.fromIterator(ao);
                      for (var lo = ao.length, ro = 0; ro < ao.length; ro++) {
                        var io = ao[ro];
                        e.set("item", io), e.set("loop.index", ro + 1), e.set("loop.index0", ro), e.set("loop.revindex", lo - ro), e.set("loop.revindex0", lo - ro - 1), e.set("loop.first", ro === 0), e.set("loop.last", ro === lo - 1), e.set("loop.length", lo), s += `
              <li class="lbcamden-footer__list--social__item">
                <a rel="noreferrer noopener" href="`, s += o.suppressValue(o.memberLookup(io, "href"), r.opts.autoescape), s += '"', e = e.push();
                        var A = o.memberLookup(io, "attributes");
                        if (A) {
                          A = o.fromIterator(A);
                          var U;
                          if (o.isArray(A)) {
                            var x = A.length;
                            for (U = 0; U < A.length; U++) {
                              var q = A[U][0];
                              e.set("[object Object]", A[U][0]);
                              var oo = A[U][1];
                              e.set("[object Object]", A[U][1]), e.set("loop.index", U + 1), e.set("loop.index0", U), e.set("loop.revindex", x - U), e.set("loop.revindex0", x - U - 1), e.set("loop.first", U === 0), e.set("loop.last", U === x - 1), e.set("loop.length", x), s += " ", s += o.suppressValue(q, r.opts.autoescape), s += '="', s += o.suppressValue(oo, r.opts.autoescape), s += '"';
                            }
                          } else {
                            U = -1;
                            var x = o.keys(A).length;
                            for (var eo in A) {
                              U++;
                              var po = A[eo];
                              e.set("attribute", eo), e.set("value", po), e.set("loop.index", U + 1), e.set("loop.index0", U), e.set("loop.revindex", x - U), e.set("loop.revindex0", x - U - 1), e.set("loop.first", U === 0), e.set("loop.last", U === x - 1), e.set("loop.length", x), s += " ", s += o.suppressValue(eo, r.opts.autoescape), s += '="', s += o.suppressValue(po, r.opts.autoescape), s += '"';
                            }
                          }
                        }
                        e = e.pop(), s += ">", s += o.suppressValue(o.memberLookup(io, "text"), r.opts.autoescape), s += `</a>
              </li>
            `;
                      }
                    }
                    e = e.pop(), s += `
          </ul>
          `;
                  }
                  if (s += `
          `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "sponsorLogos"))) {
                    s += `
          <div class="lbcamden-footer__sponsor-logos">
            `, e = e.push();
                    var so = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "sponsorLogos");
                    if (so) {
                      so = o.fromIterator(so);
                      for (var uo = so.length, to = 0; to < so.length; to++) {
                        var go = so[to];
                        e.set("sponsor", go), e.set("loop.index", to + 1), e.set("loop.index0", to), e.set("loop.revindex", uo - to), e.set("loop.revindex0", uo - to - 1), e.set("loop.first", to === 0), e.set("loop.last", to === uo - 1), e.set("loop.length", uo), s += `
              `, o.memberLookup(go, "href") ? (s += `
              <a class="lbcamden-footer__sponsor" href="`, s += o.suppressValue(o.memberLookup(go, "href"), r.opts.autoescape), s += `">
              `, s += o.suppressValue((L = 42, g = 30, o.callWrap(k, "LBCamdenImage", a, [o.memberLookup(go, "image")])), r.opts.autoescape), s += `
              </a>
              `) : (s += `
              <div class="lbcamden-footer__sponsor">
              `, s += o.suppressValue((L = 46, g = 30, o.callWrap(k, "LBCamdenImage", a, [o.memberLookup(go, "image")])), r.opts.autoescape), s += `
              </div>
              `), s += `
            `;
                      }
                    }
                    e = e.pop(), s += `
          </div>
          `;
                  }
                  s += `
        </div>
      </div>
    </div>
    `;
                }
                s += `
    `, (r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation")) || o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationSocial"), "length")) && r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationUtility")) && (s += `
      <hr />
    `), s += `
    <div class="lbcamden-footer__estate">
      <div class="lbcamden-footer__section govuk-grid-column-full">
        <ul class="lbcamden-footer__list">
          `, e = e.push();
                var fo = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigationUtility");
                if (fo) {
                  fo = o.fromIterator(fo);
                  for (var Vo = fo.length, ho = 0; ho < fo.length; ho++) {
                    var jo = fo[ho];
                    e.set("item", jo), e.set("loop.index", ho + 1), e.set("loop.index0", ho), e.set("loop.revindex", Vo - ho), e.set("loop.revindex0", Vo - ho - 1), e.set("loop.first", ho === 0), e.set("loop.last", ho === Vo - 1), e.set("loop.length", Vo), s += `
          <li class="lbcamden-footer__list-item">
            <a href="`, s += o.suppressValue(o.memberLookup(jo, "href"), r.opts.autoescape), s += '"', e = e.push();
                    var bo = o.memberLookup(jo, "attributes");
                    if (bo) {
                      bo = o.fromIterator(bo);
                      var co;
                      if (o.isArray(bo)) {
                        var vo = bo.length;
                        for (co = 0; co < bo.length; co++) {
                          var Io = bo[co][0];
                          e.set("[object Object]", bo[co][0]);
                          var wo = bo[co][1];
                          e.set("[object Object]", bo[co][1]), e.set("loop.index", co + 1), e.set("loop.index0", co), e.set("loop.revindex", vo - co), e.set("loop.revindex0", vo - co - 1), e.set("loop.first", co === 0), e.set("loop.last", co === vo - 1), e.set("loop.length", vo), s += " ", s += o.suppressValue(Io, r.opts.autoescape), s += '="', s += o.suppressValue(wo, r.opts.autoescape), s += '"';
                        }
                      } else {
                        co = -1;
                        var vo = o.keys(bo).length;
                        for (var Po in bo) {
                          co++;
                          var Bo = bo[Po];
                          e.set("attribute", Po), e.set("value", Bo), e.set("loop.index", co + 1), e.set("loop.index0", co), e.set("loop.revindex", vo - co), e.set("loop.revindex0", vo - co - 1), e.set("loop.first", co === 0), e.set("loop.last", co === vo - 1), e.set("loop.length", vo), s += " ", s += o.suppressValue(Po, r.opts.autoescape), s += '="', s += o.suppressValue(Bo, r.opts.autoescape), s += '"';
                        }
                      }
                    }
                    e = e.pop(), s += ">", s += o.suppressValue(o.memberLookup(jo, "text"), r.opts.autoescape), s += `</a>
          </li>
          `;
                  }
                }
                e = e.pop(), s += `
        </ul>
      </div>
    </div>
    <div class="lbcamden-footer__lower govuk-grid-column-full">
      <div class="lbcamden-footer__logo">
        <a href="https://www.camden.gov.uk/" class="lbcamden-footer__link">
          `, s += o.suppressValue((L = 73, g = 25, o.callWrap(c, "LBCamdenLogo", a, [])), r.opts.autoescape), s += `
          <span class="govuk-visually-hidden">Camden Council</span>
        </a>
      </div>
      Copyright © The London Borough of Camden
    </div>
  </div>
</footer>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/guide-content/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/guide-content/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenGuideContent"), a.setVariable("LBCamdenGuideContent", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/guide-content/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += '<div class="lbcamden-guide-content ', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `" data-module="lbcamden-guide-content">
  `, e = e.push();
        var b = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
        if (b) {
          b = o.fromIterator(b);
          for (var m = b.length, i = 0; i < b.length; i++) {
            var h = b[i];
            e.set("item", h), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", m - i), e.set("loop.revindex0", m - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === m - 1), e.set("loop.length", m), s += `
    <div data-guide-article="`, s += o.suppressValue(o.memberLookup(h, "id"), r.opts.autoescape), s += `">
      <article class="lbcamden-guide-content__item">
        <h2 data-guide-heading>`, s += o.suppressValue(o.memberLookup(h, "heading"), r.opts.autoescape), s += `</h2>

        `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(h, "html")), r.opts.autoescape), s += `
      </article>
    </div>
  `;
          }
        }
        e = e.pop(), s += `

  <article data-guide-not-found hidden>
    <h2></h2>
    <div class="lbcamden-guide-content__item"></div>
  </article>

  <nav class="govuk-pagination govuk-pagination--block" role="navigation" aria-label="results">
    <div class="govuk-pagination__prev">
      <a class="govuk-link govuk-pagination__link" href="#" rel="prev">
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
          <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg>
        <span class="govuk-pagination__link-title">Previous</span><span class="govuk-visually-hidden">:</span>
        <span class="govuk-pagination__link-label"></span>
      </a>
    </div>

    <div class="govuk-pagination__next">
      <a class="govuk-link govuk-pagination__link" href="#" rel="next">
        <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
          <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
        <span class="govuk-pagination__link-title">Next</span><span class="govuk-visually-hidden">:</span>
        <span class="govuk-pagination__link-label"></span>
      </a>
    </div>
  </nav>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (c) {
        l(o.handleError(c, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/guide-header/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/guide-header/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenGuideHeader"), a.setVariable("LBCamdenGuideHeader", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/guide-header/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += '<ul class="lbcamden-guide-header lbcamden-list--dash ', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `" data-module="lbcamden-guide-header">
  `, e = e.push();
        var b = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
        if (b) {
          b = o.fromIterator(b);
          for (var m = b.length, i = 0; i < b.length; i++) {
            var h = b[i];
            e.set("item", h), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", m - i), e.set("loop.revindex0", m - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === m - 1), e.set("loop.length", m), s += `
    <li>
      <a class="govuk-link" href="`, s += o.suppressValue(o.memberLookup(h, "href"), r.opts.autoescape), s += `">
        `, s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += `
      </a>
    </li>
  `;
          }
        }
        e = e.pop(), s += `
</ul>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (c) {
        l(o.handleError(c, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/header/includes/base.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params", "id_prefix", "site_name"],
          [],
          function(m, i, h, c) {
            var u = e;
            e = new o.Frame(), c = c || {}, Object.prototype.hasOwnProperty.call(c, "caller") && e.set("caller", c.caller), e.set("params", m), e.set("id_prefix", i), e.set("site_name", h);
            var t = "";
            if (t += `
  `, o.memberLookup(m, "navigation") || o.memberLookup(m, "search") != !1) {
              var p = [];
              p.push(
                function(n) {
                  r.getTemplate("./navigation.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/header/includes/base.njk", !1, function(k, f) {
                    if (k) {
                      l(k);
                      return;
                    }
                    n(null, f);
                  });
                }
              ), p.push(
                function(n, k) {
                  n.render(a.getVariables(), e, function(f, F) {
                    if (f) {
                      l(f);
                      return;
                    }
                    k(null, F);
                  });
                }
              ), p.push(
                function(n, k) {
                  t += n, k(null);
                }
              ), r.waterfall(p, function() {
                t += `
  `;
              });
            }
            return t += `
`, e = u, new o.SafeString(t);
          }
        );
        a.addExport("LBCamdenHeaderBase"), a.setVariable("LBCamdenHeaderBase", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/header/includes/navigation.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        if (s += '<nav aria-labelledby="', s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-navigation-menu-heading"
     class="lbcamden-header__content"
     data-module="super-navigation-mega-menu">
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation") && r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation"))) {
          s += `
    <h2 id="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-navigation-menu-heading" class="govuk-visually-hidden">
      `, o.contextOrFrameLookup(a, e, "site_name") ? (s += o.suppressValue(o.contextOrFrameLookup(a, e, "site_name"), r.opts.autoescape), s += " n") : s += "N", s += `avigation menu
    </h2>
    <button aria-controls="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-navigation-menu"
      aria-expanded="true" aria-label="Show`, o.contextOrFrameLookup(a, e, "site_name") && (s += " ", s += o.suppressValue(o.contextOrFrameLookup(a, e, "site_name"), r.opts.autoescape)), s += ` navigation menu"
      class="lbcamden-header__navigation-top-toggle-button `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search") === !1 && (s += "lbcamden-header__navigation-top-toggle-button--no-search"), s += `"
      data-toggle-desktop-group="hidden"
      data-toggle-mobile-group="top"
      data-tracking-key="menu"
      hidden
      id="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-navigation-menu-toggle"
      type="button">
        <span class="lbcamden-header__navigation-top-toggle-button-inner">
          Menu
        </span>
    </button>
    <ul id="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-navigation-menu" class="lbcamden-header__navigation-items">
      `, e = e.push();
          var b = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation");
          if (b) {
            b = o.fromIterator(b);
            for (var m = b.length, i = 0; i < b.length; i++) {
              var h = b[i];
              if (e.set("menuItem", h), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", m - i), e.set("loop.revindex0", m - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === m - 1), e.set("loop.length", m), s += `
        <li
          class="lbcamden-header__navigation-item`, o.memberLookup(h, "subItems") && (s += " lbcamden-header__navigation-item--with-children"), s += `">
          <div class="lbcamden-header__navigation-toggle-wrapper govuk-clearfix">
            <a class="lbcamden-header__navigation-item-link`, o.memberLookup(h, "classes") && (s += " ", s += o.suppressValue(o.memberLookup(h, "classes"), r.opts.autoescape)), s += `"
               href="`, s += o.suppressValue(o.memberLookup(h, "href"), r.opts.autoescape), s += `">
              <span class="lbcamden-header__navigation-item-link-inner">
                `, s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += `
              </span>
            </a>
            `, o.memberLookup(h, "subItems") && (s += `
            <button aria-controls="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += "-navigation-menu__section-", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index"), r.opts.autoescape), s += `"
                    aria-expanded="false"
                    aria-label="Show `, s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += ` menu"
                    class="lbcamden-header__navigation-second-toggle-button"
                    data-text-for-hide="Hide `, s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += ` menu"
                    data-text-for-show="Show `, s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += ` menu"
                    data-toggle-desktop-group="top"
                    data-toggle-mobile-group="second"
                    hidden="hidden"
                    type="button">
              <span class="lbcamden-header__navigation-second-toggle-button-inner">`, s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += `</span></button>
            `), s += `
          </div>
          `, o.memberLookup(h, "subItems")) {
                s += `
          <div hidden class="lbcamden-header__navigation-dropdown-menu"
               id="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += "-navigation-menu__section-", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "index"), r.opts.autoescape), s += `">
            <div class="govuk-width-container lbcamden-header__width-container">
              <div class="govuk-grid-row">
                `, o.memberLookup(h, "description") ? (s += `
                <div class="govuk-grid-column-one-third-from-desktop">
                  <p class="govuk-body-l lbcamden-header__menu-description">
                    `, s += o.suppressValue(o.memberLookup(h, "description"), r.opts.autoescape), s += `
                  </p>
                </div>
                <div class="govuk-grid-column-two-thirds-from-desktop">
                  <ul
                    class="lbcamden-header__navigation-second-items lbcamden-header__navigation-second-items--topics">
                `) : s += `
                <div class="govuk-grid-column-full">
                  <ul
                    class="lbcamden-header__navigation-second-items lbcamden-header__navigation-second-items--full lbcamden-header__navigation-second-items--topics">
                `, s += `
                    `, e = e.push();
                var c = o.memberLookup(h, "subItems");
                if (c) {
                  c = o.fromIterator(c);
                  for (var u = c.length, t = 0; t < c.length; t++) {
                    var p = c[t];
                    e.set("item", p), e.set("loop.index", t + 1), e.set("loop.index0", t), e.set("loop.revindex", u - t), e.set("loop.revindex0", u - t - 1), e.set("loop.first", t === 0), e.set("loop.last", t === u - 1), e.set("loop.length", u), s += `
                      <li class="lbcamden-header__dropdown-list-item">
                        <a class="govuk-link lbcamden-header__navigation-second-item-link"
                           href="`, s += o.suppressValue(o.memberLookup(p, "href"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(p, "text"), r.opts.autoescape), s += `</a>
                        `, o.memberLookup(p, "description") && (s += `
                          <p class="lbcamden-header__navigation-second-item-description">
                            `, s += o.suppressValue(o.memberLookup(p, "description"), r.opts.autoescape), s += `</p>
                        `), s += `
                      </li>
                    `;
                  }
                }
                e = e.pop(), s += `
                  </ul>
                </div>
              </div>
            </div>
          </div>
          `;
              }
              s += `
        </li>
      `;
            }
          }
          e = e.pop(), s += `
    </ul>
  `;
        }
        s += `
 `;
        var n = [];
        n.push(
          function(k) {
            r.getTemplate("./search.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/header/includes/navigation.njk", !1, function(f, F) {
              if (f) {
                l(f);
                return;
              }
              k(null, F);
            });
          }
        ), n.push(
          function(k, f) {
            k.render(a.getVariables(), e, function(F, j) {
              if (F) {
                l(F);
                return;
              }
              f(null, j);
            });
          }
        ), n.push(
          function(k, f) {
            s += k, f(null);
          }
        ), r.waterfall(n, function() {
          s += `
</nav>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
        });
      } catch (k) {
        l(o.handleError(k, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/header/includes/search.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../../search/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/header/includes/search.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenSearch"))
              var c = h.LBCamdenSearch;
            else {
              l(new Error("cannot import 'LBCamdenSearch'"));
              return;
            }
            if (a.setVariable("LBCamdenSearch", c), s += `

`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search") !== !1) {
              if (s += `
  <button aria-controls="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-search-menu" aria-expanded="true" aria-label="Hide search menu"
          class="lbcamden-header__search-toggle-button" data-text-for-hide="Hide search menu"
          data-text-for-show="Show search menu" data-toggle-mobile-group="top" data-toggle-desktop-group="top"
          data-tracking-key="search" hidden id="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-search-menu-toggle" type="button">
        <span class="govuk-visually-hidden">
          Search Camden.gov.uk
        </span>

    `, s += `
    `, s += `
    `, s += `
    `, s += `
    `, s += `
    <span class="lbcamden-header__search-toggle-button-inner">
      <svg class="lbcamden-header__search-toggle-button-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4 7.0944C4 4.69831 5.96416 2.73926 8.4077 2.73926C10.8512 2.73926 12.8154 4.69831 12.8154 7.0944C12.8154 9.49049 10.8512 11.4495 8.4077 11.4495C5.96416 11.4495 4 9.49049 4 7.0944ZM8.4077 0.739258C4.87805 0.739258 2 3.57537 2 7.0944C2 10.6134 4.87805 13.4495 8.4077 13.4495C9.42634 13.4495 10.3907 13.2133 11.2473 12.7927C11.3151 12.8695 11.3923 12.9335 11.4756 12.9845L16.1462 18.4965C16.5032 18.9178 17.1342 18.97 17.5556 18.6129C17.9769 18.2559 18.0291 17.6249 17.6721 17.2035L12.9252 11.6014C14.0918 10.4518 14.8154 8.85894 14.8154 7.0944C14.8154 3.57537 11.9373 0.739258 8.4077 0.739258Z"
              fill="currentColor"/>
      </svg>
    </span>

    <span aria-hidden="true" class="lbcamden-header__navigation-top-toggle-close-icon"
          focusable="false">

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17.071 4.34285C17.4615 3.95232 17.4615 3.31916 17.071 2.92864C16.6805 2.53811 16.0473 2.53811 15.6568 2.92864L9.99989 8.58554L4.34314 2.92879C3.95261 2.53826 3.31945 2.53826 2.92893 2.92879C2.5384 3.31931 2.5384 3.95248 2.92893 4.343L8.58568 9.99976L2.92888 15.6566C2.53836 16.0471 2.53836 16.6802 2.92888 17.0708C3.3194 17.4613 3.95257 17.4613 4.34309 17.0708L9.99989 11.414L15.6568 17.0709C16.0474 17.4614 16.6805 17.4614 17.0711 17.0709C17.4616 16.6804 17.4616 16.0472 17.0711 15.6567L11.4141 9.99976L17.071 4.34285Z"
              fill="currentColor"/>
      </svg>

        </span>
  </button>

  <div id="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), s += `-search-menu" class="lbcamden-header__search-items">
    <h3 class="govuk-visually-hidden">
      Search
    </h3>
    <div class="lbcamden-header__search-item">
      <a class="lbcamden-header__search-item-link" href="/search">
            <span class="lbcamden-header__search-item-link-text">
              Search
            </span>
        <svg class="lbcamden-header__search-toggle-button-link-icon" width="20" height="20" viewBox="0 0 20 20"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M4 7.0944C4 4.69831 5.96416 2.73926 8.4077 2.73926C10.8512 2.73926 12.8154 4.69831 12.8154 7.0944C12.8154 9.49049 10.8512 11.4495 8.4077 11.4495C5.96416 11.4495 4 9.49049 4 7.0944ZM8.4077 0.739258C4.87805 0.739258 2 3.57537 2 7.0944C2 10.6134 4.87805 13.4495 8.4077 13.4495C9.42634 13.4495 10.3907 13.2133 11.2473 12.7927C11.3151 12.8695 11.3923 12.9335 11.4756 12.9845L16.1462 18.4965C16.5032 18.9178 17.1342 18.97 17.5556 18.6129C17.9769 18.2559 18.0291 17.6249 17.6721 17.2035L12.9252 11.6014C14.0918 10.4518 14.8154 8.85894 14.8154 7.0944C14.8154 3.57537 11.9373 0.739258 8.4077 0.739258Z"
                fill="currentColor"/>
        </svg>

      </a>
    </div>

    <div class="govuk-width-container lbcamden-header__search-and-popular" hidden>
      <div class="govuk-grid-row govuk-!-margin-bottom-6">
        <div class="govuk-grid-column-full">
          <h2 class="govuk-heading-m">Search</h2>
          `, s += o.suppressValue((L = 61, g = 27, o.callWrap(c, "LBCamdenSearch", a, [{ fullWidth: !0, classes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "classes"), alt: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "alt"), labelText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "labelText"), placeholderText: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "placeholderText"), name: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "name"), value: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "value"), additionalParameters: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "additionalParameters"), action: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "action"), method: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search"), "method") }])), r.opts.autoescape), s += `
        </div>
      </div>
      `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "searchItems"))) {
                s += `
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-full">
          <h2 class="govuk-heading-m">Popular on Camden.gov.uk</h2>
          <ul class="lbcamden-list lbcamden-list--dash">
            `, e = e.push();
                var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "searchItems");
                if (u) {
                  u = o.fromIterator(u);
                  for (var t = u.length, p = 0; p < u.length; p++) {
                    var n = u[p];
                    e.set("item", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
              <li class="lbcamden-header__popular-item">
                <a class="govuk-link lbcamden-header__popular-link"
                   href="`, s += o.suppressValue(o.memberLookup(n, "href"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(n, "text"), r.opts.autoescape), s += `</a>
              </li>
            `;
                  }
                }
                e = e.pop(), s += `
          </ul>
        </div>
      </div>
      `;
              }
              s += `
    </div>
  </div>
`;
            }
            s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/header/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/header/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenHeader"), a.setVariable("LBCamdenHeader", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/header/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../logo/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/header/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenLogo"))
              var c = h.LBCamdenLogo;
            else {
              l(new Error("cannot import 'LBCamdenLogo'"));
              return;
            }
            a.setVariable("LBCamdenLogo", c), s += `
`, r.getTemplate("./includes/base.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/header/template.njk", !1, function(u, t) {
              if (u) {
                l(u);
                return;
              }
              t.getExported(function(p, n) {
                if (p) {
                  l(p);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(n, "LBCamdenHeaderBase"))
                  var k = n.LBCamdenHeaderBase;
                else {
                  l(new Error("cannot import 'LBCamdenHeaderBase'"));
                  return;
                }
                a.setVariable("LBCamdenHeaderBase", k), s += `

`;
                var f;
                f = r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "title"), "Camden.gov.uk"), e.set("title", f, !0), e.topLevel && a.setVariable("title", f), e.topLevel && a.addExport("title", f), s += `
`;
                var F;
                F = r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id_prefix"), "super"), e.set("id_prefix", F, !0), e.topLevel && a.setVariable("id_prefix", F), e.topLevel && a.addExport("id_prefix", F), s += `
<header role="banner">
<div
  class="lbcamden-header lbcamden-header--estate `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") ? o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") : "", r.opts.autoescape), o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "phaseBanner") && !o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "siteNavigation") && (s += " lbcamden-header--with-phase-banner"), s += '" data-module="lbcamden-header"', e = e.push();
                var j = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes");
                if (j) {
                  j = o.fromIterator(j);
                  var w;
                  if (o.isArray(j)) {
                    var C = j.length;
                    for (w = 0; w < j.length; w++) {
                      var P = j[w][0];
                      e.set("[object Object]", j[w][0]);
                      var y = j[w][1];
                      e.set("[object Object]", j[w][1]), e.set("loop.index", w + 1), e.set("loop.index0", w), e.set("loop.revindex", C - w), e.set("loop.revindex0", C - w - 1), e.set("loop.first", w === 0), e.set("loop.last", w === C - 1), e.set("loop.length", C), s += " ", s += o.suppressValue(P, r.opts.autoescape), s += '="', s += o.suppressValue(y, r.opts.autoescape), s += '"';
                    }
                  } else {
                    w = -1;
                    var C = o.keys(j).length;
                    for (var O in j) {
                      w++;
                      var V = j[O];
                      e.set("attribute", O), e.set("value", V), e.set("loop.index", w + 1), e.set("loop.index0", w), e.set("loop.revindex", C - w), e.set("loop.revindex0", C - w - 1), e.set("loop.first", w === 0), e.set("loop.last", w === C - 1), e.set("loop.length", C), s += " ", s += o.suppressValue(O, r.opts.autoescape), s += '="', s += o.suppressValue(V, r.opts.autoescape), s += '"';
                    }
                  }
                }
                if (e = e.pop(), s += `>

  <div class="lbcamden-header__bar `, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "containerClasses"), "govuk-width-container"), r.opts.autoescape), s += `">
    <div class="lbcamden-header__logo">
      <a href="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "homepageUrl"), "/"), r.opts.autoescape), s += `" class="lbcamden-header__link">
        `, s += o.suppressValue((L = 13, g = 23, o.callWrap(c, "LBCamdenLogo", a, [{}])), r.opts.autoescape), s += `
        <span class="govuk-visually-hidden">`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "title"), r.opts.autoescape), s += `</span>
      </a>
    </div>
    `, (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "navigation") || o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "search") != !1) && (s += `
      `, s += o.suppressValue((L = 19, g = 27, o.callWrap(k, "LBCamdenHeaderBase", a, [o.contextOrFrameLookup(a, e, "params"), o.contextOrFrameLookup(a, e, "id_prefix")])), r.opts.autoescape), s += `
    `), s += `
  </div>

  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "emergencyBanner") && (s += `
    <div class="lbcamden-header__emergency-banner">
      `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "emergencyBanner")), r.opts.autoescape), s += `
    </div>
  `), s += `
</div>

`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "siteNavigation")) {
                  s += `
  `;
                  var E;
                  E = function() {
                    var S = "";
                    return S += o.suppressValue(o.contextOrFrameLookup(a, e, "id_prefix"), r.opts.autoescape), S += "-site", S;
                  }(), e.set("site_id_prefix", E, !0), e.topLevel && a.setVariable("site_id_prefix", E), e.topLevel && a.addExport("site_id_prefix", E), s += `

  <div
    class="lbcamden-header lbcamden-header--site-navigation `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "phaseBanner") && (s += "lbcamden-header--with-phase-banner"), s += `"
    data-module="lbcamden-header">
    <div class="lbcamden-header__bar `, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "containerClasses"), "govuk-width-container"), r.opts.autoescape), s += `">
      <div class="lbcamden-header__title">
        <a href="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "siteNavigation"), "homepageUrl"), "/"), r.opts.autoescape), s += `" class="lbcamden-header__link">
          `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "siteNavigation"), "title"), r.opts.autoescape), s += `
        </a>
      </div>

      `, s += o.suppressValue((L = 43, g = 27, o.callWrap(k, "LBCamdenHeaderBase", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "siteNavigation"), o.contextOrFrameLookup(a, e, "site_id_prefix"), o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "siteNavigation"), "title")])), r.opts.autoescape), s += `
    </div>
  </div>
`;
                }
                s += `
</header>
`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "phaseBanner") && (s += `
<div class="govuk-phase-banner">
  <p class="govuk-phase-banner__content">
    <strong class="govuk-tag govuk-phase-banner__content__tag">
      `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "phaseBanner"), "tag"), "text"), r.opts.autoescape), s += `
    </strong>
    <span class="govuk-phase-banner__text">
      `, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "phaseBanner"), "html") ? (s += `
      `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "phaseBanner"), "html")), r.opts.autoescape), s += `
      `) : (s += `
      `, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "phaseBanner"), "text"), r.opts.autoescape), s += `
      `), s += `
    </span>
  </p>
</div>

`), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
              });
            });
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/hero/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/hero/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenHero"), a.setVariable("LBCamdenHero", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/hero/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/hero/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            if (a.setVariable("LBCamdenImage", c), s += `

<div class="lbcamden-hero `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `">
  `, s += o.suppressValue((L = 3, g = 18, o.callWrap(c, "LBCamdenImage", a, [{ classes: "lbcamden-hero__bg " + o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "classes"), src: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "src"), attributes: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "attributes"), alt: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "alt"), lazy: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "lazy"), width: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "width"), height: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "height"), widths: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "widths"), sources: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image"), "sources") }])), r.opts.autoescape), s += `

  <div class="govuk-width-container">
    <div class="lbcamden-hero__content">
      `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "welcomeMessage") || r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "links"))) {
              if (s += `
        <div class="lbcamden-hero__links govuk-body-s">
          <h1>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "welcomeMessage"), r.opts.autoescape), s += `</h1>

          `, r.getFilter("length").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "links"))) {
                s += `
            <h2>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkHeading"), r.opts.autoescape), s += `</h2>

            <ul class="lbcamden-list--dash">
            `, e = e.push();
                var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "links");
                if (u) {
                  u = o.fromIterator(u);
                  for (var t = u.length, p = 0; p < u.length; p++) {
                    var n = u[p];
                    e.set("link", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
              <li><a href="`, s += o.suppressValue(o.memberLookup(n, "href"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(n, "label"), r.opts.autoescape), s += `</a></li>
            `;
                  }
                }
                e = e.pop(), s += `
            </ul>
          `;
              }
              s += `
        </div>
      `;
            }
            s += `

      `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "engagement") && (s += `
        <span class="lbcamden-hero__spacer"></span>

        <div class="lbcamden-hero__engagement govuk-body-s">
          <h2>`, s += o.suppressValue(o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "engagement"), "heading"), r.opts.autoescape), s += `</h2>
          `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "engagement"), "content")), r.opts.autoescape), s += `
        </div>
      `), s += `
    </div>
  </div>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/image/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/image/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenImage"), a.setVariable("LBCamdenImage", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/image/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += `<picture class="lbcamden-image__wrapper">
  `;
        var b;
        b = [{ mq: "(min-width: 992px)", w: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "widths"), "wide") }, { mq: "(min-width: 768px)", w: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "widths"), "desktop") }, { mq: "(min-width: 641px)", w: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "widths"), "tablet") }, { mq: "(min-width: 576px)", w: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "widths"), "mobileLarge") }, { mq: "(min-width: 320px)", w: o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "widths"), "mobile") }], e.set("sizes", b, !0), e.topLevel && a.setVariable("sizes", b), e.topLevel && a.addExport("sizes", b), s += `

  `, e = e.push();
        var m = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "sources");
        if (m) {
          m = o.fromIterator(m);
          for (var i = m.length, h = 0; h < m.length; h++) {
            var c = m[h];
            e.set("source", c), e.set("loop.index", h + 1), e.set("loop.index0", h), e.set("loop.revindex", i - h), e.set("loop.revindex0", i - h - 1), e.set("loop.first", h === 0), e.set("loop.last", h === i - 1), e.set("loop.length", i), s += `
    `;
            var u;
            u = (L = 4, g = 31, o.callWrap(o.contextOrFrameLookup(a, e, "joiner"), "joiner", a, [", "])), e.set("srcsetComma", u, !0), e.topLevel && a.setVariable("srcsetComma", u), e.topLevel && a.addExport("srcsetComma", u), s += `
    `;
            var t;
            t = (L = 5, g = 30, o.callWrap(o.contextOrFrameLookup(a, e, "joiner"), "joiner", a, [", "])), e.set("sizesComma", t, !0), e.topLevel && a.setVariable("sizesComma", t), e.topLevel && a.addExport("sizesComma", t), s += `

    <source
      type="`, s += o.suppressValue(o.memberLookup(c, "type"), r.opts.autoescape), s += `"
      srcset="`, e = e.push();
            var p = o.memberLookup(c, "sources");
            if (p) {
              p = o.fromIterator(p);
              for (var n = p.length, k = 0; k < p.length; k++) {
                var f = p[k];
                e.set("item", f), e.set("loop.index", k + 1), e.set("loop.index0", k), e.set("loop.revindex", n - k), e.set("loop.revindex0", n - k - 1), e.set("loop.first", k === 0), e.set("loop.last", k === n - 1), e.set("loop.length", n), s += o.suppressValue((L = 9, g = 60, o.callWrap(o.contextOrFrameLookup(a, e, "srcsetComma"), "srcsetComma", a, [])), r.opts.autoescape), s += o.suppressValue(o.memberLookup(f, "src"), r.opts.autoescape), s += " ", o.memberLookup(f, "width") && (s += o.suppressValue(o.memberLookup(f, "width"), r.opts.autoescape), s += "w");
              }
            }
            e = e.pop(), s += `"
      sizes="`, e = e.push();
            var F = r.getFilter("selectattr").call(a, o.contextOrFrameLookup(a, e, "sizes"), "w");
            if (F) {
              F = o.fromIterator(F);
              for (var j = F.length, w = 0; w < F.length; w++) {
                var C = F[w];
                e.set("size", C), e.set("loop.index", w + 1), e.set("loop.index0", w), e.set("loop.revindex", j - w), e.set("loop.revindex0", j - w - 1), e.set("loop.first", w === 0), e.set("loop.last", w === j - 1), e.set("loop.length", j), s += o.suppressValue((L = 10, g = 67, o.callWrap(o.contextOrFrameLookup(a, e, "sizesComma"), "sizesComma", a, [])), r.opts.autoescape), o.memberLookup(o.contextOrFrameLookup(a, e, "loop"), "last") || (s += o.suppressValue(o.memberLookup(C, "mq"), r.opts.autoescape), s += " "), s += o.suppressValue(o.memberLookup(C, "w"), r.opts.autoescape);
              }
            }
            e = e.pop(), s += `"
    />
  `;
          }
        }
        e = e.pop(), s += `

  `;
        var P;
        P = o.memberLookup(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes"), "style"), e.set("style", P, !0), e.topLevel && a.setVariable("style", P), e.topLevel && a.addExport("style", P), s += `

  <img
    class="lbcamden-image `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `"
    src="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "src"), r.opts.autoescape), s += `"
    alt="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "alt"), r.opts.autoescape), s += `"
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "width") && (s += 'width="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "width"), r.opts.autoescape), s += '"'), s += `
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "height") && (s += 'height="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "height"), r.opts.autoescape), s += '"'), s += `
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "lazy") && (s += 'loading="lazy"'), e = e.push();
        var y = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attributes");
        if (y) {
          y = o.fromIterator(y);
          var O;
          if (o.isArray(y)) {
            var V = y.length;
            for (O = 0; O < y.length; O++) {
              var E = y[O][0];
              e.set("[object Object]", y[O][0]);
              var S = y[O][1];
              e.set("[object Object]", y[O][1]), e.set("loop.index", O + 1), e.set("loop.index0", O), e.set("loop.revindex", V - O), e.set("loop.revindex0", V - O - 1), e.set("loop.first", O === 0), e.set("loop.last", O === V - 1), e.set("loop.length", V), E != "style" && (s += " ", s += o.suppressValue(E, r.opts.autoescape), s += '="', s += o.suppressValue(S, r.opts.autoescape), s += '"');
            }
          } else {
            O = -1;
            var V = o.keys(y).length;
            for (var T in y) {
              O++;
              var H = y[T];
              e.set("attribute", T), e.set("value", H), e.set("loop.index", O + 1), e.set("loop.index0", O), e.set("loop.revindex", V - O), e.set("loop.revindex0", V - O - 1), e.set("loop.first", O === 0), e.set("loop.last", O === V - 1), e.set("loop.length", V), T != "style" && (s += " ", s += o.suppressValue(T, r.opts.autoescape), s += '="', s += o.suppressValue(H, r.opts.autoescape), s += '"');
            }
          }
        }
        e = e.pop(), s += `
    style="`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "style"), r.opts.autoescape), s += `"
  />
</picture>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (I) {
        l(o.handleError(I, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/image-component/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/image-component/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenImageComponent"), a.setVariable("LBCamdenImageComponent", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/image-component/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/image-component/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            a.setVariable("LBCamdenImage", c), s += `
`, !o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "caption") || !r.getFilter("trim").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "caption")) ? (s += `
    <div class="lbcamden-image-component">`, s += o.suppressValue((L = 2, g = 58, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image")])), r.opts.autoescape), s += `</div>
`) : (s += `
    <figure class="lbcamden-image-component">
        `, s += o.suppressValue((L = 5, g = 24, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image")])), r.opts.autoescape), s += `
        <figcaption class="lbcamden-image-component__caption">`, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "caption")), r.opts.autoescape), s += `</figcaption>
    </figure>
`), v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/image-gallery/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/image-gallery/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenImageGallery"), a.setVariable("LBCamdenImageGallery", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/image-gallery/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../card/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/image-gallery/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenCard"))
              var c = h.LBCamdenCard;
            else {
              l(new Error("cannot import 'LBCamdenCard'"));
              return;
            }
            a.setVariable("LBCamdenCard", c), s += `
<ul class="lbcamden-card-grid lbcamden-image-gallery">   
    `, e = e.push();
            var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
            if (u) {
              u = o.fromIterator(u);
              for (var t = u.length, p = 0; p < u.length; p++) {
                var n = u[p];
                e.set("item", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
        `, s += o.suppressValue((L = 3, g = 23, o.callWrap(c, "LBCamdenCard", a, [{ element: "li", image: o.memberLookup(n, "image"), classes: "lbcamden-card--naked", content: { text: o.memberLookup(n, "caption") } }])), r.opts.autoescape), s += `
    `;
              }
            }
            e = e.pop(), s += `
</ul>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/info-callout/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/info-callout/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenInfoCallout"), a.setVariable("LBCamdenInfoCallout", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/info-callout/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../button/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/info-callout/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenButton"))
              var c = h.LBCamdenButton;
            else {
              l(new Error("cannot import 'LBCamdenButton'"));
              return;
            }
            a.setVariable("LBCamdenButton", c), s += `

<div class="lbcamden-info-callout">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading") && (s += '<h2 class="lbcamden-info-callout__heading">', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += "</h2>"), s += `
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "subheading") && (s += '<p class="lbcamden-info-callout__subheading">', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "subheading"), r.opts.autoescape), s += "</p>"), s += `
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading") && (s += '<div class="lbcamden-info-callout__content">', s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "content")), r.opts.autoescape), s += "</div>"), s += `
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkHref") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkLabel") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "buttonStyle") != "ACTION_LINK" && (s += `
            `, s += o.suppressValue((L = 7, g = 29, o.callWrap(c, "LBCamdenButton", a, [{ text: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkLabel"), href: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkHref"), isStartButton: o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "buttonStyle") == "START_NOW" }])), r.opts.autoescape), s += `
    `), s += `
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkHref") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkLabel") && o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "buttonStyle") == "ACTION_LINK" && (s += `
        <a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkHref"), r.opts.autoescape), s += `"
            class="lbcamden-link--action lbcamden-info-callout__link">`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "linkLabel"), r.opts.autoescape), s += `</a>
    `), s += `
</div>

`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/lead-image/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/lead-image/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenLeadImage"), a.setVariable("LBCamdenLeadImage", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/lead-image/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../image/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/lead-image/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenImage"))
              var c = h.LBCamdenImage;
            else {
              l(new Error("cannot import 'LBCamdenImage'"));
              return;
            }
            a.setVariable("LBCamdenImage", c), s += `

<div class="lbcamden-lead-image">
    `, s += o.suppressValue((L = 3, g = 20, o.callWrap(c, "LBCamdenImage", a, [o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "image")])), r.opts.autoescape), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/link-list-gallery/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/link-list-gallery/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenLinkListGallery"), a.setVariable("LBCamdenLinkListGallery", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/link-list-gallery/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        r.getTemplate("../card/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/link-list-gallery/template.njk", !1, function(b, m) {
          if (b) {
            l(b);
            return;
          }
          m.getExported(function(i, h) {
            if (i) {
              l(i);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(h, "LBCamdenCard"))
              var c = h.LBCamdenCard;
            else {
              l(new Error("cannot import 'LBCamdenCard'"));
              return;
            }
            a.setVariable("LBCamdenCard", c), s += `

<div class="lbcamden-link-list-gallery `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "surround") && (s += "lbcamden-surround "), s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `">
  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading") && (s += `
    <h2>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>
  `), s += `

  `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription") && (s += `
    <p class="lbcamden-link-list-gallery__description">
      `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription"), r.opts.autoescape), s += `
    </p>
  `), s += `

  <ul class="lbcamden-card-grid">
    `, e = e.push();
            var u = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
            if (u) {
              u = o.fromIterator(u);
              for (var t = u.length, p = 0; p < u.length; p++) {
                var n = u[p];
                e.set("item", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
      `;
                var k;
                k = function() {
                  var f = "";
                  if (f += `
        `, o.memberLookup(n, "links")) {
                    f += `
          <ul class="lbcamden-list--dash">
            `, e = e.push();
                    var F = o.memberLookup(n, "links");
                    if (F) {
                      F = o.fromIterator(F);
                      for (var j = F.length, w = 0; w < F.length; w++) {
                        var C = F[w];
                        e.set("link", C), e.set("loop.index", w + 1), e.set("loop.index0", w), e.set("loop.revindex", j - w), e.set("loop.revindex0", j - w - 1), e.set("loop.first", w === 0), e.set("loop.last", w === j - 1), e.set("loop.length", j), f += `
              <li><a href="`, f += o.suppressValue(o.memberLookup(C, "href"), r.opts.autoescape), f += '">', f += o.suppressValue(o.memberLookup(C, "title"), r.opts.autoescape), f += `</a></li>
            `;
                      }
                    }
                    e = e.pop(), f += `
          </ul>
          `, o.memberLookup(n, "viewAllHref") && (f += `
            <a href="`, f += o.suppressValue(o.memberLookup(n, "viewAllHref"), r.opts.autoescape), f += `" class="lbcamden-link--action">View all</a>
          `), f += `
        `;
                  }
                  return f += `
      `, f;
                }(), e.set("cardHtml", k, !0), e.topLevel && a.setVariable("cardHtml", k), e.topLevel && a.addExport("cardHtml", k), s += `
      `, s += o.suppressValue((L = 27, g = 21, o.callWrap(c, "LBCamdenCard", a, [{ element: "li", heading: { title: o.memberLookup(n, "title"), headingLevel: 3 }, content: { html: o.contextOrFrameLookup(a, e, "cardHtml") } }])), r.opts.autoescape), s += `
    `;
              }
            }
            e = e.pop(), s += `
  </ul>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
          });
        });
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/logo/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/logo/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenLogo"), a.setVariable("LBCamdenLogo", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/logo/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b;
        b = function() {
          var m = "";
          return m += `
  <defs>
    <linearGradient id="prideGradient" cx="50%" cy="50%" fx="20%" fy="20%" spreadMethod="pad">
      <stop stop-color="#FE0000" offset="0%"/>
      <stop stop-color="#FD8C00" offset="16.6%"/>
      <stop stop-color="#FFE500" offset="33.2%"/>
      `, m += `
    </linearGradient>
  </defs>
`, m;
        }(), e.set("prideGradient", b, !0), e.topLevel && a.setVariable("prideGradient", b), e.topLevel && a.addExport("prideGradient", b), s += `

`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "icon") ? (s += `
  <svg xmlns="http://www.w3.org/2000/svg"
       class="lbcamden-logo `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += `"
       viewBox="0 0 60 60"
       preserveAspectRatio="xMinYMid"
       aria-hidden="true"
       focusable="false">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pride") && (s += `
      `, s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "prideGradient")), r.opts.autoescape), s += `
    `), s += `
    <path
      d="M44.4,18.86s1.09-1.3-.88-2.34a14.746,14.746,0,0,0-3.46-.2c-1.15.2-1.23-1,.07-1H52.08s-.63-7.77-7.13-8c-7.4-.26-13.65-.07-13.65-.07v8.12l7.2,3.45Zm1.18-2.3s-1.08,1.3.88,2.34a14.777,14.777,0,0,0,3.47.2c1.16-.2,1.22,1-.07,1h-12s.62,7.77,7.13,8c7.4.26,13.65.07,13.65.07V20l-7.2-3.45ZM40.06,43.33a14.375,14.375,0,0,0,3.46-.19c2-1,.88-2.34.88-2.34H38.5l-7.2,3.45v8.12s6.25.19,13.65-.07c6.5-.23,7.13-8,7.13-8H40.13C38.83,44.31,38.91,43.14,40.06,43.33ZM45,31.6c-6.51.23-7.13,8-7.13,8h12c1.29,0,1.23,1.17.07,1a14.777,14.777,0,0,0-3.47.2c-2,1-.88,2.34-.88,2.34H51.5l7.2-3.45V31.53S52.44,31.34,45,31.6ZM15.43,7.36c-6.51.22-7.14,8-7.14,8h12c1.28,0,1.22,1.17.07,1a14.777,14.777,0,0,0-3.47.2c-2,1-.88,2.34-.88,2.34h5.9l7.2-3.45V7.29S22.83,7.1,15.43,7.36Zm-.1,20.7c6.51-.22,7.13-8,7.13-8h-12c-1.29,0-1.22-1.17-.06-1a14.746,14.746,0,0,0,3.46-.2c2-1,.88-2.34.88-2.34H8.88L1.69,20v8.12S7.93,28.32,15.33,28.06ZM16,40.8s-1.09,1.3.88,2.34a14.409,14.409,0,0,0,3.47.19c1.15-.19,1.21,1-.07,1h-12s.63,7.76,7.14,8c7.4.26,13.64.07,13.64.07V44.25l-7.2-3.45Zm-1.21,2.3s1.09-1.3-.88-2.34a14.746,14.746,0,0,0-3.46-.2c-1.16.2-1.23-1,.06-1h12s-.62-7.76-7.13-8c-7.4-.26-13.64-.07-13.64-.07v8.12L8.88,43.1Z"
      fill="`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pride") ? s += "url(#prideGradient)" : (s += "#", s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fillColour"), "000000"), r.opts.autoescape)), s += `"/>
  </svg>
`) : (s += `
  <svg class="lbcamden-logo `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes") && (s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape)), s += `"
       viewBox="0 0 150 31"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
       preserveAspectRatio="xMinYMid"
       aria-hidden="true"
       focusable="false">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pride") && (s += `
      `, s += o.suppressValue(r.getFilter("safe").call(a, o.contextOrFrameLookup(a, e, "prideGradient")), r.opts.autoescape), s += `
    `), s += `
    <path
      d="M150 24.3306V15.1082C150 12.0881 147.945 10.524 144.701 10.524C143.787 10.5055 142.883 10.7146 142.07 11.1326C141.257 11.5506 140.561 12.1643 140.044 12.9184L139.986 12.8643V10.8909H136.858V24.3306H140.156V16.4058C140.131 15.4913 140.47 14.6043 141.098 13.9396C141.727 13.2749 142.594 12.8867 143.508 12.8605H143.778C145.709 12.8605 146.648 13.7719 146.702 15.8806V24.3306H150ZM134.834 18.3831C135.386 14.3473 132.49 10.524 127.77 10.524C123.31 10.524 120.533 13.8028 120.533 17.63C120.533 21.7662 123.167 24.7091 127.871 24.7091C131.138 24.7091 133.923 23.0677 134.641 20.1288H131.516C130.941 21.6079 129.779 22.3649 127.871 22.3649C125.121 22.3649 123.843 20.4918 123.843 18.3831H134.834ZM131.532 16.429H123.831C123.924 14.4246 125.484 12.8643 127.77 12.8643C128.739 12.8475 129.676 13.2115 130.379 13.8781C131.083 14.5446 131.497 15.4606 131.532 16.429ZM115.427 24.3306H118.563V5.76213H115.269V12.6326H115.211C114.195 11.1496 112.122 10.524 110.229 10.524C106.962 10.524 103.753 12.6558 103.753 17.5219C103.753 21.5577 106.035 24.7091 110.751 24.7091C112.635 24.7091 114.512 24.0564 115.385 22.5232H115.447V24.3306H115.427ZM115.373 17.5914C115.373 19.9318 114.13 22.3533 111.179 22.3533C108.317 22.3533 107.043 20.0631 107.043 17.7459C107.043 15.3283 108.14 12.8528 111.237 12.8528C113.786 12.8528 115.373 14.6254 115.373 17.5914ZM98.6547 24.3306H101.957V15.0618C101.957 11.7791 100.103 10.5317 96.9361 10.5317C96.0328 10.4937 95.1338 10.6752 94.3159 11.0606C93.4981 11.446 92.7858 12.0238 92.24 12.7446C91.5757 11.1998 89.8687 10.5085 88.042 10.5085C85.6707 10.5085 84.4271 11.42 83.4385 12.7446H83.3535V10.8909H80.233V24.3306H83.535V16.3556C83.535 14.1156 85.0798 12.8798 86.8023 12.8798C88.7989 12.8798 89.4361 13.8723 89.4361 15.7145V24.3576H92.7382V16.4599C92.7382 14.1929 93.6921 12.8643 95.9204 12.8643C98.4964 12.8643 98.647 14.3473 98.647 16.483V24.3306H98.6547ZM75.8921 24.7168C76.5992 24.6828 77.3001 24.5688 77.9815 24.377V22.3146C77.7128 22.3525 77.4417 22.3693 77.1704 22.3649C76.5641 22.3649 76.398 22.0829 76.398 21.353V14.4246C76.398 11.5899 73.3278 10.524 70.4004 10.524C67.1022 10.524 63.835 11.5358 63.5994 15.0039H66.9014C67.0443 13.5441 68.3496 12.8643 70.1995 12.8643C71.5319 12.8643 73.2891 13.1501 73.2891 14.6872C73.2891 16.429 71.1766 16.1972 68.8015 16.5873C66.0247 16.877 63.0433 17.4215 63.0433 20.7776C63.0433 23.4076 65.4725 24.7091 68.1643 24.7091C69.9292 24.7091 72.0263 24.2109 73.3471 23.0677C73.6058 24.292 74.5636 24.7091 75.8921 24.7091V24.7168ZM73.0844 19.8121C73.0844 21.689 70.8329 22.3649 69.3847 22.3649C68.2261 22.3649 66.3414 21.9787 66.3414 20.6501C66.3414 19.1053 67.6159 18.6149 69.0448 18.4063C70.4737 18.1978 72.0842 18.2016 73.096 17.603V19.8121H73.0844ZM47.155 15.2974C47.155 11.8216 48.9585 8.39987 53.2724 8.39987C56.2037 8.39987 57.6982 9.9215 58.293 11.9993H61.819C61.4058 8.11022 57.8141 5.84323 53.2956 5.82006C47.2631 5.82006 43.6406 10.13 43.6406 15.3013C43.6406 20.4725 47.2515 24.7786 53.2956 24.7786C58.1733 24.7786 61.5873 21.7856 61.8653 17.4408H58.4243C58.1269 20.0824 56.4083 22.1833 53.2956 22.1833C48.9817 22.1833 47.1782 18.7616 47.1782 15.2897L47.155 15.2974ZM33.2557 23.9444L38.06 21.6272V16.2204C38.06 16.2204 33.889 16.0891 28.9495 16.2629C24.6048 16.4174 24.1916 21.6002 24.1916 21.6002H32.1666C33.0278 21.6002 32.9853 22.3726 32.2129 22.2451C31.4381 22.198 30.6603 22.242 29.8957 22.3764C28.5826 23.0716 29.3087 23.9212 29.3087 23.9212L33.2557 23.9444ZM38.06 13.9418V8.53504L33.2557 6.21784H29.301C29.301 6.21784 28.5749 7.08679 29.888 7.76264C30.6522 7.90023 31.4302 7.94561 32.2052 7.89781C32.9776 7.76264 33.0201 8.54663 32.1589 8.54663H24.18C24.18 8.54663 24.5932 13.7294 28.938 13.88C33.8774 14.0538 38.0484 13.9225 38.0484 13.9225L38.06 13.9418ZM25.6591 5.40682H33.6341C33.6341 5.40682 33.2132 0.239469 28.8762 0.0888508C23.9444 -0.0810771 19.7657 0.0463688 19.7657 0.0463688V5.45317L24.57 7.77037H28.5131C28.5131 7.77037 29.2392 6.90528 27.9222 6.20626C27.1577 6.07132 26.3798 6.02853 25.605 6.07881C24.8326 6.20626 24.7863 5.42613 25.6514 5.42613L25.6591 5.40682ZM18.2711 30.1429V24.7361L13.4668 22.4189H9.53141C9.53141 22.4189 8.80536 23.2879 10.1184 23.983C10.883 24.1181 11.6609 24.1609 12.4356 24.1105C13.208 23.983 13.2467 24.7632 12.3893 24.7632H4.4104C4.4104 24.7632 4.8275 29.9421 9.17225 30.0966C14.1117 30.2704 18.2788 30.1429 18.2788 30.1429H18.2711ZM13.4745 7.77423L18.2788 5.45703V0.0502308C18.2788 0.0502308 14.1117 -0.0772151 9.17225 0.0927128C4.8275 0.243331 4.4104 5.42613 4.4104 5.42613H12.3893C13.2467 5.42613 13.2042 6.19853 12.4356 6.07881C11.6609 6.02842 10.883 6.07121 10.1184 6.20626C8.80536 6.90528 9.53141 7.77037 9.53141 7.77037L13.4745 7.77423ZM4.80433 6.22943L0 8.54663V13.9534C0 13.9534 4.17096 14.0847 9.10659 13.9109C13.4513 13.7603 13.8684 8.57752 13.8684 8.57752H5.89341C5.03218 8.57752 5.07467 7.80512 5.84706 7.92871C6.62209 7.97651 7.40005 7.93113 8.16426 7.79354C9.4812 7.10224 8.75515 6.24874 8.75515 6.24874L4.80433 6.22943ZM0 16.2204V21.6272L4.80433 23.9444H8.74743C8.74743 23.9444 9.47348 23.0793 8.15654 22.3996C7.39195 22.2652 6.61422 22.2211 5.83934 22.2683C5.06694 22.3996 5.0206 21.6272 5.88568 21.6272H13.8607C13.8607 21.6272 13.4436 16.4483 9.09887 16.2938C4.16323 16.12 0 16.2513 0 16.2513V16.2204ZM24.57 22.4305L19.7657 24.7477V30.1545C19.7657 30.1545 23.9444 30.282 28.8684 30.1236C33.2132 29.9537 33.6264 24.7747 33.6264 24.7747H25.6591C24.794 24.7747 24.8442 24.0023 25.6128 24.1221C26.3875 24.1723 27.1654 24.1296 27.93 23.9946C29.2469 23.2995 28.5209 22.4305 28.5209 22.4305H24.57Z"
      fill="`, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "pride") ? s += "url(#prideGradient)" : s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "fillColour"), "currentColor"), r.opts.autoescape), s += `"/>
  </svg>
`), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/more-in/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/more-in/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenMoreIn"), a.setVariable("LBCamdenMoreIn", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/more-in/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += `<section class="lbcamden-row lbcamden-row--related">
  <div class="govuk-width-container">
    <h2 class="govuk-heading-l">`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>
    <ul class="lbcamden-list--dash">
      `, e = e.push();
        var b = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "relatedContent");
        if (b) {
          b = o.fromIterator(b);
          for (var m = b.length, i = 0; i < b.length; i++) {
            var h = b[i];
            e.set("item", h), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", m - i), e.set("loop.revindex0", m - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === m - 1), e.set("loop.length", m), s += `
        <li><a href="`, s += o.suppressValue(o.memberLookup(h, "href"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += `</a></li>
      `;
          }
        }
        e = e.pop(), s += `
    </ul>
  </div>
</section>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (c) {
        l(o.handleError(c, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/promo-gallery/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/promo-gallery/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenPromoGallery"), a.setVariable("LBCamdenPromoGallery", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/promo-gallery/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += '<div class="lbcamden-promo-gallery ', o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "surround") && (s += "lbcamden-surround "), s += " ", s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading") && (s += `
      <h2>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>
    `), s += `

    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription") && (s += `
      <p class="lbcamden-promo-gallery__description">
        `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription"), r.opts.autoescape), s += `
      </p>
    `), s += `

    <ul class="lbcamden-card-grid lbcamden-card-grid--popular">
        `, e = e.push();
        var b = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
        if (b) {
          b = o.fromIterator(b);
          for (var m = b.length, i = 0; i < b.length; i++) {
            var h = b[i];
            e.set("item", h), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", m - i), e.set("loop.revindex0", m - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === m - 1), e.set("loop.length", m), s += `
            <li class="lbcamden-card-grid--link-wrapper">
                <a class="lbcamden-card--clickable lbcamden-link--promo lbcamden-link--promo-alt" href="`, s += o.suppressValue(o.memberLookup(h, "href"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(h, "title"), r.opts.autoescape), s += `</a>
            </li>
        `;
          }
        }
        e = e.pop(), s += `
    </ul>

    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showAllHref") && (s += `
      <a href="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showAllHref"), r.opts.autoescape), s += `" class="lbcamden-link--promo lbcamden-link--promo--large lbcamden-promo-gallery__all">
        `, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "showAllLabel"), "Show all"), r.opts.autoescape), s += `
      </a>
    `), s += `
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (c) {
        l(o.handleError(c, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/quotation/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/quotation/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenQuotation"), a.setVariable("LBCamdenQuotation", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/quotation/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += '<div class="lbcamden-quotation ', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "colour"), r.opts.autoescape), s += `">
    <svg viewBox="0 0 80 58"
         width="80"
         height="58"
         xmlns="http://www.w3.org/2000/svg">
        <path class="lbcamden-quotation-mark" d="M61.6277 58C71.716 58 79.9065 49.7285 79.9065 39.7629C79.9065 30.7938 73.414 23.3196 64.9239 21.8247C68.1202 15.945 72.9146 9.86595 79.4071 3.48794C80.0064 2.89 80.1063 2.09275 79.9065 1.29549C79.6069 0.5979 78.9077 0.0996207 78.0087 0.0996206C58.5313 0.0996189 43.4488 21.4261 43.4488 39.7629C43.5487 44.8453 45.5464 49.3299 48.8426 52.6186C52.0389 55.9072 56.5336 58 61.6277 58Z" />
        <path class="lbcamden-quotation-mark" d="M18.2787 57.9004C28.3669 57.9004 36.5574 49.7286 36.5574 39.6633C36.5574 30.6942 29.9651 23.22 21.4749 21.7251C24.6712 15.8454 29.4657 9.76634 35.9581 3.38833C36.5574 2.79039 36.7572 1.99314 36.4576 1.19588C36.1579 0.498291 35.4587 1.1345e-05 34.6596 1.12753e-05C14.9825 -0.0996456 -0.000111227 21.2268 -0.000112843 39.6633C-0.000113716 49.6289 8.19038 57.9004 18.2787 57.9004Z" />
    </svg>
    <div class="lbcamden-quotation-text">
        <p>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "text"), r.opts.autoescape), s += `</p>
        <p class="lbcamden-quotation-attribution">`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "attribution"), r.opts.autoescape), s += `</p>
    </div>
</div>`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/related-content-card/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/related-content-card/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenRelatedContentCard"), a.setVariable("LBCamdenRelatedContentCard", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/related-content-card/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += `<aside class="lbcamden-related-content-card lbcamden-card lbcamden-card--alt-1" aria-labelledby="related-content-heading">
  <h2 id="related-content-heading">
    `, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `
  </h2>
  <div class="lbcamden-card__content">
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription") && (s += `
    <p>`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription"), r.opts.autoescape), s += `</p>
    `), s += `
    <ul class="lbcamden-list lbcamden-list--dash">
      `, e = e.push();
        var b = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "relatedContent");
        if (b) {
          b = o.fromIterator(b);
          for (var m = b.length, i = 0; i < b.length; i++) {
            var h = b[i];
            e.set("item", h), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", m - i), e.set("loop.revindex0", m - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === m - 1), e.set("loop.length", m), s += `
        <li><a href="`, s += o.suppressValue(o.memberLookup(h, "href"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(h, "text"), r.opts.autoescape), s += `</a></li>
      `;
          }
        }
        e = e.pop(), s += `
    </ul>
  </div>
</aside>

`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (c) {
        l(o.handleError(c, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/search/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/search/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenSearch"), a.setVariable("LBCamdenSearch", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/search/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        if (o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes")) {
          s += `
  `;
          var b;
          b = o.contextOrFrameLookup(a, e, "classNames") + " " + o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), e.set("classNames", b, !0), e.topLevel && a.setVariable("classNames", b), e.topLevel && a.addExport("classNames", b), s += `
`;
        }
        if (s += `
<search>
<form
  class="lbcamden-search `, s += o.suppressValue(o.contextOrFrameLookup(a, e, "classNames"), r.opts.autoescape), s += " ", o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "alt") && (s += " lbcamden-search--alt"), s += `"
  action="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "action"), "/search"), r.opts.autoescape), s += `"
  method="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "method"), "get"), r.opts.autoescape), s += `"
  autocomplete="off">
  <label
    class="govuk-label govuk-label--l govuk-visually-hidden"
    for="lbcamden-search__box">
      `, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "labelText"), "Search Camden.gov.uk"), r.opts.autoescape), s += `
  </label>
  <input
    type="text"
    name="`, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "name"), "search"), r.opts.autoescape), s += `"
    class="lbcamden-search__input"
    value="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "value"), r.opts.autoescape), s += `"
    id="lbcamden-search__box" `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "placeholderText") && (s += 'placeholder="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "placeholderText"), r.opts.autoescape), s += '"'), s += `
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "resultsCountId") && (s += 'aria-describedby="', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "resultsCountId"), r.opts.autoescape), s += '"'), s += ` />
    `, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "additionalParameters")) {
          s += `
      `, e = e.push();
          var m = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "additionalParameters");
          if (m) {
            m = o.fromIterator(m);
            var i;
            if (o.isArray(m)) {
              var h = m.length;
              for (i = 0; i < m.length; i++) {
                var c = m[i][0];
                e.set("[object Object]", m[i][0]);
                var u = m[i][1];
                e.set("[object Object]", m[i][1]), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", h - i), e.set("loop.revindex0", h - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === h - 1), e.set("loop.length", h), s += `
        <input type="hidden" name="`, s += o.suppressValue(c, r.opts.autoescape), s += '" value="', s += o.suppressValue(u, r.opts.autoescape), s += `">
      `;
              }
            } else {
              i = -1;
              var h = o.keys(m).length;
              for (var t in m) {
                i++;
                var p = m[t];
                e.set("name", t), e.set("value", p), e.set("loop.index", i + 1), e.set("loop.index0", i), e.set("loop.revindex", h - i), e.set("loop.revindex0", h - i - 1), e.set("loop.first", i === 0), e.set("loop.last", i === h - 1), e.set("loop.length", h), s += `
        <input type="hidden" name="`, s += o.suppressValue(t, r.opts.autoescape), s += '" value="', s += o.suppressValue(p, r.opts.autoescape), s += `">
      `;
              }
            }
          }
          e = e.pop(), s += `
    `;
        }
        s += `
  <button
    type="submit"
    class="lbcamden-search__btn"
    id="lbcamden-search__btn">
      `, s += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "labelText"), "Search Camden.gov.uk"), r.opts.autoescape), s += `
  </button>
</form>
</search>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (n) {
        l(o.handleError(n, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/search-results/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/search-results/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenSearchResults"), a.setVariable("LBCamdenSearchResults", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/search-results/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b;
        b = function() {
          var k = "";
          return k += "h", k += o.suppressValue(r.getFilter("default").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "headingLevel"), "3"), r.opts.autoescape), k;
        }(), e.set("h", b, !0), e.topLevel && a.setVariable("h", b), e.topLevel && a.addExport("h", b), s += `

<ul class="lbcamden-search-results">
  `, e = e.push();
        var m = o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "items");
        if (m) {
          m = o.fromIterator(m);
          for (var i = m.length, h = 0; h < m.length; h++) {
            var c = m[h];
            if (e.set("item", c), e.set("loop.index", h + 1), e.set("loop.index0", h), e.set("loop.revindex", i - h), e.set("loop.revindex0", i - h - 1), e.set("loop.first", h === 0), e.set("loop.last", h === i - 1), e.set("loop.length", i), s += `
  <li class="lbcamden-search-results__item">
    <`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "h"), r.opts.autoescape), s += ` class="lbcamden-search-results__heading govuk-heading-l">
      <a href="`, s += o.suppressValue(o.memberLookup(c, "href"), r.opts.autoescape), s += `">
        `, s += o.suppressValue(o.memberLookup(c, "title"), r.opts.autoescape), s += `
      </a>
    </`, s += o.suppressValue(o.contextOrFrameLookup(a, e, "h"), r.opts.autoescape), s += `>

    `, o.memberLookup(c, "externalSite"))
              s += `
      <div class="lbcamden-search-results__location">
        `, s += o.suppressValue(o.memberLookup(c, "externalSite"), r.opts.autoescape), s += `
      </div>
    `;
            else {
              s += `
      <div class="govuk-breadcrumbs govuk-breadcrumbs--collapse-on-mobile lbcamden-search-results__location">
        <ol class="govuk-breadcrumbs__list">
          `, e = e.push();
              var u = o.memberLookup(c, "breadcrumbs");
              if (u) {
                u = o.fromIterator(u);
                for (var t = u.length, p = 0; p < u.length; p++) {
                  var n = u[p];
                  e.set("crumb", n), e.set("loop.index", p + 1), e.set("loop.index0", p), e.set("loop.revindex", t - p), e.set("loop.revindex0", t - p - 1), e.set("loop.first", p === 0), e.set("loop.last", p === t - 1), e.set("loop.length", t), s += `
            <li class="govuk-breadcrumbs__list-item">
              `, s += o.suppressValue(o.memberLookup(n, "text"), r.opts.autoescape), s += `
            </li>
          `;
                }
              }
              e = e.pop(), s += `
        </ol>
      </div>
    `;
            }
            s += `

    <div class="lbcamden-search-results__description">
      <p>`, s += o.suppressValue(o.memberLookup(c, "summary"), r.opts.autoescape), s += `</p>
    </div>
  </li>
  `;
          }
        }
        e = e.pop(), s += `
</ul>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (k) {
        l(o.handleError(k, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/service-banner/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/service-banner/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenServiceBanner"), a.setVariable("LBCamdenServiceBanner", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/service-banner/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        s += '<div class="lbcamden-service-banner ', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "classes"), r.opts.autoescape), s += `">
  <div class="govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h2 class="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "headingClasses"), r.opts.autoescape), s += '">', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "heading"), r.opts.autoescape), s += `</h2>

        `, s += o.suppressValue(r.getFilter("safe").call(a, o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "shortDescription")), r.opts.autoescape), s += `
      </div>
    </div>
  </div>
</div>
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/video-embed/macro.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null, b = o.makeMacro(
          ["params"],
          [],
          function(m, i) {
            var h = e;
            e = new o.Frame(), i = i || {}, Object.prototype.hasOwnProperty.call(i, "caller") && e.set("caller", i.caller), e.set("params", m);
            var c = "", u = [];
            return u.push(
              function(t) {
                r.getTemplate("./template.njk", !1, "node_modules/lbcamden-frontend/lbcamden/components/video-embed/macro.njk", !1, function(p, n) {
                  if (p) {
                    l(p);
                    return;
                  }
                  t(null, n);
                });
              }
            ), u.push(
              function(t, p) {
                t.render(a.getVariables(), e, function(n, k) {
                  if (n) {
                    l(n);
                    return;
                  }
                  p(null, k);
                });
              }
            ), u.push(
              function(t, p) {
                c += t, p(null);
              }
            ), r.waterfall(u, function() {
            }), e = h, new o.SafeString(c);
          }
        );
        a.addExport("LBCamdenVideoEmbed"), a.setVariable("LBCamdenVideoEmbed", b), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (m) {
        l(o.handleError(m, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/components/video-embed/template.njk"] = /* @__PURE__ */ function() {
    function d(r, a, e, o, l) {
      var L = 0, g = 0, s = "";
      try {
        var v = null;
        o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "platform") == "youtube" ? (s += `
    <div class="lbcamden-video-embed">
        <iframe title="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "frameTitle"), r.opts.autoescape), s += '" src="https://www.youtube-nocookie.com/embed/', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += `?rel=0&showinfo=0&cc_lang_pref=en&cc_load_policy=1&playsinline=1"
                frameborder="0"
                rel="0"
                allowfullscreen>
        </iframe>
    </div>
`) : o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "platform") == "vimeo" && (s += `
    <div class="lbcamden-video-embed">
        <iframe title="`, s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "frameTitle"), r.opts.autoescape), s += '" src="https://player.vimeo.com/video/', s += o.suppressValue(o.memberLookup(o.contextOrFrameLookup(a, e, "params"), "id"), r.opts.autoescape), s += `"
                frameborder="0"
                controls="0"
                allow="fullscreen; picture-in-picture"
                allowfullscreen>
        </iframe>
    </div>
`), s += `
`, v ? v.rootRenderFunc(r, a, e, o, l) : l(null, s);
      } catch (b) {
        l(o.handleError(b, L, g));
      }
    }
    return {
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["node_modules/lbcamden-frontend/lbcamden/template.njk"] = /* @__PURE__ */ function() {
    function d(c, u, t, p, n) {
      var k = 0, f = 0, F = "";
      try {
        var j = null;
        c.getTemplate("node_modules/govuk-frontend/dist/govuk/components/skip-link/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/template.njk", !1, function(w, C) {
          if (w) {
            n(w);
            return;
          }
          C.getExported(function(P, y) {
            if (P) {
              n(P);
              return;
            }
            if (Object.prototype.hasOwnProperty.call(y, "govukSkipLink"))
              var O = y.govukSkipLink;
            else {
              n(new Error("cannot import 'govukSkipLink'"));
              return;
            }
            u.setVariable("govukSkipLink", O), c.getTemplate("./components/header/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/template.njk", !1, function(V, E) {
              if (V) {
                n(V);
                return;
              }
              E.getExported(function(S, T) {
                if (S) {
                  n(S);
                  return;
                }
                if (Object.prototype.hasOwnProperty.call(T, "LBCamdenHeader"))
                  var H = T.LBCamdenHeader;
                else {
                  n(new Error("cannot import 'LBCamdenHeader'"));
                  return;
                }
                u.setVariable("LBCamdenHeader", H), c.getTemplate("./components/footer/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/template.njk", !1, function(I, M) {
                  if (I) {
                    n(I);
                    return;
                  }
                  M.getExported(function(B, G) {
                    if (B) {
                      n(B);
                      return;
                    }
                    if (Object.prototype.hasOwnProperty.call(G, "LBCamdenFooter"))
                      var N = G.LBCamdenFooter;
                    else {
                      n(new Error("cannot import 'LBCamdenFooter'"));
                      return;
                    }
                    u.setVariable("LBCamdenFooter", N), c.getTemplate("./components/card/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/template.njk", !1, function(R, Z) {
                      if (R) {
                        n(R);
                        return;
                      }
                      Z.getExported(function(W, D) {
                        if (W) {
                          n(W);
                          return;
                        }
                        if (Object.prototype.hasOwnProperty.call(D, "LBCamdenCard"))
                          var z = D.LBCamdenCard;
                        else {
                          n(new Error("cannot import 'LBCamdenCard'"));
                          return;
                        }
                        u.setVariable("LBCamdenCard", z), c.getTemplate("./components/search/macro.njk", !1, "node_modules/lbcamden-frontend/lbcamden/template.njk", !1, function(J, Q) {
                          if (J) {
                            n(J);
                            return;
                          }
                          Q.getExported(function($, K) {
                            if ($) {
                              n($);
                              return;
                            }
                            if (Object.prototype.hasOwnProperty.call(K, "LBCamdenSearch"))
                              var X = K.LBCamdenSearch;
                            else {
                              n(new Error("cannot import 'LBCamdenSearch'"));
                              return;
                            }
                            u.setVariable("LBCamdenSearch", X);
                            var Y;
                            Y = c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "assetUrl"), p.contextOrFrameLookup(u, t, "assetPath")), t.set("assetUrl", Y, !0), t.topLevel && u.setVariable("assetUrl", Y), t.topLevel && u.addExport("assetUrl", Y), F += `<!DOCTYPE html>
<html lang="`, F += p.suppressValue(c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "htmlLang"), "en"), c.opts.autoescape), F += '" class="govuk-template ', F += p.suppressValue(p.contextOrFrameLookup(u, t, "htmlClasses"), c.opts.autoescape), F += `">
<head>
  <meta charset="utf-8">
  <title`, p.contextOrFrameLookup(u, t, "pageTitleLang") && (F += ' lang="', F += p.suppressValue(p.contextOrFrameLookup(u, t, "pageTitleLang"), c.opts.autoescape), F += '"'), F += ">", (j ? function(ao, lo, ro, io, A) {
                              A("");
                            } : u.getBlock("pageTitle"))(c, u, t, p, function(ao, lo) {
                              if (ao) {
                                n(ao);
                                return;
                              }
                              F += lo, F += `</title>
  <meta name="description" content="This is an example meta description">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  `, F += `
  <meta name="theme-color" content="`, F += p.suppressValue(c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "themeColor"), "#101812"), c.opts.autoescape), F += `">
  `, F += `
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  `, (j ? function(ro, io, A, U, x) {
                                x("");
                              } : u.getBlock("headIcons"))(c, u, t, p, function(ro, io) {
                                if (ro) {
                                  n(ro);
                                  return;
                                }
                                F += io, F += `

  `, (j ? function(A, U, x, q, oo) {
                                  oo("");
                                } : u.getBlock("head"))(c, u, t, p, function(A, U) {
                                  if (A) {
                                    n(A);
                                    return;
                                  }
                                  F += U, F += `
  `, F += `
  `, F += `
  <meta property="og:image" content="`, F += p.suppressValue(c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "assetUrl"), "/assets"), c.opts.autoescape), F += `/images/ms-icon-310x310.png">
</head>
<body
  class="govuk-template__body `, F += p.suppressValue(p.contextOrFrameLookup(u, t, "bodyClasses"), c.opts.autoescape), F += '"', t = t.push();
                                  var x = p.contextOrFrameLookup(u, t, "bodyAttributes");
                                  if (x) {
                                    x = p.fromIterator(x);
                                    var q;
                                    if (p.isArray(x)) {
                                      var oo = x.length;
                                      for (q = 0; q < x.length; q++) {
                                        var eo = x[q][0];
                                        t.set("[object Object]", x[q][0]);
                                        var po = x[q][1];
                                        t.set("[object Object]", x[q][1]), t.set("loop.index", q + 1), t.set("loop.index0", q), t.set("loop.revindex", oo - q), t.set("loop.revindex0", oo - q - 1), t.set("loop.first", q === 0), t.set("loop.last", q === oo - 1), t.set("loop.length", oo), F += " ", F += p.suppressValue(eo, c.opts.autoescape), F += '="', F += p.suppressValue(po, c.opts.autoescape), F += '"';
                                      }
                                    } else {
                                      q = -1;
                                      var oo = p.keys(x).length;
                                      for (var so in x) {
                                        q++;
                                        var uo = x[so];
                                        t.set("attribute", so), t.set("value", uo), t.set("loop.index", q + 1), t.set("loop.index0", q), t.set("loop.revindex", oo - q), t.set("loop.revindex0", oo - q - 1), t.set("loop.first", q === 0), t.set("loop.last", q === oo - 1), t.set("loop.length", oo), F += " ", F += p.suppressValue(so, c.opts.autoescape), F += '="', F += p.suppressValue(uo, c.opts.autoescape), F += '"';
                                      }
                                    }
                                  }
                                  t = t.pop(), F += `
>
<script`, p.contextOrFrameLookup(u, t, "cspNonce") && (F += ' nonce="', F += p.suppressValue(p.contextOrFrameLookup(u, t, "cspNonce"), c.opts.autoescape), F += '"'), F += `>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled')<\/script>

`, (j ? function(to, go, fo, Vo, ho) {
                                    ho("");
                                  } : u.getBlock("bodyStart"))(c, u, t, p, function(to, go) {
                                    if (to) {
                                      n(to);
                                      return;
                                    }
                                    F += go, F += `

`, (j ? function(fo, Vo, ho, jo, bo) {
                                      bo("");
                                    } : u.getBlock("skipLink"))(c, u, t, p, function(fo, Vo) {
                                      if (fo) {
                                        n(fo);
                                        return;
                                      }
                                      F += Vo, F += `

`, (j ? function(ho, jo, bo, co, vo) {
                                        vo("");
                                      } : u.getBlock("header"))(c, u, t, p, function(ho, jo) {
                                        if (ho) {
                                          n(ho);
                                          return;
                                        }
                                        F += jo, F += `

`, (j ? function(bo, co, vo, Io, wo) {
                                          wo("");
                                        } : u.getBlock("main"))(c, u, t, p, function(bo, co) {
                                          if (bo) {
                                            n(bo);
                                            return;
                                          }
                                          F += co, F += `

`, (j ? function(vo, Io, wo, Po, Bo) {
                                            Bo("");
                                          } : u.getBlock("footer"))(c, u, t, p, function(vo, Io) {
                                            if (vo) {
                                              n(vo);
                                              return;
                                            }
                                            F += Io, F += `

`, (j ? function(wo, Po, Bo, ds, be) {
                                              be("");
                                            } : u.getBlock("bodyEnd"))(c, u, t, p, function(wo, Po) {
                                              if (wo) {
                                                n(wo);
                                                return;
                                              }
                                              F += Po, F += `
</body>
</html>
`, j ? j.rootRenderFunc(c, u, t, p, n) : n(null, F);
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (w) {
        n(p.handleError(w, k, f));
      }
    }
    function r(c, u, t, p, n) {
      var k = 12, f = 72, F = "";
      try {
        var t = t.push(!0);
        F += "LBCamden Front End Components", n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function a(c, u, t, p, n) {
      var k = 20, f = 5, F = "";
      try {
        var t = t.push(!0);
        F += `
    <link rel="shortcut icon" sizes="16x16 32x32 48x48"
          href="`, F += p.suppressValue(c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "assetPath"), "/assets"), c.opts.autoescape), F += `/images/favicons/favicon.ico"
          type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180"
          href="`, F += p.suppressValue(c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "assetPath"), "/assets"), c.opts.autoescape), F += `/images/favicons/apple-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="152x152"
          href="`, F += p.suppressValue(c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "assetPath"), "/assets"), c.opts.autoescape), F += `/images/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" href="`, F += p.suppressValue(c.getFilter("default").call(u, p.contextOrFrameLookup(u, t, "assetPath"), "/assets"), c.opts.autoescape), F += `/images/favicons/apple-icon.png">
  `, n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function e(c, u, t, p, n) {
      var k = 31, f = 5, F = "";
      try {
        var t = t.push(!0);
        n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function o(c, u, t, p, n) {
      var k = 41, f = 3, F = "";
      try {
        var t = t.push(!0);
        n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function l(c, u, t, p, n) {
      var k = 43, f = 3, F = "";
      try {
        var t = t.push(!0);
        F += `
  `, F += p.suppressValue((k = 44, f = 18, p.callWrap(p.contextOrFrameLookup(u, t, "govukSkipLink"), "govukSkipLink", u, [{ href: "#main-content", text: "Skip to main content" }])), c.opts.autoescape), F += `
`, n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function L(c, u, t, p, n) {
      var k = 50, f = 3, F = "";
      try {
        var t = t.push(!0);
        F += `
  `, F += p.suppressValue((k = 51, f = 19, p.callWrap(p.contextOrFrameLookup(u, t, "LBCamdenHeader"), "LBCamdenHeader", u, [])), c.opts.autoescape), F += `
`, n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function g(c, u, t, p, n) {
      var k = 54, f = 3, F = "";
      try {
        var t = t.push(!0);
        F += `
  <main class="govuk-main-wrapper `, F += p.suppressValue(p.contextOrFrameLookup(u, t, "containerClasses"), c.opts.autoescape), F += '" role="main"', p.contextOrFrameLookup(u, t, "mainLang") && (F += ' lang="', F += p.suppressValue(p.contextOrFrameLookup(u, t, "mainLang"), c.opts.autoescape), F += '"'), F += `>
    `, u.getBlock("beforeContent")(c, u, t, p, function(w, C) {
          if (w) {
            n(w);
            return;
          }
          F += C, F += `
    <div class="`, F += p.suppressValue(p.contextOrFrameLookup(u, t, "mainClasses"), c.opts.autoescape), F += `" id="main-content">
      `, u.getBlock("content")(c, u, t, p, function(P, y) {
            if (P) {
              n(P);
              return;
            }
            F += y, F += `
    </div>
    `, u.getBlock("postContent")(c, u, t, p, function(O, V) {
              if (O) {
                n(O);
                return;
              }
              F += V, F += `
  </main>
  `, u.getBlock("afterContent")(c, u, t, p, function(E, S) {
                if (E) {
                  n(E);
                  return;
                }
                F += S, F += `
`, n(null, F);
              });
            });
          });
        });
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function s(c, u, t, p, n) {
      var k = 56, f = 7, F = "";
      try {
        var t = t.push(!0);
        F += `

    `, n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function v(c, u, t, p, n) {
      var k = 60, f = 9, F = "";
      try {
        var t = t.push(!0);
        n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function b(c, u, t, p, n) {
      var k = 62, f = 7, F = "";
      try {
        var t = t.push(!0);
        n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function m(c, u, t, p, n) {
      var k = 64, f = 5, F = "";
      try {
        var t = t.push(!0);
        F += `

  `, n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function i(c, u, t, p, n) {
      var k = 69, f = 3, F = "";
      try {
        var t = t.push(!0);
        F += `
  `, F += p.suppressValue((k = 70, f = 19, p.callWrap(p.contextOrFrameLookup(u, t, "LBCamdenFooter"), "LBCamdenFooter", u, [{}])), c.opts.autoescape), F += `
`, n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    function h(c, u, t, p, n) {
      var k = 75, f = 3, F = "";
      try {
        var t = t.push(!0);
        n(null, F);
      } catch (j) {
        n(p.handleError(j, k, f));
      }
    }
    return {
      b_pageTitle: r,
      b_headIcons: a,
      b_head: e,
      b_bodyStart: o,
      b_skipLink: l,
      b_header: L,
      b_main: g,
      b_beforeContent: s,
      b_content: v,
      b_postContent: b,
      b_afterContent: m,
      b_footer: i,
      b_bodyEnd: h,
      root: d
    };
  }();
})();
(function() {
  (globalThis.nunjucksPrecompiled = globalThis.nunjucksPrecompiled || {})["src/layout/layout.njk"] = /* @__PURE__ */ function() {
    function d(h, c, u, t, p) {
      var n = 0, k = 0, f = "";
      try {
        var F = null;
        h.getTemplate("node_modules/lbcamden-frontend/lbcamden/template.njk", !0, "src/layout/layout.njk", !1, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          F = w;
          for (var C in F.blocks)
            c.addBlock(C, F.blocks[C]);
          var P;
          P = t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "assetUrl"), u.set("assetUrl", P, !0), u.topLevel && c.setVariable("assetUrl", P), u.topLevel && c.addExport("assetUrl", P);
          var y;
          y = t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "assetPath"), u.set("assetPath", y, !0), u.topLevel && c.setVariable("assetPath", y), u.topLevel && c.addExport("assetPath", y);
          var O;
          O = t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "htmlClasses"), u.set("htmlClasses", O, !0), u.topLevel && c.setVariable("htmlClasses", O), u.topLevel && c.addExport("htmlClasses", O), (F ? function(V, E, S, T, H) {
            H("");
          } : c.getBlock("headIcons"))(h, c, u, t, function(V, E) {
            if (V) {
              p(V);
              return;
            }
            f += E, f += `

`, (F ? function(S, T, H, I, M) {
              M("");
            } : c.getBlock("head"))(h, c, u, t, function(S, T) {
              if (S) {
                p(S);
                return;
              }
              f += T, f += `

`, (F ? function(H, I, M, B, G) {
                G("");
              } : c.getBlock("bodyStart"))(h, c, u, t, function(H, I) {
                if (H) {
                  p(H);
                  return;
                }
                f += I, f += `


`, (F ? function(M, B, G, N, R) {
                  R("");
                } : c.getBlock("skipLink"))(h, c, u, t, function(M, B) {
                  if (M) {
                    p(M);
                    return;
                  }
                  f += B, f += `

`, (F ? function(G, N, R, Z, W) {
                    W("");
                  } : c.getBlock("header"))(h, c, u, t, function(G, N) {
                    if (G) {
                      p(G);
                      return;
                    }
                    f += N, f += `

`, (F ? function(R, Z, W, D, z) {
                      z("");
                    } : c.getBlock("main"))(h, c, u, t, function(R, Z) {
                      if (R) {
                        p(R);
                        return;
                      }
                      f += Z, f += `

`, (F ? function(W, D, z, J, Q) {
                        Q("");
                      } : c.getBlock("beforeContent"))(h, c, u, t, function(W, D) {
                        if (W) {
                          p(W);
                          return;
                        }
                        f += D, f += `

`, (F ? function(z, J, Q, $, K) {
                          K("");
                        } : c.getBlock("content"))(h, c, u, t, function(z, J) {
                          if (z) {
                            p(z);
                            return;
                          }
                          f += J, f += `

`, (F ? function(Q, $, K, X, Y) {
                            Y("");
                          } : c.getBlock("postContent"))(h, c, u, t, function(Q, $) {
                            if (Q) {
                              p(Q);
                              return;
                            }
                            f += $, f += `

`, (F ? function(K, X, Y, ao, lo) {
                              lo("");
                            } : c.getBlock("afterContent"))(h, c, u, t, function(K, X) {
                              if (K) {
                                p(K);
                                return;
                              }
                              f += X, f += `

`, (F ? function(Y, ao, lo, ro, io) {
                                io("");
                              } : c.getBlock("footer"))(h, c, u, t, function(Y, ao) {
                                if (Y) {
                                  p(Y);
                                  return;
                                }
                                f += ao, f += `

`, (F ? function(lo, ro, io, A, U) {
                                  U("");
                                } : c.getBlock("bodyEnd"))(h, c, u, t, function(lo, ro) {
                                  if (lo) {
                                    p(lo);
                                    return;
                                  }
                                  f += ro, f += `
`, F ? F.rootRenderFunc(h, c, u, t, p) : p(null, f);
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } catch (j) {
        p(t.handleError(j, n, k));
      }
    }
    function r(h, c, u, t, p) {
      var n = 6, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "headIcons", r, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "headIcons") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "headIcons")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function a(h, c, u, t, p) {
      var n = 14, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "head", a, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "head") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "head")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function e(h, c, u, t, p) {
      var n = 22, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "bodyStart", e, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "bodyStart") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "bodyStart")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function o(h, c, u, t, p) {
      var n = 31, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "skipLink", o, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "skipLink") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "skipLink")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function l(h, c, u, t, p) {
      var n = 39, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "header", l, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "header") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "header")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function L(h, c, u, t, p) {
      var n = 47, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "main", L, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "main") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "main")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function g(h, c, u, t, p) {
      var n = 55, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "beforeContent", g, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "beforeContent") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "beforeContent")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function s(h, c, u, t, p) {
      var n = 63, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "content", s, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "content") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "content")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function v(h, c, u, t, p) {
      var n = 71, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "postContent", v, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "postContent") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "postContent")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function b(h, c, u, t, p) {
      var n = 79, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "afterContent", b, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "afterContent") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "afterContent")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function m(h, c, u, t, p) {
      var n = 87, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "footer", m, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "footer") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "footer")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    function i(h, c, u, t, p) {
      var n = 95, k = 3, f = "";
      try {
        var u = u.push(!0);
        c.getSuper(h, "bodyEnd", i, u, t, function(j, w) {
          if (j) {
            p(j);
            return;
          }
          w = t.markSafe(w), f += `
`, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "bodyEnd") ? (f += `
`, f += t.suppressValue(h.getFilter("safe").call(c, t.memberLookup(t.contextOrFrameLookup(c, u, "params"), "bodyEnd")), h.opts.autoescape), f += `
`) : (f += `
`, f += t.suppressValue(w, h.opts.autoescape), f += `
`), f += `
`, p(null, f);
        });
      } catch (F) {
        p(t.handleError(F, n, k));
      }
    }
    return {
      b_headIcons: r,
      b_head: a,
      b_bodyStart: e,
      b_skipLink: o,
      b_header: l,
      b_main: L,
      b_beforeContent: g,
      b_content: s,
      b_postContent: v,
      b_afterContent: b,
      b_footer: m,
      b_bodyEnd: i,
      root: d
    };
  }();
})();
const Ye = [], Xe = ko("src/layout/layout.njk", Ye);
async function mo(d) {
  if (typeof d == "string" || typeof d == "number" || typeof d == "bigint")
    return Yo`${d}`;
  if (Array.isArray(d))
    return (await yo(d, mo)).filter(Boolean).join(" ");
  if (ue(d))
    return Yo`${d}`;
}
async function _(d, r = { html: "html", text: "text" }) {
  if (!d) return;
  if (typeof d == "string" || typeof d == "number")
    return { [r.text]: String(d) };
  const a = await mo(d);
  if (a)
    return { [r.html]: a };
}
async function Qe(d) {
  if (qo(d))
    return await _(d);
  const { content: r, ...a } = d;
  return {
    ...a,
    ...await _(r)
  };
}
async function yo(d, r) {
  return Promise.all(d.map(r));
}
function qo(d) {
  return typeof d == "string" || typeof d == "number" || typeof d == "boolean" || !d || Array.isArray(d) && d.every(qo) || _e(d) || ue(d);
}
function _e(d) {
  return "then" in d && typeof d.then == "function";
}
function oa(d) {
  const r = (d.isDev ? d.devAssetPath : d.prodAssetPath) + "/", a = r + pe(d.jsMain, d.isDev), e = r + pe(d.styleMain, d.isDev);
  return {
    assetPath: d.isDev ? d.devAssetPath : d.prodAssetPath,
    head: /* @__PURE__ */ no("link", { rel: "stylesheet", href: e }),
    bodyEnd: /* @__PURE__ */ no("script", { type: "module", src: a })
  };
}
const ea = {
  jsx: "js",
  tsx: "js",
  ts: "js",
  scss: "css"
}, le = /\.([a-z]+)$/;
function pe(d, r) {
  if (r)
    return d;
  const a = le.exec(d);
  if (!a) return d;
  const e = ea[a[1]];
  return e ? d.replace(le, "." + e) : d;
}
async function gs(d) {
  if (d.assetConf) {
    const { assetPath: u, head: t, bodyEnd: p } = oa(d.assetConf);
    d.assetPath = u, d.head = /* @__PURE__ */ no(zo, { children: [
      t,
      d.head
    ] }), d.bodyEnd = /* @__PURE__ */ no(zo, { children: [
      p,
      d.bodyEnd
    ] });
  }
  const {
    assetConf: r,
    headIcons: a,
    head: e,
    bodyStart: o,
    skipLink: l,
    header: L,
    main: g,
    beforeContent: s,
    postContent: v,
    afterContent: b,
    footer: m,
    bodyEnd: i,
    children: h,
    ...c
  } = d;
  return /* @__PURE__ */ no(
    Xe,
    {
      ...c,
      headIcons: await mo(a),
      head: await mo(e),
      bodyStart: await mo(o),
      skipLink: await mo(l),
      header: await mo(L),
      main: await mo(g),
      beforeContent: await mo(s),
      content: await mo(h),
      postContent: await mo(v),
      afterContent: await mo(b),
      footer: await mo(m),
      bodyEnd: await mo(i)
    }
  );
}
function Lo(d) {
  return async (r) => /* @__PURE__ */ no(zo, { children: ve(await d({ params: r })) });
}
const aa = [], sa = ko("node_modules/govuk-frontend/dist/govuk/components/accordion/template.njk", aa), ra = [], la = ko("node_modules/govuk-frontend/dist/govuk/components/back-link/template.njk", ra), pa = [], ta = ko("node_modules/govuk-frontend/dist/govuk/components/breadcrumbs/template.njk", pa), ua = [], na = ko("node_modules/govuk-frontend/dist/govuk/components/checkboxes/template.njk", ua), ca = [], ia = ko("node_modules/govuk-frontend/dist/govuk/components/cookie-banner/template.njk", ca), da = [], ka = ko("node_modules/govuk-frontend/dist/govuk/components/date-input/template.njk", da), La = [], ba = ko("node_modules/govuk-frontend/dist/govuk/components/error-message/template.njk", La), ga = [], ha = ko("node_modules/govuk-frontend/dist/govuk/components/error-summary/template.njk", ga), va = [], ma = ko("node_modules/govuk-frontend/dist/govuk/components/fieldset/template.njk", va), fa = [], Fa = ko("node_modules/govuk-frontend/dist/govuk/components/file-upload/template.njk", fa), Oa = [], ya = ko("node_modules/govuk-frontend/dist/govuk/components/hint/template.njk", Oa), Va = [], ja = ko("node_modules/govuk-frontend/dist/govuk/components/input/template.njk", Va), wa = [], Ea = ko("node_modules/govuk-frontend/dist/govuk/components/label/template.njk", wa), Pa = [], Ca = ko("node_modules/govuk-frontend/dist/govuk/components/notification-banner/template.njk", Pa), Ta = [], Ia = ko("node_modules/govuk-frontend/dist/govuk/components/panel/template.njk", Ta), Ba = [], Aa = ko("node_modules/govuk-frontend/dist/govuk/components/password-input/template.njk", Ba), Sa = [], Ha = ko("node_modules/govuk-frontend/dist/govuk/components/phase-banner/template.njk", Sa), Ma = [], Wa = ko("node_modules/govuk-frontend/dist/govuk/components/radios/template.njk", Ma), Ra = [], Ga = ko("node_modules/govuk-frontend/dist/govuk/components/select/template.njk", Ra), Na = [], Ua = ko("node_modules/govuk-frontend/dist/govuk/components/textarea/template.njk", Na), Da = Lo(sa), Ka = Lo(la), za = Lo(ta), $a = Lo(na), Za = Lo(ia), xa = Lo(ka), qa = Lo(ba), Ja = Lo(ha), Ya = Lo(ma), Xa = Lo(Fa), Qa = Lo(ya), _a = Lo(ja), os = Lo(Ea), es = Lo(Ca), as = Lo(Ia), ss = Lo(Aa), rs = Lo(Ha), ls = Lo(Wa), ps = Lo(Ga), ts = Lo(Ua);
function Jo(d) {
  for (var r = -1, a = d == null ? 0 : d.length, e = 0, o = []; ++r < a; ) {
    var l = d[r];
    l && (o[e++] = l);
  }
  return o;
}
async function hs({ items: d, ...r }) {
  const a = await yo(
    d,
    async (e) => e && {
      heading: await _(e.heading),
      summary: await _(e.summary),
      content: await _(e.content),
      expanded: e.expanded
    }
  );
  return /* @__PURE__ */ no(Da, { items: Jo(a), ...r });
}
function vs({ children: d, ...r }) {
  return /* @__PURE__ */ no(Ka, { ..._(d), ...r });
}
async function ms({ items: d, ...r }) {
  return /* @__PURE__ */ no(
    za,
    {
      items: await yo(d, Qe),
      ...r
    }
  );
}
const us = [], ns = ko("node_modules/lbcamden-frontend/lbcamden/components/button/template.njk", us), cs = Lo(ns), fs = async ({ children: d, ...r }) => /* @__PURE__ */ no(cs, { ...await _(d), ...r });
async function Fs(d) {
  const r = await yo(
    Jo(d.items),
    async (a) => {
      if (is(a)) return a;
      const { content: e, conditional: o, hint: l, value: L, ...g } = a;
      return {
        ...g,
        hint: l,
        value: L,
        ...await _(e),
        conditional: await _(o)
      };
    }
  );
  return /* @__PURE__ */ no(
    $a,
    {
      ...d,
      errorMessage: await _(d.errorMessage),
      hint: d.hint,
      items: r,
      formGroup: d.formGroup && {
        ...d.formGroup,
        afterInputs: await _(d.formGroup.afterInputs),
        beforeInputs: await _(d.formGroup.beforeInputs)
      }
    }
  );
}
function is(d) {
  return "divider" in d && typeof d.divider == "string";
}
async function Os(d) {
  return /* @__PURE__ */ no(
    Za,
    {
      ...d,
      messages: await yo(
        d.messages,
        async ({ heading: r, content: a, actions: e = [], ...o }) => ({
          ...o,
          ...await _(r, {
            html: "headingHtml",
            text: "headingText"
          }),
          ...await _(a),
          actions: await yo(e, async ({ content: l, ...L }) => ({
            ...L,
            ...await _(l)
          }))
        })
      )
    }
  );
}
async function ys({
  hint: d,
  formGroup: r,
  errorMessage: a,
  ...e
}) {
  return /* @__PURE__ */ no(
    xa,
    {
      ...e,
      items: e.items,
      hint: await _(d),
      errorMessage: await _(a),
      formGroup: r && {
        ...r,
        beforeInputs: await _(r.beforeInputs),
        afterInputs: await _(r.afterInputs)
      }
    }
  );
}
async function Vs(d) {
  return /* @__PURE__ */ no(
    qa,
    {
      ...d,
      ...await _(d.children)
    }
  );
}
async function js({
  title: d,
  description: r,
  ...a
}) {
  const e = await yo(
    a.errorList ?? [],
    async ({ content: o, ...l }) => ({
      ...l,
      ...await _(o)
    })
  );
  return /* @__PURE__ */ no(
    Ja,
    {
      ...a,
      errorList: e,
      ...await _(d, {
        text: "titleText",
        html: "titleHtml"
      }),
      ...await _(r, {
        text: "descriptionText",
        html: "descriptionHtml"
      })
    }
  );
}
async function ws({ legend: d, children: r, ...a }) {
  return qo(d) && (d = { content: d }), /* @__PURE__ */ no(
    Ya,
    {
      ...a,
      ...await _(r),
      legend: d && {
        ...d,
        ...await _(d.content)
      }
    }
  );
}
async function Es({
  label: d,
  hint: r,
  errorMessage: a,
  formGroup: e,
  multipleFilesChosenText: o,
  ...l
}) {
  return /* @__PURE__ */ no(
    Xa,
    {
      ...l,
      label: await _(d),
      hint: await _(r),
      errorMessage: await _(a),
      formGroup: e && {
        ...e,
        beforeInput: await _(e.beforeInput),
        afterInput: await _(e.afterInput)
      },
      multipleFilesChosenText: await _(
        o
      )
    }
  );
}
async function Ps({ children: d, ...r }) {
  return /* @__PURE__ */ no(Qa, { ...r, ...await _(d) });
}
async function Cs({
  label: d,
  hint: r,
  prefix: a,
  suffix: e,
  errorMessage: o,
  ...l
}) {
  return /* @__PURE__ */ no(
    _a,
    {
      ...l,
      prefix: await te(a),
      suffix: await te(e),
      label: await _(d),
      errorMessage: await _(o),
      hint: await _(r)
    }
  );
}
async function te(d) {
  if (!d) return;
  const { content: r, ...a } = d;
  return {
    ...a,
    ...await _(r)
  };
}
function Ts(d) {
  return /* @__PURE__ */ no(os, { ...d });
}
async function Is({
  title: d,
  children: r,
  ...a
}) {
  return /* @__PURE__ */ no(
    es,
    {
      ...a,
      ...await _(r),
      ...await _(d, {
        text: "titleText",
        html: "titleHtml"
      })
    }
  );
}
async function Bs({ title: d, children: r, ...a }) {
  return /* @__PURE__ */ no(
    as,
    {
      ...a,
      ...await _(r),
      ...await _(d, {
        text: "titleText",
        html: "titleHtml"
      })
    }
  );
}
async function As({
  label: d,
  hint: r,
  errorMessage: a,
  ...e
}) {
  return /* @__PURE__ */ no(
    ss,
    {
      label: await _(d),
      errorMessage: await _(a),
      hint: await _(r),
      ...e
    }
  );
}
async function Ss({ children: d, ...r }) {
  return /* @__PURE__ */ no(
    rs,
    {
      ...r,
      ...await _(d),
      tag: await _(r.tag)
    }
  );
}
async function Hs({
  fieldset: d,
  hint: r,
  errorMessage: a,
  formGroup: e,
  ...o
}) {
  return /* @__PURE__ */ no(
    ls,
    {
      ...o,
      items: await yo(
        Jo(o.items),
        async ({ content: l, hint: L, conditional: g, ...s }) => ({
          ...s,
          ...await _(l),
          hint: await _(L),
          conditional: await _(g)
        })
      ),
      formGroup: e && {
        ...e,
        beforeInputs: await _(e.beforeInputs),
        afterInputs: await _(e.afterInputs)
      },
      hint: await _(r),
      errorMessage: await _(a)
    }
  );
}
async function Ms({ hint: d, errorMessage: r, ...a }) {
  const e = await yo(a.items, async ({ content: o, ...l }) => ({
    ...l,
    ...await _(o)
  }));
  return /* @__PURE__ */ no(
    ps,
    {
      ...a,
      items: e,
      hint: await _(d),
      errorMessage: await _(r)
    }
  );
}
async function Ws({
  label: d,
  hint: r,
  errorMessage: a,
  ...e
}) {
  return /* @__PURE__ */ no(
    ts,
    {
      ...e,
      label: await _(d),
      hint: await _(r),
      errorMessage: await _(a)
    }
  );
}
export {
  hs as Accordion,
  vs as BackLink,
  ms as Breadcrumbs,
  fs as Button,
  Fs as Checkboxes,
  Os as CookieBanner,
  ys as DateInput,
  Vs as ErrorMessage,
  js as ErrorSummary,
  ws as Fieldset,
  Es as FileUpload,
  Ps as Hint,
  Cs as Input,
  Ts as Label,
  Is as NotificationBanner,
  gs as Page,
  Bs as Panel,
  As as PasswordInput,
  Ss as PhaseBanner,
  Hs as Radios,
  Ms as Select,
  Ws as Textarea,
  oa as getAssetPaths
};
