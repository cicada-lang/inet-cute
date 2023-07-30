import { Node } from "."
import * as Definitions from "../definitions"
import { Net } from "./Net"

export function closeFreePorts(net: Net): Node | undefined {
  if (net.portStack.length === 0) return undefined

  const name = "*free-ports-closer*"

  // NOTE Maintain the "one principal port" constraint.
  const input = [...net.portStack].reverse()

  return new Definitions.NodeDefinition(net.mod, name, input, []).meaning(net)
}
