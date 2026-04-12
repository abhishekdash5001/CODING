const a =[1,2]

// Symbol.iterator is a built in symbol object and this can be used by iterator

const c = a[Symbol.iterator]() //Array get the Symbol.iterator function

// calls the iterator function


console.log(c.next())//{value:1,done:false}
console.log(c.next())//{value:2,done:false}
console.log(c.next())//{value:undefined,done:true}