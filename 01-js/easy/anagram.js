/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if(str1.length!==str2.length) {
    return false;
  }

  const hashMap = new Map();

  for(const str of str1) {
    if(hashMap.get(str.toLowerCase())) {
      hashMap.set(str.toLowerCase(), hashMap.get(str.toLowerCase())+1);
    }
    else {
      hashMap.set(str.toLowerCase(), 1);
    }
  }

  for(const str of str2) {
    if(!hashMap.has(str.toLowerCase())) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
