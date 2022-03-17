import { Span } from "@cicada-lang/sexp/lib/span"
import { Exp } from "../exp"
import { Module } from "../module"
import { Net } from "../net"

export class Let extends Exp {
  constructor(public span: Span) {
    super()
  }

  apply(mod: Module, net: Net): void {
    throw new Error("TODO")
  }
}
