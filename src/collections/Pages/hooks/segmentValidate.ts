import { CollectionBeforeValidateHook } from 'payload'
import { Page } from '@/payload-types'

export const segmentValidate:CollectionBeforeValidateHook<Page> = ({ data }) => {
  // Ensure segments exist and are properly formatted
  if (data?.segments && Array.isArray(data.segments)) {
    data.segments = data.segments.map((item) => ({
      ...item,
      segment: item.segment
        ?.toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, ""),
    }))
  }
  return data
}