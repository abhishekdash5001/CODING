## data fetching in App Router.



### 1) Main mental model
 #### fetch on server if possible
 #### fetch on client only if necessary

  ##### Fetching in a Server Component
     /**
     // app/products/page.tsx
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
     
      */

  ##### Not limited to fetch we can also do db queries

  ##### Caching basics

  /**
  const res = await fetch('https://api.example.com/orders', {
        cache: 'no-store',
        });
  
   */  event will be made to the end point gives te data


   next: { revalidate: 60 }


    const res = await fetch('https://api.example.com/orders', {
      next:{ revalidate: 60}
        });

        till 60 secs cached after that neew data

  next: { tags: [...] }


  const res = await fetch('https://api.example.com/orders', {
      next:{ tags: ['prodcuts']}
        });

   ### Dynamic data fetching

   // app/account/page.tsx
        export const dynamic = 'force-dynamic';

        export default async function AccountPage() {
        const res = await fetch('https://api.example.com/me', {
            cache: 'no-store',
        });
        const user = await res.json();

        return <h1>Hello, {user.name}</h1>;
        }

  
  ### Parallel fetching

        const user = await getUser();
        const orders = await getOrders(user.id); this is bad these two are indeoedent api but still runing sequentlay we can use them paralled 


Better

  const [user , orders]= Promise.all([getUser(),getOrders]).then((e)=>e).catch(())


  ### Server Fetch  when data is required b4 page rednrs ,seo ,less client js
  ### Client fethc when we need somepolling interaction based data 

  ### serverccompoent can get data from fethc databases



