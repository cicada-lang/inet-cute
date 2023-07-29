import { ActiveEdge, Port } from "../graph"
import { Rule } from "../rule"

export function createActiveEdge(
  start: Port,
  end: Port,
  rule: Rule,
): ActiveEdge {
  return {
    start,
    end,
    rule,
  }
}
