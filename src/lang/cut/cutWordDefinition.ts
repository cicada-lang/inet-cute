import { Ctx } from "../ctx"
import { WordDefinition } from "../definition"
import { freshenType } from "../unify/freshenType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { CutOptions } from "./cut"
import { cutWords } from "./cutWords"

export function cutWordDefinition(
  ctx: Ctx,
  definition: WordDefinition,
  options: CutOptions,
): void {
  if (definition.words === undefined) {
    throw new Error(
      `[cutWordDefinition] I expect a word definition to have defined words -- word: ${definition.name}`,
    )
  }

  // NOTE Be careful about the order.
  for (const t of [...definition.input].reverse()) {
    ctx.signedTypes.push({ t: freshenType(ctx, t), sign: 1 })
  }

  cutWords(definition.mod, ctx, definition.words, options)

  // NOTE Be careful about the order.
  for (const t of [...definition.output].reverse()) {
    const signedType = ctx.signedTypes.pop()
    if (signedType === undefined) {
      throw new Error(
        `[cutWordDefinition] I expect a signedType on top of the stack`,
      )
    }

    unifySignedTypes(ctx, signedType, { t: freshenType(ctx, t), sign: -1 })
  }

  // Put checked output types back to the stack.
  // NOTE Be careful about the order.
  for (const t of definition.output) {
    ctx.signedTypes.push({ t: freshenType(ctx, t), sign: 1 })
  }

  return
}
