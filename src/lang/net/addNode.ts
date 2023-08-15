import { Mod } from "../mod"
import { Net, PortEntries } from "../net"
import { Node } from "../node"
import { createNodeId } from "../node/createNodeId"
import { nodeKeyId } from "../node/nodeKeyId"
import { PortExp } from "../port/PortExp"

export function addNode(
  net: Net,
  mod: Mod,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): Node {
  const node: Node = {
    id: createNodeId(mod, name),
    url: mod.url,
    name,
  }

  const ports: PortEntries = {}
  net.nodePortEntriesMap.set(nodeKeyId(node), ports)

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
