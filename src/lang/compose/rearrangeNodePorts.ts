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
    {
      const i = input.findIndex((port) => port.name === name)
      if (i !== -1) {
        input.unshift(arrayPickOut(input, i))
      }
    }

    {
      const i = output.findIndex((port) => port.name === name)
      if (i !== -1) {
        input.unshift(arrayPickOut(output, i))
      }
    }
  }

  for (const name of [...rearrangement.output].reverse()) {
    {
      const i = input.findIndex((port) => port.name === name)
      if (i !== -1) {
        output.unshift(arrayPickOut(input, i))
      }
    }

    {
      const i = output.findIndex((port) => port.name === name)
      if (i !== -1) {
        output.unshift(arrayPickOut(output, i))
      }
    }
  }

  return {
    input,
    output,
  }
}
