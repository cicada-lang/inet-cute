import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"

export class TypeDef extends Def {
  constructor(public mod: Module, public name: string, public arity: number) {
    super()
  }

  refer(net: Net): void {
    throw new Error("TODO")
  }
}
