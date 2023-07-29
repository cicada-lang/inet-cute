import { Net } from "../graph"
import { Mod } from "../mod"
import { modLookupDefinitionOrFail } from "../mod/modLookupDefinitionOrFail"
import { Span } from "../span"
import { Word } from "../word"

export class Call implements Word {
  constructor(
    public name: string,
    public span: Span,
  ) {}

  apply(mod: Mod, net: Net): void {
    const found = net.portStore.get(this.name)
    if (found !== undefined) {
      net.portStore.delete(this.name)
      net.portStack.push(found)
    } else {
      modLookupDefinitionOrFail(mod, this.name).meaning(net)
    }
  }
}
