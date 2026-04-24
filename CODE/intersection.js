/**
 * 
 * 
 *O(n + m)
 O(n)
 */

function intersection(arr1, arr2) {
    if(arr1.length ===0  || arr2.length ===0 ){
  return []
    }
    let set = new Set(arr1)

   return   arr2.filter((e)=> set.has(e))
    
  }
  
  console.log(intersection([1, 2, 3], [2, 3, 4]));     // [2, 3]
  console.log(intersection([1, 2], [3, 4]));           // []
  console.log(intersection(["a", "b"], ["b", "c"]));   // ["b"]
  console.log(intersection([], [1, 2]));               // []