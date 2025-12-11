import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pest',
    title: 'Pest Library',
    type: 'document',
    fields: [
        defineField({
            name: 'commonName',
            title: 'Common Name',
            type: 'string',
        }),
        defineField({
            name: 'scientificName',
            title: 'Scientific Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'commonName',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'dangerLevel',
            title: 'Danger Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Low', value: 'low' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'High', value: 'high' }
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'seasonalActivity',
            title: 'Seasonal Activity',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Spring', value: 'Spring' },
                    { title: 'Summer', value: 'Summer' },
                    { title: 'Autumn', value: 'Autumn' },
                    { title: 'Winter', value: 'Winter' },
                ]
            }
        }),
        defineField({
            name: 'behavior',
            title: 'Behavior & Habits',
            type: 'blockContent',
        }),
        defineField({
            name: 'habitat',
            title: 'Habitat',
            type: 'blockContent',
        }),
        defineField({
            name: 'prevention',
            title: 'Prevention Tips',
            type: 'blockContent',
        })
    ],
})
