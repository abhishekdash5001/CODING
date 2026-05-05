# 1) Routing fundamentals

App Router

In App Router, routes live inside the app/ folder. A page.tsx file defines the UI for a route. Dynamic segments are created using square brackets like [slug]. Catch-all routes use [...slug], and optional catch-all routes use [[...slug]].

app/
  page.tsx                -> /
  about/
    page.tsx              -> /about
  blog/
    page.tsx              -> /blog
  blog/
    [slug]/
      page.tsx            -> /blog/hello-world
  shop/
    [...slug]/
      page.tsx            -> /shop/a/b/c


app/
  product/
    [id]/
      page.tsx

/product/a      ✅ id = "a"
/product/b      ✅ id = "b"
/product/a/b    ❌ not matched
/product         ❌ not matched

1. For [slug]

```js
export async function generateStaticParams() {
  return [
    { slug: "a" },
    { slug: "b" },
    { slug: "c" },
  ];
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <h1>{slug}</h1>;
}

```


app/
  product/
    [...id]/
      page.tsx


/product/a        ✅ id = ["a"]
/product/a/b      ✅ id = ["a", "b"]
/product/a/b/c    ✅ id = ["a", "b", "c"]
/product          ❌ not matched


2.for [...slug] recvied as a arary

```js

export async function generateStaticParams() {
  return [
    { slug: ["a"] },
    { slug: ["a", "b"] },
    { slug: ["a", "b", "c"] },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return <h1>{slug.join("/")}</h1>;
}

```


app/
  product/
    [[...id]]/
      page.tsx


/product          ✅ id = undefined
/product/a        ✅ id = ["a"]
/product/a/b      ✅ id = ["a", "b"]
/product/a/b/c    ✅ id = ["a", "b", "c"]




# layout.tsx in Next.js App Router


So think like this:

page.tsx = actual page content for that URL
layout.tsx = shared outer UI around those pages
layouts can be nested
layouts persist across navigation inside their segment, unlike templates, which reset state on navigation.



You use layout.tsx for things like:
 1. navbar
 2. Sode Bar
 3.provider
 4, anything that can be sahred

## Root Layout will have body and html

 app/
      layout.tsx
      page.tsx
      about/
        page.tsx
  

  ```js

  export default async function Layout({children}:{children:React.ReactNode}){
    return (
      <>
      <header>
Header
        </header>
{children}
        <footer>
          footer
          </footer>


      </>
    )
  }

  ```
## Nested Layout
  app/
  layout.tsx
  dashboard/
    layout.tsx
    page.tsx
    settings/
      page.tsx

  ```js

<RootLayout>
  <DashBoardLayout>
    <DashboardPage/>
     <DashBoardLayout/>

  </RootLayout>


<RootLayout>
  <DashBoardLayout>
    <DashboardPage/>
     <DashboardSettings/>

  </RootLayout>
  ```

      
  ## Nested layout

    /**
    app/
  layout.tsx
  dashboard/
    layout.tsx
    page.tsx
    settings/
      page.tsx
    
     */

     so setting page will have something like this
     /**
     <RootLayout>
  <DashboardLayout>
    <SettingsPage />
  </DashboardLayout>
</RootLayout>
      */


      why layout.tsx matters as it comman like header sidenva it is still mounted but child unoun and mount again

    


  ### Page.tsx vs layout.tsx
     layoout .tsx is just wraper on page.tsx or nested pages can Shared UI
     Page.tsx code is the actual code that s vible tin iu

# 11) layout.tsx vs template.tsx  they are same with 1 distiction when we want sahred ui to be mounted on navigation use layout if remount on navigation use template.tsx
  for eg if we have child client compoant using  layout.tsx and we change the date and then navaogate to some sibling page in that state will still remain what we types  but in case tempalt.tsx it will go back nitial state
  you can also think sidebar when we slected product and then click to go some where in layout it will rember product is selected

   /**
   // app/dashboard/layout.tsx
import Link from 'next/link';
import SearchBox from '../components/SearchBox';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Dashboard Layout</h1>

      <nav style={{ display: 'flex', gap: '12px' }}>
        <Link href="/dashboard">Home</Link>
        <Link href="/dashboard/analytics">Analytics</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </nav>

      <SearchBox /> < this has its own state it will remoain same in all the navaiton bcx in alyout.tsx

      <hr />

      {children}
    </div>
  );
}
   
   
   
    */

  ### Why does template reset?  next tret teamplate .tsx and fresh batch on each navigation