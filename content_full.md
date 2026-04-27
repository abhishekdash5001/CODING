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
│ └── Content Types
│ └── Fields
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
/\*\*
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

India: mysite.com/en/home
Spain: mysite.com/es/home

/\*\*

export default async function Page({ params }) {
const localeMap = {
en: "en-US",
es: "es-ES",
fr: "fr-FR",
};

const contentfulLocale = localeMap[params.locale] || "en-US";

const data = await client.getEntries({
content_type: "page",
locale: contentfulLocale,
});

return <div>{data.items[0]?.fields?.title}</div>;
}

\*/

## APi

1.Content delivery APi -- for published content used in live webiste
2.Conetn preview API - used for draft /unpublished

/\*\*

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

/\*\*

        migration/abc.js
        module.export = function(migration){
        const product = migration.editContentType('product')

        product.createFeild('discountPrice').name('discount Price').type(number).required(false)

        product.changeFieldControl("discountPrice", "builtin", "numberEditor");
        }

\*/

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
we will give a url to the preview button like https://my-next-site.com/api/preview?secret=123&slug=/home

Settings
↓
Content preview
↓
Add content preview -> ther we add the url

2. so when user cliks it ir wil come to this place
   // api/preview

/\*\*

import {draftMode } from 'next/header'
import { redirect } from "next/navigation";

export async function GET(request){
let secret = request.secret
let slug:=request.slug

if(secret !== process.env.secret){
return new Response("Invalid secret", { status: 401 });
}
draftMode.isEnabled = true
redirect(slug)

}

\*/

/\*\*
// lib/contentful.ts

```js

import {createClient} from 'contentful'

export function getContentFulClient(isPreview:boolean){
return createClient({
  space:Process.env.space,
  environment:Process.env.env
  access_token:isPreview?PROCESS.env.PREVIEW_TOKEN:PROCESS.env.DELIVERY_TOKEN
  slug:isPreview?'preview.contentful.com':'cdn.contentful.com'

})
}


//page.tsx

import {draftMode} from 'next/cache'
import {getContentFulClient} from './contenful.ts'

export async function Page({params}){

const locals:{
  'en':'en-us'
  'es':'es-fr'
}

const client  =  getContentFulClient(draftMode.isPreview)
const locale =locals( params.locale)||'en-us'

await lient.getEntries({
content_type:product
slug:params.slug
locale
})
}



```


## Webhook

So if we using Next js with contentfull and our page where this entry needs to be shown is SSG so after publishing it will still show old data so need to revalidate the page or you can say ISG

Settings → Webhooks → Add webhook
url :'https://my-next-site.com/api/revalidate',
sx-contentful-secret: 123

For Eg
Content Type: Product Page / PDP Page - title - slug ->/products/alex-plus - product - sections[]


```js
{
  "sys": {
    "id": "pdpPage123",
    "contentType": {
      "sys": {
        "id": "productPage"
      }
    }
  },
  "fields": {
    "title": {
      "en-US": "Alex Plus Product Page"
    },
    "slug": {
      "en-US": "/products/alex-plus"
    },
    "product": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "productAlexPlus123"
        }
      }
    },
    "sections": {
      "en-US": [
        {
          "sys": {
            "type": "Link",
            "linkType": "Entry",
            "id": "heroBanner123"
          }
        },
        {
          "sys": {
            "type": "Link",
            "linkType": "Entry",
            "id": "featuresSection123"
          }
        }
      ]
    }
  }
}


//api/revalidate

import { revalidatePath } from "next/cache";
import { Response,Request } from "next";

export async function post (request:Request){

const token = request.header.get('sx-contentful-secret')

if(!token || token !=== PROCESS.env.SECRET){
 return Response.json({message:'Invalid Secret',status:'401'})
}

const entryId = request.sys.id
const contentTypeId = request.contentType.sys.id
cont slug = request.field.slug.['en-us']

if(!entryId || !contentTypeId){
  return Response.json({
    message:"missing content id or entry id"
    status :400

  })
}
if(slug){

  revalidate(slug)
  return Response.json({
    message:"revalidate
    status :200

  })
}

}

```
\*/

## How Migration is Done
```js
// our code is merged in main/dev now we to deploy the code in stagging enviroment 
// first intall migration script .net

//create env.staging env.production

//.env.staging
SPACE_ID
MANAGEMENT_TOKEN // for migration script /migratio api mangement token is required beacause this is used to update create delete content type
ENVIROMENT


//.env.production
SPACE_ID
MANAGEMENT_TOKEN // for migration script /migratio api mangement token is required beacause this is used to update create delete content type
ENVIROMENT


//migartion/abc-discount-price

module.export = function(migration){
  const product - migration.editContentType('product')

  product.createFeild('discountPrice').name('Discount Price').type('number').required(false)

  product.changeFeildControl('discountPrice','builtIn','nuberEditor')
}


//package.json

{
  "scripts": {
    "migrate:staging": "dotenv -e .env.staging -- contentful space migration --space-id $CONTENTFUL_SPACE_ID --environment-id $CONTENTFUL_ENVIRONMENT --management-token $CONTENTFUL_MANAGEMENT_TOKEN",
    "migrate:production": "dotenv -e .env.production -- contentful space migration --space-id $CONTENTFUL_SPACE_ID --environment-id $CONTENTFUL_ENVIRONMENT --management-token $CONTENTFUL_MANAGEMENT_TOKEN"
  }
}

migrations/
  001-add-discount-price-to-product.js
  002-create-cta-content-type.js
  003-add-hero-reference-to-page.js

  npm run migrate:staging -- migrations/002-create-cta-content-type.js
```

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
6.step by step dev-staging-prod
7 Cleanup rules




