/**
 * Time: O(n)
 * Extra space: O(n)
 * 
 */

function isEven(number){
    if(number%2=== 0){
        return true
    }
    return false

}

function getEvenNumbers(arr) {

  return arr.filter((e)=>isEven(e))
  }
  
  console.log(getEvenNumbers([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
  console.log(getEvenNumbers([1, 3, 5]));          // []
  console.log(getEvenNumbers([2, 8, 10]));         // [2, 8, 10]
  console.log(getEvenNumbers([]));                 // []