# fcoo-data-files



## Description
Methods to read data files from either production or local during development

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-data-files.git --save`

## Usage

Data files used in production are stored on the web-server where the application is located

The standard setup is that the application `APPNAME` is in `https://app.fcoo.dk/APPNAME` and the static and dynamic data are in sub-directories under `https://app.fcoo.dk/static/` and `https://app.fcoo.dk/dynamic/`

This packages provide a namespace `window.fcoo.path` with the following properires and method

	.protocol:STRING 	//default = "https:"
    .host:STRING 		//default = "app.fcoo.dk"
	
    .dataFileName: 	FUNCTION([mainDir,] subDir, fileName) or
					FUNCTION({mainDir, subDir, fileName}) or
					FUNCTION(fileName: STRING)
	where 	
	mainDir = false or missing => mainDir = "static" 
	mainDir = true => mainDir = "dynamic" 
	mainDir = STRING => mainDir unchanged 
 

### Production

	
To get the full path to a file, use `window.fcoo.path.dataFileNAme([mainDir,] subDirName, fileName);` where
 

    var filePath = window.fcoo.path.dataFileName("theSubDir", "fileName.json"); 
	//filePath = "https://app.fcoo.dk/static/theSubDir/fileName.json"
    
    var filePath = window.fcoo.path.dataFileName({mainDir: true, subDir: "theSubDir", fileName:"fileName.json"}); 
	//filePath = "https://app.fcoo.dk/dynamic/theSubDir/fileName.json"
    
    var filePath = window.fcoo.path.dataFileName("/normal/path/to/filename.json"); 
	//filePath = "/normal/path/to/filename.json"


### Development
To be able to test new versions while developing a packages using the structure described in [fcoo-web-dev](https://github.com/FCOO/fcoo-web-dev) and shown below a development version of the data file can be named `_fileName` (with a leading `"_"`) and placed under `src/data`

If setting `fcoo.LOCAL_DATA = true;` `window.fcoo.dataFilePath(subDirName, fileName);` will return the path to the local version relative to `/demo` (where the test page is located)

setting `fcoo.LOCAL_DATA = true;` must be done in `/demo/index.html` witch ensure that an other package or application using the package will get data from production
    
    //I demo/index.html
    windoe.fcoo.LOCAL_DATA = true;

    //In the packages source file
    var filePath = window.path.dataFileName("theSubDir", "fileName.json"); //return "/src/data/_fileName.json"

#### Structure 
    PACKAGE_NAME
    ├── src
    |   ├── data
    |   ├── fonts
    |   └── images
    ├── demo


## Options and Methods
    fcoo.LOCAL_DATA = true/false; 
	
	fcoo.path.protocol 	= "https:";
    fcoo.path.host	    = "app.fcoo.dk";
	
    fcoo.path.dataFileName([mainDir,] subDir, fileName);
    fcoo.path.dataFileName({mainDir, subDir, fileName});
    fcoo.path.dataFileName(fileName);



## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-data-files/LICENSE).

Copyright (c) 2018 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk
