# fcoo-data-files



## Description
Methods to read data files from either production or local during development

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-data-files.git --save`

## Usage

Data files used in production are stored on FCOO web-server under https://app.fcoo.dk/static/ in different sub-directories

### Production
To get the full path to a file, use `window.fcoo.dataFilePath(subDirName, fileName);` 

    var filePath = window.fcoo.dataFilePath("theSubDir", "fileName.json"); //return "https://app.fcoo.dk/static/theSubDir/fileName.json"
    //OR
    var filePath = window.fcoo.dataFilePath({subDir: "theSubDir", fileName:"fileName.json"}); //return "https://app.fcoo.dk/static/theSubDir/fileName.json"
    //OR
    var filePath = window.fcoo.dataFilePath("normal/path/to/filename.json"); //return "normal/path/to/filename.json"


### Development
To be able to test new versions while developing a packages using the structure described in [fcoo-web-dev](https://github.com/FCOO/fcoo-web-dev) and shown below a development version of the data file can be named `_fileName` (with a leading `"_"`) and placed under `src/data`

If setting `fcoo.LOCAL_DATA = true;` `window.fcoo.dataFilePath(subDirName, fileName);` will return the path to the local version relative to `/demo` (where the test page is located)

setting `fcoo.LOCAL_DATA = true;` must be done in `/demo/index.html` witch ensure that an other package or application using the package will get data from production
    
    //I demo/index.html
    windoe.fcoo.LOCAL_DATA = true;

    //In the packages source file
    var filePath = window.fcoo.dataFilePath("theSubDir", "fileName.json"); //return "/src/data/_fileName.json"

#### Structure 
    PACKAGE_NAME
    ├── src
    |   ├── data
    |   ├── fonts
    |   └── images
    ├── demo


## Options and Methods
    fcoo.LOCALDATA = true/false;

    fcoo.dataFilePath(subDirName, fileName);



## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-data-files/LICENSE).

Copyright (c) 2018 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk
