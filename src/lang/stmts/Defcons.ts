import * as Definitions from "../definitions"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { createTrivialTypes } from "../type"

export type PortExp = {
  name: string
  isPrincipal: boolean
}

export class Defcons implements Stmt {
  constructor(
    public name: string,
    public input: Array<PortExp>,
    public output: Array<PortExp>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    define(
      mod,
      this.name,
      new Definitions.NodeDefinition(
        mod,
        "Cons",
        this.name,
        createTrivialTypes(this.input.length),
        createTrivialTypes(this.output.length),
      ),
    )
  }
}
