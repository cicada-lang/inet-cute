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
    define(mod, this.name, {
      kind: "TypeDefinition",
      mod,
      span: this.span,
      name: this.name,
      arity: this.arity,
    })
  }
}
