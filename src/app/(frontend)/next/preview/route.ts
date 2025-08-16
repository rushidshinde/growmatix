import type { CollectionSlug, PayloadRequest } from "payload"
import { getPayload } from "payload"

import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

import configPromise from "@payload-config"

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  } & Request,
): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get("path")
  const collection = searchParams.get("collection") as CollectionSlug
  const previewSecret = searchParams.get("previewSecret")

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", { status: 403 })
  }

  if (!path || !collection) {
    return new Response("Insufficient search params", { status: 404 })
  }

  if (!path.startsWith("/")) {
    return new Response("This endpoint can only be used for relative previews", { status: 500 })
  }

  if (collection === "pages") {
    try {
      const result = await payload.find({
        collection: "pages",
        where: {
          fullPath: {
            equals: path,
          },
        },
        limit: 1,
        draft: true,
      })

      if (!result.docs || result.docs.length === 0) {
        return new Response("Page not found", { status: 404 })
      }
    } catch (error) {
      payload.logger.error({ err: error }, "Error finding page for preview")
      return new Response("Error finding page", { status: 500 })
    }
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, "Error verifying token for live preview")
    return new Response("You are not allowed to preview this page", { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response("You are not allowed to preview this page", { status: 403 })
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  draft.enable()

  redirect(path)
}