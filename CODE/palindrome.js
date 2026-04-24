function isPalindrome(str) {

 return str.split('').reverse().join('') === str
}

console.log(isPalindrome("racecar")); // true
isPalindrome("racecar"); // true
isPalindrome("hello"); // false
