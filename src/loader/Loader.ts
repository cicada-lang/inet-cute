import fs from "fs"
import { Mod } from "../lang/mod"
import { createMod } from "../lang/mod/createMod"
import { parseStmts } from "../lang/syntax"

export class Loader {
  private cache: Map<string, Mod> = new Map()

  constructor() {
    //
  }

  async load(url: URL): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found

    if (url.protocol === "file:") {
      const text = await fs.promises.readFile(url.pathname, "utf8")
      const mod = createMod(url, text)
      const stmts = parseStmts(text)
      for (const stmt of stmts) {
        await stmt.execute(mod)
      }

      this.cache.set(url.href, mod)
      return mod
    }

    throw new Error(
      [
        `[Loader.load] I fail to load url.`,
        ``,
        `  unknown protocol: ${url.protocol}`,
        `  url: ${url.href}`,
      ].join("\n"),
    )
  }
}
