import * as Definitions from "../definition"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { lookupDefinition } from "../mod/lookupDefinition"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Type } from "../type"

export class Claim implements Stmt {
  constructor(
    public name: string,
    public claimedInputTypes: Array<Type>,
    public claimedOutputTypes: Array<Type>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    const definition = lookupDefinition(mod, this.name)

    if (definition !== undefined) {
      throw new Error(`[Claim.execute] I can not re-claim word: ${this.name}`)
      // TODO It is already claimed to ...
    }

    define(
      mod,
      this.name,
      Definitions.WordDefinition(
        mod,
        this.name,
        this.claimedInputTypes,
        this.claimedOutputTypes,
      ),
    )
  }
}
