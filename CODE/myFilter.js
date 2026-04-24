Array.prototype.myFilter = function (cb) {
    let newArray=[]

    for(let i=0;i<this.length;i++){
        if(cb(this[i],i,this)){
            newArray.push(this[i])
        }
    }

    return newArray
  };
  
  console.log([1, 2, 3, 4].myFilter(x => x % 2 === 0)); // [2, 4]
  console.log([1, 2, 3].myFilter((x, i) => i !== 1));   // [1, 3]
  console.log([].myFilter(x => x > 0));                 // []