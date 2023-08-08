import { appendReport } from "../errors/appendReport"
import { createReport } from "../errors/createReport"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { PortExp } from "../port/PortExp"
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
      const principalPorts = [...this.input, ...this.output].filter(
        ({ isPrincipal }) => isPrincipal,
      )

      if (principalPorts.length !== 1) {
        throw createReport({
          message: [
            `[DefineNode.execute] I expect one and only one principal port.`,
            ``,
            `  found principal ports: [${principalPorts
              .map(({ name }) => name)
              .join(", ")}]`,
          ].join("\n"),
        })
      }

      this.input.map(({ t }) => checkType(mod, t))
      this.output.map(({ t }) => checkType(mod, t))

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
