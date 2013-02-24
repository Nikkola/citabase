define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app'

], function($, _, Backbone, Events, App){


  App.Models.SessionModel = Backbone.Model.extend({

    defaults: {
      user_id: null,
      access_token: null,
      username: null
    },


    initialize: function () {
      //console.log('Инит сессии');
      //при инициализации модели сессии, всегда включаем метод load - проверяем есть ли данные в куках
      this.load();


    },

    render: function () {

    },

    auth: function() {
      //console.log(this.get("access_token"));
      //console.log(this.get("user_id"));

      //чувак авторизован, раз данные есть в модели
     return this.get("access_token");
    },

    //сохраним данные в куки
    save: function(auth_hash) {
      //console.log(auth_hash);

      $.cookie('user_id', auth_hash.id);
      $.cookie('access_token', auth_hash.access_token);
      $.cookie('username', auth_hash.username);
    },

    load: function() {
      //если данные в куках есть загружаем их в эту модель
      this.set({
        user_id: $.cookie('user_id'),
        access_token: $.cookie('access_token'),
        username: $.cookie('username')
      });
    },

    kill: function() {
      this.set({
        user_id: null,
        access_token: null,
        username: null
      });

      
      $.removeCookie('user_id');
      $.removeCookie('access_token');
      $.removeCookie('username');
    }
    
  });

  return new App.Models.SessionModel;
});
