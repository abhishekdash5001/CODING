## SSG Static Site Generation - build html in build time  and serve same thing again and again
## SSR Server Side renderring - fethc new page on every request
## ISG Increamnet site generation - its kind ssg but we delete the cached html and request new html  based some props like revalidate revalidatepath and revalidatetag
## CSR Client side reneder - Hole html is created on the client sideused when ther lot hydration is requred 


  ### SSG - we used this when data changes rarely 


    /**
    import { notFound } from "next/navigation";



export async function  generateStaticParams(){ //which dynamic routes to build ahead of time. it awlasy used in dynamicn routes

    const res = await fetch('https://jsonplaceholder.typicode.com/todos',{
        cache:'force-cache'
    })

    const rs = await res.json();

    rs.map((e:any)=>({
        slug:e.id
    }))

}

export async function getPost(id:string){
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        cache:'force-cache'
    })

    const rs = await res.json();

   if(rs == null){
    notFound()
   }
   return res.json() as Promise<any>;

}

export   default  async function SettingsPage({params}:{params:Promise<{slug:string}>}) {
    const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <article>{post.content}</article>
    </main>
  );
}
    
    
     */

  ### SSR - is used when data changes a lot when want fresh page on each request


  /**


  // app/account/page.tsx
export const dynamic = 'force-dynamic'; <--- this tels on each request createt this page again

export default async function AccountPage() {
  const res = await fetch('https://dummyjson.com/users/1', { < when i am calling this api dont next js fethc caching mechanism
    cache: 'no-store',
  });
  const user = await res.json();

  return (
    <main>
      <h1>My Account</h1>
      <p>{user.firstName}</p>
    </main>
  );
}
   */
  ### ISG  is like ssg but that page can be build fresh on demand

   1.Time based ISG

   /**
   export const revalidate = 60;

export default async function ProductsPage() {
  const res = await fetch('https://dummyjson.com/products?limit=5');
  const data = await res.json();

  return (
    <main>
      <h1>Products</h1>
      {data.products.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </main>
  );
}

any request that is made withitn 60 secons wil get from acache post that it will fesh page
   
   
    */

    2 Demand Based ISG for this we use revalidatePath RevalidateTag


    /**
    import { revalidatePath,revalidateTag } from "next/cache";
import { NextRequest,NextResponse } from "next/server";



export async function post(request:NextRequest){

        const secret =    request.headers.get('x-contnetfull')

        if(secret !== process.env.CONTENTFULL_TOKEN){
            return new Response("Invalid secret", { status: 401 });
        }

        const body = await request.json();

        const slug = body.slug
        const tag = body.tag
        

        if(slug){
            revalidatePath(slug)
            return new Response("sucess", { status: 200 });

        }
        if(tag){
            revalidateTag(tag,'max')//  <--- serve the stale data fist and refthc new dat ain background
            return new Response("sucess", { status: 200 });
        }



        }
    
    
     */


## Why not make everything a Client Component?

Good answer:

more client JS shipped
bigger bundles
slower hydration
worse performance on low-end devices
you lose benefits of server rendering and server data fetching

   
