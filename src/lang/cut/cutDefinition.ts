import { Ctx } from "../ctx"
import { Definition } from "../definition"

export function cutDefinition(ctx: Ctx, definition: Definition): void {
  switch (definition.kind) {
    case "NodeDefinition": {
      //
      return
    }

    case "NetDefinition": {
      //
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
