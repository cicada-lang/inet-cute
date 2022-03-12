import * as Defs from "../definitions"
import { Module } from "../module"
import { Port } from "../port"
import { Type } from "../type"

export function builtInOperators(mod: Module): void {
  mod.defineOperator("swap", (net) => {
    const x1 = net.ports.pop() as Port
    const x0 = net.ports.pop() as Port
    net.ports.push(x1, x0)
  })

  mod.defineOperator("rot", (net) => {
    const x2 = net.ports.pop() as Port
    const x1 = net.ports.pop() as Port
    const x0 = net.ports.pop() as Port
    net.ports.push(x1, x2, x0)
  })

  mod.defineOperator("connect", (net) => {
    const start = net.ports.pop() as Port
    const end = net.ports.pop() as Port
    net.connect(start, end)
  })

  mod.defineOperator("wire", (net) => {
    const def = new Defs.NodeDefinition(
      mod,
      "wire",
      [],
      Type.build(["Wire", "Wire", "*"])
    )
    const node = def.build()

    net.ports.push(...node.output)
    net.nodes.push(node)

    const [start, end] = node.output

    net.wires.push({ start, end })
  })

  mod.defineOperator("inspect", (net) => {
    const top = net.ports.pop() as Port
    console.log(top.inspect())
    net.ports.push(top)
  })
}
