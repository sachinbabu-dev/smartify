!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=44)}({44:function(e,t,n){"use strict";function r(e){chrome.scripting.executeScript({target:{tabId:e},files:["js/inject.js"]})}chrome.commands.getAll((function(e){var t=e.find((function(e){return"toggle-measure-everything"===e.name}));if(t){var n="Measure Everything";t.shortcut&&(n+=" (".concat(t.shortcut,")")),chrome.action.setTitle({title:n})}})),chrome.commands.onCommand.addListener((function(e){var t;"toggle-measure-everything"===e&&(t=function(e){e&&void 0!==e.id&&r(e.id)},chrome.windows.getLastFocused((function(e){chrome.tabs.query({active:!0,windowId:e.id},(function(e){var n=e[0];t(n)}))})))})),chrome.action.onClicked.addListener((function(e){void 0!==e.id&&r(e.id)})),chrome.runtime.onMessage.addListener((function(e,t){var n;t.tab&&void 0!==t.tab.id&&("measure-everything-is-active"===e&&(n=t.tab.id,chrome.action.setIcon({path:"../icon16-active.png",tabId:n})),"measure-everything-is-inactive"===e&&function(e){chrome.action.setIcon({path:"../icon16.png",tabId:e})}(t.tab.id))}))}});