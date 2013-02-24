define(["jquery","lodash","backbone","events","app","text!../../../templates/registration.phtml","loginView","sessionModel","jqueryForm","jqueryValidate"],function(e,t,n,r,i,s,o,u){i.Views.RegisterView=n.View.extend({el:".main",initialize:function(){},render:function(){this.$el.html(s),this.validate()},events:{"click .registr-btn":"registrate","keyup .registration-form input":"checkBtnActive","click .close-reg-popup":"reload","click .close":"closeAlert"},checkBtnActive:function(){var t=e(".registr-btn");e(".registration-form").valid()?t.removeClass("disabled").removeAttr("disabled"):t.addClass("disabled").attr("disabled","disabled")},closeAlert:function(t){t.preventDefault();var n=e(".registration-alert");n.addClass("h")},validate:function(){e(".registration-form").validate({rules:{username:{minlength:2,required:!0},email:{required:!0,email:!0},password:{minlength:8,required:!0},passwordConfirmation:{minlength:8,required:!0,equalTo:"#password"}},messages:{username:"Пожалуйста, введите ваше имя или никнейм",email:"Пожалуйста, введите корректный email",password:{required:"Пожалуйста, введите пароль",minlength:"Ваш пароль должен быть не меньше 8 символов"},passwordConfirmation:{required:"Пожалуйста, введите пароль повторно",equalTo:"Пароли отличаются"}},highlight:function(t){e(t).closest(".control-group").removeClass("success").addClass("error")},success:function(e){e.addClass("control-label").text("OK!").addClass("valid").closest(".control-group").removeClass("error").addClass("success")}})},registrate:function(t){t.preventDefault();var n=e(".registration-form"),r=n.serializeArray();n.valid()&&e.ajax({type:"POST",url:"/registration",dataType:"json",data:r,success:function(t){if(t.msg==="User is logged in")u.save({id:t.id,access_token:t.access_token,username:t.username}),u.initialize(),o.renderProfileBlock(),e(".profile-name").text(u.get("username")),e("#reg-complete-popup").modal();else if(t.msg==="Пользователь с таким email уже зарегистрирован!"){var n=e(".registration-alert");e(".registration-alert span").text("Пользователь с таким email уже зарегистрирован!"),console.log(e(".email-label")),e(".email-label").closest(".control-group").removeClass("success").addClass("error"),n.removeClass("h"),n.alert()}}})},reload:function(){window.location.hash="",location.reload()}});var a=new i.Views.RegisterView;return a});