/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

async function sleep(milliseconds) {
    // Create a new Promise and resolve it after the specified amount of time
    return await new Promise(async(resolve, reject) => {
        const startTime = Date.now();

        while(Date.now() - startTime < milliseconds) {

        }
        resolve();
    });
}

module.exports = sleep;
