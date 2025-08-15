import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon, ComposeIcon, EditIcon, ImageIcon, CogIcon} from '@sanity/icons'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  groups: [
    {
      name: 'contents',
      icon: ComposeIcon,
      default: true,
    },
    {
      name: 'media',
      icon: ImageIcon,
    },
    {
      name: 'button',
      icon: EditIcon,
    },
    {
      name: 'designSystem',
      icon: CogIcon,
    },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'contents',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'contents',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      group: 'contents',
    }),
    defineField({
      name: 'button',
      type: 'button',
      group: 'button',
    }),
    defineField({
      name: "image",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'theme',
      type: 'object',
      title: 'Color Theme',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'themeName',
          initialValue: 'light',
          type: 'string',
          title: 'Theme Name',
          options: {
            list: [
              {title: 'Light', value: 'light'},
              {title: 'Dark', value: 'dark'},
              {title: 'Custom', value: 'custom'},
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Theme Background Color',
          type: 'color',
          options: {
            collapsible: false,
          },
          hidden: ({parent}) => parent?.themeName !== 'custom',
        }),
        defineField({
          name: 'customTextColor',
          title: 'Custom Theme Text Color',
          type: 'color',
          options: {
            collapsible: false,
          },
          hidden: ({parent}) => parent?.themeName !== 'custom',
        }),
        defineField({
          name: 'customButtonBgColor',
          title: 'Custom Button Background Color',
          type: 'color',
          options: {
            collapsible: false,
          },
          hidden: ({parent}) => parent?.themeName !== 'custom',
        }),
        defineField({
          name: 'customButtonTextColor',
          title: 'Custom Button Text Color',
          type: 'color',
          options: {
            collapsible: false,
          },
          hidden: ({parent}) => parent?.themeName !== 'custom',
        }),
      ],
      group: 'designSystem',
    }),

    defineField({
      name: 'layout',
      type: 'object',
      description: 'The button of the call to action',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'orientation',
          title: 'Content Flow Direction',
          initialValue: 'horizontal',
          description: 'Does the CTA flow horizontally or vertically?',
          type: 'string',
          options: {
            list: ['horizontal', 'vertical'],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'contentAlignment',
          title: 'Content Order',
          type: 'string',
          initialValue: 'textFirst',
          description:
            'In the chosen flow direction (horizontal or vertical), does body (rich text and embedded media) or main media (image or video) come first?',
          options: {
            list: [
              {title: 'Body then Main Media', value: 'textFirst'},
              {title: 'Main Media then Body', value: 'mediaFirst'},
            ],
            layout: 'radio',
          },
        }),
      ],
      group: 'designSystem',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'image.asset',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Call to Action',
        media: image || undefined
      }
    },
  },
})
