//A Promise in JavaScript is an object that represents the result of an async operation.

// iam doing some async opeaton i will give result later it can pass or fail


// p.then((result) => {
//     console.log(result);
//   }).catch((error) => {
//     console.log(error);
//   });


async function a(){
    try{
   let a = await somecall()
   console.log(a)
    }catch(err){
        console.log(err)
    }
}


function getUser(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res({name:'athena'})
        },3000)
       
    })
}

function getOrder(username){

    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res({orderId:2})
        },1000)
    })
}


function getPayement(id){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(2000)
        },2000)
    })
}


function getRejected(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            rej('failed')
        })
    })
}

getUser().then((value)=>value).then((value)=>getOrder(value.name)).then((id)=>getPayement(id)).then((e)=>{
    console.log(e)
})


//if any step throws an error or returns a rejected Promise, the chain skips the remaining .then() handlers and jumps to the nearest .catch().

//When a Promise gets resolved or rejected, its .then(), .catch(), or .finally() callback does not run immediately in the same synchronous line.

//Instead, JavaScript puts that callback into the microtask queue,

// 1. Promise.all() -->Waits for all Promises to succeed.
// If any one fails, it rejects immediately.

Promise.all([getUser(),getOrder('nme'),getPayement(2),getRejected()]).then((e)=>{
    console.log(e)
}).catch((err)=>{
    console.log(err)
})

//2 Promise.allsetteld -wait for to finsh and show it array whc reject or passed


Promise.allSettled([getUser(),getOrder('nme'),getPayement(2),getRejected()]).then((e)=>{
    console.log(e)
}).catch((err)=>{
    console.log(err)
})


////2 Promise.race -return which everpromise is settled first
Promise.race([getUser(),getOrder('nme'),getPayement(2),getRejected()]).then((e)=>{
    console.log('race success',e)
}).catch((err)=>{
    console.log('race error',err)
})


////2 Promise.any -return reten fullysettedl reslult even one is passing it go then but if all fails ti will go to catch


Promise.any([getUser(),getOrder('nme'),getPayement(2),getRejected()]).then((e)=>{
    console.log('race success',e) 
}).catch((err)=>{
    console.log('race error',err)
})


async function runSequential(){ // secod is depended on 1
    let a = await getUser()
    console.log('first',a)

    let b = await getOrder(a.name)

    console.log('second',b)
}

runSequential()

//parall when all promises are independet

//promise flateting measn promuse doenost acctyyl promise.resolve it returns Primse(val)


// console.log("A");

// Promise.resolve().then(() => console.log("B"));

// console.log("C");

/// A C B

// console.log("A");

// setTimeout(() => console.log("B"), 0);

// Promise.resolve().then(() => console.log("C"));

// console.log("D");
//A D C B


// Promise.resolve(1)
//   .then((x) => x + 1)
//   .then((x) => {
//     console.log(x);
//   })
//   .then((x) => {
//     console.log(x);
//   });
  // 2 undefined


//   Promise.resolve()
//   .then(() => {
//     throw new Error("Oops");
//   })
//   .catch((err) => {
//     console.log("Caught");
//   })
//   .then(() => {
//     console.log("After catch");
//   });
  //caunft  // after catch


//   Promise.reject("Fail")
//   .then(() => console.log("then"))
//   .catch((err) => {
//     console.log(err);
//     return "Recovered";
//   })
//   .then((data) => console.log(data));
  // fail recoverd 


  async function foo() {
    console.log("1");
    await Promise.resolve();
    console.log("2");
  }
  
  console.log("3");
  foo();
  console.log("4");
  // 3 1 4 2


//   async function foo() {
//     return 10;
//   }
  
//   console.log(foo());//Promise

//   async function foo() {
//     return Promise.resolve(5);
//   }
  
//   foo().then(console.log);
  //5


//Implement Promise.all

Promise.myAll = function(args){
  let data =[];
    return new Promise(async(res,rej)=>{
        for(let i =0;i <args.length;i++){
            let p =Promise.resolve( args[i])

            try{
                let c =   await p
                data[i] = c
                if(data.length === args.length){
                  res(data)
                 }
            }catch(err){
  rej(err)
            }
        }
       
    })
}

Promise.myAll([getUser(),getOrder('nme'),getPayement(2)]).then((e)=>{
    console.log('my all',e)
}).catch((err)=>{
    console.log('my all failed',err)
})


//Implement Promise.allSettled

Promise.myAllSeteled = function(args){
    const data =[]
    let completed = 0;
    return new Promise((res,rej)=>{
        const l = args.length;
        if(l ===0){
            res([])
            return
        }

        for(let i = 0;i<l;i++){
            Promise.resolve(args[i]).then((e)=>{
                     data[i]={
                        status: 'fulfilled', value: e
                     }
                     completed++
                     check(res)
            }).catch((er)=>{
                data[i]={
                    status: 'rejected', reason: er
                 }
                 completed++
                 check(res)
            })
            
        }

    })

    function check(res){
        if( completed=== args.length){
            res(data)
        }
    }
}


Promise.myAllSeteled([getUser(),getOrder('nme'),getPayement(2),getRejected()]).then((e)=>{
    console.log('my allSetted',e)
}).catch((err)=>{
    console.log('my allSetted failed',err)
})


//Implement Promise.race

Promise.myRace = function(args){
    
    return new Promise((res,rej)=>{
        if(args.length ===0){
            res([])
            return
        }


        for(let i =0;i<args.length;i++){
            Promise.resolve(args[i]).then((e)=>res(e)).catch((er)=>rej(er))
        }
    })
    
}

///implaement any

Promise.myany = function(args){
    let failed = 0;
    return new Promise((res,rej)=>{
        if(args.length ===0){
            res([])
            return
        }


        for(let i =0;i<args.length;i++){
            Promise.resolve(args[i]).then((e)=>res(e)).catch((er)=>{
                failed++
                check(rej)
            })
        }


        function check(rej){
  if(failed === args.length){
    rej('faile')
  }
        }

    })
    
}


///Implement promise retry logic

function promiseRety(fn,count){

    return new Promise((res,rej)=>{
        function retry(time){
            fn.then((e)=>{
                return e
            }).catch((er)=>{
                if(count === time){
                    rej(er)
                    return
                }

                retry(time+1)
            })
        }
        retry(0)
    })

}

promiseRety(getRejected(),4).then((e)=>console.log(e)).catch(()=>console.log('after so many tries'))


//slep function

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  // implemet defbouce api call

  function deboucePromise (fn,delay){
   let timer ;
   let lastrej ;


   return (...args)=>{
            clearTimeout(timer)
  

            if(lastrej){
                lastrej('Erro')
            }
            return new Promise((res,rej)=>{
                lastrej = rej

               timer =  setTimeout(()=>{
                    lastrej = null
                     Promise.resolve(fn(...args)).then(res).catch(rej)
                },delay)
            })


   }
  }