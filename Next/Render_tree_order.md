## App Router Render tree

/**

layout.tsx  < perisent on navigation
  template.tsx <- resets everything on navifgation
    error.tsx  <-- when route is not resolved
      loading.tsx  <---- when route is getting resolved
        page.tsx   <---- actual UI


 */


 ```js
//app/Product/template.tsx
'use client'

import {useState} from 'react'

export default function ProductTemplate({children}:{children:React.ReactNode}){
   const [val,setVal]= useState('')
  return (
    <>
    <input    value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search on this page"/>

  {children}
    </>
  )
}


import Link from "next/link";

export default function ProductsPage() {
  return (
    <main>
      <h1>Products List</h1>

      <Link href="/products/iphone">Go to iPhone</Link> 
      <br />
      <Link href="/products/samsung">Go to Samsung</Link>
    </main>
  );
}

 ```

 <DashboardLaout>
  <DashboardTemplate>
   <DashBoardLoading/> -<<< while loading
   </DashboardTemplate>
 </DashboardLaout>


 <DashboardLaout>
  <DashboardTemplate>
   <DashBoardError/> -<<< while fethc route failed this page needs to client side only
   </DashboardTemplate>
 </DashboardLaout>


 <DashboardLaout>
  <DashboardTemplate>
   <DashBoardPage/> -<< when routes are resolved
   </DashboardTemplate>
 </DashboardLaout>

 ```js
  'use client'

  export default function Error({error,reset}:{error:Error,reset:()=>void}){
    return (<>
    
    {error.message}
    <button onCLick={reset}></button> // beacuse of this onlick event it has to client side
    </>)
  }



 ```

 

#### When notFound() is called, Next.js renders the nearest not-found.tsx file for that segment.its like you calling end point fro prdct but its was failed in that callnotfound


