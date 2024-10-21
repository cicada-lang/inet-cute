import { checkNode } from "../check/checkNode.js"
import { appendReport } from "../errors/appendReport.js"
import { define } from "../mod/define.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"
import { type Word } from "../word/index.js"

export class DefineNode implements Stmt {
  constructor(
    public name: string,
    public input: Array<Word>,
    public output: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const { inputPortExps, outputPortExps } = checkNode(
        mod,
        this.input,
        this.output,
      )

      define(mod, this.name, {
        "@type": "Definition",
        "@kind": "NodeDefinition",
        mod,
        span: this.span,
        name: this.name,
        input: inputPortExps,
        output: outputPortExps,
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
