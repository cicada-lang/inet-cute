import { Definition } from "../definition"
import { Module } from "../module"
import { Net } from "../net"

export class OperatorDefinition extends Definition {
  constructor(
    public mod: Module,
    public name: string,
    public apply: (net: Net) => void
  ) {
    super()
  }
}
