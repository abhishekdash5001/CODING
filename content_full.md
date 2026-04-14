# What is Contentful/headless CMS

Content full is a headless CMS with no front end ,font end is built with react/next /vue wich call contentful api like rest or GQL this gived flexibly to use any
frame work and we can SSR ,SSG 


Contentful:
- Product title
- Product description
- Images
- SDS/TDS files
- SEO metadata

Next.js:
- Product page UI
- Routing
- Rendering
- Performance
- SEO implementation


# Content Building Blocks

Organization
  └── Space
       └── Environment
            ├── Content Model
            │    └── Content Types
            │         └── Fields
            ├── Entries
            ├── Assets
            ├── Locales
            └── APIs

  ## Organaisation  
     Top level which has user permission billing  it has spaces also (dap.com,rustoleum.com) and this is where we do the content changes
  
   ## Space
     Space is like 1 cms project for eg Company A has 1 product dap.com the space is dap white space inside it we will have it blogs assets.api keys models
     A multibrand company can have 1 space or each brand or can have shared space with reusable models 
  
   ## Enviroment
     A Contentful environment is an isolated copy of a space. Each environment has its own content models, entries, and assets.
        For example, if I need to add a new field like discountPrice to the Product content model, I should not directly change the production environment.
        First, I clone production into a dev or feature environment so it has the same schema and content as production. Then my local/dev frontend points to that Contentful environment.
        I make the content model change there, update the UI code, test everything, and raise a PR. Once the code is reviewed and merged, we migrate the validated content model changes to staging and then production safely.
        This avoids breaking the live website.

  ## Content Model
   
   First Think of Contnet Type as TS type 
   /**
   type Product{
    name:String,
    id:String
    description?:sting
    price:number
}
   
    */

    Product is content type  and name id description are feilds Content model tel what is COntnet type ,what are the types of feild ,what optional there tyypes and validation


  ## Content Type - is TS Type that tells the shape of the content


  ## Feilds
  Contentful field types:

        Short text → one-line text
        Long text → multiple-line plain text
        Rich text → formatted content
        Boolean → true/false
        Number → numeric value
        JSON object → config/theme/custom data
        Media → image, PDF, video, file
        Reference → points to another content type/entry
        DATE
        Location -> latiture and logintude
        One reference = product selects one category
        Many references = product selects multiple tags/blocks

 ## Entries
   This is the actulay content content enditors put that is used by front end

 ## Assets

  Assets are media files in Contentful, like images, PDFs, videos, icons, or documents.

    Once uploaded, assets can be reused and referenced inside content models.

    Example:
    Product
    - title
    - heroImage → Asset
    - brochurePdf → Asset

    When we click an uploaded asset, we can see or edit metadata like:
    - title
    - description
    - file name
    - file type
    - file size
    - CDN URL

## Localise
in content full localaisation is done in space we go to settings an EN_US EN_IN ES_FN then we go to content model and select any feild and enbale localaition
and add text for those feils SKU pricce dont localize t


## APi
  1.Content delivery APi -- for published content used in live webiste
  2.Conetn preview API - used for draft /unpublished

   /**
   
   const client = contentfull.createClinet({
        space:space_id
        envirome:proces.env.CONET_ENVIROME
        accestoken:token
        })

            const a = await client.getEnteries({
            content_type:product
            })
    */

  3 Migration API
 used to add contenttype filed run migartion script create space

 /**
 
        migration/abc.js
        module.export = function(migration){
        const product = migration.editContentType('product')

        product.createFeild('discountPrice').name('discount Price').type(number).required(false)

        product.changeFieldControl("discountPrice", "builtin", "numberEditor");
        }
  */

  4.GQL API it also has to layes delivery api and preivew api 




## 3) Content modeling in Contentful



   You create content types for reusable blocks:

        A = Hero
        B = CTA
        C = FAQ
        D = Card Grid
        E = Product Grid


        Then create page content type:

        Page
        - title
        - slug
        - sections[]  // reference field  many refernce

        Home Page entry
        sections:
        - Home Hero entry
        - CTA entry
        - FAQ entry

        Blog Page entry
        sections:
        - Blog Hero entry
        - Article List entry
        - CTA entry




## How TO enable Preview Mode Contentful

1 Delivery API only show published content so if i change entry and i want to preivew it?
 we will give a url to the preview button like  https://my-next-site.com/api/preview?secret=123&slug=/home

 Settings
  ↓
Content preview
  ↓
Add content preview -> ther we add the url

2. so when user cliks it ir wil come to this place
 // api/preview

 /**
 
 import {draftMode } from 'next/header'
import { redirect } from "next/navigation";

export  async function GET(request){
  let secret = request.secret
  let slug:=request.slug

  if(secret !== process.env.secret){
    return new Response("Invalid secret", { status: 401 });
  }
  draftMode.isEnabled = true
   redirect(slug)

}

  */


  /**
  // lib/contentful.ts

  import {createClient} from contentfull

 export function getContentfulClient(isPreview:true){
return createClient({
    space:proc.env.space
    envriomet:prc.env.env
    access_token:isProview?proc.preview_token:prc.env.deleivrytoek
   host: preview ? "preview.contentful.com" : "cdn.contentful.com"  -> these are hardocded   preview.contentful.com -opreview api  cdn.contentful.comdelciery api 
})
 }
  
  
   */

  Now in page.tsx

  /**
  import {draftMode } from 'next/header'
  import {getContentfulClient} from './ssd'

  export async function Page((params):{
    slug:string
  }){
    cosnt cleint = getContentfulClient(draftMode)
    let a = await client.getEnteries({
        contt-type:'prduct'
        feild.slug:slug
    })


  }
  
  
   */



