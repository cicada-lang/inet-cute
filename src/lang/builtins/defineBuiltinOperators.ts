import { Sign, SignedType } from "../ctx"
import { Port } from "../graph"
import { createNode } from "../graph/createNode"
import { Mod } from "../mod"
import { defineOperator } from "../mod/defineOperator"
import { connect } from "../net/connect"
import * as Types from "../type"
import { freshenType } from "../unify/freshenType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import * as rot from "./rot"
import * as swap from "./swap"

let wireCounter = 0

export function defineBuiltinOperators(mod: Mod): void {
  defineOperator(mod, "swap", swap)
  defineOperator(mod, "rot", rot)

  defineOperator(mod, "connect", {
    compose(net) {
      const start = net.ports.pop() as Port
      const end = net.ports.pop() as Port
      connect(net, start, end)
    },
    cut(ctx) {
      const x2 = ctx.signedTypes.pop() as SignedType
      const x1 = ctx.signedTypes.pop() as SignedType
      unifySignedTypes(ctx, x1, x2)
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
            name: "front",
            t: Types.TypeVar("a"),
            isPrincipal: false,
          },
          {
            name: "back",
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
      const frontId = (wireCounter++).toString()
      const front = {
        id: frontId,
        sign: 0 as Sign,
        t: freshenType(ctx, Types.TypeVar("a")),
      }

      const backId = (wireCounter++).toString()
      const back = {
        id: backId,
        sign: 0 as Sign,
        t: freshenType(ctx, Types.TypeVar("a")),
      }

      ctx.neutralSignedTypes.set(frontId, front)
      ctx.neutralSignedTypes.set(backId, back)

      ctx.signedTypes.push(front)
      ctx.signedTypes.push(back)
    },
  })
}
