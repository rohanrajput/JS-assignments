/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let largest = -Number.MAX_VALUE;

    for(const number of numbers) {
        largest = Math.max(largest, number);
    }

    return largest === -Number.MAX_VALUE ? undefined: largest;
}

module.exports = findLargestElement;