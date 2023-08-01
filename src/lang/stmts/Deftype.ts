import * as Definitions from "../definitions"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Deftype implements Stmt {
  constructor(
    public name: string,
    public arity: number,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    define(
      mod,
      this.name,
      new Definitions.TypeDefinition(mod, this.name, this.arity),
    )
  }
}
