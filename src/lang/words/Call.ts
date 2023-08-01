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
    const found = net.localPorts.get(this.name)
    if (found !== undefined) {
      net.ports.push(found)
      net.localPorts.delete(this.name)
    } else {
      lookupDefinitionOrFail(mod, this.name).call(net)
    }
  }
}
