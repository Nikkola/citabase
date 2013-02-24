define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app',
  'text!../../../templates/registration.phtml',
  'loginView',
  'sessionModel',
  'jqueryForm',
  'jqueryValidate'

], function($, _, Backbone, Events, App, userRegTpl, LoginView, Session ){
  


  App.Views.RegisterView = Backbone.View.extend({
    el: '.main',

    initialize: function () {
      //console.log('Вид регистрации!');
    },

    render: function () {
      this.$el.html(userRegTpl);

      this.validate();
    },

    events: {
      "click .registr-btn"               : "registrate",
      'keyup .registration-form input'   : 'checkBtnActive',
      'click .close-reg-popup'           : 'reload',
      'click .close'                     : 'closeAlert'
    },


    checkBtnActive: function() {
      var regBtn = $('.registr-btn');

      //проверка на валидность
      if ( $('.registration-form').valid() ) {

        regBtn.removeClass('disabled').removeAttr('disabled');
      } else {
        regBtn.addClass('disabled').attr('disabled', 'disabled');
      }
          
    },


    closeAlert: function(e) {
      e.preventDefault();

      var alert = $('.registration-alert');

      alert.addClass('h');     
    },

    validate: function() {

         $('.registration-form').validate(
         {
          rules: {
            username: {
              minlength: 2,
              required: true
            },
            email: {
              required: true,
              email: true
            },
            password: {
              minlength: 8,
              required: true
            },
            passwordConfirmation: {
              minlength: 8,
              required: true,
              equalTo: "#password"
            }
          },

          messages: {
              username: "Пожалуйста, введите ваше имя или никнейм",
              email: "Пожалуйста, введите корректный email",
              password: {
                  required: "Пожалуйста, введите пароль",
                  minlength: "Ваш пароль должен быть не меньше 8 символов"
              },
              passwordConfirmation: {
                  required: "Пожалуйста, введите пароль повторно",
                  equalTo: "Пароли отличаются"
              }
          },

          highlight: function(label) {
            $(label).closest('.control-group').removeClass('success').addClass('error');
          },

          success: function(label) {
            label
              .addClass('control-label')
              .text('OK!').addClass('valid')
              .closest('.control-group').removeClass('error').addClass('success');

          }
         });
    },


    registrate: function(e) {
      e.preventDefault();

      var form = $('.registration-form'),
          serialArr = form.serializeArray();

          if ( form.valid() ) {

              $.ajax({
                  type: "POST",
                  url: "/registration",
                  dataType : 'json',
                  data: serialArr,
                  success: function(data){

                    if (data.msg === 'User is logged in') {

                        //создаем сессию и сохраняем в куки! Передаем объект с параметрами айди пользователя и доступ = true
                        Session.save( { id: data.id, access_token: data.access_token, username: data.username } );

                        //заново инициализируем сессию
                        Session.initialize();

                        LoginView.renderProfileBlock();
                        $('.profile-name').text(Session.get('username'));


                        $('#reg-complete-popup').modal();

                    } else if (data.msg === 'Пользователь с таким email уже зарегистрирован!') {
                      var alert = $('.registration-alert');

                          $('.registration-alert span').text('Пользователь с таким email уже зарегистрирован!');
                          console.log($('.email-label'));
                          $('.email-label').closest('.control-group').removeClass('success').addClass('error');

                          alert.removeClass('h');
                          alert.alert();

                    }


                  }
              });

          } else {
            //console.log('не валидна!!!');
          }

          



    },

    reload: function() {
      //чтобы обновить меню сверху
      window.location.hash = '';
      location.reload();
    }

  });

  var registerView = new App.Views.RegisterView();

  return registerView;
});
