import { type Mod } from "../mod/index.ts"
import { type Net, type PortRecord } from "../net/index.ts"
import { createNodeId } from "../node/createNodeId.ts"
import { type Node } from "../node/index.ts"
import { nodeKey } from "../node/nodeKey.ts"
import { type PortExp } from "../port/PortExp.ts"

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
