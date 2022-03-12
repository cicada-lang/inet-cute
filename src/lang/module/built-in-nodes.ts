import * as Stmts from "../stmts"
import { Module } from "../module"
import { Node } from "../node"
import { Port } from "../port"

export function builtInNodes(mod: Module): void {
  const def = new Stmts.DefineNodeStmt("wire", [], ["Wire", "Wire", "*"], {
    span: { hi: 0, lo: 0 },
  })
  def.execute(mod)
}
