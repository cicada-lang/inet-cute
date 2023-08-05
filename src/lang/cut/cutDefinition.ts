import { Ctx } from "../ctx"
import { Definition } from "../definition"
import { CutOptions } from "./cut"
import { cutNodeDefinition } from "./cutNodeDefinition"
import { cutWords } from "./cutWords"

export function cutDefinition(
  ctx: Ctx,
  definition: Definition,
  options: CutOptions,
): void {
  switch (definition.kind) {
    case "NodeDefinition": {
      cutNodeDefinition(ctx, definition)
      return
    }

    case "WordDefinition": {
      if (definition.words === undefined) {
        throw new Error(
          `[cutDefinition] I expect a word definition to have defined words -- word: ${definition.name}`,
        )
      }

      cutWords(definition.mod, ctx, definition.words, options)
      return
    }

    case "OperatorDefinition": {
      definition.cut(ctx)
      return
    }

    case "TypeDefinition": {
      throw new Error(`[cutDefinition] Can not cut a type: ${definition.name}`)
    }
  }
}
