function greet(city, country) {
  console.log(this.name, city, country);
}

// const greet=(city,country)=>{
//     console.log(this.name, city, country);  // undefined city country
// }

//   const user = { name: "Athena" };

//   greet.call(user, "Bangalore", "India");
//   greet.apply(user, ["Bangalore", "India"]);
//   greet.bind(user, "Bangalore", "India")();

//   const user1 = {
//     name: "A",
//     say() {
//       console.log(this.name);
//     }
//   };

//   const a  = user1.say;
// console.log(a())// undefined

//   const user = {
//     name: "Athena",
//     say() {
//       console.log(this.name);
//     }
//   };

//   setTimeout(user.say, 1000); // undefined
//   setTimeout(user.say.bind(user), 1000); // Athena

//   const user = {
//     name: "Athena",
//     normal() {
//       console.log(this.name);
//     },
//     arrow: () => {
//       console.log(this.name);
//     }
//   };

//   user.normal(); // Athena
//   user.arrow(); // not Athena usually

//bind does not change this of an arrow function.

//partail applicaion
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(10));

const obj = { 0: "a", 1: "b", length: 2 };

const arr = Array.prototype.slice.call(obj);
console.log(arr); // ['a', 'b']

function fn() {
  console.log(this.x);
}

const obj1 = { x: 1 };
const obj2 = { x: 2 };

const a = fn.bind(obj1);
const b = a.bind(obj2); /// once bind rebinding doesnot change it

b(); // ? 1

// Implement call
Function.prototype.myCall = function (context, ...args) {
  context = context ?? globalThis;

  context = Object(context);

  const fnKey = Symbol("fn");

  context[fnKey] = this;
  const result = context[fnKey](...args);

  delete context[fnKey];

  return result;
};

// Implement apply
Function.prototype.myApply = function (context, args) {
  context = context ?? globalThis;

  context = Object(context);

  const fnkey = Symbol("fn");

  context[fnkey] = this;

  const result = context[fnkey](...args);

  delete context[fnkey];

  return result;
};

// implement bind



// implememnt by call

Function.prototype.myCall = function(context,...args){
    context = context??globalThis
    context = Object(context)
    const fnKey= Symbol('fn')
    context[fnKey] = this
    const result = context[fnKey](...args)
    delete context[fnKey]
    return result

}

// myappy

Function.prototype.myApply = function(context,args=[]){
    context = context??globalThis
    context = Object(context)
    const fnKey= Symbol('fn')
    context[fnKey] = this
    const result = context[fnKey](...args)
    delete context[fnKey]
    return result

}

/// my bind 

Function.prototype.myBind = function(context,...args){
  const Orginalfn = this
    context = context??globalThis
    context = Object(context)
  


    return function(...args2){
     return Orginalfn.apply(context,[...args,...args2])
    }
}
