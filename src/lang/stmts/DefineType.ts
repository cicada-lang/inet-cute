import { composeWords } from "../compose/composeWords"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class DefineType implements Stmt {
  constructor(
    public name: string,
    public input: Array<Word>,
    public output: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    const env = createEnv(mod)
    composeWords(mod, env, this.input, {})

    const arity = env.stack.length

    define(mod, this.name, {
      "@type": "Definition",
      "@kind": "TypeDefinition",
      mod,
      span: this.span,
      name: this.name,
      input: this.input,
      output: this.output,
      arity,
    })
  }
}
