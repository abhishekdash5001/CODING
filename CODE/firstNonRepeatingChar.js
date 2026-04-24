/**
 * Time: O(n)
 * Extra space: O(k)
 */

function firstNonRepeatingChar(str) {
    let obj={}
    for(let i=0;i<str.length;i++){
        let c = str.charAt(i)
       if(obj.hasOwnProperty(str.charAt(i))){
        obj[c] =  obj[c]+1
       }else{
        obj[c] =1
       }

    }

    for(let i=0;i<str.length;i++){
        let c = str.charAt(i)
        if(obj[c] === 1){
            return c

    }
}
   


  }
console.log(firstNonRepeatingChar("aabccdeff")); // "b"
console.log(firstNonRepeatingChar("aabbcc"));    // undefined
console.log(firstNonRepeatingChar("swiss"));     // "w"