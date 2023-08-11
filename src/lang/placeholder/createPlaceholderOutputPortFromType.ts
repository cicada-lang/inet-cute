import { Mod } from "../mod"
import { createNode } from "../node/createNode"
import { Port } from "../port"
import { Value } from "../value"

export function createPlaceholderOutputPortFromType(mod: Mod, t: Value): Port {
  const nodeName = `_placeholder_output_node_from_type`
  const portName = `_placeholder_output_port_from_type`
  const node = createNode(
    mod,
    nodeName,
    [],
    [{ name: portName, t, isPrincipal: true }],
  )

  return node.output[0]
}
