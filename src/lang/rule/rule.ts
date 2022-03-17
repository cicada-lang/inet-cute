import * as Defs from "../definitions"
import { Exp } from "../exp"
import { Module } from "../module"

export class Rule {
  constructor(
    public mod: Module,
    public start: Defs.NodeDefinition,
    public end: Defs.NodeDefinition,
    public exps: Array<Exp>
  ) {}
}
