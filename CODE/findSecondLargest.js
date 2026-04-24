/**
 * 
 * Time: O(n)
  * Extra space: O(1)
 */

function findSecondLargest(arr) {

   if(arr.length === 0){
    return 
   }else if(arr.length ===1){
    return 
   }
   let first = arr[0]
   let second =undefined

   for(let i =1;i<arr.length;i++){
    if(arr[i]>first){
        second = first;
        first = arr[i]
    }
    else if(first > arr[i]){
        if(second === undefined){
            second = arr[i]
        }else if(second < arr[i]){
            second = arr[i]
        }
    }
  
   
   }

  return second 
  }
  
  console.log(findSecondLargest([3, 7, 2, 9, 4])); // 7
  console.log(findSecondLargest([10, 10, 8, 7]));  // 8
  console.log(findSecondLargest([-1, -5, -2]));    // -2
  console.log(findSecondLargest([5]));             // handle safely
  console.log(findSecondLargest([4, 4, 4]));       // handle safely
