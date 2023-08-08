import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { unifySignedTypes } from "../unify/unifySignedTypes"
import { formatSignedType } from "../value/formatSignedType"
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
    switch (word["@kind"]) {
      case "Call": {
        const found = ctx.locals.get(word.name)
        if (found !== undefined) {
          ctx.stack.push(found)
          ctx.locals.delete(word.name)
          return
        } else {
          const definition = lookupDefinitionOrFail(mod, word.name)
          cutDefinition(ctx, definition, options)
          return
        }
      }

      case "Local": {
        const signedType = ctx.stack.pop()

        if (signedType === undefined) {
          throw new Error(
            `[cut / Local] expect a signed type on the top of the stack`,
          )
        }

        ctx.locals.set(word.name, signedType)
        return
      }

      case "PortPush": {
        const currentSignedType = findCurrentSignedTypeOrFail(
          word.nodeName,
          word.portName,
          options,
        )

        ctx.stack.push(currentSignedType)
        return
      }

      case "PortReconnect": {
        const currentSignedType = findCurrentSignedTypeOrFail(
          word.nodeName,
          word.portName,
          options,
        )

        const value = ctx.stack.pop()
        if (value === undefined) {
          throw new Error(
            [
              `[cut / PortReconnect] I expect a top value on the stack.`,
              ``,
              `  currentSignedType: ${formatSignedType(currentSignedType)}`,
            ].join("\n"),
          )
        }

        if (value["@kind"] !== "SignedType") {
          throw new Error(
            [
              `[cut / PortReconnect] I expect the top value on the stack to be a SignedType.`,
              ``,
              `  value kind: ${value["@kind"]}`,
              `  currentSignedType: ${formatSignedType(currentSignedType)}`,
            ].join("\n"),
          )
        }

        unifySignedTypes(ctx, currentSignedType, value)
        return
      }

      case "TypeVar": {
        ctx.stack.push({
          "@type": "Value",
          "@kind": "Type",
        })
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[cut] I fail to cut word.`,
        ``,
        `  word: ${formatWord(word)}`,
      ].join("\n"),
      context: {
        span: word.span,
        text: mod.text,
      },
    })
  }
}
