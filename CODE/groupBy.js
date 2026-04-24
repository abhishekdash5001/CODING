/**
 *
 *
 * Time: O(n)
 * Extra space: O(n)
 */

function groupBy(arr, key) {
return  arr.reduce((acc,ele,index,arr)=>{
    let val = ele[key]
    if(!acc.hasOwnProperty(val)){
        acc[val]=[]
    }
    acc[val].push(ele)


    return acc
  },{})


}

const users = [
  { name: "A", role: "admin" },
  { name: "B", role: "user" },
  { name: "C", role: "admin" },
];

console.log(groupBy(users, "role"));
/*
  {
    admin: [
      { name: "A", role: "admin" },
      { name: "C", role: "admin" }
    ],
    user: [
      { name: "B", role: "user" }
    ]
  }
  */
