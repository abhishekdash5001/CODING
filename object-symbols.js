//Symbols are special propeties in object 
// they are not  included in for in loop or object.keys


const obj1={}

const a = Symbol('a')



obj1[a]= 'abhishek'

const b = Symbol('b')

const c = Symbol('b')

console.log(b===c)//false
// Symbol('b') always creates a new unique Symbol

// but

const e = Symbol.for('c')
const d = Symbol.for('c')
    // Symbol.for('b') reuses the same Symbol if it already exists in the global Symbol registry

    console.log(d===e)//true

console.log(Object.keys(obj1)) //[]

console.log(Object.getOwnPropertySymbols(obj1)) //[ Symbol(a) ]
