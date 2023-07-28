import * as Definitions from "../definitions"
import { Node } from "../graph"
import { Net } from "./Net"

export function netCloseFreePorts(net: Net): Node | undefined {
  if (net.portStack.length === 0) return undefined

  const name = "*free-ports-closer*"

  // NOTE Maintain the "one principal port" constraint.
  const inputTypes = net.portStack.map((port) => port.t).reverse()

  return new Definitions.NodeDefinition(
    net.mod,
    "Elim",
    name,
    inputTypes,
    [],
  ).meaning(net)
}
