/****************************************************************************
	fcoo-data-files.js,

	(c) 2018, FCOO

	https://github.com/FCOO/fcoo-data-files
	https://github.com/FCOO

    fcoo.LOCAL_DATA: {boolean}
    fcoo.dataFilePath: function(subDirName, fileName);

    if fcoo.LOCAL_DATA == false:
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "https://TOTO/theSubDir/fileName.json"

    if fcoo.LOCAL_DATA == true:
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "/src/data/_fileName.json"

****************************************************************************/

(function (window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
	window.fcoo = window.fcoo || {};
    var ns = window.fcoo,
        fcooDataPath = 'https://TODO/';

    ns.LOCAL_DATA = false;

    ns.dataFilePath = function(subDir, fileName){
        if (ns.LOCAL_DATA === true)
            return '/src/data/_' + fileName;
        else
            return fcooDataPath + subDir + '/' + fileName;
    };

}(this, document));