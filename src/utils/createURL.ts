import { resolve } from "node:path"

export function createURL(path: string): URL {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("https://")
  ) {
    return new URL(path)
  }

  return new URL(`file:///${resolve(path)}`)
}
