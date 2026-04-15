//SSR -Server side rendering
/**
 * when ever user hits a url request goes to server server creteds html and send back to the client
 * 
 * 1.Good For SEO
 * 2.Pages with server auth
 * 3.Pages data frequently changes
 * 
 * PROS 
 * 1.Better SEO
 * 2.always fresh data 
 * 
 * CONS
 * 1.Server response is slower as compared SSG
 * 2.more server cose
 * 3.Every request does work again
 * 4.Time to FIrst bite is more than SSG because server has to create html and send back to client while 
 * ssg page is alrady in the server
 */


// APP RROUTER
//OR

// export const dynamic = 'force-dynamic';

// app/products/page.tsx
// export default async function ProductsPage() {
//     const res = await fetch('https://api.example.com/products', {
//       cache: 'no-store', <---- this tell next js build a new page on every request
//     });
  
//     const products = await res.json();
  
//     return (
//       <div>
//         <h1>Products</h1>
//         {products.map((p: any) => (
//           <div key={p.id}>{p.name}</div>
//         ))}
//       </div>
//     );
//   }


//PAGE ROUTE
// pages/products.tsx
// export async function getServerSideProps() {<-- tells next js to build this page on every request
//     const res = await fetch('https://api.example.com/products');
//     const products = await res.json();
  
//     return {
//       props: {
//         products,
//       },
//     };
//   }
  
//   export default function ProductsPage({ products }) {
//     return (
//       <div>
//         <h1>Products</h1>
//         {products.map((p) => (
//           <div key={p.id}>{p.name}</div>
//         ))}
//       </div>
//     );
//   }







//SSG - Static Site Genertion

