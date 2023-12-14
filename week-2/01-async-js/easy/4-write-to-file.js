const fs = require('fs');

fs.writeFile('fs.txt', 'hello async world! hello again.', function() {
    console.log('Write file success!');
    fs.readFile('fs.txt', function(err, data) {
        console.log(data.toString());
    });
});