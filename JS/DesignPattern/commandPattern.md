
## save and close  calcaltor
```js
class Addition{
  constructor(a,b){
    this.a = a;
    this.b = b;
    
  }
  
  execute(){
    return this.a +this.b
  }
}


class Multplication{
  constructor(a,b){
    this.a = a;
    this.b = b;
    
  }
  
  execute(){
    return this.a *this.b
  }
}

class MultiplyAndthenAdd{
  constructor(a,b){
    this.a = a
    this.b = b
  }
  execute(c){
     const m =  new Multplication(c,this.a)
   console.log(m.execute())
     const f =  new Addition(m.execute(),this.b)
     return f.execute()
  }
  
}

class Calculator{
  constructor(command){
    this.command= command
    
  }
    press(c){
      return this.command.execute(c)
    }
  
  

}


let a = new Addition(2,3)
let b = new Multplication(2,3)

let z = new MultiplyAndthenAdd(5,10)
let c = new Calculator(z)
console.log(c.press(100))



```