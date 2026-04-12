// object.assign is used to copy props from source to target object
// it changes the target object
// it us used to merge object or copy but it does shallow copu

let a = { name: 'bolt' }
let b = { age: 1000 }

let c = Object.assign(a, b)

console.log(a) // { name: 'bolt', age: 1000 }
console.log(c) // { name: 'bolt', age: 1000 }

// techinally c and a are same object
c.name = 'bolt2'
console.log(a) // { name: 'bolt2', age: 1000 }
console.log(c) // { name: 'bolt2', age: 1000 }


let peson={
    name:'bolt',
    address:{
        city:'delhi'
    }
}

let copyPerson = Object.assign({}, peson)

console.log(copyPerson) // { name: 'bolt', address: { city: 'delhi' } }
peson.name ='athena'
peson.address.city = 'mumbai'
console.log(copyPerson) //

const obj1 = 
{  
  	a: 10,  
  	b: 15,  
  	c: 18  
}; 

const obj2 = Object.assign({c: 7, d: 1}, obj1);  

console.log(obj2.c, obj2.d);
