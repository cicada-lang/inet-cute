import { Ctx } from "../ctx"
import { WordDefinition } from "../definition"
import { Sign } from "../type"
import { formatSignedType } from "../type/formatSignedType"
import { freshenType } from "../unify/freshenType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { CutOptions } from "./cut"
import { cutWords } from "./cutWords"

export function cutWordDefinition(
  ctx: Ctx,
  definition: WordDefinition,
  options: CutOptions,
): void {
  const occurredNames = new Map()

  if (definition.words === undefined) {
    throw new Error(
      [
        `[cutWordDefinition] I expect a word definition to be already defined.`,
        ``,
        `  word: ${definition.name}`,
      ].join("\n"),
    )
  }

  // NOTE Be careful about the order.
  for (const signedType of [...definition.input].reverse()) {
    ctx.stack.push({
      t: freshenType(ctx, signedType.t, occurredNames),
      sign: signedType.sign,
    })
  }

  cutWords(definition.mod, ctx, definition.words, options)

  // NOTE Be careful about the order.
  for (const signedType of [...definition.output].reverse()) {
    const topSignedType = ctx.stack.pop()
    if (topSignedType === undefined) {
      throw new Error(
        [
          `[cutWordDefinition] I expect a signedType on top of the stack.`,
          ``,
          `  awaiting type: ${formatSignedType(signedType)}`,
        ].join("\n"),
      )
    }

    unifySignedTypes(ctx, topSignedType, {
      t: freshenType(ctx, signedType.t, occurredNames),
      sign: -signedType.sign as Sign,
    })
  }

  // Put checked output types back to the stack.
  // NOTE Be careful about the order.
  for (const signedType of definition.output) {
    ctx.stack.push({
      t: freshenType(ctx, signedType.t, occurredNames),
      sign: signedType.sign,
    })
  }

  return
}
