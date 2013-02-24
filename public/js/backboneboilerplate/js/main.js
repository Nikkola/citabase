// Let's kick off the application

require([
  'views/app',
  'router',
  'vm'
], function(AppView, Router, Vm){

  var appView = Vm.create({}, 'AppView', AppView);
  
      appView.render();
      Router.initialize({appView: appView});  // The router now has a copy of all main appview

});
