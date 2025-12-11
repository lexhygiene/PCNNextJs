import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'serviceArea',
    title: 'Service Area',
    type: 'document',
    fields: [
        defineField({
            name: 'locationName',
            title: 'Location Name (City/Region)',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'locationName',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            description: 'Localized description for this specific area page.'
        }),
        defineField({
            name: 'commonPests',
            title: 'Common Pests in this Area',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'pest' } }],
        }),
    ],
})
