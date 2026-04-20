interface Person {
  name: string;
}

interface Employee extends Person {
  id: number;
}
const e: Employee = {
  id: 23,
  name: "Abhsihek",
  age:23
};



interface MyFun{
    (a:number,b:number) :number
}


const a:MyFun=(a,b)=>{
return a+b
}


interface Person{
    age:number
}


const p :Person={
  age:23,
  name:"ddsd"
}