/**
 * HTML is created in build time and deployed to server
 * 
 * 1Better for pages data doesnot change much
 * 2.Excellent SEO
 * 3.Low cost
 * 
 * CONS
 * 1.Data can be stale
 * 2.Rebuild needed if data changes
 * 
 * 
 * PAGE ROUTE SSG
 * 
 * export async function getStaticProps(){
 * let a = await fetch()
 * let b = await a.json()
 * 
 * 
 * return {
 * props:{b},
 * revalidate:60 <----- it make hte request in 60 seconds and creata new page this is ISR
 * }
 * 
 * 
 * 
 * export default function MyBlogs({props}){
 * return <>
 * sdsd
 * </>
 * }
 * }
 * 
 * We can also revalidate manually
 */

 // pages/api/revalidate.ts
 export default async function handler(req, res) {
    if (req.query.secret !== process.env.MY_SECRET) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    await res.revalidate('/blog'); //--> this line tell next to dump the cached blog page and generate the new one for SSG only
    return res.json({ revalidated: true });  //-->response sying revalidation is succesfull




//

/* -------- IN APP ROUTE -------- */


export const revalidate = 60 // in every 60 second freh page will be gernared
export default function MYPage(){

    let a = fetch('url')//as thre is no 'cache-no-store' this will be ssg

    // OR
    let a = fetch('url',{
        next:{revalidate:60} // ISG
    })

    return (
        <>
        sss
        </>
    )
}

//ON DEMAND

'use server';

import { revalidatePath } from 'next/cache';

export async function refreshBlog() {
  revalidatePath('/blog');//  -> this will invalidate  cache for that path
}

// OR

// if created a compoent and fetch by using

let a = fetch('url',{
    next:{tags: ['posts']} // ISG
})

'use server';

import { revalidateTag } from 'next/cache';

export async function refreshBlog() {
    revalidateTag('post','max');//  -> this will invalidate  cache for that path
}

/* -------- IN APP ROUTE -------- */



// Example:

// homepage = SSG
// product page = ISR
// checkout = SSR
// analytics widget = CSR inside page

// That is how real production apps are built.


/*----------1) What is routing in Next.js?-------*/


app/
  (marketing)/   <--- we can have serpatre layout.tsx for marketing and it will not come in url Routegroup
    about/
      page.tsx
    contact/
      page.tsx
  (shop)/
    products/
      page.tsx

//Catch all route
// app/docs/[...slug]/page.tsx

/docs/react
/docs/react/hooks
/docs/react/hooks/useeffect

export default function DocsPage({ params }: { params: { slug: string[] } }) {
    return <div>{params.slug.join(" / ")}</div>;
  }

  //4) Dynamic routes

  app/
  product/
    [id]/
      page.tsx


      Matches:

/product/1
/product/abc
/product/999

export async function getStaticPaths() {
    const res = await fetch("https://api.example.com/products");
    const products = await res.json();
  
    const paths = products.map((p) => ({
      params: { id: String(p.id) },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params }) {
    const res = await fetch(`https://api.example.com/products/${params.id}`);
    const product = await res.json();
  
    return {
      props: { product },
    };
  }


  export default Index({props}{
    <><></>
  })


//   IN APP 

export async function generateStaticParams() {
    const res = await fetch("https://api.example.com/products");
    const products = await res.json();
  
    return products.map((p) => ({
      id: String(p.id),
    }));
  }
  
  export default async function ProductPage({ params }) {
    const res = await fetch(`https://api.example.com/products/${params.id}`);
    const product = await res.json();
  
    return <div>{product.name}</div>;
  }

  //LOader

  app/dashboard/loading.tsx  -> this will be shown by the type content is loading next watch for this file name

  //Error handling

  app/dashboard/error.tsx


  'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

//12) Not found route

app/not-found.tsx -> next js wathced not-found when a page not founf it will render this

//How to use
import { notFound } from "next/navigation";

export default async function ProductPage() {
  const product = null;

  if (!product) {
    notFound();
  }

  return <div>Product found</div>;
}

//13) Navigation in Next.js

Using Link

Preferred for client-side navigation.



//15) Reading route params and query params


For /products?category=shoes
export default function Page({
    searchParams, <--- this comes as default
  }: {
    searchParams: { category?: string };
  }) {
    return <div>{searchParams.category}</div>;
  }

  in client

  'use client';

import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const category = searchParams.get("category");



//16) Parallel routes and intercepting routes

// Render multiple route slots at same time.

app/
  dashboard/
    layout.tsx
    page.tsx
    @team/
      page.tsx
      default.tsx
    @analytics/
      page.tsx
      default.tsx  //For unmatched or initial states of a slot, you provide default.tsx


      export default function DashboardLayout({
        children,
        team,
        analytics,
      }: {
        children: React.ReactNode;
        team: React.ReactNode;
        analytics: React.ReactNode;
      }) {
        return (
          <div>
            <div>{children}</div>
            <aside>{team}</aside>
            <section>{analytics}</section>
          </div>
        );
      }

    //   Parallel routes can also have independent loading and error states.



  //  2) Intercepting Routes
//   Suppose user is on:  /feed  They click photo:  /photo/123 Instead of leaving /feed, Next can intercept that route and show /photo/123 as a modal on top of the feed.

app/
  feed/
    page.tsx
    layput.tsx<---modal is paralled route for layout we need to add here
    @modal/
      default.tsx < for initial state
      (..)photo/
        [id]/
          page.tsx
  photo/
    [id]/
      page.tsx

      (.) = same level
(..) = one segment above
(..)(..) = two segments above
(...) = from app root

import Link from 'next/link';

const photos = [
  { id: '1', title: 'Mountains' },
  { id: '2', title: 'Beach' },
  { id: '3', title: 'Forest' },
];

export default function FeedPage() {
  return (
    <div>
      <h1>Feed</h1>

      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link href={`/photo/${photo.id}`}>{photo.title}</Link> < this links to folder strycture above that open the modal   
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function FeedLayout({
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
    return (
      <>
        {children}
        {modal}
      </>
    );
  }


//   Simple memory rule
// feed/page.tsx = list page
// feed/layout.tsx = where modal slot is mounted
// feed/@modal/... = modal version
// photo/[id]/page.tsx = full standalone page



/*---------- Middle Ware-------*/

In Next.js, middleware means code that runs before a request is completed. It can inspect the incoming request and then decide to:

continue
redirect
rewrite
add/modify headers
respond early

// know that Proxy is the current name.


import { NextResponse } from 'next/server'

export function proxy(request) {
  const token = request.cookies.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'], runs only for /dashboard routes   
}