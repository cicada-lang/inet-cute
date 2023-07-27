import * as Defs from "../defs"
import { Exp } from "../exp"
import { Mod } from "../mod"

export class Rule {
  constructor(
    public mod: Mod,
    public start: Defs.NodeDef,
    public end: Defs.NodeDef,
    public exps: Array<Exp>,
  ) {}
}
