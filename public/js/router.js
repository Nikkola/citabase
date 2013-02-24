define([
  // Application.
  "app",
  "loginView",
  'registrationView',
  'forgetPassView',
  'passRecoveryView',
  "quotesData",
  'quotesBase',
  'quoteAddView',
  'aboutView',
  'sessionModel'
],

function(
  App,
  loginView,
  registrationView,
  forgetPassView,
  passRecoveryView,
  QuotesData,
  QuotesBase,
  QuoteAddView,
  aboutView,
  Session

) {


  // Defining the application router, you can attach sub routers here.
  App.Router.MainRouter = Backbone.Router.extend({
    initialize: function() {
      //console.log('роутер!!!');
    },

    routes: {
      ""             : "index",
      "registration" : "registration",
      "add-quote"    : "addQuote",
      "citabase"     : "quoteBase",
      'about'        : "about",
      'forget-pass'  : 'forgetPass',
      'pass-recovery': 'passRecovery'
    },

    index: function() {
      loginView.render();
    },

    registration: function() {
      registrationView.render();
    },

    addQuote: function() {
      //console.log('стр добавить цитату!!!');


      //эта страница рендерится только при сессии
      if ( Session.auth() ) {

        //console.log(App.quotesCollection);
        
        var quoteAddView = new QuoteAddView( { collection: App.quotesCollection } );
        quoteAddView.render();

      } else {
         window.location.hash = '';
      }

    },

    quoteBase: function() {

      //console.log('стр базы цитат!!!');
      //эта страница рендерится только при сессии
      if ( Session.auth() ) {

        //console.log(App.quotesCollection);

        var quotesBasePageView = new QuotesBase.Views.QuotesBasePageView({ collection: App.quotesCollection });
        quotesBasePageView.render();

      } else {
         window.location.hash = '';
      }


    },


    about: function() {
      aboutView.render();
    },

    forgetPass: function() {
      forgetPassView.render();
    },

    passRecovery: function() {
      //эта страница рендерится только если сессии нет!
      if ( Session.auth() ) {

         window.location.hash = '';

      } else {

        passRecoveryView.render();
      }

    }


  });

  return App.Router.MainRouter;

});
