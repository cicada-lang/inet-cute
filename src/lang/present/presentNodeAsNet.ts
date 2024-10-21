import { capNodeAllPorts } from "../cap/index.js"
import { findDefinitionOrFail, type Mod } from "../mod/index.js"
import { createNet, type Net } from "../net/index.js"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.js"

export function presentNodeAsNet(mod: Mod, nodeName: string): Net {
  const net = createNet()

  const definition = findDefinitionOrFail(mod, nodeName)
  const node = createNodeFromDefinition(net, definition)
  capNodeAllPorts(mod, net, node)

  return net
}
