import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Word } from "../word"
import { cutDefinition } from "./cutDefinition"

export interface CutOptions {
  current?: {
    start: NodeDefinition
    end: NodeDefinition
  }
}

export function cut(
  mod: Mod,
  ctx: Ctx,
  word: Word,
  options?: CutOptions,
): void {
  switch (word.kind) {
    case "Call": {
      const found = ctx.localSignedTypes.get(word.name)
      if (found !== undefined) {
        ctx.signedTypes.push(found)
        ctx.localSignedTypes.delete(word.name)
        return
      } else {
        const definition = lookupDefinitionOrFail(mod, word.name)
        cutDefinition(ctx, definition)
        return
      }
    }

    case "LocalSet": {
      const signedType = ctx.signedTypes.pop()

      if (signedType === undefined) {
        throw new Error(
          `[cut / LocalSet] expect a signed type on the top of the stack`,
        )
      }

      ctx.localSignedTypes.set(word.name, signedType)
      return
    }

    case "PortPush": {
      //
    }

    case "PortReconnect": {
      //
    }
  }
}
