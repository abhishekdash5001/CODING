# open for extension but close for modifaction what it means already wrttien code should be changes we can add new code

```js

class DiscountedPrice{
  constructor(price){
    this.price = price
    
  }
  
  getDiwaliPrice(){
    return this.price *30/100
  }
  
  getHoliprice(){
    return this.price *10/100
  }
}

const a = new  DiscountedPrice(9000)
console.log(a.getDiwaliPrice()) 




```