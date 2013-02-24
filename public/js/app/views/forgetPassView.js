define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app',
  'sessionModel',
  'text!../../../templates/forget_pass.phtml'

], function($, _, Backbone, Events, App, Session, tpl){


  App.Views.ForgetPassView = Backbone.View.extend({
    el: '.main',

    initialize: function () {
    },

    render: function () {
      this.$el.html(tpl);

      this.validate();
    },

    events: {
      'change .forget-form input'   : 'checkBtnActive',
      'click .forget-btn'           : 'sendPass'
    },

    checkBtnActive: function() {

      var forgetBtn = $('.forget-btn');

      //проверка на валидность
      if ( $('.forget-form').valid() ) {
        forgetBtn.removeClass('disabled').removeAttr('disabled');
      } else {
        forgetBtn.addClass('disabled').attr('disabled', 'disabled');
      }
          
    },


    sendPass: function(e) {
      e.preventDefault();

      var mailVal = $('.forget-form #email').val();

      $.ajax({
          type: "POST",
          url: "/forget",
          dataType : 'json',
          data: {'email' : mailVal},
          success: function(dataMail){
            if (dataMail === mailVal) {

              $('#forget-pass-popup').modal();

            }
          }
      });



    },

    validate: function() {

         $('.forget-form').validate(
         {
          rules: {
            email: {
              required: true,
              email: true
            }
          },

          messages: {
              email: "Пожалуйста, введите корректный email"
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
    }

  });

  var forgetPassView = new App.Views.ForgetPassView();

  return forgetPassView;
});
