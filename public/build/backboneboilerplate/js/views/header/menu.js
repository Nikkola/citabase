define(["jquery","lodash","backbone","text!templates/header/menu.html"],function(e,t,n,r){var i=n.View.extend({el:".main-menu-container",initialize:function(){},render:function(){e(this.el).html(r),e('a[href="'+window.location.hash+'"]').addClass("active")},events:{"click a":"highlightMenuItem"},highlightMenuItem:function(t){e(".active").removeClass("active"),e(t.currentTarget).addClass("active")}});return i});