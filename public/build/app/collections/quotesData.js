define(["jquery","lodash","backbone","events","app"],function(e,t,n,r,i){var s={};return s.Model=n.Model.extend({initialize:function(){},defaults:{quote:null,author:null,user_id:null},validate:function(e){if(!e.quote||!e.author)return"Цитата и автор, обязательны для ввода!"}}),s.Collection=n.Collection.extend({initialize:function(){},model:s.Model,userId:e.cookie("user_id"),url:function(){return this.userId?"/quotes/"+this.userId:"/quotes"}}),s});