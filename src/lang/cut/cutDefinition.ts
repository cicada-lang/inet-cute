import { Ctx } from "../ctx"
import { Definition } from "../definition"
import { CutOptions } from "./cut"
import { cutNodeDefinition } from "./cutNodeDefinition"
import { cutWordDefinition } from "./cutWordDefinition"

export function cutDefinition(
  ctx: Ctx,
  definition: Definition,
  options: CutOptions,
): void {
  switch (definition["@kind"]) {
    case "NodeDefinition": {
      cutNodeDefinition(ctx, definition, options)
      return
    }

    case "WordDefinition": {
      cutWordDefinition(ctx, definition, options)
      return
    }

    case "OperatorDefinition": {
      definition.cut(ctx)
      return
    }

    case "TypeDefinition": {
      let count = 0
      while (count < definition.arity) {
        const value = ctx.stack.pop()
        if (value === undefined) {
          throw new Error(
            [
              `[cut / TypeDefinition] I expect more value on the stack.`,
              ``,
              `  type term name: ${definition.name}`,
              `  type term arity: ${definition.arity}`,
              `  already counted: ${count}`,
            ].join("\n"),
          )
        }

        if (value["@kind"] !== "Type") {
          throw new Error(
            [
              `[cut / TypeDefinition] I expect the value on the stack to be Type.`,
              ``,
              `  type term name: ${definition.name}`,
              `  type term arity: ${definition.arity}`,
              `  already counted: ${count}`,
            ].join("\n"),
          )
        }

        count++
      }

      ctx.stack.push({
        "@type": "Value",
        "@kind": "Type",
      })

      return
    }
  }
}
