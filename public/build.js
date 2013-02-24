({
    appDir: "",
    baseUrl: "js",
    dir: "./build",
    locale: "ru-RU",

    inlineText: true,
    mainConfigFile: 'js/config.js',
    modules: [
        {
            name: "config"
        }
    ],

    onBuildRead: function (moduleName, path, contents) {
        //console.log('!!!' + path );
        //Always return a value.
        //This is just a contrived example.
        contents = contents.replace(/text!\.\.\/\.\.\/\.\.\//g, 'text!../');
        return contents;
    },

    //A function that will be called for every write to an optimized bundle
    //of modules. This allows transforms of the content before serialization.
    onBuildWrite: function (moduleName, path, contents) {
        //Always return a value.
        //This is just a contrived example.
        contents = contents.replace(/text!\.\.\//g, 'text!../../../');
        return contents;
    }

})