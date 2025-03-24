export default {
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    {
      name: 'associatedContent',
      title: 'Associated Content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'event' }, { type: 'class' }, { type: 'resource' }],
        },
      ],
    },
    {
      name: 'sponsors',
      title: 'Sponsors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }, { type: 'organization' }],
        },
      ],
    },
    {
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{ type: 'person' }],
    },
  ],
}