## Arcitecture of integrating in next js

1. install contenfull

2. create space id coentfull-envoroment conetefuk-preview-tokken conet full delvery token (.env .emv.staging .env.production)

3. create client



```js

//.env.staging
CONTENTFUL_SPACE_ID=staging-space-id
CONTENTFUL_MANAGEMENT_TOKEN=management-token
CONTENTFUL_DELIVERY_ACCESS_TOKEN=delivery-access-token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=preview-access-token
CONTENTFUL_ENVIRONMENT=staging
CONTENTFUL_PREVIEW_SECRET=preview-secret
CONTENTFUL_REVALIDATE_SECRET=revalidate-secret




//env.production
CONTENTFUL_SPACE_ID=production-space-id
CONTENTFUL_MANAGEMENT_TOKEN=management-token
CONTENTFUL_DELIVERY_ACCESS_TOKEN=delivery-access-token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=preview-access-token
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW_SECRET=preview-secret
CONTENTFUL_REVALIDATE_SECRET=revalidate-secret


//env.local

CONTENTFUL_SPACE_ID=staging-space-id
CONTENTFUL_MANAGEMENT_TOKEN=management-token
CONTENTFUL_DELIVERY_ACCESS_TOKEN=delivery-access-token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=preview-access-token
CONTENTFUL_ENVIRONMENT=dev
CONTENTFUL_PREVIEW_SECRET=preview-secret
CONTENTFUL_REVALIDATE_SECRET=revalidate-secret
//lib/contentful.ts

import {createClient} from 'contentfull'

export function getContentFullClient(isPreview:boolean){
  return createClient({
    space_id:PROCESS.env.SPACE_ID
    host:isPreview?'preview.contentful.com':'cdn.contentful.com'
    enviroment:PROCESS.env.enviroment
    access_token:isPreview?PROCESS.env.PREVIEW_ACCESS_TOKEN:PROCESS.env.DELIVERY_ACCESS_TOKEN
  })
}

// MIGARATION/ABC


module.export = function(migration){
  const product = migration.editContentType('products')

  product.createField('discountPrice').label('Discount Price').rquired(false).type('number')

  product.changeFeildControl('discountPrice','builtin','numberEditor')
}


//api/preview.ts
import {draftMode} from 'next/cache'
import {Response,Request} from 'next'

//For preview, I usually use GET because Contentful opens a preview URL in the browser. The route validates a secret, enables Next.js draft mode, and redirects to the requested slug.
export function async get(request){
  const token = request.get('token')
  const slug  = request.get('slug')

  if(!token || token !== PROCESS.env.TOKEN){
    return Response.json({message:'invalid token',status:401})
  }

  if(slug){
     return Response.json({message:'no slug provided',status:400})
  }

  draftMode.isEnabled = true
  redirect(slug)
}


//api/webhook.ts
//For webhooks or revalidation, I use POST because Contentful sends an event payload when content is published.

//api/revalidate.ts
import {revlaidate} from 'next/cache'
import {Response,Request} from 'next'

export async function Post(request){

const locale={
  en:'en-us'
  in:'en-in'
}
  const token = request.header.get('xs-contentful-header')
  const entryId = request.body.sys.id
  const contentTypeid = request.body.contentType.sys.id
  const slug = request.body.field.slug[locale[request.locale]]


  if(!token || token !== PROCESS.env.TOKEN){
    return Response.json({message:'invalid token',status:401})
  }

  if(!entryId || !contentTypeid ){
    return Response.json({message:'entryId or ContentTypeId is not present',status:400})
  }

  if(slug){
    revalidate(slug)
    return Response.json({message:'sucess',status:200})
  }
   return Response.json({message:'slug is not present',status:400})

}

//page.tsx
import {draftMode} from 'next/cache'
import [getContentFullClient] from './lib/contentfull'

export async function Page({param}){
  const locale={
  en:'en-us'
  in:'en-in'
}
const client = await getContentFullClient(draftMode.isEnabled)
const a = client.getEntries({
  content_type:'prduct'
  slug:prams.slug
  locale:locale[params.locale]
})
}

```




## Perfomace

use Webhook logic(revalidate) plus webvitals

## 15) Error handling / fallback handling

if after hittl the url the resonsel null we show notfound default page of next js offcure with our wion styling

## contentful has Limits

paid version has 1gb limit and image has its own limit if its biigger than 20mb image api cannot optimize it mits better to updalod 500kb image

## Price COnversion

Contenfull doesnot convert we can price and curency in contnet type and use this data in backend or front end and use rate conversion api(ExchangeRate-API)
