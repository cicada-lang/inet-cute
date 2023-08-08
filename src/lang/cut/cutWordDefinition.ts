import { Ctx } from "../ctx"
import { WordDefinition } from "../definition"
import { freshenType } from "../unify/freshenType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { Sign } from "../value"
import { formatSignedType } from "../value/formatSignedType"
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
      "@type": "Value",
      "@kind": "SignedType",
      t: freshenType(ctx, signedType.t, occurredNames),
      sign: signedType.sign,
    })
  }

  cutWords(definition.mod, ctx, definition.words, options)

  // NOTE Be careful about the order.
  for (const signedType of [...definition.output].reverse()) {
    const value = ctx.stack.pop()
    if (value === undefined) {
      throw new Error(
        [
          `[cutWordDefinition] I expect a value on top of the stack.`,
          ``,
          `  awaiting type: ${formatSignedType(signedType)}`,
        ].join("\n"),
      )
    }

    if (value["@kind"] !== "SignedType") {
      throw new Error(
        [
          `[cutWordDefinition] I expect a signedType on top of the stack.`,
          ``,
          `  value kind: ${value["@kind"]}`,
          `  awaiting type: ${formatSignedType(signedType)}`,
        ].join("\n"),
      )
    }

    unifySignedTypes(ctx, value, {
      "@type": "Value",
      "@kind": "SignedType",
      t: freshenType(ctx, signedType.t, occurredNames),
      sign: -signedType.sign as Sign,
    })
  }

  // Put checked output types back to the stack.
  // NOTE Be careful about the order.
  for (const signedType of definition.output) {
    ctx.stack.push({
      "@type": "Value",
      "@kind": "SignedType",
      t: freshenType(ctx, signedType.t, occurredNames),
      sign: signedType.sign,
    })
  }

  return
}
