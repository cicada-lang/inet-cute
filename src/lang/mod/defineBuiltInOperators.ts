import { Port, createNode } from "../graph"
import { netConnect } from "../graph/netConnect"
import { Mod } from "../mod"
import { createTrivialTypes } from "../type"
import { defineOperator } from "./defineOperator"

export function defineBuiltInOperators(mod: Mod): void {
  defineOperator(mod, "swap", (net) => {
    const x1 = net.portStack.pop() as Port
    const x0 = net.portStack.pop() as Port
    net.portStack.push(x1, x0)
  })

  defineOperator(mod, "rot", (net) => {
    const x2 = net.portStack.pop() as Port
    const x1 = net.portStack.pop() as Port
    const x0 = net.portStack.pop() as Port
    net.portStack.push(x1, x2, x0)
  })

  defineOperator(mod, "connect", (net) => {
    const start = net.portStack.pop() as Port
    const end = net.portStack.pop() as Port
    netConnect(net, start, end)
  })

  defineOperator(mod, "wire", (net) => {
    const node = createNode("Cons", mod, "wire", [], createTrivialTypes(2))

    net.portStack.push(...node.output)
    net.nodes.push(node)

    const [start, end] = node.output

    net.wires.push({ start, end })
  })
}
