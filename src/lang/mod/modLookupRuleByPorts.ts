import { Port } from "../graph"
import { Rule } from "../rule"
import { Mod } from "./Mod"

export function modLookupRuleByPorts(
  mod: Mod,
  start: Port,
  end: Port,
): Rule | undefined {
  if (start.isPrincipal && end.isPrincipal) {
    return start.node.definition.lookupRule(end.node.definition)
  }
}
