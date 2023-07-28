import * as Defs from "../defs"
import { Node } from "../node"
import { PrincipalType } from "../types"
import { Net } from "./Net"

export function netCloseFreePorts(net: Net): Node | undefined {
  if (net.portStack.length === 0) return undefined

  const name = "*free-ports-closer*"

  // NOTE Maintain the "one principal port" constraint.
  const inputTypes = net.portStack
    .map((port) => port.t)
    .map((t) => (t.isPrincipal() ? (t as PrincipalType).t : t))
    .reverse()

  inputTypes[0] = new PrincipalType(inputTypes[0])

  return new Defs.NodeDef(net.mod, name, inputTypes, []).refer(net)
}
