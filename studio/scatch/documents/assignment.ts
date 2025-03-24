import resource from './resource'

export default {
  name: 'assignment',
  title: 'Assignment',
  type: 'document',
  fields: [
    ...resource.fields,
    {
      name: 'assignedTimestamp',
      title: 'Assigned Timestamp',
      type: 'datetime',
    },
    { name: 'dueTimestamp', title: 'Due Timestamp', type: 'datetime' },
  ],
}
