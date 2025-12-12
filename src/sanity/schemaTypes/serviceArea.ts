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
            name: 'parent',
            title: 'Parent Region',
            type: 'reference',
            to: [{ type: 'serviceArea' }],
            description: 'Select the parent region if this is a sub-area (e.g., Select "Noida" for "Noida Sector 18").'
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Custom title for browser tab and search engines (overrides default)',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            description: 'Localized description for this specific area page.'
        }),
        defineField({
            name: 'orderRank',
            title: 'Order Rank',
            type: 'number',
            description: 'Used to sort the service areas (e.g. 1 for Noida, 2 for Greater Noida, 3 for Ghaziabad). Lower numbers appear first.',
            initialValue: 100
        }),
        defineField({
            name: 'commonPests',
            title: 'Common Pests in this Area',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'pest' } }],
        }),
    ],
})
