import * as Definitions from "../definition"
import { createReport } from "../errors/createReport"
import { PortExp } from "../graph/PortExp"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { checkType } from "../type/checkType"

export class DefineNode implements Stmt {
  constructor(
    public name: string,
    public input: Array<PortExp>,
    public output: Array<PortExp>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      this.input.map(({ t }) => checkType(mod, t))
      this.output.map(({ t }) => checkType(mod, t))

      define(
        mod,
        this.name,
        Definitions.NodeDefinition(mod, this.name, this.input, this.output),
      )
    } catch (error) {
      throw createReport(error, {
        message: `[DefineNode.execute] I fail to define node`,
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
