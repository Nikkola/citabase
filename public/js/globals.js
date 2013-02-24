define([
  'underscore'
], function() {

  //создается объект глобалс
  var globals = {};

  //соединяется с модулем бутстрапа, теперь при возврате глобалс - будет использоваться объект, 
  //возвращаемый с бутстрап модуля на index странице
  //_.extend(globals, bootstrapData);
  return globals;

});