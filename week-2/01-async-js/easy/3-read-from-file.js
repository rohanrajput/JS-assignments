const fs = require('fs');

fs.readFile('fs.txt', function(err, data) {
    if(err) {
        return console.log(err);
    }
    console.log(data.toString());

    // console.log(data);
});

for(let i=0; i<10000000000; i++) {
    //expensive operation
}