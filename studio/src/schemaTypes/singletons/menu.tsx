import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'menu',
    title: 'Menu',
    type: 'document',
    fields: [
        defineField({
            name: 'categories',
            title: 'Menu Categories',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'category',
                    title: 'Category',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Category Name',
                            type: 'string',
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: 'items',
                            title: 'Menu Items',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'item',
                                    title: 'Menu Item',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Item Title',
                                            type: 'string',
                                            validation: Rule => Rule.required(),
                                        }),
                                        defineField({
                                            name: 'description',
                                            title: 'Description',
                                            type: 'text',
                                        }),
                                        defineField({
                                            name: 'price',
                                            title: 'Price',
                                            type: 'number',
                                            validation: Rule => Rule.min(0),
                                        }),
                                    ],
                                },
                            ],
                        }),
                    ],
                },
            ],
        }),
    ],
})