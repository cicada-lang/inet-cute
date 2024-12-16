import { type Port } from "../port/index.ts"
import { type Rule } from "../rule/index.ts"
import { type Mod } from "./Mod.ts"
import { findRuleByNodes } from "./findRuleByNodes.ts"

export function findRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return findRuleByNodes(mod, first.node, second.node)
  }
}
