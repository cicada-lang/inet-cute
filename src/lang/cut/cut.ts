import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Word } from "../word"
import { cutDefinition } from "./cutDefinition"
import { findCurrentSignedTypeOrFail } from "./findCurrentSignedTypeOrFail"
import { unifySignedTypes } from "./unifySignedTypes"

export interface CutOptions {
  current?: {
    start: NodeDefinition
    end: NodeDefinition
  }
}

export function cut(mod: Mod, ctx: Ctx, word: Word, options: CutOptions): void {
  switch (word.kind) {
    case "Call": {
      const found = ctx.localSignedTypes.get(word.name)
      if (found !== undefined) {
        ctx.signedTypes.push(found)
        ctx.localSignedTypes.delete(word.name)
        return
      } else {
        const definition = lookupDefinitionOrFail(mod, word.name)
        cutDefinition(ctx, definition, options)
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
      const currentSignedType = findCurrentSignedTypeOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      ctx.signedTypes.push(currentSignedType)
      return
    }

    case "PortReconnect": {
      const currentSignedType = findCurrentSignedTypeOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      const topSignedType = ctx.signedTypes.pop()
      if (topSignedType === undefined) {
        console.error({ currentSignedType })
        throw new Error(`[cut / PortReconnect] expect top port`)
      }

      unifySignedTypes(ctx, currentSignedType, topSignedType)
      return
    }
  }
}
