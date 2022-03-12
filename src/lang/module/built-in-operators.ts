import { Module } from "../module"
import { Port } from "../port"

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

  // mod.defineOperator("wire", (net) => {
  //   TODO
  // })

  mod.defineOperator("inspect", (net) => {
    const top = net.ports.pop() as Port
    console.log(top.inspect())
    net.ports.push(top)
  })
}
