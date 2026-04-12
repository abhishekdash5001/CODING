class A{
    constructor(){
        this.name ='Abhishek'
    }

    greet(){
        console.log('hi '+this.name)
    }
}

class B extends A{
    constructor(){
         super()
        this.age = '23'
       
    }

    greet(){
        console.log('hi' + this.name + 'you are '+this.age +'year old')
    }
}


export const  newB = new B()


//extends inherit protype methods and prop but super calls constructor
