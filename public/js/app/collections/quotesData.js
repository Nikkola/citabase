define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'app'

], function($, _, Backbone, Events, App){


	var QuoteData = {};

	/*
	|---------------------------------------------------
	|  Quotes Base Model
	|---------------------------------------------------
	*/

	QuoteData.Model = Backbone.Model.extend({
		initialize: function() {
			//console.log('модель цитаты!');
		},

		defaults: {
			quote: null,
			author: null,
			user_id: null
		},

		validate: function(attrs) {

			if ( ! attrs.quote || ! attrs.author ) {
				return 'Цитата и автор, обязательны для ввода!';
			}

		}

	});


	/*
	|---------------------------------------------------
	|  Quotes Base Collection
	|---------------------------------------------------
	*/

	QuoteData.Collection = Backbone.Collection.extend({
		initialize: function() {
			//console.log('коллекция цитат!');
		},

		model: QuoteData.Model,

		userId: $.cookie('user_id'),

		//всегда хватается урл с айдишником пользователя
		url: function() {
			if ( this.userId ) {
				return '/quotes/' + this.userId;
			} else {
				return '/quotes';
			}

		}

	});


	return QuoteData;


});