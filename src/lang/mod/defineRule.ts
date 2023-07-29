import { Rule } from "../rule"
import { Word } from "../word"
import { Mod } from "./Mod"
import { modLookupNodeDefinitionOrFail } from "./modLookupNodeDefinitionOrFail"

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
      modLookupNodeDefinitionOrFail(mod, start),
      modLookupNodeDefinitionOrFail(mod, end),
      words,
    ),
  )
}
