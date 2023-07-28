import * as Definitions from "../definitions"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { createTrivialTypes } from "../type"

export class DefelimStmt extends Stmt {
  constructor(
    public name: string,
    public inputArity: number,
    public outputArity: number,
    public span: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.define(
      this.name,
      new Definitions.NodeDefinition(
        mod,
        "Elim",
        this.name,
        createTrivialTypes(this.inputArity),
        createTrivialTypes(this.outputArity),
      ),
    )
  }
}
