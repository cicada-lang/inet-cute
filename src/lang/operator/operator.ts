import { Net } from "../net"
import { Port } from "../port"

export class Operator {
  name: string

  constructor(name: string) {
    this.name = name
  }

  execute(net: Net): void {
    if (this.name === "swap") {
      const x1 = net.ports.pop() as Port
      const x0 = net.ports.pop() as Port

      net.ports.push(x0, x1)
    }

    if (this.name === "rot") {
      const x2 = net.ports.pop() as Port
      const x1 = net.ports.pop() as Port
      const x0 = net.ports.pop() as Port

      net.ports.push(x1, x2, x0)
    }
  }
}
