function outer(){
    let counter = 0;

    return function(){
        counter++;
        return counter

    }

}

let o = outer()
let b = outer()
console.log(o())//1
console.log(o())//2
console.log(o())//3

console.log(b())


// for (var i = 0; i < 3; i++) {
//     setTimeout(() => {
//       console.log(i);
//     }, 1000);
//   }

//   for (let i = 0; i < 3; i++) {
//     setTimeout(() => {
//       console.log(i);
//     }, 1000);
//   }


  for (var i = 0; i < 3; i++) {
    (function(i) {
      setTimeout(() => {
        console.log(i);
      }, 1000);
    })(i);
  }


  function multiply(x){
    return function(y){
        return x*y
    }
  }

  const double = multiply(2)
  const triple = multiply(3)

  console.log(double(5))
  console.log(triple(5))


  function counter(){
    let counter =0;


    return{
        increament:function(){
            counter++
        },

        get:function(){
   return counter
        }
    }
  }

  let conterfn = counter()

  conterfn.increament()
  conterfn.increament()

  console.log('counter vl',conterfn.get())




  function test() {
    let x = 10;
  
    return function () {
      let x = 20;
      console.log('shadow',x);
    };
  }
  
  const fn = test();
  fn(); // ?


  (function(){
    function outer(){
        let obj ={value:10}

        return function(){
            obj.value++
            return obj.value
        }
    }
    let o = outer()
    console.log(o())
    console.log(o())

  }())


  (function(){
    function outer() {
        let bigData = new Array(1000000).fill("🔥");
      
        return function () {
          return "done";
        };
      }
      
      const fn = outer();// bgData is not used return so it went to garbage collection
  }())