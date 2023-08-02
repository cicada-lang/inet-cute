import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { matchTypes } from "./matchTypes"

export function cutNodeDefinition(ctx: Ctx, definition: NodeDefinition): void {
  // TODO call `freshenTypes`

  for (const portExp of definition.input) {
    const signedType = ctx.signedTypes.pop()
    if (signedType === undefined) {
      throw new Error(
        `[cutNodeDefinition] I expect a signedType on top of the stack`,
      )
    }

    if (signedType.sign !== 1) {
      throw new Error(
        `[cutNodeDefinition] I expect a positive signedType on top of the stack`,
      )
    }

    matchTypes(ctx, portExp.t, signedType.t)
  }

  for (const portExp of definition.output) {
    ctx.signedTypes.push({ t: portExp.t, sign: 1 })
  }
}
