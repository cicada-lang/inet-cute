import { checkNode } from "../check/checkNode"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { PortExp } from "../port/PortExp"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Value } from "../value"
import { formatValue } from "../value/formatValue"
import { Word } from "../word"

export class DefineNode implements Stmt {
  constructor(
    public name: string,
    public input: Array<Word>,
    public output: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const { inputValues, outputValues } = checkNode(
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
        input: inputValues.map(portExpFromValue),
        output: outputValues.map(portExpFromValue),
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

function portExpFromValue(value: Value): PortExp {
  if (value["@kind"] !== "Labeled") {
    throw new Error(
      [
        `[portExpFromValue] I expect the value to be a Labeled Value`,
        ``,
        `  value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }

  return {
    name: value.label,
    t: value.value,
    isPrincipal: Boolean(value.isImportant),
  }
}
