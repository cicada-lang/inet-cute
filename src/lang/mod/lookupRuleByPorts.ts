import { Port } from "../port"
import { Rule } from "../rule"
import { Mod } from "./Mod"
import { lookupRuleByNodes } from "./lookupRuleByNodes"

export function lookupRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return lookupRuleByNodes(mod, first.node, second.node)
  }
}
