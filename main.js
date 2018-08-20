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
    return files_;
};

// move it works! =)

fs.rename('test.txt', '../test2.txt', function(err) {
    if ( err ) console.log('ERROR: ' + err);
});
console.log(getFiles('test'));
