import * as Defs from "../defs"
import { Exp } from "../exp"
import { Module } from "../module"

export class Rule {
  constructor(
    public mod: Module,
    public start: Defs.NodeDef,
    public end: Defs.NodeDef,
    public exps: Array<Exp>
  ) {}
}
