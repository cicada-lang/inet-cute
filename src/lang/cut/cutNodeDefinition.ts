import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { freshenType } from "../unify/freshenType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { formatType } from "../value/formatType"
import { CutOptions } from "./cut"

export function cutNodeDefinition(
  ctx: Ctx,
  definition: NodeDefinition,
  options: CutOptions,
): void {
  const occurredNames = new Map()

  for (const portExp of definition.input) {
    const value = ctx.stack.pop()
    if (value === undefined) {
      throw new Error(
        [
          `[cutNodeDefinition] I expect a value on top of the stack.`,
          ``,
          `  awaiting type: ${formatType(portExp.t)}`,
        ].join("\n"),
      )
    }

    if (value["@kind"] !== "SignedType") {
      throw new Error(
        [
          `[cutNodeDefinition] I expect the value on top of the stack to be a SignedType.`,
          ``,
          `  value kind: ${value["@kind"]}`,
          `  awaiting type: ${formatType(portExp.t)}`,
        ].join("\n"),
      )
    }

    unifySignedTypes(ctx, value, {
      "@type": "Value",
      "@kind": "SignedType",
      t: freshenType(ctx, portExp.t, occurredNames),
      sign: -1,
    })
  }

  for (const portExp of definition.output) {
    ctx.stack.push({
      "@type": "Value",
      "@kind": "SignedType",
      t: freshenType(ctx, portExp.t, occurredNames),
      sign: 1,
    })
  }
}
