/**
 * Resolves local asset paths to their Vite-compiled URLs.
 * Extracts the filename from paths like '/assets/logo.png' and resolves against the src/assets/ folder.
 * If the path is an external URL, it returns it unchanged.
 * 
 * @param {string} path - The asset path to resolve (e.g. '/assets/profile_zan.jpg')
 * @returns {string} The resolved asset URL
 */
export function resolveAsset(path) {
  if (!path) return ''
  
  // If it's an external URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // Remove leading slash and the 'assets/' prefix
  const cleanPath = path.replace(/^\/?assets\//, '')
  
  // Use Vite's native dynamic asset resolution
  try {
    return new URL(`../assets/${cleanPath}`, import.meta.url).href
  } catch (e) {
    console.warn(`[resolveAsset] Failed to resolve asset path: ${path}`, e)
    return path
  }
}
