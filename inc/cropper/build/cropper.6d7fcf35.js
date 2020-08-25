!function(t,e){for(var i in e)t[i]=e[i]}(this,function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i(i.s=13)}([function(t,e){!function(){t.exports=this.wp.media}()},function(t,e){!function(){t.exports=this.wp.template}()},function(t,e){!function(){t.exports=this.wp.hooks}()},function(t,e){!function(){t.exports=this.wp.i18n}()},function(t,e){!function(){t.exports=this.wp.ajax}()},function(t,e){!function(){t.exports=this.jQuery}()},function(t,e,i){var n;!function(){"use strict";var o={};function r(t,e,i){for(var n=i.data,o=i.width,r=~~t.x,a=~~(t.x+t.width),s=~~t.y,l=~~(t.y+t.height),c=255*t.weight,h=s;h<l;h++)for(var d=r;d<a;d++){n[4*(h*o+d)+3]+=c}}function a(t,e,i){for(var n={detail:0,saturation:0,skin:0,boost:0,total:0},o=e.data,r=t.scoreDownSample,a=1/r,l=e.height*r,c=e.width*r,h=e.width,d=0;d<l;d+=r)for(var u=0;u<c;u+=r){var p=4*(~~(d*a)*h+~~(u*a)),m=s(t,i,u,d),g=o[p+1]/255;n.skin+=o[p]/255*(g+t.skinBias)*m,n.detail+=g*m,n.saturation+=o[p+2]/255*(g+t.saturationBias)*m,n.boost+=o[p+3]/255*m}return n.total=(n.detail*t.detailWeight+n.skin*t.skinWeight+n.saturation*t.saturationWeight+n.boost*t.boostWeight)/(i.width*i.height),n}function s(t,e,i,n){if(e.x>i||i>=e.x+e.width||e.y>n||n>=e.y+e.height)return t.outsideImportance;i=(i-e.x)/e.width,n=(n-e.y)/e.height;var o=2*g(.5-i),r=2*g(.5-n),a=Math.max(o-1+t.edgeRadius,0),s=Math.max(r-1+t.edgeRadius,0),l=(a*a+s*s)*t.edgeWeight,c=1.41-f(o*o+r*r);return t.ruleOfThirds&&(c+=1.2*Math.max(0,c+l+.5)*(w(o)+w(r))),c+l}function l(t,e,i,n){var o=f(e*e+i*i+n*n),r=e/o-t.skinColor[0],a=i/o-t.skinColor[1],s=n/o-t.skinColor[2];return 1-f(r*r+a*a+s*s)}function c(t,e,i){this.width=t,this.height=e,this.data=i?new Uint8ClampedArray(i):new Uint8ClampedArray(t*e*4)}function h(t,e){for(var i=t.data,n=t.width,o=Math.floor(t.width/e),r=Math.floor(t.height/e),a=new c(o,r),s=a.data,l=1/(e*e),h=0;h<r;h++)for(var d=0;d<o;d++){for(var u=4*(h*o+d),p=0,m=0,g=0,f=0,v=0,w=0,b=0;b<e;b++)for(var y=0;y<e;y++){var x=4*((h*e+b)*n+(d*e+y));p+=i[x],m+=i[x+1],g+=i[x+2],f+=i[x+3],v=Math.max(v,i[x]),w=Math.max(w,i[x+1])}s[u]=p*l*.5+.5*v,s[u+1]=m*l*.7+.3*w,s[u+2]=g*l,s[u+3]=f*l}return a}function d(t,e){var i=document.createElement("canvas");return i.width=t,i.height=e,i}function u(t){return{open:function(e){var i=e.naturalWidth||e.width,n=e.naturalHeight||e.height,r=t(i,n),a=r.getContext("2d");return!e.naturalWidth||e.naturalWidth==e.width&&e.naturalHeight==e.height?(r.width=e.width,r.height=e.height):(r.width=e.naturalWidth,r.height=e.naturalHeight),a.drawImage(e,0,0),o.Promise.resolve(r)},resample:function(e,i,n){return Promise.resolve(e).then((function(e){var r=t(~~i,~~n);return r.getContext("2d").drawImage(e,0,0,e.width,e.height,0,0,r.width,r.height),o.Promise.resolve(r)}))},getData:function(t){return Promise.resolve(t).then((function(t){var e=t.getContext("2d").getImageData(0,0,t.width,t.height);return new c(t.width,t.height,e.data)}))}}}o.Promise="undefined"!=typeof Promise?Promise:function(){throw new Error("No native promises and smartcrop.Promise not set.")},o.DEFAULTS={width:0,height:0,aspect:0,cropWidth:0,cropHeight:0,detailWeight:.2,skinColor:[.78,.57,.44],skinBias:.01,skinBrightnessMin:.2,skinBrightnessMax:1,skinThreshold:.8,skinWeight:1.8,saturationBrightnessMin:.05,saturationBrightnessMax:.9,saturationThreshold:.4,saturationBias:.2,saturationWeight:.1,scoreDownSample:8,step:8,scaleStep:.1,minScale:1,maxScale:1,edgeRadius:.4,edgeWeight:-20,outsideImportance:-.5,boostWeight:100,ruleOfThirds:!0,prescale:!0,imageOperations:null,canvasFactory:d,debug:!1},o.crop=function(t,e,i){var n=v({},o.DEFAULTS,e);n.aspect&&(n.width=n.aspect,n.height=1),null===n.imageOperations&&(n.imageOperations=u(n.canvasFactory));var s=n.imageOperations,d=1,g=1;return s.open(t,n.input).then((function(t){return n.width&&n.height&&(d=p(t.width/n.width,t.height/n.height),n.cropWidth=~~(n.width*d),n.cropHeight=~~(n.height*d),n.minScale=p(n.maxScale,m(1/d,n.minScale)),!1!==n.prescale&&((g=p(m(256/t.width,256/t.height),1))<1?(t=s.resample(t,t.width*g,t.height*g),n.cropWidth=~~(n.cropWidth*g),n.cropHeight=~~(n.cropHeight*g),n.boost&&(n.boost=n.boost.map((function(t){return{x:~~(t.x*g),y:~~(t.y*g),width:~~(t.width*g),height:~~(t.height*g),weight:t.weight}})))):g=1)),t})).then((function(t){return s.getData(t).then((function(t){for(var e=function(t,e){var i={},n=new c(e.width,e.height);(function(t,e){for(var i=t.data,n=e.data,o=t.width,r=t.height,a=0;a<r;a++)for(var s=0;s<o;s++){var l,c=4*(a*o+s);l=0===s||s>=o-1||0===a||a>=r-1?y(i,c):4*y(i,c)-y(i,c-4*o)-y(i,c-4)-y(i,c+4)-y(i,c+4*o),n[c+1]=l}})(e,n),function(t,e,i){for(var n=e.data,o=i.data,r=e.width,a=e.height,s=0;s<a;s++)for(var c=0;c<r;c++){var h=4*(s*r+c),d=b(n[h],n[h+1],n[h+2])/255,u=l(t,n[h],n[h+1],n[h+2]),p=u>t.skinThreshold,m=d>=t.skinBrightnessMin&&d<=t.skinBrightnessMax;o[h]=p&&m?(u-t.skinThreshold)*(255/(1-t.skinThreshold)):0}}(t,e,n),function(t,e,i){for(var n=e.data,o=i.data,r=e.width,a=e.height,s=0;s<a;s++)for(var l=0;l<r;l++){var c=4*(s*r+l),h=b(n[c],n[c+1],n[c+2])/255,d=x(n[c],n[c+1],n[c+2]),u=d>t.saturationThreshold,p=h>=t.saturationBrightnessMin&&h<=t.saturationBrightnessMax;o[c+2]=p&&u?(d-t.saturationThreshold)*(255/(1-t.saturationThreshold)):0}}(t,e,n),function(t,e){if(!t.boost)return;for(var i=e.data,n=0;n<e.width;n+=4)i[n+3]=0;for(n=0;n<t.boost.length;n++)r(t.boost[n],t,e)}(t,n);for(var o=h(n,t.scoreDownSample),s=-1/0,d=null,u=function(t,e,i){for(var n=[],o=p(e,i),r=t.cropWidth||o,a=t.cropHeight||o,s=t.maxScale;s>=t.minScale;s-=t.scaleStep)for(var l=0;l+a*s<=i;l+=t.step)for(var c=0;c+r*s<=e;c+=t.step)n.push({x:c,y:l,width:r*s,height:a*s});return n}(t,e.width,e.height),m=0,g=u.length;m<g;m++){var f=u[m];f.score=a(t,o,f),f.score.total>s&&(d=f,s=f.score.total)}i.topCrop=d,t.debug&&d&&(i.crops=u,i.debugOutput=n,i.debugOptions=t,i.debugTopCrop=v({},i.topCrop));return i}(n,t),o=e.crops||[e.topCrop],s=0,d=o.length;s<d;s++){var u=o[s];u.x=~~(u.x/g),u.y=~~(u.y/g),u.width=~~(u.width/g),u.height=~~(u.height/g)}return i&&i(e),e}))}))},o.isAvailable=function(t){if(!o.Promise)return!1;if((t?t.canvasFactory:d)===d&&!document.createElement("canvas").getContext("2d"))return!1;return!0},o.importance=s,o.ImgData=c,o._downSample=h,o._canvasImageOperations=u;var p=Math.min,m=Math.max,g=Math.abs,f=Math.sqrt;function v(t){for(var e=1,i=arguments.length;e<i;e++){var n=arguments[e];if(n)for(var o in n)t[o]=n[o]}return t}function w(t){return t=16*((t-1/3+1)%2*.5-.5),Math.max(1-t*t,0)}function b(t,e,i){return.5126*i+.7152*e+.0722*t}function y(t,e){return b(t[e],t[e+1],t[e+2])}function x(t,e,i){var n=m(t/255,e/255,i/255),o=p(t/255,e/255,i/255);if(n===o)return 0;var r=n-o;return(n+o)/2>.5?r/(2-n-o):r/(n+o)}void 0===(n=function(){return o}.call(e,i,e,t))||(t.exports=n),e.smartcrop=o,t.exports=o}()},function(t,e){!function(){t.exports=this._}()},function(t,e){!function(){t.exports=this.wp.BackBone}()},function(t,e,i){var n=i(10),o=i(11);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[t.i,o,""]]);var r={insert:"head",singleton:!1};n(o,r);t.exports=o.locals||{}},function(t,e,i){"use strict";var n,o=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},r=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),a=[];function s(t){for(var e=-1,i=0;i<a.length;i++)if(a[i].identifier===t){e=i;break}return e}function l(t,e){for(var i={},n=[],o=0;o<t.length;o++){var r=t[o],l=e.base?r[0]+e.base:r[0],c=i[l]||0,h="".concat(l," ").concat(c);i[l]=c+1;var d=s(h),u={css:r[1],media:r[2],sourceMap:r[3]};-1!==d?(a[d].references++,a[d].updater(u)):a.push({identifier:h,updater:f(u,e),references:1}),n.push(h)}return n}function c(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var o=i.nc;o&&(n.nonce=o)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var a=r(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var h,d=(h=[],function(t,e){return h[t]=e,h.filter(Boolean).join("\n")});function u(t,e,i,n){var o=i?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=d(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function p(t,e,i){var n=i.css,o=i.media,r=i.sourceMap;if(o?t.setAttribute("media",o):t.removeAttribute("media"),r&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var m=null,g=0;function f(t,e){var i,n,o;if(e.singleton){var r=g++;i=m||(m=c(e)),n=u.bind(null,i,r,!1),o=u.bind(null,i,r,!0)}else i=c(e),n=p.bind(null,i,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var i=l(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<i.length;n++){var o=s(i[n]);a[o].references--}for(var r=l(t,e),c=0;c<i.length;c++){var h=s(i[c]);0===a[h].references&&(a[h].updater(),a.splice(h,1))}i=r}}}},function(t,e,i){(e=i(12)(!1)).push([t.i,'.wp-core-ui.mode-edit-image .edit-attachment,.wp-core-ui.mode-edit-image .button[id^="imgedit-open-btn-"]{display:none}.wp-core-ui .media-image-edit{display:flex;align-items:stretch;max-height:100%}.wp-core-ui .media-frame.mode-edit-image .media-image-edit{margin-right:30%}.wp-core-ui .media-frame.mode-edit-image .media-sidebar{width:30%;box-sizing:border-box}.wp-core-ui .hm-thumbnail-sizes{flex:0 0 200px;max-height:100%;overflow:auto;background:#e5e5e5}.wp-core-ui .hm-thumbnail-sizes h2{margin:16px;padding:0}.wp-core-ui .hm-thumbnail-sizes__list{margin:0;padding:0}.wp-core-ui .hm-thumbnail-sizes__list li{width:100%;margin:0;padding:0}.wp-core-ui .hm-thumbnail-sizes__list li:first-child button{border-top:0}.wp-core-ui .hm-thumbnail-sizes__list button{background:none;border:0;border-right:1px solid #ddd;margin:0;padding:16px;box-sizing:border-box;cursor:pointer;display:block;width:100%;text-align:left}.wp-core-ui .hm-thumbnail-sizes__list button.current{border:1px solid #ddd;border-width:1px 0;padding:15px 16px;background:#fff;position:relative}.wp-core-ui .hm-thumbnail-sizes__list h3{margin:0 0 8px;padding:0}.wp-core-ui .hm-thumbnail-sizes__list h3 small{font-weight:300;white-space:nowrap}.wp-core-ui .hm-thumbnail-sizes__list img{display:block;width:auto;height:80px;max-width:100%;max-height:80px}.wp-core-ui .hm-thumbnail-editor{padding:16px;overflow:auto;flex:1}.wp-core-ui .hm-thumbnail-editor h2{margin:0 0 16px}.wp-core-ui .hm-thumbnail-editor h2 small{font-weight:normal;white-space:nowrap}.wp-core-ui .hm-thumbnail-editor .imgedit-menu p{margin-bottom:0;font-size:16px}.wp-core-ui .hm-thumbnail-editor .imgedit-menu button::before{margin-left:8px}.wp-core-ui .hm-thumbnail-editor__image-wrap{overflow:hidden}.wp-core-ui .hm-thumbnail-editor__image{float:left;position:relative}.wp-core-ui .hm-thumbnail-editor__image-crop{position:relative}.wp-core-ui .hm-thumbnail-editor__image--preview{float:none}.wp-core-ui .hm-thumbnail-editor__image img{display:block;max-width:100%;max-height:500px;width:auto;height:auto}.wp-core-ui .hm-thumbnail-editor__image img[src$=".svg"]{width:100%}.wp-core-ui .hm-thumbnail-editor__image .image-preview-full{cursor:crosshair}.wp-core-ui .hm-thumbnail-editor__actions{margin:16px 0 8px}.wp-core-ui .hm-thumbnail-editor .imgedit-wait{position:static;width:20px;height:20px;vertical-align:middle;float:right;margin:4px 0 4px 10px}.wp-core-ui .hm-thumbnail-editor .imgedit-wait::before{margin:0;position:static}.wp-core-ui .hm-thumbnail-editor__focal-point{position:absolute;box-sizing:border-box;width:80px;height:80px;margin-left:-40px;margin-top:-40px;left:0;top:0;background:rgba(200,125,125,0.5);border:2.5px solid rgba(200,50,50,0.5);border-radius:200px;cursor:cell;display:none}\n',""]),t.exports=e},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var o=(a=n,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),r=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[i].concat(r).concat([o]).join("\n")}var a,s,l;return[i].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(i,"}"):i})).join("")},e.i=function(t,i,n){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(o[a]=!0)}for(var s=0;s<t.length;s++){var l=[].concat(t[s]);n&&o[l[0]]||(i&&(l[2]?l[2]="".concat(i," and ").concat(l[2]):l[2]=i),e.push(l))}},e}},function(t,e,i){"use strict";i.r(e);var n=i(2),o=i(3),r=i(0),a=i.n(r),s=i(1),l=i.n(s),c=a.a.View.extend({tagName:"div",className:"hm-thumbnail-sizes",template:l()("hm-thumbnail-sizes"),events:{"click button":"setSize"},initialize:function(){var t=this;this.listenTo(this.model,"change:sizes",this.render),this.on("ready",(function(){t.el.querySelector(".current").scrollIntoView()}))},setSize:function(t){this.model.set({size:t.currentTarget.dataset.size}),t.currentTarget.parentNode.parentNode.querySelectorAll("button").forEach((function(t){t.className=""})),t.currentTarget.className="current"}}),h=i(4),d=i.n(h),u=i(5),p=i.n(u),m=i(6),g=i.n(m);i(7),i(8);function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var i=[],n=!0,o=!1,r=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(i.push(a.value),!e||i.length!==e);n=!0);}catch(t){o=!0,r=t}finally{try{n||null==s.return||s.return()}finally{if(o)throw r}}return i}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return v(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var w=p.a,b=a.a.View.extend({tagName:"div",className:"hm-thumbnail-editor",template:l()("hm-thumbnail-editor"),events:{"click .button-apply-changes":"saveCrop","click .button-reset":"reset","click .button-remove-crop":"removeCrop","click .image-preview-full":"onClickPreview","click .focal-point":"removeFocalPoint","click .imgedit-menu button":"onEditImage"},initialize:function(){this.listenTo(this.model,"change:size",this.loadEditor),this.on("ready",this.loadEditor),window.imageEdit&&(window.imageEdit._view=this,window.imageEdit.initCrop=function(){},window.imageEdit.setCropSelection=function(){})},loadEditor:function(){this.cropper&&this.cropper.setOptions({remove:!0}),this.render();var t=this.model.get("size");"full"!==t&&"full-orig"!==t?this.initCropper():this.initFocalPoint()},refresh:function(){this.update()},back:function(){},save:function(){this.update()},update:function(){var t=this;wp&&wp.data&&wp.data.dispatch("core").saveMedia({id:this.model.get("id")}),this.model.fetch({success:function(){return t.loadEditor()},error:function(){}})},applyRatio:function(){var t=this.model.get("width")/Math.min(1e3,this.model.get("width"));return Array.prototype.slice.call(arguments).map((function(e){return Math.round(e*t)}))},reset:function(){var t=this,e=this.model.get("size"),i=this.model.get("sizes"),n=this.model.get("focalPoint"),o=this.model.get("width"),r=this.model.get("height"),a=i[e]||null;if(a){var s=a.cropData;if(s.hasOwnProperty("x"))this.setSelection(s);else if(n.hasOwnProperty("x")){var l=f(function(t,e,i,n){var o=t/i*n;return o<e?[t,Math.round(o)]:[Math.round(e/n*i),e]}(o,r,a.width,a.height),2),c=l[0],h=l[1];this.setSelection({x:Math.min(o-c,Math.max(0,n.x-c/2)),y:Math.min(r-h,Math.max(0,n.y-h/2)),width:c,height:h})}else{var d=this.$el.find('img[id^="image-preview-"]').get(0);g.a.crop(d,{width:a.width,height:a.height}).then((function(e){var i=e.topCrop;t.setSelection(i)}))}}},saveCrop:function(){var t=this,e=this.cropper.getSelection();this.onSelectStart(),this.cropper&&this.cropper.setOptions({disable:!0}),d.a.post("hm_save_crop",{_ajax_nonce:this.model.get("nonces").edit,id:this.model.get("id"),crop:{x:e.x1,y:e.y1,width:e.width,height:e.height},size:this.model.get("size")}).always((function(){t.onSelectEnd(),t.cropper&&t.cropper.setOptions({enable:!0})})).done((function(){t.update()})).fail((function(t){return console.log(t)}))},setSelection:function(t){if(this.onSelectStart(),!t||void 0===t.x)return this.cropper.setOptions({show:!0}),void this.cropper.update();this.cropper.setSelection(t.x,t.y,t.x+t.width,t.y+t.height),this.cropper.setOptions({show:!0}),this.cropper.update()},onSelectStart:function(){this.$el.find(".button-apply-changes, .button-reset").attr("disabled","disabled")},onSelectEnd:function(){this.$el.find(".button-apply-changes, .button-reset").removeAttr("disabled")},onSelectChange:function(){this.$el.find(".button-apply-changes:disabled, .button-reset:disabled").removeAttr("disabled")},initCropper:function(){var t=this,e=this.$el.find('img[id^="image-preview-"]'),i=e.parent(),n=this.model.get("size"),o=this.model.get("sizes")[n]||null;if(o){var r="".concat(o.width,":").concat(o.height);this.cropper=e.imgAreaSelect({parent:i,autoHide:!1,instance:!0,handles:!0,keys:!0,imageWidth:this.model.get("width"),imageHeight:this.model.get("height"),minWidth:o.width,minHeight:o.height,aspectRatio:r,persistent:!0,onInit:function(e){w(e).next().css("position","absolute").nextAll(".imgareaselect-outer").css("position","absolute"),t.reset()},onSelectStart:function(){t.onSelectStart.apply(t,arguments)},onSelectEnd:function(){t.onSelectEnd.apply(t,arguments)},onSelectChange:function(){t.onSelectChange.apply(t,arguments)}})}},initFocalPoint:function(){var t=this.model.get("width"),e=this.model.get("height"),i=this.model.get("focalPoint")||{},n=this.$el.find(".focal-point");i.hasOwnProperty("x")&&i.hasOwnProperty("y")&&n.css({left:"".concat(100/t*i.x,"%"),top:"".concat(100/e*i.y,"%"),display:"block"})},onClickPreview:function(t){var e=this.model.get("width"),i=this.model.get("height"),n=t.offsetX*(e/t.currentTarget.offsetWidth),o=t.offsetY*(i/t.currentTarget.offsetHeight);this.$el.find(".focal-point").css({left:"".concat(Math.round(100/e*n),"%"),top:"".concat(Math.round(100/i*o),"%"),display:"block"}),this.setFocalPoint({x:n,y:o})},setFocalPoint:function(t){var e=this;d.a.post("hm_save_focal_point",{_ajax_nonce:this.model.get("nonces").edit,id:this.model.get("id"),focalPoint:t}).done((function(){e.update()})).fail((function(t){return console.log(t)}))},removeFocalPoint:function(t){this.$el.find(".focal-point").hide(),t.stopPropagation(),this.setFocalPoint(!1)},removeCrop:function(){var t=this;d.a.post("hm_remove_crop",{_ajax_nonce:this.model.get("nonces").edit,id:this.model.get("id"),size:this.model.get("size")}).done((function(){t.update()})).fail((function(t){return console.log(t)}))},onEditImage:function(){this.$el.find(".focal-point, .note-focal-point").hide()}}),y=a.a.View.extend({tagName:"div",className:"hm-thumbnail-editor",template:l()("hm-thumbnail-preview")}),x=a.a.View.extend({template:l()("hm-thumbnail-container"),initialize:function(){this.model.get("size")||this.model.set({size:"full"}),this.setSizeFromBlock(),this.listenTo(this.model,"change:url",this.onUpdate),this.onUpdate()},setSizeFromBlock:function(){if(wp&&wp.data){var t=wp.data.select("core/block-editor").getSelectedBlock();if(t){var e=Object(n.applyFilters)("smartmedia.cropper.selectSizeFromBlockAttributes.".concat(t.name.replace(/\W+/g,".")),null,t),i=Object(n.applyFilters)("smartmedia.cropper.selectSizeFromBlockAttributes",e,t);i&&this.model.set({size:i})}}},onUpdate:function(){var t=[];this.model.get("uploading")||this.model.get("id")&&!this.model.get("url")?t.push(new a.a.view.Spinner):this.model.get("mime").match(/image\/(gif|jpe?g|png)/)?(t.push(new c({controller:this.controller,model:this.model,priority:10})),t.push(new b({controller:this.controller,model:this.model,priority:50}))):t.push(new y({controller:this.controller,model:this.model,priority:50})),this.views.set(t)}});x.load=function(t){return new x({controller:t,model:t.model,el:t.$el.find(".media-image-edit").get(0)})};var S=x;i(9);Object(n.addFilter)("smartmedia.cropper.updateBlockAttributesOnSelect.core.image","smartmedia/cropper/update-block-on-select/core/image",(function(t,e){return e.label?{sizeSlug:e.size,url:e.url}:t})),Object(n.addFilter)("smartmedia.cropper.selectSizeFromBlockAttributes.core.image","smartmedia/cropper/select-size-from-block-attributes/core/image",(function(t,e){return t||e.attributes.sizeSlug||"full"})),wp&&wp.data&&window._wpLoadBlockEditor&&window._wpLoadBlockEditor.then((function(){var t=document.querySelector(".block-editor");t&&t.addEventListener("focusin",(function(t){t.target.closest(".edit-post-meta-boxes-area")&&wp.data.dispatch("core/block-editor").clearSelectedBlock()}))}));var _=a.a.view.MediaFrame;a.a.view.MediaFrame=_.extend({initialize:function(){_.prototype.initialize.apply(this,arguments),a.a.events.trigger("frame:init",this)}});var k=a.a.view.MediaFrame.Select;a.a.view.MediaFrame.Select=k.extend({initialize:function(t){k.prototype.initialize.apply(this,arguments),this._button=Object.assign({},t.button||{}),this.on("toolbar:create:select",this.onCreateToolbarSetButton,this),this.createImageEditorState(),this.on("ready",this.createImageEditorState,this),this.on("content:create:edit",this.onCreateImageEditorContent,this),this.on("toolbar:create:edit",this.onCreateImageEditorToolbar,this),a.a.events.trigger("frame:select:init",this)},onCreateToolbarSetButton:function(){this._button&&(this.options.mutableButton=Object.assign({},this.options.button),this.options.button=Object.assign({},this._button))},createImageEditorState:function(){var t=this;if(!this.options.multiple&&!this.states.get("edit")){var e=this.states.get("library")||this.states.get("featured-image");if(e&&e.get("selection")){var i="featured-image"===e.id;this.$el.addClass("hide-toolbar");var n=this.states.add({id:"edit",title:Object(o.__)("Edit image","hm-smart-media"),router:!1,menu:!1,uploader:!1,library:e.get("library"),selection:e.get("selection"),display:e.get("display")});n.on("activate",(function(){t.$el.hasClass("hide-menu")&&t.lastState()&&t.lastState().set("menu",!1),t.$el.addClass("mode-select mode-edit-image"),t.$el.removeClass("hide-toolbar"),t.content.mode("edit"),t.toolbar.mode("edit")})),n.on("deactivate",(function(){t.$el.removeClass("mode-select mode-edit-image"),t.$el.addClass("hide-toolbar")})),e.get("selection").on("selection:single",(function(){var e=t.state("edit").get("selection").single();e.get("uploading")||(i&&(wp.media.view.settings.post.featuredImageId=e.get("id")),t.setState("edit"))})),e.get("selection").on("selection:unsingle",(function(){i&&(wp.media.view.settings.post.featuredImageId=-1),t.setState(e.id)}))}}},onCreateImageEditorContent:function(t){var e=this.state("edit"),i=e.get("selection").single(),n=new a.a.view.Sidebar({controller:this});n.set("details",new a.a.view.Attachment.Details({controller:this,model:i,priority:80})),n.set("compat",new a.a.view.AttachmentCompat({controller:this,model:i,priority:120})),(e.has("display")?e.get("display"):e.get("displaySettings"))&&n.set("display",new a.a.view.Settings.AttachmentDisplay({controller:this,model:e.display(i),attachment:i,priority:160,userSettings:e.model.get("displayUserSettings")})),"insert"===e.id&&n.$el.addClass("visible"),t.view=[new S({tagName:"div",className:"media-image-edit",controller:this,model:i}),n]},onCreateImageEditorToolbar:function(t){var e=this;t.view=new a.a.view.Toolbar({controller:this,requires:{selection:!0},reset:!1,event:"select",items:{change:{text:Object(o.__)("Change image","hm-smart-media"),click:function(){e.state("edit").get("selection").reset([])},priority:20,requires:{selection:!0}},apply:{style:"primary",text:Object(o.__)("Select","hm-smart-media"),click:function(){var t=Object.assign(e.options.mutableButton||e.options.button||{},{event:"select",close:!0}),i=t.close,o=t.event,r=t.reset,a=t.state;if(i&&e.close(),o&&(e.state()._events[o]?e.state().trigger(o):e.lastState()._events[o]?e.lastState().trigger(o):e.trigger(o)),a&&e.setState(a),r&&e.reset(),wp&&wp.data){var s=wp.data.select("core/block-editor").getSelectedBlock();if(!s)return;var l=e.state("edit").get("selection").single();if(!l)return;var c=l.get("sizes"),h=l.get("size"),d=c[h];d.id=l.get("id"),d.size=h;var u=Object(n.applyFilters)("smartmedia.cropper.updateBlockAttributesOnSelect.".concat(s.name.replace(/\W+/g,".")),null,d,l),p=Object(n.applyFilters)("smartmedia.cropper.updateBlockAttributesOnSelect",u,s,d,l);if(!p)return;wp.data.dispatch("core/block-editor").updateBlock(s.clientId,{attributes:p})}},priority:10,requires:{selection:!0}}}})}}),a.a.events.on("frame:init",(function(){a.a.view.Attachment.Details.TwoColumn=a.a.view.Attachment.Details.TwoColumn.extend({template:l()("hm-attachment-details-two-column"),initialize:function(){var t=this;a.a.view.Attachment.Details.prototype.initialize.apply(this,arguments),this.listenTo(this.model,"change:url",(function(){t.render(),S.load(t.controller)})),this.controller.on("ready refresh",(function(){return S.load(t.controller)}))}})}))}]));