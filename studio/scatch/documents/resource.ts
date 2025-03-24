import { defineType } from 'sanity'

import blockContentType from '../utilities/blockContent'
import personType from './person'
import tagType from './tag'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'type',
      title: 'Type (Entity Kind)',
      type: 'reference',
      to: { type: 'entityKind' },
    },
    {
      name: 'person',
      title: 'Author (person)',
      type: 'reference',
      to: { type: personType.name },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: tagType.name } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: blockContentType.name,
    },
  ],

  preview: {
    select: {
      title: 'title',
      person: 'person.name',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { person } = selection
      return { ...selection, subtitle: person && `by ${person}` }
    },
  },
})
