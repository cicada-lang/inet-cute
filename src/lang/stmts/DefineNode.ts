import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { PortExp } from "../port/PortExp"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class DefineNode implements Stmt {
  constructor(
    public name: string,
    public input: Array<PortExp>,
    public output: Array<PortExp>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      define(mod, this.name, {
        "@type": "Definition",
        "@kind": "NodeDefinition",
        mod,
        span: this.span,
        name: this.name,
        input: this.input,
        output: this.output,
      })
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[DefineNode.execute] I fail to define node.`,
          ``,
          `  node name: ${this.name}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
