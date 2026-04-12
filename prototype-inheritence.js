//  export function A(){
//     this.name ='class A'
// }

// A.prototype.greet = function(){
//     console.log(`this call is in proto ${this.name}`)
// }



// export function B(){
//     A.call(this)
//     this.type ='class B'
// }

// B.prototype = Object.create(A.prototype) // inherit all methods of A

// // now B.contructor will point to A

// B.prototype.constructor = B

// B.prototype.hello = function(){
//      console.log(`this call is in proto of B ${this.name} ${this.type}`)
// }



// const Animal ={
//     eats:true
// }

// const dog= Object.create(Animal)
// console.log(Animal.isPrototypeOf(dog)) // kyuki dog animal se createe hua jo adat animal honga dog me wahi hoga

//Implement inheritance between Animal and Dog using constructor functions.

function Animal(){
    this.eats = true
}


function Dog (){
    this.barsk = true
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

let d = new Dog()
console.log(d instanceof Dog)
console.log(d instanceof Animal)


/// Implement a polyfill for new.

function myNew(Contructor,...args){
   const obj = Object.create(Contructor.prototype)

   const result = Contructor.apply(obj,args)

   const isObject = typeof(result)=== 'object' || typeof(result) === 'function'

   return isObject ?result :obj
}
let x = myNew(Dog)


//Implement a polyfill for instanceof.

function myInstanceOf(b,Contructor){

   const proto = Object.getPrototypeOf(b)

   if(proto === null){
    return false
   }
    if(proto === Contructor){
        return true
    }
   return   myInstanceOf(proto,Contructor)

}

//Write a function to print the full prototype chain of an object.


function protoTypeChain(b){

    const proto = Object.getPrototypeOf(b)
 
    if(proto === null){
     console.log( null)
    }
    else{
        console.log(proto)
        protoTypeChain(proto)
    }
 
 
 }

 //Create an object with no prototype. Why would you do that?
 let obj = Object.create(null)


 //Implement Object.create() manually.
 Object.myCreate= function(proto){
    const obj ={}
    Object.setPrototypeOf(obj,proto)
    return obj

 }


 //IMplement my map

 Array.prototype.myMap = function(fn,thisArgs){
    let result =[];
    for(let i =0;i <this.length;i++){
     result[i] =  fn.call(thisArgs,this[i],i,this)
    }
return result
 }

 console.log([1,2,3,4,5].myMap((e)=>e*2))


 //IMplement my filter
 Array.prototype.myFilter = function(fn,thisArgs){
    let result =[];
    for(let i =0;i <this.length;i++){
        if(i in this){
            if(fn.call(thisArgs,this[i],i,this)){
                result.push(this[i])
                    }
        }
       
    }

    return result
 }

 console.log([1,2,3,4,5].myFilter((e)=>e>2))


 // implemnet my reduce

 Array.prototype.myReduce = function(fn,startingPoint){
    let accumualotr;
    let startIndex =0;

    if(startingPoint === undefined){
     accumualotr = this[0]
     startIndex = 1;
    }else{
        accumualotr = startingPoint
    }

    for(let i =startIndex; i< this.length;i++){
        accumualotr =   fn(accumualotr,this[i],i,this)
    }
   
return accumualotr
 }


 console.log([{
    name:"Abhishek",
    age:40
 },{
    name:"Athena",
    age:3
 },{
    name:"Bolt",
    age:5
 }].myReduce((acc,e,i)=>{
        if(e.age <10){
            acc[e.name] = e.age
        }
        return acc

 },{}))


 // implement some

 Array.prototype.mySome= function(fn){

    const arry = Object(this) // ? this can be string also  “Whatever this is, make sure I can treat it like an object.”
    if(arry.length  === 0){
        return false
    }

    for(let i =0;i<arry.length;i++){
       if( fn(this[i],i,this)){
        return true
       }
    }

    return false
 }


 console.log([1,2,3,4,5].mySome((e)=>e>2))

