import { Span } from "@cicada-lang/sexp/lib/span"
import { Module } from "../module"
import { Net } from "../net"

export abstract class Exp {
  abstract span: Span
  abstract apply(mod: Module, net: Net): void
}
