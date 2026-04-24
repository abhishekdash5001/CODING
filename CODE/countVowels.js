
/**
 * Time: O(n)
 * Extra space: O(1)
 * 
 * 
 * 
 */


function countVowels(str){
    const voowels  =new Set(['a','i','e','o','u'])
     let count =0;

    for(let i =0;i<str.length;i++){
      const e = str.charAt(i)
      if(voowels.has(e)){
        count++
      }
    }

    return count
}

countVowels("hello") // 2
countVowels("JavaScript") // 3
countVowels("rhythm") // 0