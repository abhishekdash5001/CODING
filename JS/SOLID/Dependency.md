# Dependency Inversion Principle

# a bugger module shouhld not be depended on Lowe module intead we should pass the lower module


```js


class Main{
  constructor(){
    this.e = e
  
  }
  
  send(){
    this.e.send()
  }
}


class E{
  constructor(){
    
  }
  
  send(){
    console.log('send')
  }
}

let e = new E()
let m = new Main(e)


```