import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Require implements Stmt {
  constructor(
    public path: string,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      //
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Require.execute] I fail to import bindings.`,
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
