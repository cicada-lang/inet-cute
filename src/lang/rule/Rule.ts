import { Mod } from "../mod"
import { Word } from "../word"

export class Rule {
  constructor(
    public mod: Mod,
    public words: Array<Word>,
  ) {}
}
