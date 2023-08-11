import { resolve } from "node:path"

export function createURL(path: string): URL {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("https://")
  ) {
    return new URL(path)
  }

  const absolutePath = resolve(path)
  return new URL(`file://${absolutePath}`)
}
