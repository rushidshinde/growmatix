import type { MetadataRoute } from 'next'
import { GlobalSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { staticRoutesForSitemap } from '@/utilities/staticRoutesForSitemap'
import { unstable_cache } from 'next/cache'
import { XMLParser, XMLValidator } from 'fast-xml-parser'

const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const siteSetting: GlobalSetting = await getCachedGlobal('global-settings', 1)();
  const serverURL = getServerSideURL();
  const payload = await getPayload({ config: configPromise })
  const autoGenerateSitemap = siteSetting?.sitemap?.autoGenerateSitemap

  if(autoGenerateSitemap) {
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        fullPath: true,
        updatedAt: true,
      },
      where:{
        'advanced.robots.index': {
          equals: true,
        },
      },
      sort: 'createdAt'
    })
    const blogs = await payload.find({
      collection: 'blog',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        fullPath: true,
        updatedAt: true,
      },
      sort: 'createdAt'
    })
    const staticRoutes = staticRoutesForSitemap?.map(route=>({
      url: `${serverURL}${route.fullPath}`,
      lastModified: new Date(),
    }));
    const pagesSitemap = pages?.docs?.map(doc => ({
      url: `${serverURL}${doc.fullPath === '/' ? '' : doc.fullPath}`,
      lastModified: new Date(doc.updatedAt) || new Date(),
    }));
    const blogsSitemap = blogs?.docs?.map(doc => ({
      url: `${serverURL}${doc.fullPath === '/' ? '' : doc.fullPath}`,
      lastModified: new Date(doc.updatedAt) || new Date(),
    }));
    return [...pagesSitemap, ...staticRoutes, ...blogsSitemap];
  } else {
    const sitemapXml = siteSetting?.sitemap?.customSitemap?.xmlData ?? '';
    const sitemapData = parseSitemapXML(sitemapXml)
    return [...sitemapData]
  }
}

const cachedSitemap = unstable_cache(generateSitemap, ['sitemap'], {
  tags: ['sitemap'],
})
export default cachedSitemap


function parseSitemapXML(xmlString: string): MetadataRoute.Sitemap {
  const isValid = XMLValidator.validate(xmlString);
  if (isValid !== true) {
    throw new Error('Invalid XML');
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    allowBooleanAttributes: true,
    processEntities: false,
  });

  const parsed = parser.parse(xmlString);
  const urls = parsed.urlset?.url;
  if (!urls) return [];
  const urlArray = Array.isArray(urls) ? urls : [urls];
  return urlArray
    .filter((entry: any) => {
      const loc = entry.loc;
      if (!loc) return false;
      try {
        new URL(loc);
        return true;
      } catch {
        console.warn(`Invalid URL skipped: ${loc}`);
        return false;
      }
    })
    .map((entry: any): MetadataRoute.Sitemap[number] => {
      const sitemapEntry: MetadataRoute.Sitemap[number] = {
        url: entry.loc,
      };
      if (entry.lastmod) {
        sitemapEntry.lastModified = entry.lastmod;
      }
      if (
        entry.changefreq &&
        ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].includes(entry.changefreq)
      ) {
        sitemapEntry.changeFrequency = entry.changefreq;
      }
      if (entry.priority && !isNaN(parseFloat(entry.priority))) {
        sitemapEntry.priority = parseFloat(entry.priority);
      }
      return sitemapEntry;
    });
}