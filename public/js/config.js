// Set the require.js configuration for your application.
require.config({

  // define application bootstrap
  deps: [""],

  paths: {
    // libs
    "jquery"                 : "libs/jquery",
    'jquery-ui'              : 'libs/jquery-ui',
    "lodash"                 : "libs/lodash",
    "underscore"             : "libs/underscore",
    'backbone'               : 'libs/backbone',
    'backbone.layoutmanager' : "libs/backbone.layoutmanager",
    'backbone.marionette'    : "libs/backbone.marionette",
    'handlebars'             : 'libs/handlebars',
    'bootstrap'              : 'libs/bootstrap.min',
    'text'                   : 'libs/text',
    'modernizr'              : 'libs/modernizr',
    'dataTable'              : 'libs/jquery.dataTables',
    'jqueryForm'             : 'libs/jquery.form',
    'jqueryValidate'         : 'libs/jquery.validate',
    'jqueryCookie'           : 'libs/jquery.cookie',

    //files
    "common"                 : "common",
    'globals'                : "globals",
    "events"                 : 'events',
    "vm"                     : 'vm',
    "app"                    : 'app',

    //collections
    'quotesData'             : 'app/collections/quotesData',

    //models
    'sessionModel'           : "app/models/sessionModel",

    //views
    "loginView"              : "app/views/loginView",
    'registrationView'       : 'app/views/registrationView',
    'forgetPassView'         : 'app/views/forgetPassView',
    'passRecoveryView'       : 'app/views/passRecoveryView',
    'aboutView'              : 'app/views/aboutView',

    //modules
    'quotesBase'             : 'app/views/quotesBase',
    'quoteAddView'           : 'app/views/quoteAddView'
    
  },

  map: {
    // Ensure Lo-Dash is used instead of underscore.
    "*": { "underscore": "lodash" }

    // Put additional maps here.
  },

  shim: {
    // Put shims here.
    // backbone загрузится только после jquery и underscore
      'backbone':{
          deps:['jquery', 'underscore'],
          exports:'backbone'
      },
      // определим порядок загрузки, описав "цепные" зависимости
      'jquery-ui':['jquery'],

      'bootstrap': {
          deps: ['jquery'],
          exports: "bootstrap"
      },

      'common': ['jquery-ui', 'handlebars'],
      'app'   : ['backbone'],
      'events': ['backbone', 'jquery', 'underscore'],
      'router' : ['app'],
      'dataTables': ['jquery'],
      'jqueryValidate' : ['jquery'],
      'jqueryForm' : ['jquery'],
      'jqueryCookie'  : ['jquery']

  }
  

});



require([
  'jquery',
  'lodash',
  'backbone',

  // Application.
  "app",

  // Main Router.
  "router",
  'common',
  "sessionModel",
  "loginView",
  "quotesData",
  'text!../templates/main_page.phtml',

  'jquery-ui',
  'bootstrap',
  'events',
  'modernizr',
  'jqueryCookie'
],

function($, _, Backbone, App, Router, Common, Session, LoginView, QuotesData , mainTpl) {

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  router = new Router();
  //фунцкия отслеживающая изменения роутов и делающая соответсвующие элементы менюхи активными
  router.bind('all', function(route) {
      var trimedRoute = route.split(':');
      $('.' + trimedRoute[1] + '-link').addClass('active');
  });


  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start();

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    // Get the absolute anchor href.
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
    // Get the absolute root.
    var root = location.protocol + "//" + location.host + App.root;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);
    }
  });


  //рендерим главный вид приложения
  var APP = new App.Views.AppView();

  //созданный экземпляр коллекции забитый в App
  App.quotesCollection = new QuotesData.Collection();

  //проверяем есть ли сессия!
  if ( Session.auth() ) {
     //console.log('Есть сессия!');

      //если авторизация есть фетчим коллекцию только цитат этого пользователя (логика в quotesData - в коллекции)
      App.quotesCollection.fetch().then(function() {
        //console.log('фетчунили');
        //console.log(App.quotesCollection);

        //console.log(App.quotesCollection.models.length === 0);

        if (App.quotesCollection.models.length === 0 ) {
          //console.log('пусто!');
          APP.noQuotes();
        } else {
          //запускаем функцию рандомной загрузки цитат
           APP.randQuoteFunc();
        }

      });
      //вставляем главный шаблон
      $('.quote-block').html(mainTpl);

      LoginView.renderAuth();
      $('.profile-name').text(Session.get('username'));
      //показываем кнопку добавить цитату
      $('.add-quote').removeClass('h');

  } else {

    //console.log("Нет сессии!!!");
    
    //если авторизация нет фетчим коллекцию ВСЕХ ЦИТАТ
    App.quotesCollection.fetch().then(function() {
      //запускаем функцию рандомной загрузки цитат
       APP.randQuoteFunc();

       //скрываем кнопку добавить цитату
       //$('.add-quote').hide();

    });

    //вставляем главный шаблон
    $('.quote-block').html(mainTpl);
    LoginView.render();
    //скрываем кнопку добавить цитату
    $('.add-quote').addClass('h');

  }

});
