## instead of creating objects manulay we create it by using  special function function 

```js

class AdminUser{
  constructor(name){
    this.name = name
    this.role ="Admin"
    this.permissions=['read','write','delete']
  }
}

class normalUser{
  constructor(name){
    this.name = name
    this.role ="User"
    this.permissions=['read']
  }
}


function createUser(name,type){
  switch (type) {
    case 'Admin':
      
     return new AdminUser(name,type)
     
       case 'User':
      
     return new normalUser(name,type)
    
    default:
     return new normalUser(name,type)
  }
}

const a = createUser('Athena',"Admin")
console.log(a)


```
# pros Object creating required  a inout lot repeated work

# Con can be a lot of swiich case of if else
