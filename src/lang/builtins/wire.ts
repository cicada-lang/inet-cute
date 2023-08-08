import { Ctx } from "../ctx"
import { Env } from "../env"
import { Mod } from "../mod"
import { createNode } from "../node/createNode"

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
    // TODO
  }

  return { compose, cut }
}
