import {outside} from './lexical-scoping.js'
 import {concatinate} from './string.js'
  import * as For from './for.js'
// import {newB} from './class-inheritence.js'
import * as linkedList from './linked-list-single.js'

import * as prototypeOldWay from './prototype-inheritence.js'
// import * as objectSymbols from './object-symbols.js'
// import * as iterator from './iterator.js'

 outside()
console.log(concatinate('a','b','c'))

// newB.greet


const a = new prototypeOldWay.A()
a.greet()


const b = new prototypeOldWay.B()
b.hello()

b.greet()

console.log(['a','b'].reverse().join())

 const linkedList = new LinkedList(1)
 console.log(linkedList)

