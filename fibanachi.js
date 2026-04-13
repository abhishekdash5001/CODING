

const  array=[]


function fibWrapper(n){
    if(array[n] === undefined){
         let a = feb(n)
         array[n]= a
         return  a
    }
    return array[n]
}

function feb(n){

        if(n <=1 ){
           
            return n
        }
        
        return feb(n-1)+feb(n-2) //f(1)+f(0)
    
  

 
}








console.log(fibWrapper(10))


function Wrappper(n){
    const  array=[]

    function feb(n){

        if(n <=1 ){
           
            return n
        }
        
        return feb(n-1)+feb(n-2) //f(1)+f(0)
    
  

 
}


    feb(n)
}