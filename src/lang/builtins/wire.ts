import { Env } from "../env"
import { Mod } from "../mod"
import { createNode } from "../node/createNode"

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
    const [first, second] = node.output
    env.wires.push({ first, second })
  }

  return { compose }
}
