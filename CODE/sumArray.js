/**
 * O(n)
 * O(1)
 */
function sumArray(arr) {
 return  arr.reduce((acc,e,i,arr)=>{
     return acc = acc+e
  },0)

  
  }
  
  console.log(sumArray([1, 2, 3, 4])); // 10
  console.log(sumArray([-1, 5, 2]));   // 6
  console.log(sumArray([7]));          // 7
  console.log(sumArray([]));           // 0