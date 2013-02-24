define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app',
  'text!../../../templates/add_quote.phtml',
  'quotesData'

], function($, _, Backbone, Events, App, addQuoteTpl, QuotesData){
  

/*
  |---------------------------------------------------
  |  Add Quote View
  |---------------------------------------------------
  */

  var QuoteAddView = Backbone.View.extend({
    el: '.main',

    initialize: function() {
      //защита от того, что чувак очистил кэш будучи на этой странице КОСТЫЛЬ!!!
      if (App.quotesCollection === undefined ) {
        //console.log('надо создавать this.collection и  фетчить!');
        this.collection = new QuotesData.Collection();
        this.collection.fetch();
      }



      //отрисовка страницы добавки цитаты
      this.$el.html(addQuoteTpl);


     //при инициализации хватаем необходимые инпуты формы и кешируем их
      this.add_quote = $('#add_quote');
      this.add_author = $('#add_author');

    },

    events: {
      'click #add-quote-btn' : 'addQuote',
      'click .close'         : 'closeAlert'
    },

    addQuote: function(e) {
      e.preventDefault();

      //console.log('Добавил цитату!!!');

      //меняем урл на простой quotes!!!!  - кастылек!
      //this.collection.url = '/quotes';


      //cоздаем в коллекции новую модель
      var newContact = this.collection.create({
        quote: this.add_quote.val(),
        author: this.add_author.val(),
        user_id: $.cookie('user_id')
      }, { wait: true });


      $('.add-quote-success').removeClass('h');

      var triggerClose = function() {
        $('.close').trigger('click');
      };


      //очищает валы инпутов
      this.clearForm();

      setTimeout( triggerClose , 1500);
      //console.log( newContact );
      //console.log( this.collection );
    },

    closeAlert: function(e) {
      e.preventDefault();

      $(".add-quote-success").addClass('h');
    },

    
    clearForm: function() {
      this.add_quote.val('');
      this.add_author.val('');
    }
  });

  return QuoteAddView;

});
