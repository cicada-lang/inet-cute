import { Word } from "../word"
import { Mod } from "./Mod"
import { lookupDefinitionOrFail } from "./lookupDefinitionOrFail"

export function defineRule(
  mod: Mod,
  firstName: string,
  secondName: string,
  words: Array<Word>,
): void {
  const firstDefinition = lookupDefinitionOrFail(mod, firstName)
  const secondDefinition = lookupDefinitionOrFail(mod, secondName)

  const firstKey = `${firstDefinition.mod.url.href}${firstName}`
  const secondKey = `${secondDefinition.mod.url.href}${secondName}`

  const key = `${firstKey} ${secondKey}`

  mod.rules.set(key, { mod, words })
}
