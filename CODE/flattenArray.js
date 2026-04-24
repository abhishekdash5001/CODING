/**
 *
 * O(n)
 * O(n)
 */

function flattenArray(arr) {
  if (arr.length === 0) {
    return [];
  }

  let newArray = [];
  recursive(newArray,arr)

  function recursive(newArray,arrSubset){
    for (let v of arrSubset) {
        if (Array.isArray(v)) {
            recursive(newArray,v)
        } else {
          newArray.push(v);
        }
      }
  }

  return newArray;
}

console.log(flattenArray([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]
console.log(flattenArray([1, [2], 3])); // [1, 2, 3]
console.log(flattenArray([])); // []
