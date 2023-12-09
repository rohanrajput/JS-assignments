/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let str2 = "";
  for(const s of str) {
    if(s.toLowerCase() >= 'a' && s.toLowerCase() <= 'z') {
      str2 += s.toLowerCase();
    }
  }

  let i = 0;
  let j = str2.length-1;
  while(i<j) {
    if(str2[i]!==str2[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
}

module.exports = isPalindrome;
