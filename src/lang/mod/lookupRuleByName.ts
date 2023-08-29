import { Rule } from "../rule"
import { Mod } from "./Mod"
import { lookupDefinitionOrFail } from "./lookupDefinitionOrFail"
import { lookupRuleByNodes } from "./lookupRuleByNodes"

export function lookupRuleByName(mod: Mod, ruleName: string): Rule | undefined {
  const [firstName, secondName] = ruleName.split(" ")

  const firstDefinition = lookupDefinitionOrFail(mod, firstName)
  const secondDefinition = lookupDefinitionOrFail(mod, secondName)

  return lookupRuleByNodes(
    mod,
    { url: firstDefinition.mod.url, name: firstDefinition.name },
    { url: secondDefinition.mod.url, name: secondDefinition.name },
  )
}
