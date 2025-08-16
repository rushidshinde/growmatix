export const restrictedRoutes = ["/blog", "/blog/*"]

export const isRouteRestricted = (path: string): boolean => {
  if (!path) {
    return true
  }

  // Ensure path starts with "/" for consistent comparison
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return restrictedRoutes.some((restrictedRoute) => {
    // Handle wildcard patterns (e.g., "/blog/*")
    if (restrictedRoute.endsWith("/*")) {
      const basePath = restrictedRoute.slice(0, -2) // Remove "/*"
      // Check if path matches base path exactly or is a sub-path
      return normalizedPath === basePath || normalizedPath.startsWith(basePath + "/")
    }

    // Handle exact matches (e.g., "/blog")
    return normalizedPath === restrictedRoute
  })
}
