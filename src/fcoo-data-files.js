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

    if fcoo.LOCAL_DATA == false and fcoo.path.relative == true
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "/static/theSubDir/fileName.json"
    fcoo.dataFilePath(false, "theSubDir", "fileName.json") returns "/static/theSubDir/fileName.json"
    fcoo.dataFilePath(true, "theSubDir", "fileName.json") returns "/dynamic/theSubDir/fileName.json"


    if fcoo.LOCAL_DATA == true:
    fcoo.dataFilePath("theSubDir", "fileName.json") returns "/src/data/_fileName.json"

****************************************************************************/

(function ($, window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
    var ns     = window.fcoo = window.fcoo || {},
        nsPath = ns.path = ns.path || {};

    ns.LOCAL_DATA = false;


    //Set default protocol and host
    nsPath.protocol    = nsPath.protocol || 'https:';
    nsPath.defaultHost = 'app.fcoo.dk';
    nsPath.host        = nsPath.host     || nsPath.defaultHost;
    nsPath.relative    = nsPath.relative || {};    //nsPath.relative = BOOLEAN or {static/dymanic: BOOLEAN}. If true dataFileName return a relative
    nsPath.mainDirHost = nsPath.mainDirHost || {}; //{dynamic/static: STRING} Makes it possible to have different host for the two main-dir

    function getTrueMainDir( mainDir ){
        return mainDir ? (mainDir === true ? 'dynamic' : mainDir) : 'static';
    }

    /*********************************************************
    nsPath.dataFileName()
    *********************************************************/
    nsPath.dataFileName = function(){
        // Detect mode
        var host, mainDir, subDir, relative, fileName;

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
                mainDir  = arguments[0].mainDir || arguments[0].main || false;
                subDir   = arguments[0].subDir  || arguments[0].sub;
                fileName = arguments[0].fileName;
            }
        }

        if (ns.LOCAL_DATA === true)
            return '/src/data/_' + fileName;

        //Find mainDir, host, and relative
        mainDir  = getTrueMainDir(mainDir);
        host     = typeof nsPath.host == 'string' ? nsPath.host : nsPath.host[mainDir] || nsPath.defaultHost;
        relative = nsPath.relative ? (nsPath.relative === true ? true : !!nsPath.relative[mainDir]) : false;

        return  (relative ? '' : nsPath.protocol + '//') +
                (relative ? '' : host) +
                '/' +
                mainDir  + '/' +
                (subDir ? subDir + '/' : '') +
                fileName;
    };

    //Backward compability
    ns.dataFilePath = nsPath.dataFileName;


    /*********************************************************
    nsPath.staticDataFileName (subDir, fileName)
    nsPath.dynamicDataFileName(subDir, fileName)
    nsPath.assetsDataFileName (subDir, fileName)
    *********************************************************/
    nsPath.staticDataFileName = function(subDir, fileName){
        return this.dataFileName(false, subDir, fileName);
    };

    nsPath.dynamicDataFileName = function(subDir, fileName){
        return this.dataFileName(true, subDir, fileName);
    };

    nsPath.assetsDataFileName = function(subDir, fileName){
        return this.dataFileName('assets', subDir, fileName);
    };


    /*********************************************************
    **********************************************************
    nsPath.setCssVar(varName, mainDir, subDir, fileName)
    Create/update css-variabel varName in :root with url( path to fileName )
    **********************************************************
    *********************************************************/
    var dataFileNameAsCssVar = [];
    nsPath.setDataFileNameAsCssVar = function(varName, mainDir, subDir, fileName){
        mainDir = getTrueMainDir( mainDir );
        var root = document.querySelector(':root');

        root.style.setProperty('--'+varName, 'url(' + nsPath.dataFileName(mainDir, subDir, fileName) +')');

        //If new => Add to dataFileNameAsCssVar
        var found = false;
        dataFileNameAsCssVar.forEach( (dataFile) => {
            if ((dataFile.varName == varName) && (dataFile.mainDir == mainDir) && (dataFile.subDir == subDir) && (dataFile.fileName == fileName))
                found = true;
        });
        if (!found)
            dataFileNameAsCssVar.push({'varName': varName, 'mainDir': mainDir, 'subDir': subDir, 'fileName': fileName});
    };

    /*********************************************************
    nsPath.setStaticDataFileNameAsCssVar (varName, subDir, fileName)
    nsPath.setDynamicDataFileNameAsCssVar(varName, subDir, fileName)
    nsPath.setAssetsDataFileNameAsCssVar (varName, subDir, fileName)
    *********************************************************/
    nsPath.setStaticDataFileNameAsCssVar = function(varName, subDir, fileName){
        return this.setDataFileNameAsCssVar(varName, false, subDir, fileName);
    };

    nsPath.setDynamicDataFileNameAsCssVar = function(varName, subDir, fileName){
        return this.setDataFileNameAsCssVar(varName, true, subDir, fileName);
    };

    nsPath.setAssetsDataFileNameAsCssVar = function(varName, subDir, fileName){
        return this.setDataFileNameAsCssVar(varName, 'assets', subDir, fileName);
    };

    /*********************************************************

    *********************************************************/
    nsPath.getCssVar = function(varName){
        var root      = document.querySelector(':root'),
            rootStyle = getComputedStyle(root);
        return rootStyle.getPropertyValue('--'+varName);
    };


    /*********************************************************
    **********************************************************
    nsPath.setPath(path)
    **********************************************************
    *********************************************************/
    nsPath.setPath = function(path){
        $.extend(true, this, path);

        //Update all css-var
        dataFileNameAsCssVar.forEach( (dataFile) => {
            this.setDataFileNameAsCssVar(dataFile.varName, dataFile.mainDir, dataFile.subDir, dataFile.fileName);
        });
        return this;
    };


}(jQuery, this, document));

