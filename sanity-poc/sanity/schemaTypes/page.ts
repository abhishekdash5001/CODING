import { defineField, defineType } from "sanity";

export const page = defineType({
  // defineType  means create 1 sanity content type like
  // type Page = {
  //     title: string;
  //     slug: string;
  //     description: string;
  //   }

  // sanity schema create cms forms
  name: "page", // this a internal name that sanity stores as __type ='page' so later when we query we will do[_type]='page' its like an id very important
  title: "Page", // this is human readble name that is shown in sanity studio
  type: "document",
  /*
Document 1:
  _type: page
  title: Home
  slug: home

Document 2:
  _type: page
  title: About
  slug: about

  its like content entry in contentful
  */
  fields: [
    // this will deicde what input feids content editors will see
    defineField({
      name: "title", // as usual this internal field key
      title: "Title", // label shown in cms form
      type: "string", //single line text feild
      validation: (Rule) => Rule.required(), // content editors cannot publish/save unless the field has a value
    }),
    defineField({
      name: "slug", // as usual the internal field key
      title: "Slug", // label
      type: "slug", // url frednly path
      options: {
        source: "title", // sanity can create url from the title About Us can become /about-us
      },
      validation: (Rule) => Rule.required(),

      /*
sanity stores like this
 
{
  "slug": {
    "current": "about-us"
  }
}
      */
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text", // multi line
    }),
    defineField({
      name: "body", // internal use
      title: "Body", //label in the form
      type: "array", //Portable Text is stored as an array because rich content is made of multiple blocks.

      /**
         * 
         * "body": [
  {
    "_type": "block",
    "style": "h2",
    "children": [...]
  },
  {
    "_type": "block",
    "style": "normal",
    "children": [...]
  }
]
         */
      of: [{ type: "block" }], // tells sanity this array containr rich text block
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
        // it allows editor to mark important focus area in the image so if smaller screen when imgae aer cropeed sanouty ties keep the impotant isble
        //when cropped
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [
        {
          type: "reference", // of type refence this related product
          to: [{ type: "product" }], // this feild will used to add prdouct ducments only
        },
      ],
    }),

    defineField({
//         sections is an array
// each item can be either heroSection or textSection
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "heroSection",
        },
        {
          type: "textSection",
        },
      ],
    }),
  ],
});
