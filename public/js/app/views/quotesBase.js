define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app',
  'text!../../../templates/user_quotebase.phtml',
  'text!../../../templates/add_quote.phtml',
  'quoteAddView',
  'quotesData',
  'dataTable'

], function($, _, Backbone, Events, App, userQuoteTpl, addQuoteTpl, QuoteAddView, QuotesData){
  

  var QuotesBase = { Views: {} };


  /*
  |---------------------------------------------------
  |  Quotes Base Page View
  |---------------------------------------------------
  */

  QuotesBase.Views.QuotesBasePageView = Backbone.View.extend({
    el: '.main',

    //при инициализации экземпляра вешаем событие на добавление в коллекцию новой модели, при которой срабатывает метод addOne
    initialize: function() {
      //console.log('вид страницы добавления цитат!');

      //вещаем сабытие на редактирование цитат, сразу запускаем функцию editQuote
      App.vent.on('quote:edit', this.editQuote, this);

    },

    render: function () {
      var that = this;

      //защита от того, что чувак очистил кэш будучи на этой странице КОСТЫЛЬ!!!
      if (App.quotesCollection === undefined ) {
        //console.log('надо создавать this.collection и  фетчить!');
        this.collection = new QuotesData.Collection();
        this.collection.fetch().then( function() {
          
                //вставляем верстку самой страницы
                that.$el.html(userQuoteTpl);

                // this.collection = quotesCollection
                //создаем экземпляр вида всех цитат и вставляем в него коллекцию цитат. Сразу рендерим
                var allQuotesView = new QuotesBase.Views.QuotesView({ collection: that.collection }).render();
               
               //вставляем в таблицу цитат все срендеренные цитаты
                $('#user-citabase-table').append(allQuotesView.el);


                //грузим дататабл
                $('#user-citabase-table').dataTable({

                  "sPaginationType": "bootstrap",
                  "sDom": '<"top"f>rt<"bottom"p><"clear">'
                });

        });
      }


      //вставляем верстку самой страницы
      this.$el.html(userQuoteTpl);

      // this.collection = quotesCollection
      //создаем экземпляр вида всех цитат и вставляем в него коллекцию цитат. Сразу рендерим
      var allQuotesView = new QuotesBase.Views.QuotesView({ collection: this.collection }).render();
     
     //вставляем в таблицу цитат все срендеренные цитаты
      $('#user-citabase-table').append(allQuotesView.el);


      //грузим дататабл
      $('#user-citabase-table').dataTable({

        "sPaginationType": "bootstrap",
        "sDom": '<"top"f>rt<"bottom"p><"clear">'
      });


      return this;

    },

    editQuote: function(quote) {
      //console.log('метод editQuote');
      //создаем экземпляр editContactView и вставляем его в DOM
      var editQuoteView = new QuotesBase.Views.QuoteEditView({ model: quote });
      $('#editQuote').html(editQuoteView.el);
    }

  });


/*
|---------------------------------------------------
|  All Quotes View
|---------------------------------------------------
*/

  QuotesBase.Views.QuotesView = Backbone.View.extend({
    tagName: 'tbody',

    //при инициализации экземпляра вешаем событие на добавление в коллекцию новой модели, при которой срабатывает метод addOne
    initialize: function() {
      //console.log('вид всех цитат!');

      //console.log(this.collection);

      //this.collection.on('add', this.addOne, this );
      //событие на добавление модели
      this.collection.on('add', this.addOne, this );
    },

    
    render: function () {

      //при рендере для каждой модели коллекции запускаем метод addOne
      this.collection.each( this.addOne, this );

      //всегда в методе рендер, делаем return this, для того чтобы можно было вызывать метод в цепочке
      return this;

    },

    //инициализируем экземпляр quoteView и динамически передаем ей каждую модель коллекции
    //вставляем каждый срендеренный вид в $el = tbody
    
    // quote = каждая модель коллекции this.collection
    addOne: function(quote) {
      //console.log('add one сработал!');

      var quoteView = new QuotesBase.Views.QuoteView({ model: quote });
        //console.log( quoteView.render().el );
        this.$el.append(quoteView.render().el);
    }

  });


/*
|---------------------------------------------------
|  Single Quote View
|---------------------------------------------------
*/

  QuotesBase.Views.QuoteView = Backbone.View.extend({
    tagName: 'tr',

    template: $('#allQuotesTemplate').html() ,

    //вешаем событие на удаление модели - при котором запускается метод unrender
    //вешаем событие на изменение модели - при котором запускается метод render
    initialize: function() {
      //console.log('вид цитаты!!!');

      this.model.on('destroy', this.unrender, this);
      this.model.on('change', this.render, this);
    },

    //вставляем в $el = tr, срендеренный шаблон с данными из модели
    render: function() {
       var html = $('#allQuotesTemplate').html();
       var compiledTpl = Handlebars.compile(html);

       this.$el.html( compiledTpl( this.model.toJSON() ) );

       return this;
    },

    events: {
      'click a.delete' : 'deleteContact',
      'click a.edit'   : 'editContact'
    },

    // при нажатии на кнопку удалить удаляем модель
    deleteContact: function() {
      this.model.destroy();
    },

    // триггер события при нажатии на кнопку edit
    editContact: function() {
      App.vent.trigger('quote:edit', this.model);
    },

    //удаляем this el.
    unrender: function() {
      this.remove();  //this.el.remove();
    }

  });


  /*
  |---------------------------------------------------
  |  Edit Contact View
  |---------------------------------------------------
  */

  QuotesBase.Views.QuoteEditView = Backbone.View.extend({
    //template: App.template('editQuoteTemplate'),

    //при инициализации рендерим блок редактирования контакта и кэшируем данные
    initialize: function() {
      this.render();

      //кэшируем в экземпляр объекта форму и ее инпуты
      this.form = this.$('#editContact');
      this.edit_author = this.form.find('#edit_author');
      this.edit_quote = this.form.find('#edit_quote');

    },

    events: {
      'submit #editContact'        : 'submit',
      'click #editContact .cancel' : 'cancel'
    },

    submit: function(e) {
      e.preventDefault();

      //берем связанную модель
      //обновляем ее аттрибуты
      //синхронизируем с сервером
      this.model.save({
        author: this.edit_author.val(),
        quote: this.edit_quote.val()
      });
      
      
      //удаляем форму (она всегда генерится заново)
      this.remove();

    },

    cancel: function() {
      //удаляем форму (она всегда генерится заново)
      this.remove();
    },

    render: function() {

       var html = $('#editQuoteTemplate').html();
       var compiledTpl = Handlebars.compile(html);

      //var html = this.template( this.model.toJSON() );
      //this.$el.html(html);


      //когда el - не обозначен - автомотически создается див
      this.$el.html( compiledTpl( this.model.toJSON() ) );

      return this;
    }
  });





  return QuotesBase;

});
