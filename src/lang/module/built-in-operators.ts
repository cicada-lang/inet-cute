import { Module } from "../module"
import { Port } from "../port"

export function builtInOperators(mod: Module): void {
  mod.defineOperator("swap", (net) => {
    const x1 = net.ports.pop() as Port
    const x0 = net.ports.pop() as Port
    net.ports.push(x0, x1)
  })

  mod.defineOperator("rot", (net) => {
    const x2 = net.ports.pop() as Port
    const x1 = net.ports.pop() as Port
    const x0 = net.ports.pop() as Port
    net.ports.push(x1, x2, x0)
  })
}
