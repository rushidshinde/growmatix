import { XMLParser, XMLValidator } from 'fast-xml-parser'

const allowedChangeFreqs = [
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
]

export const validateSitemapXML = (value: string) => {
  if (!value) {
    return 'Sitemap XML is required.'
  }

  // 1. Check if it's well-formed XML
  const validationResult = XMLValidator.validate(value)
  if (validationResult !== true) {
    return `Malformed XML: ${validationResult.err.msg}`
  }

  // 2. Parse and validate structure
  try {
    const parser = new XMLParser({ ignoreAttributes: false })
    const parsed = parser.parse(value)

    if (!parsed.urlset || !parsed.urlset.url) {
      return 'Root element <urlset> or <url> tags are missing.'
    }

    const urls = Array.isArray(parsed.urlset.url)
      ? parsed.urlset.url
      : [parsed.urlset.url]

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      const entryNum = i + 1

      if (!url.loc || typeof url.loc !== 'string' || !url.loc.trim()) {
        return `<loc> tag is required in <url> entry ${entryNum}`
      }

      if ('priority' in url) {
        const prio = parseFloat(url.priority)
        if (isNaN(prio) || prio < 0 || prio > 1) {
          return `<priority> must be between 0.0 and 1.0 in <url> entry ${entryNum}`
        }
      }

      if ('changefreq' in url) {
        if (!allowedChangeFreqs.includes(url.changefreq)) {
          return `<changefreq> must be one of: ${allowedChangeFreqs.join(', ')} in <url> entry ${entryNum}`
        }
      }

      if ('lastmod' in url) {
        const isValidDate = !isNaN(Date.parse(url.lastmod))
        if (!isValidDate) {
          return `<lastmod> must be a valid date in <url> entry ${entryNum}`
        }
      }

      // Optional: enforce that no other unexpected tags are present
      const allowedTags = ['loc', 'lastmod', 'changefreq', 'priority']
      const extraTags = Object.keys(url).filter((tag) => !allowedTags.includes(tag))
      if (extraTags.length > 0) {
        return `Invalid tag(s) <${extraTags.join(', ')}> in <url> entry ${entryNum}`
      }
    }

    return true
  } catch (err) {
    return 'Invalid XML or failed to parse the structure.'
  }
}