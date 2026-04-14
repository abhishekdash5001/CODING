# Interface vs Types

  # Interface of function

  /**
  interface A{
    (a:string,b:string):string
   }

        const abc:A=(a,b)=>{
        return a+b
        }
  
   */

   ## Extending interface

     /**
     interface Person{
    name:string
      }

        interface Employee extends Person {
            id:string
        }


        const a :Employee={
            id:'1',
            name:'1'
        }
     
      */
 
 ## 1. interface can be reopened types will not

    interface User {
        name: string;
        }

        interface User {
        age: number;
        }

        const u: User = {
        name: "Abhi",
        age: 30,
        };

   ## type can define primitives interdface cant

     type ID = string | number;
     type Name = string;


   ## types extend by && interface by extends


   ### 1. Union
     type ID = string | number;
   ###  2. Tuple
         type UserTuple = [number, string];


   ### 1. Partial<T>

     <!-- interface User {
        name: string;
        age: number;
        }

        type UpdateUser = Partial<User>; -->

  ### 2. Required<T>

    type FullUser = Required<User>;

  ### 3  ReadOnly

    type ReadonlyUser = Readonly<User>;

        const user: ReadonlyUser = {
        name: "Abhi",
        age: 30,
        };

        user.name = "Dash"; // error

### 4 Pick 
   picks only that proprty  (oppsoite of omit)

     type pickName = Readonly<User,'name'>;

### Exclsue is to remove a type from union
type Status = "loading" | "success" | "error";

type FinalStatus = Exclude<Status, "loading">;

   
