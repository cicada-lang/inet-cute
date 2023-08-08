import { Ctx } from "../ctx"
import { Env } from "../env"
import { Mod } from "../mod"
import { createNode } from "../node/createNode"
import { freshenType } from "../unify/freshenType"
import { Sign, Value } from "../value"

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
          t: { "@type": "Value", "@kind": "TypeVar", name: "a" },
          isPrincipal: false,
        },
        {
          name: "back",
          t: { "@type": "Value", "@kind": "TypeVar", name: "a" },
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
    const front: Value = {
      "@type": "Value",
      "@kind": "SignedType",
      id: frontId,
      sign: 0 as Sign,
      t: freshenType(
        ctx,
        { "@type": "Value", "@kind": "TypeVar", name: "a" },
        occurredNames,
      ),
    }

    const backId = (wireCounter++).toString()
    const back: Value = {
      "@type": "Value",
      "@kind": "SignedType",
      id: backId,
      sign: 0 as Sign,
      t: freshenType(
        ctx,
        { "@type": "Value", "@kind": "TypeVar", name: "a" },
        occurredNames,
      ),
    }

    ctx.neutralSignedTypes.set(frontId, front)
    ctx.neutralSignedTypes.set(backId, back)

    ctx.stack.push(front)
    ctx.stack.push(back)
  }

  return { compose, cut }
}
