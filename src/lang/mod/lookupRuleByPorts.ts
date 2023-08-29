import { Port } from "../port"
import { Rule } from "../rule"
import { Mod } from "./Mod"
import { lookupRule } from "./lookupRule"

export function lookupRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return lookupRule(mod, first.node, second.node)
  }
}
