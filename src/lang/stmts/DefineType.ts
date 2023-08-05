import * as Definitions from "../definition"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class DefineType implements Stmt {
  constructor(
    public name: string,
    public arity: number,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    define(
      mod,
      this.name,
      Definitions.TypeDefinition(mod, this.name, this.arity),
    )
  }
}
