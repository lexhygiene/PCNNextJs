import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import category from './category'
import post from './post'
import pest from './pest'
import serviceArea from './serviceArea'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, category, pest, serviceArea, blockContent],
}
