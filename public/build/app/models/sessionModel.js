define(["jquery","lodash","backbone","events","app"],function(e,t,n,r,i){return i.Models.SessionModel=n.Model.extend({defaults:{user_id:null,access_token:null,username:null},initialize:function(){this.load()},render:function(){},auth:function(){return this.get("access_token")},save:function(t){e.cookie("user_id",t.id),e.cookie("access_token",t.access_token),e.cookie("username",t.username)},load:function(){this.set({user_id:e.cookie("user_id"),access_token:e.cookie("access_token"),username:e.cookie("username")})},kill:function(){this.set({user_id:null,access_token:null,username:null}),e.removeCookie("user_id"),e.removeCookie("access_token"),e.removeCookie("username")}}),new i.Models.SessionModel});