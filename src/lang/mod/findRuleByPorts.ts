import { Port } from "../port"
import { Rule } from "../rule"
import { Mod } from "./Mod"
import { findRuleByNodes } from "./findRuleByNodes"

export function findRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return findRuleByNodes(mod, first.node, second.node)
  }
}
