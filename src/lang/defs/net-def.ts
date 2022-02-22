import { Def } from "../def"
import { Module } from "../module"
import { Node } from "../node"
import { Net } from "../net"

export class NetDef extends Def {
  constructor(public mod: Module, public words: Array<string>) {
    super()
  }

  build(): Net {
    const net = new Net(this.mod)

    for (const word of this.words) {
      const operator = this.mod.findOperator(word)
      if (operator) {
        operator.execute(net)
      } else {
        const node = this.mod.buildNode(word)
        net.connect(node)
      }
    }

    return net
  }
}
