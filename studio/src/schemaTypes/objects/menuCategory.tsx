import {defineType, defineField} from 'sanity'

export const menuCategory = defineType({
    title: 'Menu Category',
    name: 'menuCategory',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'links',
        title: 'Menu Links',
        type: 'array',
        of: [{type: 'link'}],
        validation: (Rule) => Rule.required().min(1),
      }),
    ],
    preview: {
      select: {
        title: 'title',
        itemCount: 'items.length',
      },
      prepare({title, itemCount}) {
        return {
          title,
          subtitle: `${itemCount} item${itemCount === 1 ? '' : 's'}`,
        };
      },
    },
  }); 