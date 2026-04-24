/**
 * Time: O(n + m)
 * Extra space: O(n + m)
 * 
 */

function mergeArrays(arr1, arr2) {
    return  arr1.concat(arr2)
  
  }
  
  console.log(mergeArrays([1, 2], [3, 4]));       // [1, 2, 3, 4]
  console.log(mergeArrays(["a"], ["b", "c"]));    // ["a", "b", "c"]
  console.log(mergeArrays([], [1, 2]));           // [1, 2]
  console.log(mergeArrays([], []));               // []