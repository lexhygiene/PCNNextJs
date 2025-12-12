
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lead',
    title: 'Leads & Inquiries',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'heardAbout',
            title: 'Source (Heard About)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Project/Requirement Details',
            type: 'text',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'Converted', value: 'converted' },
                    { title: 'Closed', value: 'closed' },
                ],
                layout: 'radio'
            },
            initialValue: 'new'
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
            status: 'status'
        },
        prepare(selection) {
            const { title, subtitle, status } = selection
            return {
                title: title || 'No Name',
                subtitle: `${subtitle} [${status.toUpperCase()}]`
            }
        }
    }
})
