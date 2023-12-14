const fs = require('fs');

fs.readFile('fs.txt', function(err, data) {
    let str = data.toString().split(' ');
    let ans = "";
    for(let s of str) {
        if(s.length>0) {
            ans += s + " ";
        }
    }

    fs.writeFile('fs.txt', ans.trim(), function() {
        console.log("Done!");
    });
})