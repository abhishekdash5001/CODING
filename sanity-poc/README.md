## Santiy Account

We create a sanity account that a cloud backend where your cms content will be stored

## Sanity Project - sanity-poc

Project name: sanity-poc <=== content full space
Project ID: 60yjC9ej
Dataset: production <---- mongodb data base

### Sanity project can have data set like production development and stagging for POC we are using production

## Embeded Sanity Studio

this admin ui where we will create content like Home page product page and other pages

## 5. Clean project

means it did not created predefined shema like blogs ,categories its like sanity doesnot know what schema you want

## 6 page.ts

    We created a file page.ts in Schematype and imported to index.ts  this tells sanity i want content Type PAGE and every page
    will have title slug description and heroImage

    So page.ts is not a front end page like page.tsx but its a kind of content model for sanity CMS

##

```js
Title: Home
Slug: home
Description: This is my first Sanity page
Hero Image: optional image


```

then sanity stores this document in content lake

## 22. Difference between schema and content

schema is like type we crate that deifnes structure and content is content enry actual data

## 23 Sanity IMage when we use GROQ query to fetch image sanity returns an object that is refernce not a url so we cant directly use to so we ned some

## sanity helps to convert this into a url

### @sanity/image-url convertis sanity image asset /object to sanity url

### why sanity can give image url but if it gives url ("heroImageUrl": heroImage.asset->url) then same will be used for mobile.desktop and all butit return object it will other options like hostpot crop info alt and ui can decided of what dimention it wants for eg editot uplodaed 5 mb image ui can decided how much it wants this improved lcp bandwidth performace

```js

urlFor(data.heroImage).width(1200).height(600).url() ==>https://cdn.sanity.io/images/projectId/dataset/image-id-1200x600.jpg
title/description = directly render
image = convert image object to URL, then render

```

## Portable Text -- Rich Text

```js

title        → simple one-line text
description  → simple multi-line text
heroImage    → image object

```

#### we want a field where editor can write proper article/page content:

```js

Heading
Paragraph
Bold text
Links
Bullet list
Number list

```

#### Portable Text is stored as an array because rich content is made of multiple blocks.

#### Santity stores rich text as json as its jon portable multuple front end langauge can undrstand like ract native json is converted to jsx readble bu @portabletext/react in the code

## Sanity refernce

### same as contnet full refernce we refer to content entry so when that entry hange lal pages using that enry will be updated

```js

relatedProduct->{  // related product is of type refernce -> g to the actualy document and fethc th title from the atucal document
   titile
}

relatedProduct[]-> many refernce

```

## Page Builder A page builder is a CMS model where editors can build pages using reusable blocks/sections.

```js
Page: About Us

sections:
  1. Hero Section
  2. Text Section
  3. Product List Section


Page: Home

sections:
  1. Hero Section
  2. Product List Section
  3. Text Section
  4. FAQ Section

```

### without this our schema keeps on growing and to acheive the same we have to make few things mandotry and frw things not

### With Page Builder

```js

Page
title
slug
sections[]

```

## Draft / Preview Mode same content editiors want see the contet in preview before they are pubished how they will look to public users

for noraml webiste - publihsed +cdn + no toke
for preview webist drfat nocdn and token token is reuiqed becasue it s not public faces adn only those with token can see the nre draf data

### token can only be server side so

    ```js

NEXT_PUBLIC_SANITY_API_READ_TOKEN=abc // next_public means borwser can see it
SANITY_API_READ_TOKEN=abc // browser cant

    ```

## Migartion of schema is dont by normal code that we push in git

## migration in content lake is dont by

1.exportitng dev data set to zip file and then impporting the zip file in production - copy and paste replace everything in production (not recommended)
2 Changing existeng contnet shape like descriptoin to shortdescription

       ```js

import { defineMigration, setIfMissing, unset } from "sanity/migrate";

export default defineMigration({
title: "Move page description to shortDescription",
documentTypes: ["page"],

migrate: {
document(doc) {
if (!doc.description) {
return;
}

      return [
        setIfMissing("shortDescription", doc.description),
        unset("description"),
      ];
    },

},
});

       ```

       ```js
1. Copy production data to staging
2. Test schema + migration on staging
3. Validate frontend
4. Backup production
5. Run same migration on production


       ```


##  Final end-to-end architecture explanation
