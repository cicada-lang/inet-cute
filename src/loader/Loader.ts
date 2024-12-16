import { Fetcher } from "../fetcher/index.ts"
import { createMod } from "../lang/mod/createMod.ts"
import { type Mod } from "../lang/mod/index.ts"
import { parseStmts } from "../lang/syntax/index.ts"

export class Loader {
  loaded: Map<string, Mod> = new Map()
  loading: Set<string> = new Set()
  fetcher: Fetcher
  onOutput = (output: string) => {
    console.log(output)
  }

  constructor(options: { fetcher: Fetcher }) {
    this.fetcher = options.fetcher
  }

  async load(url: URL, options?: { text?: string }): Promise<Mod> {
    const found = this.loaded.get(url.href)
    if (found !== undefined) return found

    const text =
      options?.text === undefined
        ? await this.fetcher.fetchText(url)
        : options.text

    const stmts = parseStmts(text)
    const mod = createMod({
      loader: this,
      url,
      text,
      stmts,
    })

    this.loading.add(url.href)

    for (const stmt of stmts) {
      await stmt.execute(mod)
    }

    this.loading.delete(url.href)

    this.loaded.set(url.href, mod)

    return mod
  }
}
