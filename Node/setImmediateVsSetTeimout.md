/**

console.log("A");   1st

setTimeout(() => {
  console.log("B");
}, 0);

setImmediate(() => {
  console.log("C");
});

console.log("D"); 2nd

 */

 ## it can ADCB or ADBC   from top level code we dont know actualy when event loop will go 

 ## event loop has these phases
 1.TImer phase
 2 check phase
 3. close phase
 4.pending callback
 5.pooll


 /**
 
 
 const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));    
}); */

in this case after i/o callback check phase get called first before timer phase
