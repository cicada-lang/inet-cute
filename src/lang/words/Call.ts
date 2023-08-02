import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Net } from "../net"
import { Span } from "../span"
import { Word } from "../word"

export class Call implements Word {
  constructor(
    public name: string,
    public span: Span,
  ) {}

  compose(mod: Mod, net: Net): void {
    const found = net.localPorts.get(this.name)
    if (found !== undefined) {
      net.ports.push(found)
      net.localPorts.delete(this.name)
    } else {
      lookupDefinitionOrFail(mod, this.name).compose(net)
    }
  }
}
