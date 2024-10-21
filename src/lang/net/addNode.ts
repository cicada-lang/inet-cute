import { type Mod } from "../mod/index.js"
import { type Net, type PortRecord } from "../net/index.js"
import { createNodeId } from "../node/createNodeId.js"
import { type Node } from "../node/index.js"
import { nodeKey } from "../node/nodeKey.js"
import { type PortExp } from "../port/PortExp.js"

export function addNode(
  net: Net,
  mod: Mod,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): Node {
  const id = createNodeId(mod, name)

  const node: Node = {
    "@type": "Value",
    "@kind": "Node",
    id,
    url: mod.url,
    name,
  }

  const ports: PortRecord = {}
  net.nodeEntries.set(nodeKey(node), { id, url: mod.url, name, ports })

  input.map((portExp) => {
    ports[portExp.name] = {
      sign: -1,
      name: portExp.name,
      t: portExp.t,
      isPrincipal: portExp.isPrincipal,
    }
  })

  output.map((portExp) => {
    ports[portExp.name] = {
      sign: 1,
      name: portExp.name,
      t: portExp.t,
      isPrincipal: portExp.isPrincipal,
    }
  })

  return node
}
