import { SignedType } from "../ctx"
import { matchSignedTypes } from "../cut/matchSignedTypes"
import { Port } from "../graph"
import { createNode } from "../graph/createNode"
import { Mod } from "../mod"
import { connect } from "../net/connect"
import * as Types from "../type"
import { defineOperator } from "./defineOperator"

export function defineBuiltInOperators(mod: Mod): void {
  defineOperator(mod, "swap", {
    compose(net) {
      const x1 = net.ports.pop() as Port
      const x0 = net.ports.pop() as Port
      net.ports.push(x1, x0)
    },
    cut(ctx) {
      const x1 = ctx.signedTypes.pop() as SignedType
      const x0 = ctx.signedTypes.pop() as SignedType
      ctx.signedTypes.push(x1, x0)
    },
  })

  defineOperator(mod, "rot", {
    compose(net) {
      const x2 = net.ports.pop() as Port
      const x1 = net.ports.pop() as Port
      const x0 = net.ports.pop() as Port
      net.ports.push(x1, x2, x0)
    },
    cut(ctx) {
      const x2 = ctx.signedTypes.pop() as SignedType
      const x1 = ctx.signedTypes.pop() as SignedType
      const x0 = ctx.signedTypes.pop() as SignedType
      ctx.signedTypes.push(x1, x2, x0)
    },
  })

  defineOperator(mod, "connect", {
    compose(net) {
      const start = net.ports.pop() as Port
      const end = net.ports.pop() as Port
      connect(net, start, end)
    },
    cut(ctx) {
      const x2 = ctx.signedTypes.pop() as SignedType
      const x1 = ctx.signedTypes.pop() as SignedType
      matchSignedTypes(ctx, x1, x2)
    },
  })

  defineOperator(mod, "wire", {
    compose(net) {
      const node = createNode(
        mod,
        "wire",
        [],
        [
          {
            name: "left",
            t: Types.TypeVar("a"),
            isPrincipal: false,
          },
          {
            name: "right",
            t: Types.TypeVar("a"),
            isPrincipal: true,
          },
        ],
      )

      net.ports.push(...node.output)
      net.nodes.push(node)
      const [start, end] = node.output
      net.wires.push({ start, end })
    },
    cut(ctx) {
      //
    },
  })
}
