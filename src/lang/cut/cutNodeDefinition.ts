import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { freshenType } from "../unify/freshenType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { CutOptions } from "./cut"

export function cutNodeDefinition(
  ctx: Ctx,
  definition: NodeDefinition,
  options: CutOptions,
): void {
  for (const portExp of definition.input) {
    const signedType = ctx.signedTypes.pop()
    if (signedType === undefined) {
      throw new Error(
        `[cutNodeDefinition] I expect a signedType on top of the stack`,
      )
    }

    const t = freshenType(ctx, portExp.t)
    unifySignedTypes(ctx, signedType, { t, sign: -1 })
  }

  for (const portExp of definition.output) {
    const t = freshenType(ctx, portExp.t)
    ctx.signedTypes.push({ t, sign: 1 })
  }
}
