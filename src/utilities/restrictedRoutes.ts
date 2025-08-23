export const restrictedRoutes = ["/blog/*", "/case-study/*"]

export const isRouteRestricted = (path: string): boolean => {
  if (!path) {
    return true
  }

  // Ensure path starts with "/"
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return restrictedRoutes.some((restrictedRoute) => {
    // Handle wildcard routes like "/blog/*"
    if (restrictedRoute.endsWith("/*")) {
      const basePath = restrictedRoute.slice(0, -2) // "/blog"

      // Allow exact match with basePath (e.g., "/blog" is allowed)
      if (normalizedPath === basePath) {
        return false
      }

      // Restrict if it's a subpath (e.g., "/blog/something")
      return normalizedPath.startsWith(basePath + "/")
    }

    // Exact match
    return normalizedPath === restrictedRoute
  })
}