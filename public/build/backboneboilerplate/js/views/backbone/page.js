define(["jquery","lodash","backbone","vm","text!templates/backbone/page.html","views/backbone/sidemenu","views/backbone/section"],function(e,t,n,r,i,s,o){var u=n.View.extend({el:".page",render:function(){this.$el.html(i);var e=r.create(this,"BackboneSideMenuView",s);e.render();var t=r.create(this,"BackboneSectionView",o,{section:this.options.section});t.render()}});return u});