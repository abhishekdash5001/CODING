# Add metaData

## We add Metadata in layout.tsx for site wide

## we add metadata in page.tsx for 1 page

## we add in product/[slug]/page.tsx for dynamic metadata

```js
//app/product

import type {MetaData} from 'next'

export const metaData:MetaData={
  title:'Products',
  description:'browse all products'
}

async function getAllProduct(){
  const res = await('ww.')
  const data  = await res.json()

  return data
}

export default async function Page(){
    let product = await getAllProduct()

    return (
      <>
sds
      </>
    )
}

//app/product/[slug]/page.tsx

export async function generateStaticParams(){
     const res = fetch('https://products',{
      next{
        tags:['allproducts']
      }
     })

     const data = await res.json()

     return data.map((E)=>({
      slug:E.id
     }))
}

async function getById(id){
     const res = fetch('https://products/:id')

     const data = await res.json()
     return data
}


export async function generateMetadata(props):Promise<MetaData>{

  const slug = await props.params.slug

  const p = await getById(slug)

  return {
    name:p.name
    description:p.description
  }

}


export default async function Page(props){

  const slug = await props.params.slug
const data  = await getById(slug)
}


```

# Robot.txt
 ## this tell searhc crawlers wihch part of website they can crwal which part they cant and where is site map.xml

 ```js
// app/robots.ts

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // this rule is applicable for all
      allow: "/", // crawling is allowed for public webiste
      disallow: ["/admin", "/dashboard", "/api"], // dont crawl these pages
    },
    sitemap: "https://example.com/sitemap.xml", // where the sitemap is
  };
}

 ```

