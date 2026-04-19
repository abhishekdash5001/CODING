# Child should be able to repace parent class without breaking the behavior

```js

class Bird{
  constructor(){
    this.wings = 2
  }
}

class FlyingBird extends Bird{
  constructor(){
    super()
    this.fly = true
  }
}

class NoNFlyingBird extends Bird{
  constructor(){
    super()
    this.fly = false
  }
}

let g = new FlyingBird()
console.log(g)



```