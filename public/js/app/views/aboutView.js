define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app',
  'text!../../../templates/about.phtml',


], function($, _, Backbone, Events, App, tpl ){


  App.Views.AboutView = Backbone.View.extend({
    el: '.main',

    initialize: function () {
    },


    render: function () {
      this.$el.html(tpl);
    },


    events: {
    }

    
  });

  var aboutView = new App.Views.AboutView; 

  return aboutView;
});
