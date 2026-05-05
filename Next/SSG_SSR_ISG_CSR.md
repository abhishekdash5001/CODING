## SSG Static Site Generation - build html in build time and serve same thing again and again

## SSR Server Side renderring - fethc new page on every request

## ISG Increamnet site generation - its kind ssg but we delete the cached html and request new html based some props like revalidate revalidatepath and revalidatetag

## CSR Client side reneder - Hole html is created on the client sideused when ther lot hydration is requred

### SSG - we used this when data changes rarely

```js
//app/settings/[slug]/page.tsx:

import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    cache: "force-cache",
  });

  const todos = await res.json();

  return todos.map((todo) => ({
    slug: String(todo.string),
  }));
}

async function getByPostId(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    notfound();
  }

  const post = await res.json();

  if (!post) {
    notfound();
  }

  return post;
}

export async function Page(props) {
  const slug = await props.params.slug;

  const post = await getByPostId(slug);

  return <>{post.id}</>;
}
```

### SSR Server Side Rendiering on each request fethc a new page for those wheere content keep changing eg dashboard mutual fund price

```js
export const dynamic = "force-dynamic"; // this tells next js on each request create fresh page

export default async function Dashboard() {
  const res = await fetch("https://dummyjson.com/users/1", {
    cache: "no-cache",
  }); // this tell next js to fetch new api data and dont use next js cached fetch mechanism

  const data = await res.json();

  return <>{data.name}</>;
}
```

### ISG is like ssg but that page can be build fresh on demand

#### time bases revalidation

```js
export const revalidate = 60; // allow caching but build a new page after 60 secs

export default async function Page() {
  const res = await fetch("https://dummyjson.com/products?limit=5");
  const data = await res.json();

  return <>{data.id}</>;
}
```

#### Demand based Revalidation (RevalidatePath)

```js
//api/revalidate/route.ts

await fetch("https://your-site.com/api/revalidate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-revalidate-secret": "my-super-secret-token",
  },
  body: JSON.stringify({
    path: "/products",
  }),
});



import {revalidate} from 'next/cache'
import {nextResponse,nextRequest} from 'next/server'



export async function Post(request){

  const secret = request.header.get('x-revalidate-secret')

  if(!secret || secret !=== PROCESS.env.secret){
    return nextResponse.json({
      message:'invalid secret',
      status:401
    })
  }

 const body = await request.json()
  const slug = body.path

  if(!slug || typeof(slug) !== 'string'){
     return nextResponse.json({
      message:'inalid path',
      status:400
    })
  }

  revalidatePath(slug)

    return nextResponse.json({
      message:'revalidate',
      status:200
    })

}





```

#### Demand based Revalidation (RevalidateTag) its like revalidate path but instead of reviadting a page it revaidates cahced fetch/path which are connected to those tags

```js
// app/products/page.tsx


export default async function ProductPage(){
  const res = await fetch('https://dummyjson.com/products?limit=5',{
    next:{
      tags:['product']
    }
  })
  const data = await res.json()

  return (
    <>

{data.name}
    </>
  )
}

//cal from cms

await fetch("https://your-site.com/api/revalidateTag", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-revalidate-secret": "my-super-secret-token",
  },
  body: JSON.stringify({
   tag:'product'
  }),
});

//app/api/revalidateTag/route.ts

import {revalidateTag} from 'next/cache'
import {NextResponse,NextRequest} from 'next/Server'

export async function Post(request){
  const secret = request.header.get('x-revalidate-secret')

  if(!secret || secret !=== PROCESS.env.secret){
    return NextResponse.json({
      message:'inalid',
      status:401
    })
  }

 const body = await req.json();
  const tag = body.tag;

  if(!tag){
     return NextResponse.json({
      message:'inalid',
      status:400
    })
  }

  revalidateTag(tag)

 return NextResponse.json({
      message:'success',
      status:200
    })


}





```


## Why not make everything a Client Component?

Good answer:

more client JS shipped
bigger bundles
slower hydration
worse performance on low-end devices
you lose benefits of server rendering and server data fetching