## Webhook
 So if we using Next js with contentfull and our page where this entry needs to be shown is SSG so after publishing it will still show old data so need to revalidate the page or you can say ISG

 Settings → Webhooks → Add webhook 
url :'https://my-next-site.com/api/revalidate',
sx-contentful-secret: 123

 For Eg
 Content Type: Product Page / PDP Page
    - title
    - slug  ->/products/alex-plus
    - product
    - sections[]

so when PDP entry is publlished webhook payload cotains
  {
    
    "sys": {
    "id": "hero123",
    "contentType": {
      "sys": {
        "id": "heroBanner"
      }
    }
  }
  "fields": {
    
    "slug": {
      "en-US": "/products/alex-plus"
    }
  }
}


/**

while fetchinf data 

// app/home/page.tsx

const page = await fetch(contentfulUrlForHomePage, {
  next: {
    tags: ["page:/home", "entry:hero123"],  
      page:/blog     = created by your Next.js code <---not come in webhook payload
     entry:hero123  = created by your Next.js code using Contentful entry id
  },
});


// app/blog/page.tsx

const page = await fetch(contentfulUrlForBlogPage, {
  next: {
    tags: ["page:/blog", "entry:hero123"],
  },
});

 */
/**
//api/revalidate

// app/api/revalidate/route.ts

import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const secret = request.headers.get("x-contentful-secret");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  const body = await request.json();

  const contentType = body.sys?.id;-<<----entry:hero123 
  const slug = body.fields?.slug?.["en-US"];

  if (contentType === "page" && slug) {
    revalidatePath(slug);
  }

  if (contentType === "heroBanner") {
    revalidateTag("contentful"); < -- when we edit chero baner in blog or home page 
  }

  return Response.json({ revalidated: true });
}





 */

  





## How Migration is Done
 1.let assume code is meged in dev/main branch and code is deployed in staging
 2. we install migration script dotenv
 3. .env file we create 3 feilds staging id ,content management token ,enviroment staging
 4. then we create a migartion script 
  
 /**
 migration/abc.js
  module.export = function(migration){
  const product = migration.editContentType('product')

  product.createFeild('discountPrice').name('discount Price').type(number).required(false)

  product.changeFieldControl("discountPrice", "builtin", "numberEditor");
}
 
 
  */ 

5. in our package.json we have the script to run this migration srcipt in stagin and enviroment 

npm run migrate:staging

if everything is ok npm run migrate:staging


## 10) Roles and permissions


        Admin  -> 
        Editor ->can edit entries deleet them but can delete/edit content model
        Author   -> can add article update its own but cantedt other
        Translator  ->
        Developer  -> can update/delete  content model
        published ->published 

## Governance Rule

How to make conentufll scalable ,clean and safe
 1.Name ->PDP|ALEX|HERO
 2.Validation-> add proper validation what things are required and length max size that can be updlaod
 3.Diferentate rols and responsiblty
 4 Have sepearete enviroments
 5.use migartion script
 6.step by step  dev-staging-prod
 7 Cleanup rules    



## Arcitecture of integrating in next js

1. install contenfull

2. create space id coentfull-envoroment conetefuk-preview-tokken conet full delvery token (.env .emv.staging .env.production)

3. create client 

/**
// lib/contentful.ts
import {createClient } from 'contentful'

export function getClient(isPreview){
  return createClient({
    space_id:proces.env.SPACE_ID,
    enviroment:proces.env.CONTENTFUL_ENVIROMENT,
    access_token:isPreview?proces.env.CONTENTFUL_PREVIEW_TOKEN:proces.env.CONTENTFUL_DELIVERY_TOKEN,
    host:isPreview?'preview.contentful.com':'cdn.contentful.com'
  })
}

//api/revaliadte


 import {revalidateTag,revalidatePath} from 'next/cache'
 
 export async function Post(request){

  const secret = request.headers.get('X-Contefull-secret')


  if(secret !== proces.env.CONETFUL_SECERT){
    return new Response("Invalid secret", { status: 401 });
  }
  const body = await request.json()
  const id = body.sys.id
  const slug =  body.feild.slug


  if(slug && id === 'page'){
    revalidatePath(slug)
  }else{
    revalidateTag(id)
  }
  return new Response(" secret", { status: 200 });
 }


 //lib/getPage.ts


 import {getClient} from 'contefullc. eit'


export async function getPage(slug:string,locale: string,isPreivre:Boolean){
     const a = await getClient(isPeviiew).getEntries({
       content_type:'page',
          locale: locale,
       'feild.slug':slug,//about -us
include:2
      })


      return a.titems
}

## OR


await fetch(contentfulUrl, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  next: {
    tags: [`page:${slug}`, "contentful"], <--these tags will not go contefull net js rember them and use to revalidate all [ages which are tagged woth this]
  },
});

//page.tsx
import {draftMode } from 'next/cache'
import {getPage} from '../asd/sd'


export async function  Page({ params}:{slug:string,  locale: string;}){
     const locale = params.locale || "en-US";
  cosnt a = await getPage(slug,locale,draftMode.isPreivre)
}
 */


## Perfomace 

 use Webhook logic(revalidate) plus webvitals 


## 15) Error handling / fallback handling

if after hittl the url the resonsel null we show notfound default page of next js offcure with our wion styling


## contentful has Limits

paid version has 1gb limit and image has its own limit if its biigger than 20mb image api cannot optimize it mits better to updalod 500kb image

## Price COnversion
Contenfull doesnot convert we can price and curency in contnet  type and use this data in backend or front end and use rate conversion api(ExchangeRate-API)
