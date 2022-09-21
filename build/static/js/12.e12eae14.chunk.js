/*! For license information please see 12.e12eae14.chunk.js.LICENSE.txt */
(this["webpackJsonpwallet-connect-typescript"]=this["webpackJsonpwallet-connect-typescript"]||[]).push([[12],{1436:function(t,e,n){"use strict";n.r(e),n.d(e,"FrameConnector",(function(){return v})),n.d(e,"UserRejectedRequestError",(function(){return p}));var r=n(449),o=n(895),i=n.n(o),s=n(80);function c(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function u(t){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},u(t)}function a(t,e){return a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},a(t,e)}function f(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function l(t,e,n){return l=f()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&a(o,n.prototype),o},l.apply(null,arguments)}function h(t){var e="function"===typeof Map?new Map:void 0;return h=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return l(t,arguments,u(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,t)},h(t)}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var p=function(t){function e(){var e;return(e=t.call(this)||this).name=e.constructor.name,e.message="The user rejected the request.",e}return c(e,t),e}(h(Error)),v=function(t){function e(e){var n;return 1!==e.supportedChainIds.length&&Object(s.a)(!1),(n=t.call(this,e)||this).handleNetworkChanged=n.handleNetworkChanged.bind(d(n)),n.handleChainChanged=n.handleChainChanged.bind(d(n)),n.handleAccountsChanged=n.handleAccountsChanged.bind(d(n)),n.handleClose=n.handleClose.bind(d(n)),n}c(e,t);var n=e.prototype;return n.handleNetworkChanged=function(t){this.emitUpdate({provider:this.provider,chainId:t})},n.handleChainChanged=function(t){this.emitUpdate({chainId:t})},n.handleAccountsChanged=function(t){this.emitUpdate({account:0===t.length?null:t[0]})},n.handleClose=function(t,e){this.emitDeactivate()},n.activate=function(){try{var t=this;return t.provider||(t.provider=i()("frame")),t.provider.on("networkChanged",t.handleNetworkChanged).on("chainChanged",t.handleChainChanged).on("accountsChanged",t.handleAccountsChanged).on("close",t.handleClose),Promise.resolve(t.provider.enable().then((function(t){return t[0]})).catch((function(t){throw t&&4001===t.code?new p:t}))).then((function(e){return{provider:t.provider,account:e}}))}catch(e){return Promise.reject(e)}},n.getProvider=function(){try{return Promise.resolve(this.provider)}catch(t){return Promise.reject(t)}},n.getChainId=function(){try{return Promise.resolve(this.provider.send("eth_chainId"))}catch(t){return Promise.reject(t)}},n.getAccount=function(){try{return Promise.resolve(this.provider.send("eth_accounts").then((function(t){return t[0]})))}catch(t){return Promise.reject(t)}},n.deactivate=function(){this.provider.removeListener("networkChanged",this.handleNetworkChanged).removeListener("chainChanged",this.handleChainChanged).removeListener("accountsChanged",this.handleAccountsChanged).removeListener("close",this.handleClose)},e}(r.a)},440:function(t,e,n){"use strict";var r,o="object"===typeof Reflect?Reflect:null,i=o&&"function"===typeof o.apply?o.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};r=o&&"function"===typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var s=Number.isNaN||function(t){return t!==t};function c(){c.init.call(this)}t.exports=c,t.exports.once=function(t,e){return new Promise((function(n,r){function o(n){t.removeListener(e,i),r(n)}function i(){"function"===typeof t.removeListener&&t.removeListener("error",o),n([].slice.call(arguments))}m(t,e,i,{once:!0}),"error"!==e&&function(t,e,n){"function"===typeof t.on&&m(t,"error",e,n)}(t,o,{once:!0})}))},c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var u=10;function a(t){if("function"!==typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function f(t){return void 0===t._maxListeners?c.defaultMaxListeners:t._maxListeners}function l(t,e,n,r){var o,i,s,c;if(a(n),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(void 0!==i.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),s=i[e]),void 0===s)s=i[e]=n,++t._eventsCount;else if("function"===typeof s?s=i[e]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=f(t))>0&&s.length>o&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=s.length,c=u,console&&console.warn&&console.warn(c)}return t}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},o=h.bind(r);return o.listener=n,r.wrapFn=o,o}function p(t,e,n){var r=t._events;if(void 0===r)return[];var o=r[e];return void 0===o?[]:"function"===typeof o?n?[o.listener||o]:[o]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(o):y(o,o.length)}function v(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"===typeof n)return 1;if(void 0!==n)return n.length}return 0}function y(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}function m(t,e,n,r){if("function"===typeof t.on)r.once?t.once(e,n):t.on(e,n);else{if("function"!==typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function o(i){r.once&&t.removeEventListener(e,o),n(i)}))}}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(t){if("number"!==typeof t||t<0||s(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");u=t}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(t){if("number"!==typeof t||t<0||s(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},c.prototype.getMaxListeners=function(){return f(this)},c.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var r="error"===t,o=this._events;if(void 0!==o)r=r&&void 0===o.error;else if(!r)return!1;if(r){var s;if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var c=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw c.context=s,c}var u=o[t];if(void 0===u)return!1;if("function"===typeof u)i(u,this,e);else{var a=u.length,f=y(u,a);for(n=0;n<a;++n)i(f[n],this,e)}return!0},c.prototype.addListener=function(t,e){return l(this,t,e,!1)},c.prototype.on=c.prototype.addListener,c.prototype.prependListener=function(t,e){return l(this,t,e,!0)},c.prototype.once=function(t,e){return a(e),this.on(t,d(this,t,e)),this},c.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,d(this,t,e)),this},c.prototype.removeListener=function(t,e){var n,r,o,i,s;if(a(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0===--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!==typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===e||n[i].listener===e){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,o),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,s||e)}return this},c.prototype.off=c.prototype.removeListener,c.prototype.removeAllListeners=function(t){var e,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"===typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(r=e.length-1;r>=0;r--)this.removeListener(t,e[r]);return this},c.prototype.listeners=function(t){return p(this,t,!0)},c.prototype.rawListeners=function(t){return p(this,t,!1)},c.listenerCount=function(t,e){return"function"===typeof t.listenerCount?t.listenerCount(e):v.call(t,e)},c.prototype.listenerCount=v,c.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},442:function(t,e,n){var r=n(244).default;function o(){"use strict";t.exports=o=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},n=Object.prototype,i=n.hasOwnProperty,s="function"==typeof Symbol?Symbol:{},c=s.iterator||"@@iterator",u=s.asyncIterator||"@@asyncIterator",a=s.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(O){f=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),s=new j(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return S()}for(n.method=o,n.arg=i;;){var s=n.delegate;if(s){var c=k(s,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=h(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===d)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,s),i}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(O){return{type:"throw",arg:O}}}e.wrap=l;var d={};function p(){}function v(){}function y(){}var m={};f(m,c,(function(){return this}));var g=Object.getPrototypeOf,w=g&&g(g(E([])));w&&w!==n&&i.call(w,c)&&(m=w);var b=y.prototype=p.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function n(o,s,c,u){var a=h(t[o],t,s);if("throw"!==a.type){var f=a.arg,l=f.value;return l&&"object"==r(l)&&i.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):e.resolve(l).then((function(t){f.value=t,c(f)}),(function(t){return n("throw",t,c,u)}))}u(a.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function k(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,k(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var r=h(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,d;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function E(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(i.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:S}}function S(){return{value:void 0,done:!0}}return v.prototype=y,f(b,"constructor",y),f(y,"constructor",v),v.displayName=f(y,a,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,f(t,a,"GeneratorFunction")),t.prototype=Object.create(b),t},e.awrap=function(t){return{__await:t}},x(_.prototype),f(_.prototype,u,(function(){return this})),e.AsyncIterator=_,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var s=new _(l(t,n,r,o),i);return e.isGeneratorFunction(n)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},x(b),f(b,a,"Generator"),f(b,c,(function(){return this})),f(b,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=E,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return s.type="throw",s.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],s=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=i.call(o,"catchLoc"),u=i.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=t,s.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),C(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;C(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:E(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},e}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},444:function(t,e){function n(t,e,n,r,o,i,s){try{var c=t[i](s),u=c.value}catch(a){return void n(a)}c.done?e(u):Promise.resolve(u).then(r,o)}t.exports=function(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var s=t.apply(e,r);function c(t){n(s,o,i,c,u,"next",t)}function u(t){n(s,o,i,c,u,"throw",t)}c(void 0)}))}},t.exports.__esModule=!0,t.exports.default=t.exports},449:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(440),o=n(95);var i=function(t){var e,n;function r(e){var n,r=(void 0===e?{}:e).supportedChainIds;return(n=t.call(this)||this).supportedChainIds=r,n}n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var i=r.prototype;return i.emitUpdate=function(t){this.emit(o.a.Update,t)},i.emitError=function(t){this.emit(o.a.Error,t)},i.emitDeactivate=function(){this.emit(o.a.Deactivate)},r}(r.EventEmitter)},468:function(t,e,n){var r=n(526),o=n(527),i=n(239),s=n(528);t.exports=function(t){return r(t)||o(t)||i(t)||s()},t.exports.__esModule=!0,t.exports.default=t.exports},526:function(t,e,n){var r=n(243);t.exports=function(t){if(Array.isArray(t))return r(t)},t.exports.__esModule=!0,t.exports.default=t.exports},527:function(t,e){t.exports=function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},528:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},895:function(t,e,n){var r=n(896),o=n(897),i=n(900),s={ethereum:"undefined"!==typeof window&&"undefined"!==typeof window.ethereum?window.ethereum:null,web3:"undefined"!==typeof window&&"undefined"!==typeof window.web3?window.web3.currentProvider:null},c="undefined"!==typeof window&&"undefined"!==typeof window.WebSocket?window.WebSocket:null,u="undefined"!==typeof window&&"undefined"!==typeof window.XMLHttpRequest?window.XMLHttpRequest:null;s.ethereum&&(s.ethereum.__isProvider=!0);var a={injected:s.ethereum||n(901)(s.web3),ipc:n(902)("IPC connections are unavliable in the browser"),ws:n(903)(c),http:n(905)(u)};t.exports=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["injected","frame"],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o(a,r(t,i),e)}},896:function(t,e,n){var r=n(468).default,o=function(t){return"injected"===t?"injected":t.endsWith(".ipc")?"ipc":t.startsWith("wss://")||t.startsWith("ws://")?"ws":t.startsWith("https://")||t.startsWith("http://")?"http":""};t.exports=function(t,e){var n;return(n=[]).concat.apply(n,r([].concat(t).map((function(t){return e[t]?e[t].map((function(e){return{type:t,location:e,protocol:o(e)}})):{type:"custom",location:t,protocol:o(t)}})))).filter((function(t){return!(!t.protocol&&"injected"!==t.type)||(console.log('eth-provider | Invalid provider preset/location: "'+t.location+'"'),!1)}))}},897:function(t,e,n){var r=n(442).default,o=n(444).default,i=n(440),s=n(898),c=n(899),u=function(t){function e(e){t.status=e,t instanceof i&&t.emit("status",e)}function n(){return s.apply(this,arguments)}function s(){return(s=o(r().mark((function o(){return r().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t.inSetup){r.next=2;break}return r.abrupt("return",setTimeout(n,1e3));case 2:return r.prev=2,r.next=5,t.send("eth_syncing");case 5:if(!r.sent){r.next=10;break}e("syncing"),setTimeout((function(){return n()}),5e3),r.next=11;break;case 10:e("connected");case 11:r.next=16;break;case 13:r.prev=13,r.t0=r.catch(2),e("disconnected");case 16:case"end":return r.stop()}}),o,null,[[2,13]])})))).apply(this,arguments)}return e("loading"),n(),t.on("connect",(function(){return n()})),t.on("close",(function(){return e("disconnected")})),t};t.exports=function(t,e,n){if(t.injected.__isProvider&&e.map((function(t){return t.type})).indexOf("injected")>-1)return delete t.injected.__isProvider,u(t.injected);var r=new s(new c(t,e,n));return r.setMaxListeners(128),u(r)}},898:function(t,e,n){var r=n(468).default,o=n(442).default,i=n(444).default,s=n(232).default,c=n(233).default,u=n(234).default,a=n(235).default,f=function(t){"use strict";u(n,t);var e=a(n);function n(t){var r;return s(this,n),(r=e.call(this)).connected=!1,r.nextId=0,r.promises={},r.subscriptions=[],r.connection=t,r.connection.on("connect",(function(){return r.checkConnection()})),r.connection.on("close",(function(){return r.emit("close")})),r.connection.on("payload",(function(t){var e=t.id,n=t.method,o=t.error,i=t.result;"undefined"!==typeof e?r.promises[e]&&(t.error?r.promises[e].reject(o):r.promises[e].resolve(i),delete r.promises[e]):n&&n.indexOf("_subscription")>-1&&(r.emit(t.params.subscription,t.params.result),r.emit(n,t.params),r.emit("data",t))})),r.on("newListener",(function(t,e){"networkChanged"===t?!r.attemptedNetworkSubscription&&r.connected&&r.startNetworkSubscription():"accountsChanged"===t&&!r.attemptedAccountsSubscription&&r.connected&&r.startAccountsSubscription()})),r}return c(n,[{key:"checkConnection",value:function(){var t=i(o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=this,t.next=4,this._send("net_version");case 4:t.t1=t.sent,t.t0.emit.call(t.t0,"connect",t.t1),this.connected=!0,this.listenerCount("networkChanged")&&!this.attemptedNetworkSubscription&&this.startNetworkSubscription(),this.listenerCount("accountsChanged")&&!this.attemptedAccountsSubscription&&this.startAccountsSubscription(),t.next=14;break;case 11:t.prev=11,t.t2=t.catch(0),this.connected=!1;case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));return function(){return t.apply(this,arguments)}}()},{key:"startNetworkSubscription",value:function(){var t=i(o().mark((function t(){var e,n=this;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.attemptedNetworkSubscription=!0,t.prev=1,t.next=4,this.subscribe("eth_subscribe","networkChanged");case 4:e=t.sent,this.on(e,(function(t){return n.emit("networkChanged",t)})),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.warn("Unable to subscribe to networkChanged",t.t0);case 11:case"end":return t.stop()}}),t,this,[[1,8]])})));return function(){return t.apply(this,arguments)}}()},{key:"startAccountsSubscription",value:function(){var t=i(o().mark((function t(){var e,n=this;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.attemptedAccountsSubscription=!0,t.prev=1,t.next=4,this.subscribe("eth_subscribe","accountsChanged");case 4:e=t.sent,this.on(e,(function(t){return n.emit("accountsChanged",t)})),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.warn("Unable to subscribe to accountsChanged",t.t0);case 11:case"end":return t.stop()}}),t,this,[[1,8]])})));return function(){return t.apply(this,arguments)}}()},{key:"enable",value:function(){var t=this;return new Promise((function(e,n){t._send("eth_accounts").then((function(r){if(r.length>0)t.accounts=r,t.coinbase=r[0],t.emit("enable"),e(r);else{var o=new Error("User Denied Full Provider");o.code=4001,n(o)}})).catch(n)}))}},{key:"_send",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t||"string"!==typeof t)return new Error("Method is not a valid string.");if(!(n instanceof Array))return new Error("Params is not a valid array.");var r={jsonrpc:"2.0",id:this.nextId++,method:t,params:n},o=new Promise((function(t,n){e.promises[r.id]={resolve:t,reject:n}}));return this.connection.send(r),o}},{key:"send",value:function(){return this._send.apply(this,arguments)}},{key:"_sendBatch",value:function(t){var e=this;return Promise.all(t.map((function(t){return e._send(t.method,t.params)})))}},{key:"subscribe",value:function(t,e){var n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this._send(t,[e].concat(r(o))).then((function(t){return n.subscriptions.push(t),t}))}},{key:"unsubscribe",value:function(t,e){var n=this;return this._send(t,[e]).then((function(t){if(t)return n.subscriptions=n.subscriptions.filter((function(t){return t!==e})),n.removeAllListeners(e),t}))}},{key:"sendAsync",value:function(t,e){return e&&"function"===typeof e?t?t instanceof Array?this.sendAsyncBatch(t,e):this._send(t.method,t.params).then((function(n){e(null,{id:t.id,jsonrpc:t.jsonrpc,result:n})})).catch((function(t){e(t)})):e(new Error("Invalid Payload")):e(new Error("Invalid or undefined callback provided to sendAsync"))}},{key:"sendAsyncBatch",value:function(t,e){return this._sendBatch(t).then((function(n){var r=n.map((function(e,n){return{id:t[n].id,jsonrpc:t[n].jsonrpc,result:e}}));e(null,r)})).catch((function(t){e(t)}))}},{key:"isConnected",value:function(){return this.connected}},{key:"close",value:function(){var t=this;this.connection.close(),this.connected=!1;var e=new Error("Provider closed, subscription lost, please subscribe again.");this.subscriptions.forEach((function(n){return t.emit(n,e)})),this.subscriptions=[]}}]),n}(n(440));t.exports=f},899:function(t,e,n){var r=n(232).default,o=n(233).default,i=n(234).default,s=n(235).default,c=n(440),u=!1,a=function(t){"use strict";i(n,t);var e=s(n);function n(t,o,i){var s;return r(this,n),(s=e.call(this)).targets=o,s.connections=t,s.connected=!1,s.status="loading",s.interval=i.interval||5e3,s.name=i.name||"default",s.inSetup=!0,s.connect(),s}return o(n,[{key:"connect",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(this.connection&&"connected"===this.connection.status&&e>=this.connection.index)u;else if(0===this.targets.length)u;else{var n=this.targets[e],r=n.protocol,o=n.location;this.connection=this.connections[r](o),this.connection.on("error",(function(n){return t.connected?t.listenerCount("error")?t.emit("error",n):void console.warn("eth-provider - Uncaught connection error: "+n.message):t.connectionError(e,n)})),this.connection.on("close",(function(e){t.connected=!1,t.emit("close"),t.closing||t.refresh()})),this.connection.on("connect",(function(){t.connection.target=t.targets[e],t.connection.index=e,t.targets[e].status=t.connection.status,t.connected=!0,t.inSetup=!1,t.emit("connect")})),this.connection.on("data",(function(e){return t.emit("data",e)})),this.connection.on("payload",(function(e){return t.emit("payload",e)}))}}},{key:"refresh",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.interval;clearTimeout(this.connectTimer),this.connectTimer=setTimeout((function(){return t.connect()}),e)}},{key:"connectionError",value:function(t,e){this.targets[t].status=e,this.targets.length-1===t?(this.inSetup=!1,this.refresh()):this.connect(++t)}},{key:"close",value:function(){this.closing=!0,this.connection?this.connection.close():this.emit("close"),clearTimeout(this.connectTimer)}},{key:"error",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1;this.emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:e,code:n}})}},{key:"send",value:function(t){var e=this;this.inSetup?setTimeout((function(){return e.send(t)}),100):this.connection.closed?this.error(t,"Not connected"):this.connection.send(t)}}]),n}(c);t.exports=a},900:function(t,e){t.exports={injected:["injected"],frame:["ws://127.0.0.1:1248","http://127.0.0.1:1248"],direct:["ws://127.0.0.1:8546","http://127.0.0.1:8545"],infura:["wss://mainnet.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://mainnet.infura.io/v3/786ade30f36244469480aa5c2bf0743b"],infuraRopsten:["wss://ropsten.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://ropsten.infura.io/v3/786ade30f36244469480aa5c2bf0743b"],infuraRinkeby:["wss://rinkeby.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://rinkeby.infura.io/v3/786ade30f36244469480aa5c2bf0743b"],infuraKovan:["wss://kovan.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://kovan.infura.io/v3/786ade30f36244469480aa5c2bf0743b"]}},901:function(t,e,n){var r=n(233).default,o=n(232).default,i=n(234).default,s=n(235).default,c=function(t){"use strict";i(n,t);var e=s(n);function n(t,r){var i;return o(this,n),i=e.call(this),t?setTimeout((function(){return i.emit("error",new Error("Injected web3 provider is not currently supported"))}),0):setTimeout((function(){return i.emit("error",new Error("No injected provider found"))}),0),i}return r(n)}(n(440));t.exports=function(t){return function(e){return new c(t,e)}}},902:function(t,e,n){var r=n(233).default,o=n(232).default,i=n(234).default,s=n(235).default,c=function(t){"use strict";i(n,t);var e=s(n);function n(t){var r;return o(this,n),r=e.call(this),setTimeout((function(){return r.emit("error",new Error(t))}),0),r}return r(n)}(n(440));t.exports=function(t){return function(){return new c(t)}}},903:function(t,e,n){var r,o=n(232).default,i=n(233).default,s=n(234).default,c=n(235).default,u=n(440),a=n(904),f=function(t){"use strict";s(n,t);var e=c(n);function n(t,i,s){var c;return o(this,n),c=e.call(this),r=t,setTimeout((function(){return c.create(i,s)}),0),c}return i(n,[{key:"create",value:function(t,e){var n=this;r||this.emit("error",new Error("No WebSocket transport available"));try{this.socket=new r(t)}catch(o){return this.emit("error",o)}this.socket.addEventListener("error",(function(t){return n.emit("error",t)})),this.socket.addEventListener("open",(function(){n.emit("connect"),n.socket.addEventListener("message",(function(t){var e="string"===typeof t.data?t.data:"";a(e,(function(t,e){t||e.forEach((function(t){Array.isArray(t)?t.forEach((function(t){return n.emit("payload",t)})):n.emit("payload",t)}))}))})),n.socket.addEventListener("close",(function(){return n.onClose()}))}))}},{key:"onClose",value:function(){this.socket=null,this.closed=!0,this.emit("close"),this.removeAllListeners()}},{key:"close",value:function(){this.socket?this.socket.close():this.onClose()}},{key:"error",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1;this.emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:e,code:n}})}},{key:"send",value:function(t){var e=this;this.socket&&this.socket.readyState===this.socket.CONNECTING?setTimeout((function(n){return e.send(t)}),10):!this.socket||this.socket.readyState>1?(this.connected=!1,this.error(t,"Not connected")):this.socket.send(JSON.stringify(t))}}]),n}(u);t.exports=function(t){return function(e,n){return new f(t,e,n)}}},904:function(t,e){var n,r;t.exports=function(t,e){var o=[];t.replace(/\}[\n\r]?\{/g,"}|--|{").replace(/\}\][\n\r]?\[\{/g,"}]|--|[{").replace(/\}[\n\r]?\[\{/g,"}|--|[{").replace(/\}\][\n\r]?\{/g,"}]|--|{").split("|--|").forEach((function(t){var i;n&&(t=n+t);try{i=JSON.parse(t)}catch(s){return n=t,clearTimeout(r),void(r=setTimeout((function(){return e(new Error("Parse response timeout"))}),15e3))}clearTimeout(r),n=null,i&&o.push(i)})),e(null,o)}},905:function(t,e,n){var r,o=n(232).default,i=n(233).default,s=n(234).default,c=n(235).default,u=n(440),a=n(906),f=function(t){"use strict";s(n,t);var e=c(n);function n(t,i,s){var c;return o(this,n),c=e.call(this),r=t,c.connected=!1,c.subscriptions=!1,c.status="loading",c.url=i,c.pollId=a(),setTimeout((function(){return c.create()}),0),c}return i(n,[{key:"create",value:function(){var t=this;if(!r)return this.emit("error",new Error("No HTTP transport available"));this.on("error",(function(){t.connected&&t.close()})),this.init()}},{key:"init",value:function(){var t=this;this.send({jsonrpc:"2.0",method:"eth_syncing",params:[],id:1},(function(e,n){if(e)return t.emit("error",e);t.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[t.pollId,"immediate"]},(function(e,n){e||(t.subscriptions=!0,t.pollSubscriptions()),t.connected=!0,t.emit("connect")}))}))}},{key:"pollSubscriptions",value:function(){var t=this;this.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[this.pollId]},(function(e,n){if(e)return t.subscriptionTimeout=setTimeout((function(){return t.pollSubscriptions()}),1e4),t.emit("error",e);t.closed||(t.subscriptionTimeout=t.pollSubscriptions()),n&&n.map((function(t){var e;try{e=JSON.parse(t)}catch(n){e=!1}return e})).filter((function(t){return t})).forEach((function(e){return t.emit("payload",e)}))}))}},{key:"close",value:function(){this.closed=!0,this.emit("close"),clearTimeout(this.subscriptionTimeout),this.removeAllListeners()}},{key:"filterStatus",value:function(t){if(t.status>=200&&t.status<300)return t;var e=new Error(t.statusText);throw e.res=t,e.message}},{key:"error",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1;this.emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:e,code:n}})}},{key:"send",value:function(t,e){var n=this;if(this.closed)return this.error(t,"Not connected");if("eth_subscribe"===t.method){if(!this.subscriptions)return this.error(t,"Subscriptions are not supported by this HTTP endpoint");t.pollId=this.pollId}var o=new r,i=!1,s=function(r,s){if(!i)if(o.abort(),i=!0,e)e(r,s);else{var c=t.id,u=t.jsonrpc,a=r?{id:c,jsonrpc:u,error:{message:r.message,code:r.code}}:{id:c,jsonrpc:u,result:s};n.emit("payload",a)}};o.open("POST",this.url,!0),o.setRequestHeader("Content-Type","application/json"),o.timeout=6e4,o.onerror=s,o.ontimeout=s,o.onreadystatechange=function(){if(4===o.readyState)try{var t=JSON.parse(o.responseText);s(t.error,t.result)}catch(e){s(e)}},o.send(JSON.stringify(t))}}]),n}(u);t.exports=function(t){return function(e,n){return new f(t,e,n)}}},906:function(t,e,n){var r=n(907),o=n(908);t.exports=function(t,e,n){var i=e&&n||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var s=(t=t||{}).random||(t.rng||r)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e)for(var c=0;c<16;++c)e[i+c]=s[c];return e||o(s)}},907:function(t,e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var r=new Uint8Array(16);t.exports=function(){return n(r),r}}else{var o=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0===(3&e)&&(t=4294967296*Math.random()),o[e]=t>>>((3&e)<<3)&255;return o}}},908:function(t,e){for(var n=[],r=0;r<256;++r)n[r]=(r+256).toString(16).substr(1);t.exports=function(t,e){var r=e||0,o=n;return[o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]]].join("")}}}]);
//# sourceMappingURL=12.e12eae14.chunk.js.map