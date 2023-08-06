import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { formatType } from "../type/formatType"
import { freshenType } from "../unify/freshenType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { CutOptions } from "./cut"

export function cutNodeDefinition(
  ctx: Ctx,
  definition: NodeDefinition,
  options: CutOptions,
): void {
  const occurredNames = new Map()

  for (const portExp of definition.input) {
    const signedType = ctx.signedTypes.pop()
    if (signedType === undefined) {
      throw new Error(
        [
          `[cutNodeDefinition] I expect a signedType on top of the stack.`,
          ``,
          `  awaiting type: ${formatType(portExp.t)}`,
        ].join("\n"),
      )
    }

    unifySignedTypes(ctx, signedType, {
      t: freshenType(ctx, portExp.t, occurredNames),
      sign: -1,
    })
  }

  for (const portExp of definition.output) {
    ctx.signedTypes.push({
      t: freshenType(ctx, portExp.t, occurredNames),
      sign: 1,
    })
  }
}
