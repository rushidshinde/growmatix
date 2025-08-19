import { CodeFieldValidation, GlobalConfig, TextFieldSingleValidation } from 'payload'
import { anyone } from '@/access/anyone'
import { revalidateGlobalSettings } from '@/globalSettings/hooks/revalidateGlobalSettings'

export const GlobalSettings: GlobalConfig = {
  slug: 'global-settings',
  label: 'Site Settings',
  access: {
    read: anyone,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          label: 'General',
          fields: [
            {
              name: 'name',
              label: 'Site title',
              type: 'text',
              maxLength: 70,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              minLength: 70,
              maxLength: 160,
            },
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  in: ['image/x-icon'],
                },
                width: {
                  in: [48, null],
                },
                height: {
                  in: [48, null],
                },
              },
              admin: {
                description: 'Select a 48 x 48 pixel ICO to display in browser tabs.',
                allowCreate: false,
              },
            },
            {
              name: 'icon16',
              label: 'Icon 16X16',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  in: [
                    'image/x-icon',
                    'image/png',
                    'image/jpeg',
                    'image/jpg',
                    'image/svg+xml',
                    'image/webp',
                    'image/avif',
                  ],
                },
                width: {
                  in: [16, null],
                },
                height: {
                  in: [16, null],
                },
              },
              admin: {
                description: 'Select a 16 x 16 pixel ICO, SVG, WEBP, AVIF, PNG, JPG or JPEG',
                allowCreate: false,
              },
            },
            {
              name: 'icon32',
              label: 'Icon 32X32',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  in: [
                    'image/x-icon',
                    'image/png',
                    'image/jpeg',
                    'image/jpg',
                    'image/svg+xml',
                    'image/webp',
                    'image/avif',
                  ],
                },
                width: {
                  in: [32, null],
                },
                height: {
                  in: [32, null],
                },
              },
              admin: {
                description: 'Select a 32 x 32 pixel ICO, SVG, WEBP, AVIF, PNG, JPG or JPEG',
                allowCreate: false,
              },
            },
            {
              name: 'icon96',
              label: 'Icon 96X96',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  in: [
                    'image/x-icon',
                    'image/png',
                    'image/jpeg',
                    'image/jpg',
                    'image/svg+xml',
                    'image/webp',
                    'image/avif',
                  ],
                },
                width: {
                  in: [96, null],
                },
                height: {
                  in: [96, null],
                },
              },
              admin: {
                description: 'Select a 96 x 96 pixel ICO, SVG, WEBP, AVIF, PNG, JPG or JPEG',
                allowCreate: false,
              },
            },
            {
              name: 'appleTouchIcon180',
              label: 'Apple Touch Icon 180X180',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  in: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif'],
                },
                width: {
                  in: [180],
                },
                height: {
                  in: [180],
                },
              },
              admin: {
                description: 'Select a 180 x 180 pixel WEBP, AVIF, PNG, JPG or JPEG',
                allowCreate: false,
              },
            },
          ],
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: [
            {
              name: 'robots',
              type: 'group',
              admin: {
                description: 'Controls how search engines crawl and index this site.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'index',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                    {
                      name: 'follow',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                    {
                      name: 'nocache',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'googleBot',
              type: 'group',
              admin: {
                description:
                  "Controls how Google's search crawler (Googlebot) crawl and index this site.",
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'index',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                    {
                      name: 'follow',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                    {
                      name: 'noImageIndex',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "schemas",
              type: "array",
              label: "JSON-LD Schema Markup",
              admin: {
                description: "Add structured data markup for search engines. Each schema should be valid JSON-LD. These schemas will be added on entire site",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Schema Name",
                  required: true,
                  admin: {
                    description: "Descriptive name for this schema (e.g., 'Organization', 'Article', 'Product')",
                  },
                },
                {
                  name: "schema",
                  type: "code",
                  label: "JSON-LD Code",
                  required: true,
                  admin: {
                    language: "json",
                    description: "Valid JSON-LD structured data markup",
                  },
                  validate: ((val) => {
                    if (!val) return "Schema code is required"
                    try {
                      const parsed = JSON.parse(val)
                      if (!parsed["@context"]) {
                        return "JSON-LD must include @context property"
                      }
                      if (!parsed["@type"]) {
                        return "JSON-LD must include @type property"
                      }
                      return true
                    } catch (e) {
                      return "Invalid JSON format. Please check your syntax."
                    }
                  }) as CodeFieldValidation,
                },
              ],
            },
            {
              name: 'googleSiteVerification',
              type: 'text',
              label: 'Google Site Verification',
              admin: {
                description:
                  'Verify your site with Google to get access to your site’s Google search data, and submit your sitemap for indexing.',
              },
              validate: ((value) => {
                if (value) {
                  const regex = /^[A-Za-z0-9_-]{40,50}$/
                  return regex.test(value) ? true : 'Invalid Google Site Verification Code'
                }
              }) as TextFieldSingleValidation,
            },
            {
              name: 'facebookSiteVerification',
              type: 'text',
              label: 'Facebook Site Verification',
              admin: {
                description:
                  'Enter Facebook verification code to validate ownership of your domain for Meta services.',
              },
              validate: ((value) => {
                if (value) {
                  const regex = /^[A-Za-z0-9]{30,50}$/
                  return regex.test(value) ? true : 'Invalid Facebook Site Verification Code'
                }
              }) as TextFieldSingleValidation,
            },
          ],
        },
        {
          name: 'integrations',
          label: 'Integrations',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              admin: {
                description:
                  'Enter your Google Analytics Measurement ID to enable website traffic tracking via Google Analytics.',
              },
              validate: ((value) => {
                if (value) {
                  const regex = /^G-[A-Z0-9]{10,20}$/
                  return regex.test(value) ? true : 'Invalid Google Analytics Measurement ID'
                }
              }) as TextFieldSingleValidation,
            },
            {
              name: 'googleTagManagerId',
              type: 'text',
              admin: {
                description: 'Enter your Google Tag Manager (GTM) container ID.',
              },
              validate: ((value) => {
                if (value) {
                  const regex = /^GTM-[A-Z0-9]{6,10}$/
                  return regex.test(value) ? true : 'Invalid GTM container ID'
                }
              }) as TextFieldSingleValidation,
            },
          ],
        },
      ],
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'system',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Select theme for project. Default is System',
      },
      options: [
        {
          label: 'System',
          value: 'system',
        },
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
    },
    {
      name: 'language',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'English (India)',
          value: 'en-IN',
        },
        {
          label: 'English (United Kingdom)',
          value: 'en-GB',
        },
        {
          label: 'English (United States)',
          value: 'en-US',
        },
      ],
    },
    {
      name: 'canonical',
      type: 'text',
      label: 'Global canonical tag URL',
      admin: {
        placeholder: 'https://',
        position: 'sidebar',
      },
      validate: ((value) => {
        if (value) {
          try {
            const parsed = new URL(value)
            const isHttps = parsed.protocol === 'https:'
            return isHttps ? isHttps : 'Only secure URLs are allowed. Use https://'
          } catch (e) {
            return 'Invalid URL'
          }
        }
      }) as TextFieldSingleValidation,
      hooks: {
        beforeChange: [({ value }) => {
          if(value){
            return value.replace(/\/+$/, '');
          }
        }],
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalSettings],
  },
}