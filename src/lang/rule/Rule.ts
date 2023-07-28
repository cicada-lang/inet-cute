import * as Defs from "../defs"
import { Mod } from "../mod"
import { Word } from "../word"

export class Rule {
  constructor(
    public mod: Mod,
    public start: Defs.NodeDef,
    public end: Defs.NodeDef,
    public words: Array<Word>,
  ) {}
}
