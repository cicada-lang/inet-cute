import * as Definitions from "../definitions"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { createTrivialTypes } from "../type"

export class Defelim implements Stmt {
  constructor(
    public name: string,
    public inputArity: number,
    public outputArity: number,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    define(
      mod,
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
