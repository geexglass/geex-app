export default {
  name: 'class',
  title: 'Class',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'attendees',
      title: 'Attendees',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'startDate', title: 'Start Date', type: 'datetime' },
    { name: 'endDate', title: 'End Date', type: 'datetime' },
    {
      name: 'enrollmentDeadline',
      title: 'Enrollment Deadline',
      type: 'datetime',
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
      name: 'linkedContent',
      title: 'Linked Content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'resource' },
            { type: 'event' },
            { type: 'gallery' },
            { type: 'person' },
            { type: 'class' },
          ],
        },
      ],
    },
    {
      name: 'assignments',
      title: 'Assignments',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'assignment' }] }],
    },
  ],
}
