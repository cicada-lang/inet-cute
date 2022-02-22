import { Def } from "../def"
import { Module } from "../module"
import { Node } from "../node"
import { Type } from "../type"
import { Net } from "../net"

export class NodeDef extends Def {
  constructor(
    public mod: Module,
    public name: string,
    public input: Array<string>,
    public output: Array<string>
  ) {
    super()
  }

  build(): Node {
    return new Node(this.name, Type.build(this.input), Type.build(this.output))
  }

  execute(net: Net): void {
    net.connect(this.build())
  }
}
