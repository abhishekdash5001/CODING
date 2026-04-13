<!-- 2) Add metadata -->

You usually write metadata in:

app/layout.js or app/layout.tsx → for site-wide metadata
app/page.js or app/page.tsx → for one page
app/products/[slug]/page.js → for dynamic page metadata



import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse all products',
}




import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProduct()

  return {
    title: product.name,
    description: product.summary,
  }
}


1) Exposing robots.txt

This is a file for search engine bots.

It tells bots:

which pages they can crawl
which pages they should avoid
where sitemap is

Example:


# Add Crawl Files#

sitemap.xml

plus built-in metadata APIs for title, description, robots, canonical, Open Graph, Twitter tags, and metadata files like robots.txt and sitemap.xml

# robots.txt = rules for bots #
# sitemap.xml = map of pages
