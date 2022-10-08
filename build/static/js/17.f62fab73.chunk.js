(this["webpackJsonpwallet-connect-typescript"]=this["webpackJsonpwallet-connect-typescript"]||[]).push([[17],{1696:function(e,t,n){"use strict";n.r(t),n.d(t,"InjectedConnector",(function(){return m})),n.d(t,"NoEthereumProviderError",(function(){return p})),n.d(t,"UserRejectedRequestError",(function(){return v}));var r=n(738);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function s(e,t){return s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},s(e,t)}function c(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function h(e,t,n){return h=c()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&s(o,n.prototype),o},h.apply(null,arguments)}function a(e){var t="function"===typeof Map?new Map:void 0;return a=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return h(e,arguments,u(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),s(r,e)},a(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}"undefined"!==typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!==typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function d(e,t){try{var n=e()}catch(r){return t(r)}return n&&n.then?n.then(void 0,t):n}function l(e){return e.hasOwnProperty("result")?e.result:e}var p=function(e){function t(){var t;return(t=e.call(this)||this).name=t.constructor.name,t.message="No Ethereum provider was found on window.ethereum.",t}return i(t,e),t}(a(Error)),v=function(e){function t(){var t;return(t=e.call(this)||this).name=t.constructor.name,t.message="The user rejected the request.",t}return i(t,e),t}(a(Error)),m=function(e){function t(t){var n;return(n=e.call(this,t)||this).handleNetworkChanged=n.handleNetworkChanged.bind(f(n)),n.handleChainChanged=n.handleChainChanged.bind(f(n)),n.handleAccountsChanged=n.handleAccountsChanged.bind(f(n)),n.handleClose=n.handleClose.bind(f(n)),n}i(t,e);var n=t.prototype;return n.handleChainChanged=function(e){this.emitUpdate({chainId:e,provider:window.ethereum})},n.handleAccountsChanged=function(e){0===e.length?this.emitDeactivate():this.emitUpdate({account:e[0]})},n.handleClose=function(e,t){this.emitDeactivate()},n.handleNetworkChanged=function(e){this.emitUpdate({chainId:e,provider:window.ethereum})},n.activate=function(){try{var e,t=function(t){if(n)return t;function r(){return o({provider:window.ethereum},e?{account:e}:{})}var i=function(){if(!e)return Promise.resolve(window.ethereum.enable().then((function(e){return e&&l(e)[0]}))).then((function(t){e=t}))}();return i&&i.then?i.then(r):r()},n=!1,r=this;if(!window.ethereum)throw new p;window.ethereum.on&&(window.ethereum.on("chainChanged",r.handleChainChanged),window.ethereum.on("accountsChanged",r.handleAccountsChanged),window.ethereum.on("close",r.handleClose),window.ethereum.on("networkChanged",r.handleNetworkChanged)),window.ethereum.isMetaMask&&(window.ethereum.autoRefreshOnNetworkChange=!1);var i=d((function(){return Promise.resolve(window.ethereum.send("eth_requestAccounts").then((function(e){return l(e)[0]}))).then((function(t){e=t}))}),(function(e){if(4001===e.code)throw new v}));return Promise.resolve(i&&i.then?i.then(t):t(i))}catch(u){return Promise.reject(u)}},n.getProvider=function(){try{return Promise.resolve(window.ethereum)}catch(e){return Promise.reject(e)}},n.getChainId=function(){try{var e,t=function(){function t(){if(!e)try{e=l(window.ethereum.send({method:"net_version"}))}catch(t){}return e||(e=window.ethereum.isDapper?l(window.ethereum.cachedResults.net_version):window.ethereum.chainId||window.ethereum.netVersion||window.ethereum.networkVersion||window.ethereum._chainId),e}var n=function(){if(!e){var t=d((function(){return Promise.resolve(window.ethereum.send("net_version").then(l)).then((function(t){e=t}))}),(function(){}));if(t&&t.then)return t.then((function(){}))}}();return n&&n.then?n.then(t):t()};if(!window.ethereum)throw new p;var n=d((function(){return Promise.resolve(window.ethereum.send("eth_chainId").then(l)).then((function(t){e=t}))}),(function(){}));return Promise.resolve(n&&n.then?n.then(t):t())}catch(r){return Promise.reject(r)}},n.getAccount=function(){try{var e,t=function(){function t(){return e||(e=l(window.ethereum.send({method:"eth_accounts"}))[0]),e}var n=function(){if(!e){var t=d((function(){return Promise.resolve(window.ethereum.enable().then((function(e){return l(e)[0]}))).then((function(t){e=t}))}),(function(){}));if(t&&t.then)return t.then((function(){}))}}();return n&&n.then?n.then(t):t()};if(!window.ethereum)throw new p;var n=d((function(){return Promise.resolve(window.ethereum.send("eth_accounts").then((function(e){return l(e)[0]}))).then((function(t){e=t}))}),(function(){}));return Promise.resolve(n&&n.then?n.then(t):t())}catch(r){return Promise.reject(r)}},n.deactivate=function(){window.ethereum&&window.ethereum.removeListener&&(window.ethereum.removeListener("chainChanged",this.handleChainChanged),window.ethereum.removeListener("accountsChanged",this.handleAccountsChanged),window.ethereum.removeListener("close",this.handleClose),window.ethereum.removeListener("networkChanged",this.handleNetworkChanged))},n.isAuthorized=function(){try{return window.ethereum?Promise.resolve(d((function(){return Promise.resolve(window.ethereum.send("eth_accounts").then((function(e){return l(e).length>0})))}),(function(){return!1}))):Promise.resolve(!1)}catch(e){return Promise.reject(e)}},t}(r.a)},729:function(e,t,n){"use strict";var r,o="object"===typeof Reflect?Reflect:null,i=o&&"function"===typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};r=o&&"function"===typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var u=Number.isNaN||function(e){return e!==e};function s(){s.init.call(this)}e.exports=s,e.exports.once=function(e,t){return new Promise((function(n,r){function o(n){e.removeListener(t,i),r(n)}function i(){"function"===typeof e.removeListener&&e.removeListener("error",o),n([].slice.call(arguments))}w(e,t,i,{once:!0}),"error"!==t&&function(e,t,n){"function"===typeof e.on&&w(e,"error",t,n)}(e,o,{once:!0})}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var c=10;function h(e){if("function"!==typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function a(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function f(e,t,n,r){var o,i,u,s;if(h(n),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),u=i[t]),void 0===u)u=i[t]=n,++e._eventsCount;else if("function"===typeof u?u=i[t]=r?[n,u]:[u,n]:r?u.unshift(n):u.push(n),(o=a(e))>0&&u.length>o&&!u.warned){u.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+u.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=u.length,s=c,console&&console.warn&&console.warn(s)}return e}function d(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function l(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=d.bind(r);return o.listener=n,r.wrapFn=o,o}function p(e,t,n){var r=e._events;if(void 0===r)return[];var o=r[t];return void 0===o?[]:"function"===typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):m(o,o.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"===typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function w(e,t,n,r){if("function"===typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!==typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(i){r.once&&e.removeEventListener(t,o),n(i)}))}}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!==typeof e||e<0||u(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!==typeof e||e<0||u(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return a(this)},s.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,o=this._events;if(void 0!==o)r=r&&void 0===o.error;else if(!r)return!1;if(r){var u;if(t.length>0&&(u=t[0]),u instanceof Error)throw u;var s=new Error("Unhandled error."+(u?" ("+u.message+")":""));throw s.context=u,s}var c=o[e];if(void 0===c)return!1;if("function"===typeof c)i(c,this,t);else{var h=c.length,a=m(c,h);for(n=0;n<h;++n)i(a[n],this,t)}return!0},s.prototype.addListener=function(e,t){return f(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return f(this,e,t,!0)},s.prototype.once=function(e,t){return h(t),this.on(e,l(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return h(t),this.prependListener(e,l(this,e,t)),this},s.prototype.removeListener=function(e,t){var n,r,o,i,u;if(h(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0===--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!==typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){u=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,u||t)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"===typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},s.prototype.listeners=function(e){return p(this,e,!0)},s.prototype.rawListeners=function(e){return p(this,e,!1)},s.listenerCount=function(e,t){return"function"===typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},s.prototype.listenerCount=v,s.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},738:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(729),o=n(130);var i=function(e){var t,n;function r(t){var n,r=(void 0===t?{}:t).supportedChainIds;return(n=e.call(this)||this).supportedChainIds=r,n}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var i=r.prototype;return i.emitUpdate=function(e){this.emit(o.a.Update,e)},i.emitError=function(e){this.emit(o.a.Error,e)},i.emitDeactivate=function(){this.emit(o.a.Deactivate)},r}(r.EventEmitter)}}]);
//# sourceMappingURL=17.f62fab73.chunk.js.map