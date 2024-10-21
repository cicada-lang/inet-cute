import { type Port } from "../port/index.js"
import { type Rule } from "../rule/index.js"
import { type Mod } from "./Mod.js"
import { findRuleByNodes } from "./findRuleByNodes.js"

export function findRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return findRuleByNodes(mod, first.node, second.node)
  }
}
