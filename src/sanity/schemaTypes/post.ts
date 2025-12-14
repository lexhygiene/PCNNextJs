import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'mainImageExternalUrl',
            title: 'External Main Image URL',
            type: 'url',
            description: 'Use a Cloudinary/External URL instead of uploading an image. This takes priority over "Main image".',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })
        }),
        defineField({
            name: 'mainImageExternalAlt',
            title: 'External Image Alt Text',
            type: 'string',
            description: 'Alt text for the external image. Important for SEO. Defaults to post title if left empty.',
            hidden: ({ document }) => !document?.mainImageExternalUrl
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Custom title for search engines. Defaults to Title if empty.'
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            description: 'Meta description for search engines.'
        }),
        defineField({
            name: 'featured',
            title: 'Featured (Pin to Top)',
            type: 'boolean',
            initialValue: false,
            description: 'Toggle ON to pin this post to the top of the list.'
        }),
        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url',
            description: 'The preferred URL for this content. Use this if the content was originally published elsewhere (e.g. Medium, LinkedIn) to prevent duplicate content issues.',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
