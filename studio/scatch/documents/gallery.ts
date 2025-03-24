import { defineType } from 'sanity'

import tagType from './tag'

export default defineType({
  name: 'gallery',
  type: 'document',
  title: 'Gallery',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: tagType.name } }],
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  title: 'Block',
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  lists: [],
                },
              ],
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'display',
      type: 'string',
      title: 'Display as',
      description: 'How should we display these images?',
      options: {
        list: [
          { title: 'Stacked', value: 'stacked' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Slideshow', value: 'slideshow' },
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    },
    {
      name: 'lightbox',
      type: 'boolean',
      title: 'Lightbox enabled',
      description: 'Should we enable opening of a lightbox on image click?',
    },
    {
      name: 'zoom',
      type: 'boolean',
      title: 'Zoom enabled',
      description: 'Should we enable hover zooming of images?',
    },
  ],
  preview: {
    select: {
      name: 'name',
      images: 'images',
    },
    prepare(selection: any) {
      const { name, images } = selection

      return {
        title: name,
        media: images[0],
      }
    },
  },
})
