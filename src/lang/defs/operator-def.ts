import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"

export class OperatorDef extends Def {
  constructor(
    public mod: Module,
    public name: string,
    public refer: (net: Net) => void
  ) {
    super()
  }
}
