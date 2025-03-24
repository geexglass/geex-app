import { defineType } from 'sanity'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  description: 'A venue',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'The slug for the geex page for this venue',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'isOnline',
      title: 'Is Online',
      type: 'boolean',
      description:
        'If this is checked, the venue is online and the address fields will be ignored',
    },
    {
      name: 'links',
      title: 'Links',
      description: 'Links to the external sites for this venue',
      type: 'array',
      of: [
        {
          title: 'Link',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'address',
      title: 'Address',
      description: 'Physical address of the venue',
      options: {
        collapsible: true,
        collapsed: true,
      },
      type: 'object',
      fields: [
        { name: 'address1', type: 'string', title: 'Address 1' },
        { name: 'address2', type: 'string', title: 'Address 2' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'region', type: 'string', title: 'Region' },
        { name: 'postalCode', type: 'string', title: 'Postal code' },
      ],
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      options: {
        collapsible: true,
        collapsed: true,
      },
      type: 'geopoint',
      description:
        'This can be used to display the location of the venue when using a mapping service',
    },
  ],
  preview: {
    select: {
      title: 'name',
      address: 'address',
    },
    prepare(selection) {
      const { title, address } = selection

      const formattedAddress = address
        ? Object.keys(address)
            .map((key) => address[key])
            .filter((e) => e.trim().length > 0)
            .join(', ')
        : 'No physical address'

      return {
        title: title,
        subtitle: formattedAddress,
      }
    },
  },
})
