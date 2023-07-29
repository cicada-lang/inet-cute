import { Port } from "../graph"
import { Rule } from "../rule"
import { Mod } from "./Mod"
import { modLookupRule } from "./modLookupRule"

export function modLookupRuleByPorts(
  mod: Mod,
  start: Port,
  end: Port,
): Rule | undefined {
  if (start.isPrincipal && end.isPrincipal) {
    return modLookupRule(mod, start.node.name, end.node.name)
  }
}
