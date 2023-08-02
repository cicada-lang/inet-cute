import * as Definitions from "../definition"
import { PortExp } from "../graph/PortExp"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Defnode implements Stmt {
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
      Definitions.NodeDefinition(mod, this.name, this.input, this.output),
    )
  }
}
