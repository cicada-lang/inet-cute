import { appendReport } from "../errors/appendReport.js"
import { type ImportBinding } from "../import/ImportBinding.js"
import { formatImportBinding } from "../import/formatImportBinding.js"
import { importMany } from "../import/importMany.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"

export class Import implements Stmt {
  constructor(
    public bindings: Array<ImportBinding>,
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
            `[Import.execute] I can not do circular import.`,
            ``,
            `  loading module url: ${fetcher.formatURL(mod.url)}`,
            `  requiring module url: ${fetcher.formatURL(url)}`,
          ].join("\n"),
        )
      }

      const loadedMod = await mod.loader.load(url)
      importMany(mod, loadedMod, this.bindings)
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Import.execute] I fail to import module.`,
          ``,
          `  bindings: [${this.bindings.map(formatImportBinding).join(", ")}]`,
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
