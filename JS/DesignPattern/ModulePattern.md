## This pattern is followed when we want some vairables to be private and expose what we want to 

```js
function BankAccount(initialBalance){

     let balance  = initialBalance


    function deposit(amount){
        if(amount >0){
            balance = balance +amount
            console.log(balance)
            console.log('amount deposited total balance'+balance)
        }

    }


    function withdraw(amount){
        if(amount>0 && amount< balance){
              balance = balance -amount
            console.log('amount withraw total balance'+balance)
        }

    }

    function getBalance(){
        return balance
    }

    return{
        deposit,
        withdraw,
        getBalance
    }

}

const account = BankAccount(1000);

account.deposit(500);     
account.withdraw(200);    
console.log(account.getBalance());



```

# CONS 1 - Diffucult to change form outside
# cons 2 -Each time you create a module, new copies of inner functions may be created.
# cons 3 Overkill for samll code

# use it api fetching compoable to fethc data and exponse only neccsery things