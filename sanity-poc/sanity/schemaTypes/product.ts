import { defineField, defineType } from "sanity";

export const product = defineType({
    name:'product', // iintername also used for referncing in other documents in contnet lake
    title:'Product',
    type:'document',
    fields:[
        defineField({
            name:'title',
            title:'Title',
            type:'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name:'slug',
            title:'Slug',
            type:'slug',
            options: {
                source: "title",
              },
              validation: (Rule) => Rule.required(),
        }),

        defineField({
            name:'price',
            title:'Price',
            type:'number',
           
              validation: (Rule) => Rule.required(),
        }),

    defineField({
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
        fields: [
          defineField({
            name: "alt",
            title: "Alt Text",
            type: "string",
          }),
        ],
      })
    ]
})