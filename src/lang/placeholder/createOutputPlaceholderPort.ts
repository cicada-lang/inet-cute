import { Mod } from "../mod"
import { createNode } from "../node/createNode"
import { Port } from "../port"

export function createOutputPlaceholderPort(mod: Mod, port: Port): Port {
  const nodeName = `_output_placeholder_node_for_${port.name}_of_${port.node.name}`
  const portName = `_output_placeholder_port_for_${port.name}_of_${port.node.name}`
  const node = createNode(
    mod,
    nodeName,
    [],
    [{ name: portName, t: port.t, isPrincipal: true }],
  )

  return node.output[0]
}
