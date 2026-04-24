/**
 * Time: O(1)
 * Extra space: O(1)
 *
 */


function checkEvenOdd(num) {
  if(num%2===0){
    return 'even'
  }
  return 'odd'
}

console.log(checkEvenOdd(4)); // "even"
console.log(checkEvenOdd(7)); // "odd"
console.log(checkEvenOdd(0)); // "even"