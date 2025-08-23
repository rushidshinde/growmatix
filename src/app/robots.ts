import { MetadataRoute } from 'next'
import { GlobalSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'

export default async function robots(): Promise<MetadataRoute.Robots> {

  const siteSetting: GlobalSetting = await getCachedGlobal('global-settings', 1)()
  const serverURL = getServerSideURL();

  const rules = siteSetting?.robotsFile?.rules ?? []

  const transformedRules: MetadataRoute.Robots['rules'] = Array.isArray(rules) && rules.length > 0
    ? rules.map(rule => {
      const allow = rule.allow?.map(a => a.value).filter(Boolean) || []
      const disallow = rule.disallow?.map(d => d.value).filter(Boolean) || []

      // Ensure /admin/ is always disallowed
      const disallowWithAdmin = disallow.includes('/admin/')
        ? disallow
        : ['/admin/', ...disallow]

      return {
        userAgent: rule.userAgent,
        ...(allow.length > 0 && {
          allow: allow.length === 1 ? allow[0] : allow,
        }),
        disallow: disallowWithAdmin.length === 1 ? disallowWithAdmin[0] : disallowWithAdmin,
      }
    })
    : [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
    ]

  return {
    rules: transformedRules,
    sitemap: `${serverURL}/sitemap.xml`,
  }
}
