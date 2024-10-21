import { appendReport } from "../errors/appendReport.js"
import { importAll } from "../import/importAll.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"

export class Require implements Stmt {
  constructor(
    public path: string,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const url = new URL(this.path, mod.url)
      const fetcher = mod.loader.fetcher

      if (mod.loader.loading.has(url.href)) {
        throw new Error(
          [
            `[Require.execute] I can not do circular require.`,
            ``,
            `  loading module url: ${fetcher.formatURL(mod.url)}`,
            `  requiring module url: ${fetcher.formatURL(url)}`,
          ].join("\n"),
        )
      }

      if (mod.requiredMods.get(url.href)) {
        return
      }

      const loadedMod = await mod.loader.load(url)
      importAll(mod, loadedMod)

      for (const [key, requiredMod] of loadedMod.requiredMods) {
        mod.requiredMods.set(key, requiredMod)
      }

      mod.requiredMods.set(url.href, loadedMod)
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Require.execute] I fail to require module.`,
          ``,
          `  path: "${this.path}"`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
