import { Ctx } from "../ctx"
import { Definition } from "../definition"
import { CutOptions } from "./cut"
import { cutWords } from "./cutWords"

export function cutDefinition(
  ctx: Ctx,
  definition: Definition,
  options?: CutOptions,
): void {
  switch (definition.kind) {
    case "NodeDefinition": {
      //
      return
    }

    case "NetDefinition": {
      cutWords(definition.mod, ctx, definition.words, options)
      return
    }

    case "OperatorDefinition": {
      //
      return
    }

    case "TypeDefinition": {
      throw new Error(`[cutDefinition] Can not cut a type: ${definition.name}`)
    }
  }
}
