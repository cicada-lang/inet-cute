import * as Defs from "../defs"
import { Mod } from "../mod"
import { Port } from "../port"
import { buildTypes } from "../types"

export function builtInOperators(mod: Mod): void {
  mod.defineOperator("swap", (net) => {
    const x1 = net.portStack.pop() as Port
    const x0 = net.portStack.pop() as Port
    net.portStack.push(x1, x0)
  })

  mod.defineOperator("rot", (net) => {
    const x2 = net.portStack.pop() as Port
    const x1 = net.portStack.pop() as Port
    const x0 = net.portStack.pop() as Port
    net.portStack.push(x1, x2, x0)
  })

  mod.defineOperator("connect", (net) => {
    const start = net.portStack.pop() as Port
    const end = net.portStack.pop() as Port
    net.connect(start, end)
  })

  mod.defineOperator("wire", (net) => {
    const def = new Defs.NodeDef(
      mod,
      "wire",
      [],
      buildTypes(["Any", "Any", "*"])
    )
    const node = def.build()

    net.portStack.push(...node.output)
    net.nodes.push(node)

    const [start, end] = node.output

    net.wires.push({ start, end })
  })

  mod.defineOperator("inspect", (net) => {
    const top = net.portStack.pop() as Port
    console.log(top.inspect())
    net.portStack.push(top)
  })
}
