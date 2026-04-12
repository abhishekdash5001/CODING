{/* <script src="app.js"></script>
// html parsing
// seeing thi script stop parsin
// download the script
// parse it 
// then contrunue the html parsing */}


<script src="analytics.js" async></script>

//html parsing
// seeing the script starts downaloing the script but also html is being parsed
// once download is done then srcipt is excuted and html parser is stopped
// used for analytcics ,add and indepemdent sctipt
// there is no gurantee on which order scripts will execute if 2 async or more


// in case od defer 
// donwaodig happends but exuction happends html parser is done defer script excute in same order they are deifned


//Deferred scripts run before DOMContentLoaded.


//<script type="module" src="app.js"></script>  defer bydefualt


// 3) Module scripts have their own scope

// <script>
//   var a = 1;
//   console.log(window.a); // 1
// </script>

// <script type="module">
//   const b = 2;
//   console.log(window.b); // undefined
// </script>
