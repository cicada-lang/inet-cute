import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { Word } from "../word"
import { Mod } from "./Mod"
import { findDefinitionOrFail } from "./findDefinitionOrFail"

export function defineRule(
  mod: Mod,
  firstName: string,
  secondName: string,
  words: Array<Word>,
): void {
  const firstDefinition = findDefinitionOrFail(mod, firstName)
  const secondDefinition = findDefinitionOrFail(mod, secondName)

  const firstKey = nodeKeyWithoutId({
    url: firstDefinition.mod.url,
    name: firstDefinition.name,
  })

  const secondKey = nodeKeyWithoutId({
    url: secondDefinition.mod.url,
    name: secondDefinition.name,
  })

  const key = `${firstKey} ${secondKey}`
  const name = `${firstName} ${secondName}`

  mod.ruleEntries.set(key, {
    name,
    first: {
      url: firstDefinition.mod.url,
      name: firstDefinition.name,
    },
    second: {
      url: secondDefinition.mod.url,
      name: secondDefinition.name,
    },
    mod,
    words,
  })
}
