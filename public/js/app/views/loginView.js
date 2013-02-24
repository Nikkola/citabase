define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app',
  'sessionModel',
  'text!../../../templates/auth_header.phtml',
  'text!../../../templates/no_auth_header.phtml'

], function($, _, Backbone, Events, App, Session, authTpl, noAuthTpl){

  App.Views.LoginView = Backbone.View.extend({
    el: '.wrapper',

    initialize: function () {
    },

    render: function () {
      //console.log('рендер логина');
      $('header').html(noAuthTpl);

      this.validate();
    },

    renderAuth: function() {
      $('header').html(authTpl);
    },


    events: {
      "click .login-send"                     : "login",
      "click .logout-btn"                     : 'logout',
      'keyup #login-name, #login-password'    : 'checkBtnActive',
      'click .close'                          : 'closeAlert'
    },


    checkBtnActive: function() {
      var loginBtn = $('.login-send');

      //проверка на валидность
      if ( $('.login-form').valid() ) {
        loginBtn.removeClass('disabled').removeAttr('disabled');
      } else {
        loginBtn.addClass('disabled').attr('disabled', 'disabled');
      }
          
    },


    closeAlert: function(e) {
      e.preventDefault();

      var alert = $('.login-alert');

      alert.addClass('h');
    },


    login: function(e) {
      var loginName = $('#login-name'),
          loginPass = $('#login-password'),
          alert = $('.login-alert'),
          that = this;

          e.preventDefault();

         if (loginName.val() !== '' && loginPass.val() !== '' ) {

            var serialForm = $('.login-form').serializeArray();
                

            $.ajax({
                type: "POST",
                url: "/login",
                data: serialForm,
                dataType : 'json',
                success: function(data){

                  alert.addClass('h');

                  if (data.msg === 'User is logged in') {

                      //создаем сессию и сохраняем в куки! Передаем объект с параметрами айди пользователя и доступ = true
                      Session.save( { id: data.id, access_token: data.access_token, username: data.username } );

                      //заново инициализируем сессию
                      Session.initialize();

                      if ( Session.auth() ) {
                        that.renderAuth();
                        $('.profile-name').text(Session.get('username'));

                        //чтобы обновить меню сверху
                        location.reload();

                      }

                  } else {
                    console.log('не прошел логин!');
                    alert.removeClass('h');
                    alert.alert();
                  }
                }
            });


         } else {
          //поля не заполнены и кнопку нажать нельзя

         }

    },

    validate: function() {

         $('.login-form').validate(
         {
          rules: {
            username: {
              minlength: 2,
              required: true
            },
            password: {
              minlength: 8,
              required: true
            }
          },

          messages: {
              username: "!",
              password: {
                  required: "!",
                  minlength: "!"
              }
          },

          highlight: function(label) {
            $(label).closest('.control-group').removeClass('success').addClass('error');
          },

          success: function(label) {
            label
              .addClass('control-label').addClass('valid')
              .closest('.control-group').removeClass('error').addClass('success');

          }
         });
    },


    logout: function(e) {
      var that = this;

      e.preventDefault();

      //console.log('logout!!!!');

      $.ajax({
          type: "POST",
          url: "/logout",
          dataType : 'json',
          success: function(data){

            if( data ) {
                //убиваем сессию
                Session.kill();

                //console.log(Session.attributes);
                //console.log(Session.auth());

                if ( !Session.auth() ) {
                  //console.log('нету авторизации!');
                  that.render();
                  
                  //чтобы обновить меню сверху
                  location.reload();
                  
                }
            }


          }
      });


    }
    
  });
  
  var loginView = new App.Views.LoginView();

  return loginView;
});
