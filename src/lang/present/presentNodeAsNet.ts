import { capNode } from "../cap"
import { Mod, lookupDefinitionOrFail } from "../mod"
import { Net, createNet } from "../net"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"

export function presentNodeAsNet(mod: Mod, nodeName: string): Net {
  const net = createNet()

  const definition = lookupDefinitionOrFail(mod, nodeName)
  const node = createNodeFromDefinition(net, definition)
  capNode(mod, net, node)

  return net
}
