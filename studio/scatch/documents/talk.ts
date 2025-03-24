import resource from './resource'

export default {
  name: 'talk',
  title: 'Talk',
  type: 'document',
  fields: [
    ...resource.fields,
    { name: 'primaryVideo', title: 'Primary Video', type: 'youtube' },
    { name: 'secondaryVideo', title: 'Secondary Video', type: 'youtube' },
  ],
}
