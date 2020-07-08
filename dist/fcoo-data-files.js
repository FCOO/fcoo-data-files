/****************************************************************************
	fcoo-data-files.js,

	(c) 2018, FCOO

	https://github.com/FCOO/fcoo-data-files
	https://github.com/FCOO

    fcoo.LOCAL_DATA: {boolean}
    fcoo.dataFilePath:
        function(subDir:STRING, fileName:STRING) OR
        function(pathAndFileName:STRING) OR
        function(subAndFileName:{subDirName;STRING, fileName:STRING})

    if fcoo.LOCAL_DATA == false:
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "https://app.fcoo.dk/static/theSubDir/fileName.json"

    if fcoo.LOCAL_DATA == true:
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "/src/data/_fileName.json"

****************************************************************************/

(function (window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
	window.fcoo = window.fcoo || {};
    var ns = window.fcoo,
        fcooDataPath = 'https://app.fcoo.dk/static/';

    ns.LOCAL_DATA = false;

    ns.dataFilePath = function(){
        // Detect mode
        var subDir, fileName;
        if (arguments.length == 2){
            //(subDir:STRING, fileName:STRING)
            subDir   = arguments[0];
            fileName = arguments[1];
        }
        else
        if (arguments.length == 1){
            if ($.type(arguments[0]) == 'string')
                //(pathAndFileName:STRING)
                return arguments[0];
            else {
                //(subAndFileName:{subDirName;STRING, fileName:STRING})
                subDir   = arguments[0].subDir;
                fileName = arguments[0].fileName;
            }
        }

        if (ns.LOCAL_DATA === true)
            return '/src/data/_' + fileName;
        else
            return fcooDataPath + (subDir ? subDir + '/' : '') + fileName;
    };

}(this, document));

