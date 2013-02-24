define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'globals'

], function($, _, Backbone, Events, globals){
  
  //проверка бутстрапа
  //console.log(globals.user);

  App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
  };

  // App.template = function(id) {
  //   console.log($('#' + id).html());

  //   return Handlebars.compile( $('#' + id).html() );
  // };

  App.vent = _.extend( {}, Backbone.Events );



  App.Views.AppView = Backbone.View.extend({
    el: '.wrapper',

    events: {
      "click .nav-link"       : "selectMenuItem",
      "click .next-quote"   : 'nextQuote'
    },

    initialize: function () {
      //console.log(App.quotesCollection);
    },

    render: function () {
      var that = this;
    },


    selectMenuItem: function(e) {
      var thisItem = $(e.currentTarget),
          allItemsExceptThis = $('.nav-link').not(thisItem);


      //console.log(thisItem);

      allItemsExceptThis.removeClass('active');
      thisItem.addClass('active');
    },


    randQuoteFunc: function() {
      var arr = App.quotesCollection.toJSON();

      randQeary = Math.floor ( Math.random() * arr.length );

      var randomizeQuote = arr[randQeary],
          quoteHtml = $('.rand-quote'),
          authorHtml = $('.rand-author');

          quoteHtml.html( randomizeQuote.quote );
          authorHtml.html( randomizeQuote.author );
    },


    nextQuote: function() {
        this.randQuoteFunc();
    },

    noQuotes: function() {
      $('.rand-quote').text('В вашей цитабазе нет цитат!');
      $('.next-quote').hide();

    }

  });

  return App;
});
