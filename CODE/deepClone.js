function deepClone(obj) {
 if(typeof obj !== 'object' || obj === null){
    return obj
 }

 if(Array.isArray(obj)){
   let newArray=[]

   for(let i =0;i< obj.length;i++){
       newArray[i]= deepClone(obj[i])
   }
   return newArray
 }

 let closeObj={};
for(let prop in obj){
    closeObj[prop]= deepClone(obj[prop])
}

return closeObj
}

const input = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, { e: 3 }],
};

const copy = deepClone(input);

console.log(copy)

// copy.b.c = 100;

// console.log(input.b.c); // 2
// console.log(copy.b.c);  // 100
