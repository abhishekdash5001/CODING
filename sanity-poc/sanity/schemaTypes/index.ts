import { type SchemaTypeDefinition } from 'sanity'

import {page} from './page'
import {product}from './product'
import {heroSection} from './heroSection'
import { textSection } from './textSection'



//This file is like a central list of all Sanity content types. if dont inslude or sanity contnt type here studio will not show those contnet type
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page,product,heroSection,textSection],
}
