import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { formatSignedType } from "../type/formatSignedType"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { Word } from "../word"
import { formatWord } from "../word/formatWord"
import { cutDefinition } from "./cutDefinition"
import { findCurrentSignedTypeOrFail } from "./findCurrentSignedTypeOrFail"

export interface CutOptions {
  current?: {
    start: NodeDefinition
    end: NodeDefinition
  }
}

export function cut(mod: Mod, ctx: Ctx, word: Word, options: CutOptions): void {
  try {
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
          throw new Error(
            `[cut / PortReconnect] I expect top port, currentSignedType: ${formatSignedType(
              currentSignedType,
            )}`,
          )
        }

        unifySignedTypes(ctx, currentSignedType, topSignedType)
        return
      }
    }
  } catch (error) {
    if (!(error instanceof Error)) throw error

    throw new Error(
      `[cut] Fail to cut word: ${formatWord(word)}\n` + error.message,
    )
  }
}
