import pt from "@cicada-lang/partech"
import { Module } from "../module"

export interface StmtMeta {
  span: pt.Span
}

export abstract class Stmt {
  abstract meta: StmtMeta

  abstract execute(mod: Module): Promise<void>
  // abstract format(): string
}
