({
    appDir: "../",
    baseUrl: "js",
    dir: "../../app-build",
    modules: [
        {
            name: "config"
        }
    ],
 	paths: {
		// libs
		"jquery"                 : "libs/jquery",
		'jquery-ui'              : 'libs/jquery-ui',
		"underscore"             : "libs/underscore",
		"lodash"                 : "libs/lodash",
		'backbone'               : 'libs/backbone',
		'backbone.layoutmanager' : "libs/backbone.layoutmanager",
		'backbone.marionette'    : "libs/backbone.marionette",
		'handlebars'             : 'libs/handlebars',
		'bootstrap'              : 'libs/bootstrap.min',
		'text'                   : 'libs/text',
		'modernizr'              : 'libs/modernizr',
		'dataTable'              : 'libs/jquery.dataTables',
		'jqueryForm'             : 'libs/jquery.form',
		'jqueryValidate'         : 'libs/jquery.validate',
		'jqueryCookie'           : 'libs/jquery.cookie',

		//files
		"common"                 : "common",
		'globals'                : "globals",
		"events"                 : 'events',
		"vm"                     : 'vm',
		"app"                    : 'app',

		//collections
		'quotesData'             : 'app/collections/quotesData',

		//models
		'sessionModel'           : "app/models/sessionModel",

		//views
		"loginView"              : "app/views/loginView",
		'registrationView'       : 'app/views/registrationView',
		'aboutView'              : 'app/views/aboutView',

		//modules
		'quotesBase'             : 'app/views/quotesBase',
		'quoteAddView'           : 'app/views/quoteAddView'

	},

    //A function that if defined will be called for every file read in the
    //build that is done to trace JS dependencies. This allows transforms of
    //the content.
    // onBuildRead: function (moduleName, path, contents) {
    //     //Always return a value.
    //     //This is just a contrived example.
    //     //console.log('!!!!' + path + '!!!!!');

    //     //return contents.replace(/foo/g, 'bar');
    // },

    // //A function that will be called for every write to an optimized bundle
    // //of modules. This allows transforms of the content before serialization.
    // onBuildWrite: function (moduleName, path, contents) {
    //     //Always return a value.
    //     //This is just a contrived example.
       
    //     //console.log('^^^^^' + path + '^^^^^');

    //     //return contents.replace(/bar/g, 'foo');
    // },

     stubModules: ['text']

})