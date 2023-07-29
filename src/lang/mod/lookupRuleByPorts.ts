import { Port } from "../graph"
import { Rule } from "../rule"
import { Mod } from "./Mod"
import { lookupRule } from "./lookupRule"

export function lookupRuleByPorts(
  mod: Mod,
  start: Port,
  end: Port,
): Rule | undefined {
  if (start.isPrincipal && end.isPrincipal) {
    return lookupRule(mod, start.node.name, end.node.name)
  }
}
