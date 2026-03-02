import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import type {Link, Settings} from '../../../sanity.types'

import * as demo from '../../lib/initialValues'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'homepage', title: 'Homepage'},
    {name: 'about', title: 'About'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    // ── General ──
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      group: 'general',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Used on the Homepage',
      title: 'Description',
      type: 'array',
      group: 'general',
      initialValue: demo.description,
      of: [
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'linkType',
                    title: 'Link Type',
                    type: 'string',
                    initialValue: 'href',
                    options: {
                      list: [
                        {title: 'URL', value: 'href'},
                        {title: 'Page', value: 'page'},
                        {title: 'Post', value: 'post'},
                      ],
                      layout: 'radio',
                    },
                  }),
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'href' && !value) {
                          return 'URL is required when Link Type is URL'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'page',
                    title: 'Page',
                    type: 'reference',
                    to: [{type: 'page'}],
                    hidden: ({parent}) => parent?.linkType !== 'page',
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'page' && !value) {
                          return 'Page reference is required when Link Type is Page'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'post',
                    title: 'Post',
                    type: 'reference',
                    to: [{type: 'post'}],
                    hidden: ({parent}) => parent?.linkType !== 'post',
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as Link
                        if (parent?.linkType === 'post' && !value) {
                          return 'Post reference is required when Link Type is Post'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'general',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              const document = context.document as Settings
              if (document?.ogImage?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),

    // ── Homepage ──
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      description: 'Small text above the large name, e.g. "HELLO, I\'M"',
      type: 'string',
      group: 'homepage',
      initialValue: "HELLO, I'M",
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      description: 'The large name displayed on the homepage hero.',
      type: 'string',
      group: 'homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroIntro',
      title: 'Hero Introduction',
      description: 'The intro paragraph displayed under your name on the homepage.',
      type: 'text',
      group: 'homepage',
      rows: 3,
    }),
    defineField({
      name: 'statusLine',
      title: 'Status Line',
      description: 'Displayed in mono font below social icons, e.g. "Currently building @ Shopify"',
      type: 'string',
      group: 'homepage',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Social media profiles displayed on homepage and footer.',
      type: 'array',
      group: 'homepage',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Twitter / X', value: 'twitter'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        }),
      ],
    }),

    defineField({
      name: 'featuredTweets',
      title: 'Featured Tweets',
      description: 'Paste tweet URLs to embed on the homepage. e.g. https://x.com/Benuoa/status/123456789',
      type: 'array',
      group: 'homepage',
      of: [
        defineArrayMember({
          type: 'url',
          validation: (rule) =>
            rule.uri({scheme: ['https']}).custom((url) => {
              if (!url) return true
              if (/^https:\/\/(x\.com|twitter\.com)\/.+\/status\/\d+/.test(url)) return true
              return 'Must be a tweet URL (https://x.com/user/status/...)'
            }),
        }),
      ],
    }),

    // ── About ──
    defineField({
      name: 'profileAuthor',
      title: 'Profile Author',
      description: 'Select the person to display on the About Me profile card.',
      type: 'reference',
      to: [{type: 'person'}],
      group: 'about',
    }),
    defineField({
      name: 'profileTagline',
      title: 'Profile Tagline',
      description: 'Free-text line shown below the profile title, e.g. "@benuoa everywhere"',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Bio',
      description: 'Bio paragraphs for the About Me section on the homepage.',
      type: 'array',
      group: 'about',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'profileTitle',
      title: 'Profile Title',
      description: 'Short title shown on profile card, e.g. "Shopify Developer + E-commerce"',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'topics',
      title: 'Topics / Skills',
      description: 'Topics you write about — displayed as colored pills.',
      type: 'array',
      group: 'about',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'topic',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Color',
              description: 'Optional — a random color will be used if not set.',
              type: 'color',
            }),
          ],
          preview: {
            select: {title: 'name', color: 'color.hex'},
            prepare({title, color}) {
              return {
                title,
                subtitle: color || 'No color set',
              }
            },
          },
        }),
      ],
    }),

    // ── Footer ──
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      description: 'Rich text displayed on the left side of the footer.',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      description: 'Links displayed on the right side of the footer.',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
