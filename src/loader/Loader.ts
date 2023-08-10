import { Fetcher } from "../fetcher"
import { Mod } from "../lang/mod"
import { createMod } from "../lang/mod/createMod"
import { parseStmts } from "../lang/syntax"

export class Loader {
  private cache: Map<string, Mod> = new Map()

  constructor(public fetcher: Fetcher) {}

  async load(url: URL): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found

    const text = await this.fetcher.fetchText(url)
    const mod = createMod(url, text)
    const stmts = parseStmts(text)
    for (const stmt of stmts) {
      await stmt.execute(mod)
    }

    this.cache.set(url.href, mod)
    return mod
  }
}
