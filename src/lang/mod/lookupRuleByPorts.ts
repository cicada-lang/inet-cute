import { Mod } from "../mod"
import { lookupRule } from "../mod/lookupRule"
import { Port } from "../port"
import { Rule } from "../rule"

export function lookupRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return lookupRule(mod, first.node.name, second.node.name)
  }
}
