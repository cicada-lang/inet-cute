import { type Rule } from "../rule/index.ts"
import { type Mod } from "./Mod.ts"
import { findDefinitionOrFail } from "./findDefinitionOrFail.ts"
import { findRuleByNodes } from "./findRuleByNodes.ts"

export function findRuleByName(mod: Mod, ruleName: string): Rule | undefined {
  const [firstName, secondName] = ruleName.split(" ")

  const firstDefinition = findDefinitionOrFail(mod, firstName)
  const secondDefinition = findDefinitionOrFail(mod, secondName)

  return findRuleByNodes(
    mod,
    { url: firstDefinition.mod.url, name: firstDefinition.name },
    { url: secondDefinition.mod.url, name: secondDefinition.name },
  )
}
