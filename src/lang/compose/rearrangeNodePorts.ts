import { arrayPickOut } from "../../utils/arrayPickOut"
import { Node } from "../node"
import { Port } from "../port"

export function rearrangeNodePorts(
  node: Node,
  rearrangement: {
    input: Array<string>
    output: Array<string>
  },
): {
  input: Array<Port>
  output: Array<Port>
} {
  const input = [...node.input]
  const output = [...node.output]

  for (const name of [...rearrangement.input].reverse()) {
    const port = portsPickOut(input, name) || portsPickOut(output, name)
    if (port) {
      input.unshift(port)
    }
  }

  for (const name of [...rearrangement.output].reverse()) {
    const port = portsPickOut(input, name) || portsPickOut(output, name)
    if (port) {
      output.unshift(port)
    }
  }

  return {
    input,
    output,
  }
}

function portsPickOut(ports: Array<Port>, name: string): Port | undefined {
  const i = ports.findIndex((port) => port.name === name)
  if (i !== -1) {
    return arrayPickOut(ports, i)
  }
}
