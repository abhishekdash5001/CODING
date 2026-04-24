/**
 * Time: O(n)
   Extra space: O(k) where k = number of unique characters
 * 
 */
function charCount(str) {
  if (str.length === 0) {
    return {}
  }

  let obj={}

  for (let i = 0; i < str.length; i++) {
    const e = str.charAt(i);
      if(obj.hasOwnProperty(e)){
        const count =obj[e]+1;
        obj[e]=count
        continue
      }
      obj[e]=1
    
  }
return obj
}

charCount("aabcc"); // { a: 2, b: 1, c: 2 }
charCount("hello"); // { h: 1, e: 1, l: 2, o: 1 }
