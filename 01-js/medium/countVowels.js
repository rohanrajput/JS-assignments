/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let ans=0;

    for(const s of str) {
      if(s==='a' || s==='e' || s==='i' || s==='o' || s==='u' || s==='A' || s==='E' || s==='I' || s==='O' || s==='U') {
        ans++;
      }
    }

    return ans;
}

module.exports = countVowels;