var fs = require('fs');
var path = require('path');
var combineDir = 'combine';
var dirForCombine = 'test';

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
    if (dir === dirForCombine) { return moving(files_) } else { return; }
};

function moving(files) {
    console.log(files);
    for (var file of files) {
        console.log(file,' move ',combineDir + '/'+ file.replace(/\//g, "---"));
        fs.rename(file, combineDir + '/'+ file.replace(/\//g, "---"), (err) => {
            if ( err ) console.log('ERROR: ' + err);
        });
    }
}

if (!fs.existsSync(combineDir)) {
    fs.mkdirSync(combineDir);
}
getFiles(dirForCombine);

