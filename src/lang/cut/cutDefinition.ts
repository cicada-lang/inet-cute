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

    case "NetDefinition": {
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
