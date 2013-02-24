define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app',
  'sessionModel',
  'text!../../../templates/pass_recovery.phtml'

], function($, _, Backbone, Events, App, Session, tpl){


  App.Views.PassRecoveryView = Backbone.View.extend({
    el: '.main',

    initialize: function () {
    },

    render: function () {
      this.$el.html(tpl);

      this.validate();
    },

    events: {
      'change .recovery-pass-form input'   : 'checkBtnActive',
      'click .recover-btn'                 : 'sendPass'
    },

    checkBtnActive: function() {

      var recoverBtn = $('.recover-btn');

      //проверка на валидность
      if ( $('.recovery-pass-form').valid() ) {
        recoverBtn.removeClass('disabled').removeAttr('disabled');
      } else {
        recoverBtn.addClass('disabled').attr('disabled', 'disabled');
      }
          
    },


    sendPass: function(e) {
      e.preventDefault();

      var serForm = $('.recovery-pass-form').serializeArray();

      $.ajax({
          type: "POST",
          url: "/recovery",
          dataType : 'json',
          data: serForm,
          success: function(dataPass){
            if (dataPass) {

              $('#recover-pass-popup').modal();

            }
          }
      });

    },

    validate: function() {

         $('.recovery-pass-form').validate(
         {
          rules: {
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
    }

  });

  var passRecoveryView = new App.Views.PassRecoveryView();

  return passRecoveryView;
});
