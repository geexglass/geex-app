import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  type: 'document',
  name: 'person',
  title: 'Person',
  fields: [
    defineField({
      type: 'string',
      name: 'firstName',
      title: 'First Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'lastName',
      title: 'Last Name',
    }),
    defineField({
      type: 'boolean',
      name: 'isVisible',
      title: 'Is the user profile publicly visible?',
    }),
    // defineField({
    //   type: 'json',
    //   name: 'settings',
    //   title: 'Settings',
    // }),
    defineField({
      type: 'array',
      name: 'bio',
      title: 'Bio',
      description:
        "This is where you can write the page's content. Including custom blocks like timelines for more a more visual display of information.",
      of: [
        // Paragraphs
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
        // Custom blocks
        defineArrayMember({
          name: 'timeline',
          type: 'timeline',
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),
    defineField({
      type: 'image',
      name: 'portrait',
      title: 'Portrait Image',
    }),
    defineField({
      type: 'array',
      name: 'organizations',
      title: 'Organizations',
      of: [{ type: 'reference', to: [{ type: 'organization' }] }],
    }),
    defineField({
      type: 'array',
      name: 'instructedClasses',
      title: 'Instructed Classes',
      of: [{ type: 'reference', to: [{ type: 'class' }] }],
    }),
    defineField({
      type: 'array',
      name: 'events',
      title: 'Events',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
    defineField({
      type: 'array',
      name: 'bookmarkedContent',
      title: 'Bookmarked Content',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resource' }, { type: 'event' }, { type: 'class' }],
        },
      ],
    }),
    defineField({
      type: 'array',
      name: 'authoredContent',
      title: 'Authored Content',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'resource' },
            { type: 'event' },
            { type: 'class' },
            { type: 'gallery' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Last Name: ${subtitle}`,
      }
    },
  },
})
