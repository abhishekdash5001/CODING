## App Router Render tree

/**

layout.tsx  < perisent on navigation
  template.tsx <- resets everything on navifgation
    error.tsx  <-- when route is not resolved
      loading.tsx  <---- when route is getting resolved
        page.tsx   <---- actual UI


 */

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

   /**
   'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

   
    */


#### When notFound() is called, Next.js renders the nearest not-found.tsx file for that segment.its like you calling end point fro prdct but its was failed in that callnotfound


