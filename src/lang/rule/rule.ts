import { Definition } from "../definition"
import * as Defs from "../definitions"
import { Module } from "../module"

export class Rule {
  constructor(
    public mod: Module,
    public start: Defs.NodeDefinition,
    public end: Defs.NodeDefinition,
    public defs: Array<Definition>
  ) {}
}
