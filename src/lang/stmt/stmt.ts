import { Span } from "@cicada-lang/sexp/lib/span"
import { Module } from "../module"

export abstract class Stmt {
  abstract span: Span
  abstract execute(mod: Module): Promise<void>
}
