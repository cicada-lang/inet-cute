import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { unifySignedTypes } from "../unify/unifySignedTypes"

export function cutNodeDefinition(ctx: Ctx, definition: NodeDefinition): void {
  // TODO call `freshenTypes`

  for (const portExp of definition.input) {
    const signedType = ctx.signedTypes.pop()
    if (signedType === undefined) {
      throw new Error(
        `[cutNodeDefinition] I expect a signedType on top of the stack`,
      )
    }

    unifySignedTypes(ctx, signedType, { t: portExp.t, sign: -1 })
  }

  for (const portExp of definition.output) {
    ctx.signedTypes.push({ t: portExp.t, sign: 1 })
  }
}
