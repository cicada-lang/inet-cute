import * as Definitions from "../definitions"
import { Mod } from "../mod"
import { Word } from "../word"

export class Rule {
  constructor(
    public mod: Mod,
    public start: Definitions.NodeDefinition,
    public end: Definitions.NodeDefinition,
    public words: Array<Word>,
  ) {}
}
