// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.

// Backbone may be freely distributed under the MIT license.

(function(e,t){typeof exports!="undefined"?t(e,exports,require("underscore")):typeof define=="function"&&define.amd?define(["underscore","jquery","exports"],function(n,r,i){e.Backbone=t(e,i,n,r)}):e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender)})(this,function(e,t,n,r){var i=e.Backbone,s=Array.prototype.slice,o=Array.prototype.splice;t.VERSION="0.9.1",t.setDomLibrary=function(e){r=e},t.noConflict=function(){return e.Backbone=i,t},t.emulateHTTP=!1,t.emulateJSON=!1,t.Events={on:function(e,t,n){for(var r,e=e.split(/\s+/),i=this._callbacks||(this._callbacks={});r=e.shift();){r=i[r]||(i[r]={});var s=r.tail||(r.tail=r.next={});s.callback=t,s.context=n,r.tail=s.next={}}return this},off:function(e,t,n){var r,i,s;if(e){if(i=this._callbacks)for(e=e.split(/\s+/);r=e.shift();)if(s=i[r],delete i[r],t&&s)for(;(s=s.next)&&s.next;)(s.callback!==t||!!n&&s.context!==n)&&this.on(r,s.callback,s.context)}else delete this._callbacks;return this},trigger:function(e){var t,n,r,i;if(!(r=this._callbacks))return this;i=r.all;for((e=e.split(/\s+/)).push(null);t=e.shift();)i&&e.push({next:i.next,tail:i.tail,event:t}),(n=r[t])&&e.push({next:n.next,tail:n.tail});for(i=s.call(arguments,1);n=e.pop();){t=n.tail;for(r=n.event?[n.event].concat(i):i;(n=n.next)!==t;)n.callback.apply(n.context||this,r)}return this}},t.Events.bind=t.Events.on,t.Events.unbind=t.Events.off,t.Model=function(e,t){var r;e||(e={}),t&&t.parse&&(e=this.parse(e));if(r=y(this,"defaults"))e=n.extend({},r,e);t&&t.collection&&(this.collection=t.collection),this.attributes={},this._escapedAttributes={},this.cid=n.uniqueId("c");if(!this.set(e,{silent:!0}))throw Error("Can't create an invalid model");delete this._changed,this._previousAttributes=n.clone(this.attributes),this.initialize.apply(this,arguments)},n.extend(t.Model.prototype,t.Events,{idAttribute:"id",initialize:function(){},toJSON:function(){return n.clone(this.attributes)},get:function(e){return this.attributes[e]},escape:function(e){var t;return(t=this._escapedAttributes[e])?t:(t=this.attributes[e],this._escapedAttributes[e]=n.escape(t==null?"":""+t))},has:function(e){return this.attributes[e]!=null},set:function(e,r,i){var s,o;n.isObject(e)||e==null?(s=e,i=r):(s={},s[e]=r),i||(i={});if(!s)return this;s instanceof t.Model&&(s=s.attributes);if(i.unset)for(o in s)s[o]=void 0;if(!this._validate(s,i))return!1;this.idAttribute in s&&(this.id=s[this.idAttribute]);var r=this.attributes,u=this._escapedAttributes,a=this._previousAttributes||{},f=this._setting;this._changed||(this._changed={}),this._setting=!0;for(o in s){e=s[o],n.isEqual(r[o],e)||delete u[o],i.unset?delete r[o]:r[o]=e,this._changing&&!n.isEqual(this._changed[o],e)&&(this.trigger("change:"+o,this,e,i),this._moreChanges=!0),delete this._changed[o];if(!n.isEqual(a[o],e)||n.has(r,o)!=n.has(a,o))this._changed[o]=e}return f||(!i.silent&&this.hasChanged()&&this.change(i),this._setting=!1),this},unset:function(e,t){return(t||(t={})).unset=!0,this.set(e,null,t)},clear:function(e){return(e||(e={})).unset=!0,this.set(n.clone(this.attributes),e)},fetch:function(e){var e=e?n.clone(e):{},r=this,i=e.success;return e.success=function(t,n,s){if(!r.set(r.parse(t,s),e))return!1;i&&i(r,t)},e.error=t.wrapError(e.error,r,e),(this.sync||t.sync).call(this,"read",this,e)},save:function(e,r,i){var s,o;n.isObject(e)||e==null?(s=e,i=r):(s={},s[e]=r),i=i?n.clone(i):{},i.wait&&(o=n.clone(this.attributes)),e=n.extend({},i,{silent:!0});if(s&&!this.set(s,i.wait?e:i))return!1;var u=this,a=i.success;return i.success=function(e,t,r){t=u.parse(e,r),i.wait&&(t=n.extend(s||{},t));if(!u.set(t,i))return!1;a?a(u,e):u.trigger("sync",u,e,i)},i.error=t.wrapError(i.error,u,i),r=this.isNew()?"create":"update",r=(this.sync||t.sync).call(this,r,this,i),i.wait&&this.set(o,e),r},destroy:function(e){var e=e?n.clone(e):{},r=this,i=e.success,s=function(){r.trigger("destroy",r,r.collection,e)};if(this.isNew())return s();e.success=function(t){e.wait&&s(),i?i(r,t):r.trigger("sync",r,t,e)},e.error=t.wrapError(e.error,r,e);var o=(this.sync||t.sync).call(this,"delete",this,e);return e.wait||s(),o},url:function(){var e=y(this.collection,"url")||y(this,"urlRoot")||b();return this.isNew()?e:e+(e.charAt(e.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(e){return e},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},change:function(e){if(this._changing||!this.hasChanged())return this;this._moreChanges=this._changing=!0;for(var t in this._changed)this.trigger("change:"+t,this,this._changed[t],e);for(;this._moreChanges;)this._moreChanges=!1,this.trigger("change",this,e);return this._previousAttributes=n.clone(this.attributes),delete this._changed,this._changing=!1,this},hasChanged:function(e){return arguments.length?this._changed&&n.has(this._changed,e):!n.isEmpty(this._changed)},changedAttributes:function(e){if(!e)return this.hasChanged()?n.clone(this._changed):!1;var t,r=!1,i=this._previousAttributes,s;for(s in e)n.isEqual(i[s],t=e[s])||((r||(r={}))[s]=t);return r},previous:function(e){return!arguments.length||!this._previousAttributes?null:this._previousAttributes[e]},previousAttributes:function(){return n.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(e,t){if(t.silent||!this.validate)return!0;var e=n.extend({},this.attributes,e),r=this.validate(e,t);return r?(t&&t.error?t.error(this,r,t):this.trigger("error",this,r,t),!1):!0}}),t.Collection=function(e,t){t||(t={}),t.comparator&&(this.comparator=t.comparator),this._reset(),this.initialize.apply(this,arguments),e&&this.reset(e,{silent:!0,parse:t.parse})},n.extend(t.Collection.prototype,t.Events,{model:t.Model,initialize:function(){},toJSON:function(){return this.map(function(e){return e.toJSON()})},add:function(e,t){var r,i,s,u,a,f={},l={};t||(t={}),e=n.isArray(e)?e.slice():[e];for(r=0,i=e.length;r<i;r++){if(!(s=e[r]=this._prepareModel(e[r],t)))throw Error("Can't add an invalid model to a collection");if(f[u=s.cid]||this._byCid[u]||(a=s.id)!=null&&(l[a]||this._byId[a]))throw Error("Can't add the same model to a collection twice");f[u]=l[a]=s}for(r=0;r<i;r++)(s=e[r]).on("all",this._onModelEvent,this),this._byCid[s.cid]=s,s.id!=null&&(this._byId[s.id]=s);this.length+=i,o.apply(this.models,[t.at!=null?t.at:this.models.length,0].concat(e)),this.comparator&&this.sort({silent:!0});if(t.silent)return this;for(r=0,i=this.models.length;r<i;r++)f[(s=this.models[r]).cid]&&(t.index=r,s.trigger("add",s,this,t));return this},remove:function(e,t){var r,i,s,o;t||(t={}),e=n.isArray(e)?e.slice():[e];for(r=0,i=e.length;r<i;r++)if(o=this.getByCid(e[r])||this.get(e[r]))delete this._byId[o.id],delete this._byCid[o.cid],s=this.indexOf(o),this.models.splice(s,1),this.length--,t.silent||(t.index=s,o.trigger("remove",o,this,t)),this._removeReference(o);return this},get:function(e){return e==null?null:this._byId[e.id!=null?e.id:e]},getByCid:function(e){return e&&this._byCid[e.cid||e]},at:function(e){return this.models[e]},sort:function(e){e||(e={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var t=n.bind(this.comparator,this);return this.comparator.length==1?this.models=this.sortBy(t):this.models.sort(t),e.silent||this.trigger("reset",this,e),this},pluck:function(e){return n.map(this.models,function(t){return t.get(e)})},reset:function(e,t){e||(e=[]),t||(t={});for(var n=0,r=this.models.length;n<r;n++)this._removeReference(this.models[n]);return this._reset(),this.add(e,{silent:!0,parse:t.parse}),t.silent||this.trigger("reset",this,t),this},fetch:function(e){e=e?n.clone(e):{},e.parse===void 0&&(e.parse=!0);var r=this,i=e.success;return e.success=function(t,n,s){r[e.add?"add":"reset"](r.parse(t,s),e),i&&i(r,t)},e.error=t.wrapError(e.error,r,e),(this.sync||t.sync).call(this,"read",this,e)},create:function(e,t){var r=this,t=t?n.clone(t):{},e=this._prepareModel(e,t);if(!e)return!1;t.wait||r.add(e,t);var i=t.success;return t.success=function(n,s){t.wait&&r.add(n,t),i?i(n,s):n.trigger("sync",e,s,t)},e.save(null,t),e},parse:function(e){return e},chain:function(){return n(this.models).chain()},_reset:function(){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(e,n){if(e instanceof t.Model)e.collection||(e.collection=this);else{var r;n.collection=this,e=new this.model(e,n),e._validate(e.attributes,n)||(e=!1)}return e},_removeReference:function(e){this==e.collection&&delete e.collection,e.off("all",this._onModelEvent,this)},_onModelEvent:function(e,t,n,r){(e=="add"||e=="remove")&&n!=this||(e=="destroy"&&this.remove(t,r),t&&e==="change:"+t.idAttribute&&(delete this._byId[t.previous(t.idAttribute)],this._byId[t.id]=t),this.trigger.apply(this,arguments))}}),n.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(e){t.Collection.prototype[e]=function(){return n[e].apply(n,[this.models].concat(n.toArray(arguments)))}}),t.Router=function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes(),this.initialize.apply(this,arguments)};var u=/:\w+/g,a=/\*\w+/g,f=/[-[\]{}()+?.,\\^$|#\s]/g;n.extend(t.Router.prototype,t.Events,{initialize:function(){},route:function(e,r,i){return t.history||(t.history=new t.History),n.isRegExp(e)||(e=this._routeToRegExp(e)),i||(i=this[r]),t.history.route(e,n.bind(function(n){n=this._extractParameters(e,n),i&&i.apply(this,n),this.trigger.apply(this,["route:"+r].concat(n)),t.history.trigger("route",this,r,n)},this)),this},navigate:function(e,n){t.history.navigate(e,n)},_bindRoutes:function(){if(this.routes){var e=[],t;for(t in this.routes)e.unshift([t,this.routes[t]]);t=0;for(var n=e.length;t<n;t++)this.route(e[t][0],e[t][1],this[e[t][1]])}},_routeToRegExp:function(e){return e=e.replace(f,"\\$&").replace(u,"([^/]+)").replace(a,"(.*?)"),RegExp("^"+e+"$")},_extractParameters:function(e,t){return e.exec(t).slice(1)}}),t.History=function(){this.handlers=[],n.bindAll(this,"checkUrl")};var l=/^[#\/]/,c=/msie [\w.]+/,h=!1;n.extend(t.History.prototype,t.Events,{interval:50,getFragment:function(e,t){if(e==null)if(this._hasPushState||t){var e=window.location.pathname,n=window.location.search;n&&(e+=n)}else e=window.location.hash;return e=decodeURIComponent(e),e.indexOf(this.options.root)||(e=e.substr(this.options.root.length)),e.replace(l,"")},start:function(e){if(h)throw Error("Backbone.history has already been started");this.options=n.extend({},{root:"/"},this.options,e),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);var e=this.getFragment(),t=document.documentMode;if(t=c.exec(navigator.userAgent.toLowerCase())&&(!t||t<=7))this.iframe=r('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(e);this._hasPushState?r(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!t?r(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=e,h=!0,e=window.location,t=e.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!t)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&t&&e.hash&&(this.fragment=e.hash.replace(l,""),window.history.replaceState({},document.title,e.protocol+"//"+e.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){r(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),h=!1},route:function(e,t){this.handlers.unshift({route:e,callback:t})},checkUrl:function(){var e=this.getFragment();e==this.fragment&&this.iframe&&(e=this.getFragment(this.iframe.location.hash));if(e==this.fragment||e==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(e),this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(e){var t=this.fragment=this.getFragment(e);return n.any(this.handlers,function(e){if(e.route.test(t))return e.callback(t),!0})},navigate:function(e,t){if(!h)return!1;if(!t||t===!0)t={trigger:t};var n=(e||"").replace(l,"");this.fragment!=n&&this.fragment!=decodeURIComponent(n)&&(this._hasPushState?(n.indexOf(this.options.root)!=0&&(n=this.options.root+n),this.fragment=n,window.history[t.replace?"replaceState":"pushState"]({},document.title,n)):this._wantsHashChange?(this.fragment=n,this._updateHash(window.location,n,t.replace),this.iframe&&n!=this.getFragment(this.iframe.location.hash)&&(t.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,n,t.replace))):window.location.assign(this.options.root+e),t.trigger&&this.loadUrl(e))},_updateHash:function(e,t,n){n?e.replace(e.toString().replace(/(javascript:|#).*$/,"")+"#"+t):e.hash=t}}),t.View=function(e){this.cid=n.uniqueId("view"),this._configure(e||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()};var p=/^(\S+)\s*(.*)$/,d="model,collection,el,id,attributes,className,tagName".split(",");n.extend(t.View.prototype,t.Events,{tagName:"div",$:function(e){return this.$el.find(e)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(e,t,n){return e=document.createElement(e),t&&r(e).attr(t),n&&r(e).html(n),e},setElement:function(e,t){return this.$el=r(e),this.el=this.$el[0],t!==!1&&this.delegateEvents(),this},delegateEvents:function(e){if(e||(e=y(this,"events"))){this.undelegateEvents();for(var t in e){var r=e[t];n.isFunction(r)||(r=this[e[t]]);if(!r)throw Error('Event "'+e[t]+'" does not exist');var i=t.match(p),s=i[1],i=i[2],r=n.bind(r,this);s+=".delegateEvents"+this.cid,i===""?this.$el.bind(s,r):this.$el.delegate(i,s,r)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(e){this.options&&(e=n.extend({},this.options,e));for(var t=0,r=d.length;t<r;t++){var i=d[t];e[i]&&(this[i]=e[i])}this.options=e},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var e=y(this,"attributes")||{};this.id&&(e.id=this.id),this.className&&(e["class"]=this.className),this.setElement(this.make(this.tagName,e),!1)}}}),t.Model.extend=t.Collection.extend=t.Router.extend=t.View.extend=function(e,t){var n=g(this,e,t);return n.extend=this.extend,n};var v={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};t.sync=function(e,i,s){var o=v[e],u={type:o,dataType:"json"};return s.url||(u.url=y(i,"url")||b()),!s.data&&i&&(e=="create"||e=="update")&&(u.contentType="application/json",u.data=JSON.stringify(i.toJSON())),t.emulateJSON&&(u.contentType="application/x-www-form-urlencoded",u.data=u.data?{model:u.data}:{}),t.emulateHTTP&&(o==="PUT"||o==="DELETE")&&(t.emulateJSON&&(u.data._method=o),u.type="POST",u.beforeSend=function(e){e.setRequestHeader("X-HTTP-Method-Override",o)}),u.type!=="GET"&&!t.emulateJSON&&(u.processData=!1),r.ajax(n.extend(u,s))},t.wrapError=function(e,t,n){return function(r,i){i=r===t?i:r,e?e(t,i,n):t.trigger("error",t,i,n)}};var m=function(){},g=function(e,t,r){var i;return i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){e.apply(this,arguments)},n.extend(i,e),m.prototype=e.prototype,i.prototype=new m,t&&n.extend(i.prototype,t),r&&n.extend(i,r),i.prototype.constructor=i,i.__super__=e.prototype,i},y=function(e,t){return!e||!e[t]?null:n.isFunction(e[t])?e[t]():e[t]},b=function(){throw Error('A "url" property or function must be specified')};return t});