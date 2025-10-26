import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

// --- Global 1: global-settings ---
const GLOBAL_SETTINGS_SLUG = 'global-settings' as const
const GLOBAL_SETTINGS_DEPTH = 1

async function getGlobalSettings() {
  const payload = await getPayload({ config: configPromise })

  return await payload.findGlobal({
    slug: GLOBAL_SETTINGS_SLUG,
    depth: GLOBAL_SETTINGS_DEPTH,
  })
}

export const getCachedGlobalSettings = unstable_cache(
  async () => getGlobalSettings(),
  [GLOBAL_SETTINGS_SLUG],
  { tags: [`global_${GLOBAL_SETTINGS_SLUG}`] }
)

// --- Global 2: header-nav ---
const HEADER_NAV_SLUG = 'header-nav' as const
const HEADER_NAV_DEPTH = 1

async function getHeaderNav() {
  const payload = await getPayload({ config: configPromise })

  return await payload.findGlobal({
    slug: HEADER_NAV_SLUG,
    depth: HEADER_NAV_DEPTH,
  })
}

export const getCachedHeaderNav = unstable_cache(
  async () => getHeaderNav(),
  [HEADER_NAV_SLUG],
  { tags: [`global_${HEADER_NAV_SLUG}`] }
)