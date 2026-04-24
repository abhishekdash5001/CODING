/**
 * Time: O(n)
 * Extra space: O(1)
 *
 */

Array.prototype.myReduce = function (cb, initialValue) {

    const hasInitialValue = initialValue !== undefined;

    if (this.length === 0 && !hasInitialValue) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  
    if (this.length === 0 && hasInitialValue) {
      return initialValue;
    }
  
    let acc = hasInitialValue ? initialValue : this[0];
    let startIndex = hasInitialValue ? 0 : 1;

    for(let i =startIndex;i<this.length;i++){
     acc =    cb(acc,this[i],i,this)
    }
    return acc
  };
  
  console.log([1, 2, 3, 4].myReduce((acc, cur) => acc + cur, 0)); // 10
  console.log([1, 2, 3].myReduce((acc, cur) => acc * cur, 1));    // 6
  console.log([5].myReduce((acc, cur) => acc + cur, 10));         // 15