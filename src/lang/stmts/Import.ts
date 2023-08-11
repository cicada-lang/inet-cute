import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export type ImportBinding = {
  name: string
  alias?: string
}

export class Import implements Stmt {
  constructor(
    public bindings: Array<ImportBinding>,
    public path: string,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const url = new URL(this.path, mod.url)

      if (mod.loader.loading.has(url.href)) {
        throw new Error(
          [
            `[Import.execute] I can not do circular import.`,
            ``,
            `  loading module url: ${mod.url.href}`,
            `  requiring module url: ${url.href}`,
          ].join("\n"),
        )
      }

      const loadedMod = await mod.loader.load(url)

      for (const { name } of this.bindings) {
        const found = mod.definitions.get(name)
        if (found !== undefined) {
          throw new Error(
            [
              `[Import.execute] I can not import already defined name.`,
              ``,
              `  name: ${name}`,
            ].join("\n"),
          )
        }

        const definition = loadedMod.definitions.get(name)
        if (definition === undefined) {
          throw new Error(
            [
              `[Import.execute] I can not import undefined name.`,
              ``,
              `  name: ${name}`,
              `  current module url: ${mod.url.href}`,
              `  imported module url: ${loadedMod.url.href}`,
            ].join("\n"),
          )
        }

        mod.definitions.set(name, definition)
      }
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

function formatImportBinding(binding: ImportBinding): string {
  if (binding.alias) {
    return `${binding.name} as ${binding.alias}`
  } else {
    return `${binding.name}`
  }
}
