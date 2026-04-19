# Some time in our application we want 1 shared inrance of something 

```js

class Logger{
  constructor(){
    if(Logger.instance){
      return Logger.instance
    }
     this.logs =[]
  Logger.instance = this
  }
  
  
  logForMe(event){
    
    this.logs.push(event)
    
  }
 
}

const a  = new Logger()

const b = new Logger()

console.log(a === b)


```

# Cons 
if we have saome asycn calls we need ot make sure they called sequentilaly bcz same time things wil brake
as it can accessed changef form any wherer hard to debug
