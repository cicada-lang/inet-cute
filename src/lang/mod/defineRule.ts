import { Rule } from "../rule"
import { Word } from "../word"
import { Mod } from "./Mod"

export function defineRule(
  mod: Mod,
  start: string,
  end: string,
  words: Array<Word>,
): void {
  mod.rules.set(`${start} ${end}`, new Rule(mod, words))
}
