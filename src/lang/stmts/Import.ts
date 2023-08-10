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
      //
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Import.execute] I fail to import bindings.`,
          ``,
          `  bindings: [${this.bindings.map(formatImportBinding).join(", ")}]`,
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
