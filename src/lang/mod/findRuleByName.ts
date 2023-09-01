import { Rule } from "../rule"
import { Mod } from "./Mod"
import { findDefinitionOrFail } from "./findDefinitionOrFail"
import { findRuleByNodes } from "./findRuleByNodes"

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
