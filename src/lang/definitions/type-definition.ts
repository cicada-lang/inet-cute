import { Definition } from "../definition"
import { Module } from "../module"
import { Net } from "../net"

export class TypeDefinition extends Definition {
  constructor(public mod: Module, public name: string, public arity: number) {
    super()
  }

  apply(net: Net): void {
    throw new Error("TODO")
  }
}
