import { defineQuery } from "next-sanity";

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    body,

    relatedProducts[]-> {
      title,
      "slug": slug.current,
      price,
      image
    },

    heroImage {
      ...,
      alt
    },

    sections[] {
      ...,
      image {
        ...,
        alt
      }
    }
  }
`);

/**
 * fetch a contnet type where the type is page and slug.current matches the current slug
 */
