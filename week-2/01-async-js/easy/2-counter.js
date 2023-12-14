let counter = 0;

function counterWithoutSetInterval() {
    setTimeout(() => {
        console.log(counter);
        counter++;
        counterWithoutSetInterval();
    }, 1000);
}

counterWithoutSetInterval();