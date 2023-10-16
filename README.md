# fcoo-data-files



## Description
Methods to read data files from either production or local during development

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-data-files.git --save`

## Standard FCOO web-applications

Standard [FCOO web-applications](https://github.com/FCOO/fcoo-web-dev) read data (.json) and other files from sub-directories in three different **main** directories: *static*, *dynamic*, and *assets*

- **static**: Contains setup- and data-files for web applications. Updated manually.
- **dynamic**: Meta-data and data files for web-applications. Updated automatic by other systems.
- **assets**: Common images, fonts, icons, favicons etc. used by most FCOO web applications. Updated manually.   

### Standard setup
The standard setup is that an application `APPNAME` is located in the directory `https://app.fcoo.dk/APPNAME/` and the three main directories are
 
- static `https://app.fcoo.dk/static/`
- dynamic `https://app.fcoo.dk/dynamic/`
- assets `https://app.fcoo.dk/assets/`

## `window.fcoo.path`
This packages (fcoo-data-files) provide a namespace `window.fcoo.path` with the following definitions, properties and method

## Definitions
If the url to a file is `https://app.fcoo.dk/static/setup/setting.json` the different parts are named as: 

        protocol = "https:"
        host     = "app.fcoo.dk" 
        mainDir  = "static"
        subDir   = "setup"
        fileName = "setting.json"
        
## Properties of `window.fcoo.path`

	.protocol     : STRING 	                                    //default = "https:"
    .defaultHost  : STRING                                      //default = "app.fcoo.dk"
    .host         : {static/dynamic/assets: STRING} or STRING   //default = "app.fcoo.dk"
    .mainDir      : {static/dynamic/assets: STRING}             //default = {static: "static", dynamic: "dynamic", assets: "assets"}    
    .relative     : {static/dynamic/assets: BOOLEAN} or BOOLEAN //default = false. If true the methods below will return a relative url (ex. "/static/setup/setting.json")

## Methods in `window.fcoo.path`

### `window.fcoo.path.dataFileName`
The `dataFileName`-method can be call in three different ways

    .dataFileName: 	FUNCTION( mainDir:STRING or BOOLEAN, subDir: STRING, fileName: STRING ) or
					FUNCTION(subDir: STRING, fileName: STRING) or
					FUNCTION(fileName: STRING)
	where
	mainDir = "static", "dynamic", "assets", true or false, 
        If true => mainDir = "dynamic", 
        if false or missing => mainDir = "static"

If only `fileName` is passed to `dataFileName()` it assumes it is the full url and just return `fileName`  

#### Examples

    var filePath = window.fcoo.path.dataFileName("theSubDir", "fileName.json");
	//filePath = "https://app.fcoo.dk/static/theSubDir/fileName.json"

    var filePath = window.fcoo.path.dataFileName({mainDir: true, subDir: "theSubDir", fileName:"fileName.json"});
	//filePath = "https://app.fcoo.dk/dynamic/theSubDir/fileName.json"

    var filePath = window.fcoo.path.dataFileName("/normal/path/to/filename.json");
	//filePath = "/normal/path/to/filename.json"


### `window.fcoo.path.`*{MAIN}*`DataFileName`

Three methods for specific *main* are given:
 
    .staticDataFileName : FUNCTION(subDir, fileName)
    .dynamicDataFileName: FUNCTION(subDir, fileName)
    .assetsDataFileName : FUNCTION(subDir, fileName)


### `window.fcoo.path.setDataFileNameAsCssVar`

Method to set the url to a data-file as a [css-variable](https://www.w3schools.com/css/css3_variables.asp) in `:root`

    .setDataFileNameAsCssVar: FUNCTION( varName:STRING, mainDir:STRING or BOOLEAN, subDir: STRING, fileName: STRING )
    
#### Examples

    window.fcoo.path.setDataFileNameAsCssVar('the-var-name', true, 'the-sub-dir', 'the-file-name.json');

Will result in `css`
    
    <style>
        :root {
            --the-var-name: url(https://app.fcoo.dk/dynamic/the-sub-dir/the-file-name.json);
        }
    </style>

And can be used in `css` a la

    <style>
        .logo {
            background-image: var(--the-var-name);
        }
    </style>

    


### `window.fcoo.path.set`*{MAIN}*`DataFileNameAsCssVar`

Three methods for specific *main* are given:

    .setStaticDataFileNameAsCssVar : FUNCTION(varName, subDir, fileName)
    .setDynamicDataFileNameAsCssVar: FUNCTION(varName, subDir, fileName)
    .setAssetsDataFileNameAsCssVar : FUNCTION(varName, subDir, fileName)


### `window.fcoo.path.setPath( path )`

Methods to set all or some properties. It also updates all css-var set with `setDataFileNameAsCssVar(...)` (or *{MAIN}* variants) 
    
    .setPath( path )

#### Examples

    window.fcoo.path.setDataFileNameAsCssVar('the-var-name', true, 'the-sub-dir', 'the-file-name.json');
    window.fcoo.path.setPath({relative: {dynamic: true}});

The `css` will change to

    <style>
        :root {
            --the-var-name: url(/dynamic/the-sub-dir/the-file-name.json);
        }
    </style>





## Development
To be able to test new versions while developing a packages using the structure described in [fcoo-web-dev](https://github.com/FCOO/fcoo-web-dev) and shown below a development version of the data file can be named `_fileName` (with a leading `"_"`) and placed under `src/data`

If setting `fcoo.LOCAL_DATA = true;` `window.fcoo.dataFilePath(subDir, fileName);` will return the path to the local version relative to `/demo` (where the test page is located)

setting `fcoo.LOCAL_DATA = true;` must be done in `/demo/index.html` witch ensure that an other package or application using the package will get data from production

    //I demo/index.html
    windoe.fcoo.LOCAL_DATA = true;

    //In the packages source file
    var filePath = window.path.dataFileName("theSubDir", "fileName.json"); //return "/src/data/_fileName.json"

### Structure
    PACKAGE_NAME
    ├── src
    |   ├── data
    |   ├── fonts
    |   └── images
    ├── demo


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-data-files/LICENSE).

Copyright (c) 2018 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk
