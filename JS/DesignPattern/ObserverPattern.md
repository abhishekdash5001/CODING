## this pattern what happends if one part code changes it lets know others 

# used - new message arrive change thqt 


```js

class Observer{
  constructor(){
    this.list = []
    this.value = null
  }
  
  subsribe(fn){
    this.list.push(fn)
    
  }

   unsubscribe(fn) {
    this.list = this.list.list((observer) => observer !== fn);
  }
  
  set(value){
    this.value= value
    this.notify()
  }
  
  notify(){
    this.list.forEach((e)=>e())
  }
}

const a = new Observer()

function callme(){
  console.log("call me abhishek")
}

function callMe2(){
  console.log("call me athena")
}
a.subsribe(callme)
a.subsribe(callMe2)


a.set(20)


```

# cons memory leask if unscubscie is fogot