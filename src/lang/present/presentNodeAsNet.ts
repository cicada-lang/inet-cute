import { capNodeAllPorts } from "../cap/index.ts"
import { findDefinitionOrFail, type Mod } from "../mod/index.ts"
import { createNet, type Net } from "../net/index.ts"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.ts"

export function presentNodeAsNet(mod: Mod, nodeName: string): Net {
  const net = createNet()

  const definition = findDefinitionOrFail(mod, nodeName)
  const node = createNodeFromDefinition(net, definition)
  capNodeAllPorts(mod, net, node)

  return net
}
