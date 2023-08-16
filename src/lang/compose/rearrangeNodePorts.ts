import { arrayPickOut } from "../../utils/arrayPickOut"
import { countStringOccurrences } from "../../utils/countStringOccurrences"
import { Net } from "../net"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node } from "../node"
import { Port } from "../port"
import { formatValue } from "../value/formatValue"

export function rearrangeNodePorts(
  net: Net,
  node: Node,
  rearrangement: {
    input: Array<string>
    output: Array<string>
  },
): {
  input: Array<Port>
  output: Array<Port>
} {
  const input = findInputPorts(net, node)
  const output = findOutputPorts(net, node)

  for (const name of [...rearrangement.input, ...rearrangement.output]) {
    const found =
      input.find((port) => port.name === name) ||
      output.find((port) => port.name === name)
    if (found === undefined) {
      throw new Error(
        [
          `[rearrangeNodePorts] I find undefined port name.`,
          ``,
          `  name: ${name}`,
          `  input ports: [${input.map(formatValue).join(", ")}]`,
          `  output ports: [${output.map(formatValue).join(", ")}]`,
        ].join("\n"),
      )
    }
  }

  const counts = countStringOccurrences([
    ...rearrangement.input,
    ...rearrangement.output,
  ])

  const duplicatedEntries = Array.from(counts.entries()).filter(
    ([_name, count]) => count > 1,
  )

  if (duplicatedEntries.length > 0) {
    throw new Error(
      [
        `[rearrangeNodePorts] I find duplicated names in rearrangement labels.`,
        ``,
        `  duplicated: [${duplicatedEntries
          .map(([name, count]) => `:${name} (${count})`)
          .join(", ")}]`,
      ].join("\n"),
    )
  }

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
