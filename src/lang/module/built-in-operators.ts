import * as Defs from "../defs"
import { Module } from "../module"
import { Port } from "../port"

export function builtInOperators(mod: Module): void {
  mod.defs.set(
    "swap",
    new Defs.OperatorDef(mod, (net) => {
      const x1 = net.ports.pop() as Port
      const x0 = net.ports.pop() as Port
      net.ports.push(x0, x1)
    })
  )

  mod.defs.set(
    "rot",
    new Defs.OperatorDef(mod, (net) => {
      const x2 = net.ports.pop() as Port
      const x1 = net.ports.pop() as Port
      const x0 = net.ports.pop() as Port
      net.ports.push(x1, x2, x0)
    })
  )
}
