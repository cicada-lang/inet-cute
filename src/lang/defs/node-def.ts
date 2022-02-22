import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"
import { Node } from "../node"
import { Type } from "../type"

export class NodeDef extends Def {
  constructor(
    public mod: Module,
    public name: string,
    public input: Array<Type>,
    public output: Array<Type>
  ) {
    super()
  }

  private build(): Node {
    return new Node(this.name, this.input, this.output)
  }

  execute(net: Net): void {
    net.connect(this.build())
  }
}
