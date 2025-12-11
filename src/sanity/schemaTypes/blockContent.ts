import { defineType, defineArrayMember } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        defineArrayMember({
            title: 'Block',
            type: 'block',
            // Styles let you set what your user can mark up blocks with. These
            // correspond with HTML tags, but you can set any title or value
            // you want and decide how you want to deal with it where you want to
            // use your content.
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [{ title: 'Bullet', value: 'bullet' }],
            // Marks let you mark up inline text in the block editor.
            marks: {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
                annotations: [
                    {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                                validation: (Rule) => Rule.uri({
                                    scheme: ['http', 'https', 'mailto', 'tel'],
                                    allowRelative: true
                                }),
                            },
                        ],
                    },
                ],
            },
        }),
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        defineArrayMember({
            type: 'image',
            options: { hotspot: true },
        }),
        defineArrayMember({
            type: 'object',
            name: 'htmlEmbed',
            title: 'Raw HTML / Embed',
            fields: [
                {
                    name: 'code',
                    type: 'text',
                    title: 'HTML Code',
                    description: 'Paste raw HTML here (e.g. tables, iframes, scripts).',
                }
            ],
            preview: {
                select: {
                    code: 'code'
                },
                prepare({ code }) {
                    return {
                        title: 'Raw HTML Embed',
                        subtitle: code ? `${code.substring(0, 30)}...` : 'Empty'
                    }
                }
            }
        }),
        defineArrayMember({
            type: 'object',
            name: 'externalImage',
            title: 'External / Cloudinary Image',
            fields: [
                {
                    name: 'url',
                    type: 'url',
                    title: 'Image URL',
                    description: 'Paste the full URL (e.g. from Cloudinary).',
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })
                },
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    description: 'Description for accessibility/SEO.'
                }
            ],
            preview: {
                select: {
                    title: 'alt',
                    subtitle: 'url'
                },
                prepare({ title, subtitle }) {
                    return {
                        title: title || 'External Image',
                        subtitle: subtitle
                    }
                }
            }
        }),
    ],
})
