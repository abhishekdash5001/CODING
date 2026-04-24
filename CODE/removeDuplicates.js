/**
 * O(n)
 * S(n)
 */

function removeDuplicates(arr) {
  if (arr.length === 0) {
    return;
  }

  if (arr.length === 1) {
    return arr;
  }

  const map  = new Map();
  let newArray = [];

  for (let i = 0; i < arr.length; i++) {
    const e = arr[i];
    if (!map.has(e)) {
      newArray.push(e);
     map.set(e,1)
    }
  }
return newArray
}

removeDuplicates([1, 2, 2, 3, 4, 4]); // [1, 2, 3, 4]
removeDuplicates(["a", "b", "a"]); // ["a", "b"]
removeDuplicates([1, "1", 1])
