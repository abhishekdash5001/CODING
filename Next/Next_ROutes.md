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


      Difference between [id]  it will catch product/a
      
                         [...id] it will cacth product/a product/a/b/c  but not product
                         [[...id]]  this will cathc all

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

   ## Root Layout  will alwasy have html and body
  /** 
   app/
      layout.tsx
      page.tsx
      about/
        page.tsx
        */

        /**
        // app/layout.tsx
            export default function RootLayout({
              children,
            }: {
              children: React.ReactNode;
            }) {
              return (
                <html lang="en">
                  <body>
                    <header>My Global Header</header>
                    {children}
                    <footer>My Global Footer</footer>
                  </body>
                </html>
              );
            }
        
         */

   ## Segment layout

    /**
    app/
  layout.tsx
  page.tsx
  blog/
    layout.tsx <------
    page.tsx
    [slug]/
      page.tsx
    
     */

      /**
      
      // app/blog/layout.tsx
      export default function BlogLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <section>
            <aside>Blog Sidebar</aside>
            <main>{children}</main>
          </section>
        );
      }
       */


    
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