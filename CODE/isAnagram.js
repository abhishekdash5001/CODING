/**
 *
 * O(n)
 * O(k)
 */

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  let obj1 =new Map()
  let obj2 =new Map()
  for(let i =0;i<str1.length;i++){
    let e = str1.charAt(i)
    if(obj1.has(e)){
        let count = obj1.get(e)+1
        obj1.set(e,count)
    }else{
        obj1.set(e,1)
    }
  }



  for(let i =0;i<str2.length;i++){
    let e = str2.charAt(i)
    if(obj1.has(e)){
        let count = obj1.get(e)-1
        obj1.set(e,count)
    }else{
       return false
    }
  }


  for(let prop of obj1.values()){
    if(prop !==0){
        return false
    }
  
  }
  return true

 
}
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("race", "care")); // true
console.log(isAnagram("hello", "world")); // false
console.log(isAnagram("aab", "aba")); // true
console.log(isAnagram("aab", "abb")); // false
