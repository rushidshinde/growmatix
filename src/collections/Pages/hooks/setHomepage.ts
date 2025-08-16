import { CollectionBeforeChangeHook } from 'payload'

export const setHomepage:CollectionBeforeChangeHook = async ({ data, req, operation, originalDoc }) => {
  // If homepage is being set to true, uncheck all other pages
  if(operation === 'create' || operation === 'update') {
    if (data.homepage === true) {
      await req.payload.update({
        collection: "pages",
        where: {
          and: [
            {
              homepage: {
                equals: true,
              },
            },
            {
              id: {
                not_equals: originalDoc?.id || "new",
              },
            },
          ],
        },
        data: {
          homepage: false,
        },
      })
    }
    return data
  }
}