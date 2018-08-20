var fs = require('fs');
var path = require('path');

var getFiles = function (dir, files_){

  files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return moving(files_);
};

function moving(files) {
    for (var file of files) {
        console.log(file,' move ',file.replace(/\//g, "---"));
        fs.rename(file, file.replace(/\//g, "---"), (err) => {
            if ( err ) console.log('ERROR: ' + err);
        });
    }
}

getFiles('test');
