import { Exp } from "../exp"
import { Mod } from "../mod"
import { Net } from "../graph"
import { Span } from "../span"

export class Call extends Exp {
  constructor(
    public name: string,
    public span: Span,
  ) {
    super()
  }

  apply(mod: Mod, net: Net): void {
    const found = net.portStore.get(this.name)
    if (found !== undefined) {
      net.portStore.delete(this.name)
      net.portStack.push(found)
    } else {
      mod.getDefOrFail(this.name).refer(net)
    }
  }
}
