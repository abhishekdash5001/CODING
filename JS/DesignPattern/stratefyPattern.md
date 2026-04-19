# When you have 1 task but you have mutiple ways to do 

```js

const discountStrategies = {
  regular(amount) {
    return amount * 0.05;
  },

  premium(amount) {
    return amount * 0.1;
  },

  festival(amount) {
    return amount * 0.2;
  },
};

function calculateDiscount(type, amount) {
  const strategy = discountStrategies[type];

  if (!strategy) {
    return 0;
  }

  return strategy(amount);
}

console.log(calculateDiscount("premium", 1000)); // 100
console.log(calculateDiscount("festival", 1000)); // 200



```

## sort by price sort Rating sort by newest

# when same task can be doen wtih mutiple ways
