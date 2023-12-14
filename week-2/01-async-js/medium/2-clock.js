let sec = 0;
let min = 0;
let hr = 0;

console.log("00:00:00");

setInterval(function() {
    sec++;
    if(sec===60) {
        sec=0;
        min++;
        if(min===60) {
            min=0;
            hr++;
        }
    }
    console.log(hr.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
}, 1000);