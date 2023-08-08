import { composeWords } from "../compose/composeWords"
import { createEnv } from "../env/createEnv"
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
      define(mod, this.name, {
        "@type": "Definition",
        "@kind": "NodeDefinition",
        mod,
        span: this.span,
        name: this.name,
        input: buildPortExpsFromWords(mod, this.input),
        output: buildPortExpsFromWords(mod, this.output),
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

function buildPortExpsFromWords(mod: Mod, words: Array<Word>): Array<PortExp> {
  const env = createEnv(mod)
  composeWords(mod, env, words, {})
  return env.stack.map(portExpFromValue)
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
