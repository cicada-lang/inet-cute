import { Net } from "../graph"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Span } from "../span"
import { Word } from "../word"

export class Call implements Word {
  constructor(
    public name: string,
    public span: Span,
  ) {}

  apply(mod: Mod, net: Net): void {
    lookupDefinitionOrFail(mod, this.name).meaning(net)
  }
}
