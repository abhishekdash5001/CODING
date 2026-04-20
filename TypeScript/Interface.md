# Interface 
1.Interface can extends

```ts

interface Person{
    name:string
}


interface Employee extends Person{
    id:number
}

```



2.Interface of Funstion 

```ts

interface MyFun{
    (a:number,b:number) :number
}


const a:MyFun=(a,b)=>{
retun a+b
}



```



3.Interface can be reopned

```ts

interface Person{
    name:string
}


interface Person{
    age:number
}


cost p :Person{
    name:"Abhishei"
    age:23
}


```


4.Interface cat define premitive types

```ts

interface Check =string|number  //X


```