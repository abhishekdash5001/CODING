/**
 * Extra space: O(n)
 * Time: O(n)
 */
Array.prototype.myMap = function (cb) {


 let newArray=[];

 for(let i =0;i<this.length;i++){
    newArray.push(cb(this[i],i,this))
 }
 return newArray
  };
  
  console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]
  console.log([1, 2, 3].myMap((x, i) => x + i)); // [1, 3, 5]
  console.log([].myMap(x => x * 2)); // []