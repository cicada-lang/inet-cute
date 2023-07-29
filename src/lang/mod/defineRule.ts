import { Rule } from "../rule"
import { Word } from "../word"
import { Mod } from "./Mod"
import { lookupNodeDefinitionOrFail } from "./lookupNodeDefinitionOrFail"

export function defineRule(
  mod: Mod,
  start: string,
  end: string,
  words: Array<Word>,
): void {
  mod.rules.set(
    `${start} ${end}`,
    new Rule(
      mod,
      lookupNodeDefinitionOrFail(mod, start),
      lookupNodeDefinitionOrFail(mod, end),
      words,
    ),
  )
}
