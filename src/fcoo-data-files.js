/****************************************************************************
	fcoo-data-files.js,

	(c) 2018, FCOO

	https://github.com/FCOO/fcoo-data-files
	https://github.com/FCOO

    fcoo.LOCAL_DATA: {boolean}
    fcoo.dataFilePath:
        function([mainDir:STRING|BOOLEAN], subDir:STRING, fileName:STRING) OR
        function(pathAndFileName:STRING) OR
        function(subAndFileName:{mainDirNa<me:STRING|BOOLEAN, subDirName;STRING, fileName:STRING})

    mainDir = STRING or BOOLEAN. if true => "dynamic", if false => "static"

    if fcoo.LOCAL_DATA == false:
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "https://app.fcoo.dk/static/theSubDir/fileName.json"
    fcoo.dataFilePath(false, "theSubDir", "fileName.json") returns "https://app.fcoo.dk/static/theSubDir/fileName.json"
    fcoo.dataFilePath(true, "theSubDir", "fileName.json") returns "https://app.fcoo.dk/dynamic/theSubDir/fileName.json"

    if fcoo.LOCAL_DATA == true:
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "/src/data/_fileName.json"

****************************************************************************/

(function (window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
    var ns     = window.fcoo = window.fcoo || {},
        nsPath = ns.path = ns.path || {};

    ns.LOCAL_DATA = false;


    //Set default protocol and host
    nsPath.protocol = nsPath.protocol || 'https:';
    nsPath.host     = nsPath.host     || 'app.fcoo.dk';

    function dataFileName(){
        // Detect mode
        var mainDir, subDir, fileName;

        if (arguments.length == 3){
            //(mainDir: STRING|BOOLEAN, subDir:STRING, fileName:STRING)
            mainDir  = arguments[0];
            subDir   = arguments[1];
            fileName = arguments[2];
        }
        else
        if (arguments.length == 2){
            //(subDir:STRING, fileName:STRING)
            mainDir  = false,   //=> default 'static'
            subDir   = arguments[0];
            fileName = arguments[1];
        }
        else
        if (arguments.length == 1){
            if (typeof arguments[0] == 'string')
                //(pathAndFileName:STRING)
                return arguments[0];
            else {
                //({mainDir:STRING|BOOLEAN, subDirName:STRING, fileName:STRING})
                mainDir  = arguments[0].mainDir || false;
                subDir   = arguments[0].subDir;
                fileName = arguments[0].fileName;
            }
        }

        if (ns.LOCAL_DATA === true)
            return '/src/data/_' + fileName;
        else
            return  nsPath.protocol + '//' +
                    nsPath.host + '/' +
                    (mainDir ? (mainDir === true ? 'dynamic' : mainDir) : 'static') + '/' +
                    (subDir ? subDir + '/' : '') +
                    fileName;
    }

    //Export method
    nsPath.dataFileName = dataFileName;

    //Backward compability
    ns.dataFilePath = dataFileName;

}(this, document));

