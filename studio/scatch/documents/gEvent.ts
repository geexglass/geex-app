// event.js

import { defineType } from 'sanity'

import PersonType from './person'
import tagType from './tag'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  description: 'An event',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isHero',
      title: 'Is Hero',
      type: 'boolean',
      description: 'Is this event a hero event?',
    },
    {
      name: 'isPublic',
      title: 'Is Public',
      type: 'boolean',
      description: 'Is this event public?',
      initialValue: true,
    },
    {
      fields: [
        {
          name: 'isSubmission',
          title: 'Is Submission',
          type: 'boolean',
          description: 'Is this event a user submitted event?',
        },
        {
          name: 'maxAttendees',
          title: 'Max Attendees',
          type: 'number',
          description: 'Maximum number of attendees',
        },
        {
          name: 'isRegistrationOpen',
          title: 'Is Registration Open',
          type: 'boolean',
          description: 'Is registration open for this event?',
        },
        {
          name: 'requiresSubscription',
          title: 'Requires Subscription',
          type: 'boolean',
          description: 'Do you need to be a GEEX subscriber to register?',
        },
        {
          name: 'isFree',
          title: 'Is Free',
          type: 'boolean',
          initialValue: true,
          description: 'Is this event free?',
        },
        {
          name: 'cost',
          title: 'Cost',
          type: 'number',
          initialValue: 0,
          description: 'What is the minimum cost for attending?',
        },
        {
          name: 'costMax',
          title: 'Cost Max',
          type: 'number',
          description: 'What is the maximum someone can pay to attend?',
        },
        {
          name: 'subscriberDiscount',
          title: 'Subscriber Discount',
          type: 'number',
          description:
            'How much is the minimum cost reduced if the registrant is a subscriber?',
        },
      ],
      name: 'meta',
      options: {
        collapsible: true,
        collapsed: true,
      },
      title: 'Meta',
      type: 'object',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description:
        'A short summary of the event, no more than 2 or 3 sentences',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'A full description of the event',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'An image relevant to the event',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The homepage of the event',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: tagType.name } }],
    },
    {
      name: 'organizers',
      title: 'Organizers',
      type: 'array',
      of: [{ type: 'reference', to: { type: PersonType.name } }],
    },
    {
      name: 'start',
      title: 'Start date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'end',
      title: 'End date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      fields: [
        {
          name: 'frequency',
          title: 'Frequency',
          type: 'string',
          options: {
            list: [
              { title: 'Daily', value: 'daily' },
              { title: 'Weekly', value: 'weekly' },
              { title: 'Monthly', value: 'monthly' },
              { title: 'Yearly', value: 'yearly' },
            ],
          },
        },
        {
          name: 'interval',
          title: 'Interval',
          type: 'number',
          description:
            'Do you want it to recur a maximum number of times? (Leave on 0 for no limit)',
        },
        {
          name: 'until',
          title: 'Until',
          type: 'datetime',
          description:
            'When is the latest you would like to stop recurring the event? (Leave blank for no limit)',
        },
      ],
      name: 'recurring',
      options: {
        collapsible: true,
        collapsed: true,
      },
      title: 'Recurring',
      type: 'object',
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [
        {
          type: 'venue',
        },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      description: 'This can be used to identify the event in a URL',
    },
  ],
  orderings: [
    {
      title: 'Event name',
      name: 'eventNameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Event date',
      name: 'eventDateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      isHero: 'isHero',
      media: 'image',
    },
    prepare(selection: any) {
      const { title, isHero, media } = selection

      return {
        title,
        subtitle: isHero ? 'This is a hero event' : '',
        media,
      }
    },
  },
})
