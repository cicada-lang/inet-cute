import { checkType } from "../check/checkType.js"
import { appendReport } from "../errors/appendReport.js"
import { define } from "../mod/define.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"
import { type Word } from "../word/index.js"

export class DefineType implements Stmt {
  constructor(
    public name: string,
    public input: Array<Word>,
    public output: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const { inputValues } = checkType(mod, this.input, this.output)

      define(mod, this.name, {
        "@type": "Definition",
        "@kind": "TypeDefinition",
        mod,
        span: this.span,
        name: this.name,
        input: this.input,
        output: this.output,
        inputArity: inputValues.length,
      })
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[DefineType.execute] I fail to define rule.`,
          ``,
          `  type name: ${this.name}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
