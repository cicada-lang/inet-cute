import { Ctx } from "../ctx"
import { Env } from "../env"
import { createNode } from "../graph/createNode"
import { Mod } from "../mod"
import * as Types from "../type"
import { Sign } from "../type"
import { freshenType } from "../unify/freshenType"

let wireCounter = 0

export default function (mod: Mod) {
  function compose(env: Env): void {
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

    env.stack.push(...node.output)
    env.nodes.push(node)
    const [start, end] = node.output
    env.wires.push({ start, end })
  }

  function cut(ctx: Ctx): void {
    const occurredNames = new Map()

    const frontId = (wireCounter++).toString()
    const front = {
      id: frontId,
      sign: 0 as Types.Sign,
      t: freshenType(ctx, Types.TypeVar("a"), occurredNames),
    }

    const backId = (wireCounter++).toString()
    const back = {
      id: backId,
      sign: 0 as Sign,
      t: freshenType(ctx, Types.TypeVar("a"), occurredNames),
    }

    ctx.neutralSignedTypes.set(frontId, front)
    ctx.neutralSignedTypes.set(backId, back)

    ctx.stack.push(front)
    ctx.stack.push(back)
  }

  return { compose, cut }
}
