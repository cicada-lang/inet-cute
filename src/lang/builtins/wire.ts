import { Env } from "../env"
import { createNode } from "../node/createNode"

export function compose(env: Env): void {
  const node = createNode(
    env.mod,
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
  const [first, second] = node.output
  env.wires.push({ first, second })
}
